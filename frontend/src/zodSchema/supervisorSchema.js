import { z } from "zod";

export const supervisorSchema = z.object({
  districtName: z
    .string()
    .min(1, { message: "District name is required" })
    .trim(),

  supervisorCode: z
    .string()
    .min(1, { message: "Supervisor code is required" })
    .trim(),

  supervisorName: z
    .string()
    .min(1, { message: "Supervisor name is required" })
    .trim(),

  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .optional()
    .or(z.literal("")),

  drivingLicenseNo: z
    .string()
    .min(5, { message: "Driving license number must be at least 5 characters" })
    .optional()
    .or(z.literal("")),

  expiry: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Expiry date must be in YYYY-MM-DD format",
    })
    .optional()
    .or(z.literal("")),

  adharCardNo: z
    .string()
    .regex(/^\d{12}$/, { message: "Aadhaar number must be exactly 12 digits" })
    .optional()
    .or(z.literal("")),

  bankName: z
    .string()
    .min(2, { message: "Bank name must be at least 2 characters" })
    .optional()
    .or(z.literal("")),

  accountNo: z
    .string()
    .regex(/^\d+$/, { message: "Account number must contain only digits" })
    .min(6, { message: "Account number must be at least 6 digits" })
    .optional()
    .or(z.literal("")),

  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
      message: "Invalid IFSC code format",
    })
    .optional()
    .or(z.literal("")),

  branch: z
    .string()
    .min(2, { message: "Branch name must be at least 2 characters" })
    .optional()
    .or(z.literal("")),
});
