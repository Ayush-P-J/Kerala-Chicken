import { z } from "zod";

export const districtSchema = z.object({
  districtName: z.string().min(1, { message: "District name is required" }).trim(),
  districtCode: z.string().min(1, { message: "Distict code is required" }).trim(),
});

