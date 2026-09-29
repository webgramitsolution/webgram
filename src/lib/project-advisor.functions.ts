import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { recommendServices } from "./project-advisor.server";

const schema = z.object({
  needs: z.string().trim().min(15, "Please describe your project in a bit more detail.").max(1500),
  projectType: z.string().max(40).optional(),
  budget: z.string().max(40).optional(),
});

export const getProjectAdvice = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(({ data }) => recommendServices(data));
