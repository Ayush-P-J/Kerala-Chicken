import { z } from "zod";

export const farmerSchema = z.object({
  farmerCode: z.string().min(1, { message: "Farmer code is required" }).trim(),

  farmerName: z.string().min(1, { message: "Farmer name is required" }).trim(),

  supervisorName: z
    .string()
    .min(1, { message: "Supervisor name is required" })
    .trim(),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .optional()
    .or(z.literal("")),

  aadhaar: z
    .string()
    .regex(/^\d{12}$/, { message: "Aadhaar number must be 12 digits" })
    .optional()
    .or(z.literal("")),

  bankName: z
    .string()
    .min(2, { message: "Bank name must be at least 2 characters" })
    .optional()
    .or(z.literal("")),

  accountNumber: z
    .string()
    .regex(/^\d+$/, { message: "Account number must contain only numbers" })
    .min(6, { message: "Account number must be at least 6 digits" })
    .optional()
    .or(z.literal("")),

  ifsc: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC code format" })
    .optional()
    .or(z.literal("")),

  branch: z
    .string()
    .min(2, { message: "Branch name must be at least 2 characters" })
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .optional()
    .or(z.literal("")),

  pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Pincode must be 6 digits" })
    .optional()
    .or(z.literal("")),

  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { message: "Invalid PAN number format" })
    .optional()
    .or(z.literal("")),
});
