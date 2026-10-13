CREATE TABLE public.cost_estimate_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL, email text NOT NULL, phone text NOT NULL DEFAULT '',
  business_model text NOT NULL, integrations text[] NOT NULL DEFAULT '{}',
  estimate_min integer NOT NULL, estimate_max integer NOT NULL, currency text NOT NULL DEFAULT 'INR',
  source_page text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.cost_estimate_leads TO authenticated;
GRANT ALL ON public.cost_estimate_leads TO service_role;
ALTER TABLE public.cost_estimate_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage cost leads" ON public.cost_estimate_leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.submit_cost_estimate(_name text, _email text, _phone text, _model text, _integrations text[], _source text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE _id uuid; _min int; _max int; _i text;
BEGIN
  IF length(trim(_name)) NOT BETWEEN 2 AND 100 THEN RAISE EXCEPTION 'Please enter your full name.'; END IF;
  IF _email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_email) > 255 THEN RAISE EXCEPTION 'Please enter a valid email.'; END IF;
  IF length(coalesce(_phone,'')) > 30 OR length(coalesce(_source,'')) > 200 THEN RAISE EXCEPTION 'Please check your details.'; END IF;
  IF _model = 'b2b' THEN _min := 150000; _max := 350000;
  ELSIF _model = 'd2c' THEN _min := 60000; _max := 150000;
  ELSIF _model = 'enterprise' THEN _min := 300000; _max := 500000;
  ELSE RAISE EXCEPTION 'Choose a business model.'; END IF;
  FOREACH _i IN ARRAY coalesce(_integrations,'{}') LOOP
    IF _i NOT IN ('knet','tabby','gst') THEN RAISE EXCEPTION 'Unknown integration.'; END IF;
    _min := _min + 15000; _max := _max + 25000;
  END LOOP;
  IF (SELECT count(*) FROM cost_estimate_leads WHERE lower(email)=lower(trim(_email)) AND created_at > now()-interval '10 minutes') >= 3 THEN
    RAISE EXCEPTION 'Too many requests. Please try again shortly.'; END IF;
  INSERT INTO cost_estimate_leads(full_name,email,phone,business_model,integrations,estimate_min,estimate_max,source_page)
  VALUES (trim(_name),lower(trim(_email)),coalesce(_phone,''),_model,coalesce(_integrations,'{}'),_min,_max,coalesce(_source,'')) RETURNING id INTO _id;
  RETURN _id;
END $$;
GRANT EXECUTE ON FUNCTION public.submit_cost_estimate(text,text,text,text,text[],text) TO anon, authenticated;