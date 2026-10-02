const testimonialImages = [
  "https://ik.imagekit.io/2kynz1ge7/2.webp",
  "https://ik.imagekit.io/2kynz1ge7/1.webp",
  "https://ik.imagekit.io/2kynz1ge7/MOUNT-OPTICASL.webp",
  "https://ik.imagekit.io/2kynz1ge7/8.webp",
  "https://ik.imagekit.io/2kynz1ge7/3-1.webp",
  "https://ik.imagekit.io/2kynz1ge7/4.webp",
  "https://ik.imagekit.io/2kynz1ge7/Untitled-design.webp",
  "https://ik.imagekit.io/2kynz1ge7/9.webp",
  "https://ik.imagekit.io/2kynz1ge7/10.webp",
  "https://ik.imagekit.io/2kynz1ge7/5.webp",
] as const;

export function TestimonialStrip() {
  const slides = [...testimonialImages, ...testimonialImages];

  return (
    <section className="testimonial-strip overflow-hidden border-t border-border bg-background py-7" aria-label="Client testimonials">
      <div className="page-shell mb-4">
        <h2 className="text-[24px] text-navy md:text-[28px]">What our clients say</h2>
      </div>
      <div className="testimonial-marquee flex w-max gap-4 px-4">
        {slides.map((src, index) => (
          <figure key={`${src}-${index}`} className="w-[min(86vw,560px)] shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-card md:w-[586px]">
            <img
              src={src}
              alt={index < testimonialImages.length ? `Webgram IT Solution client testimonial ${index + 1}` : ""}
              width={1172}
              height={391}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}