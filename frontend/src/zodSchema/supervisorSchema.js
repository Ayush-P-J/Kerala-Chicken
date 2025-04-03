import { z } from "zod";

export const supervisorSchema = z.object({
  districtName: z.string().min(1, { message: "District name is required" }).trim(),
  supervisorCode: z.string().min(1, { message: "Supervisor code is required" }).trim(),
  supervisorName: z.string().min(1, { message: "Supervisor name is required" }).trim(),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
  email: z.string().email({ message: "Invalid email format" }).optional().or(z.literal("")),  
  drivingLicenseNo: z.string().optional().or(z.literal("")),
  expiry: z.string().optional().or(z.literal("")),
  adharCardNo: z.string().optional().or(z.literal("")),
  bankName: z.string().optional().or(z.literal("")),
  accountNo: z.string().optional().or(z.literal("")),
  ifscCode: z.string().optional().or(z.literal("")),
  branch: z.string().optional().or(z.literal("")),
});
