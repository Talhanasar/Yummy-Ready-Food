import { z } from 'zod';

// Define the Zod schema
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"), // Ensure name is not empty
  mobileNumber: z.string()
    .regex(/^01\d{9}$/, "Invalid phone number, must start with 01"), // Regex for 11 digits starting with '01'
  area: z.string().min(1, "Area is required"), // Ensure address is not empty
  extraNote: z.string().optional(), // Extra note is optional
});

 export const adminSignupSchema = z.object({
  username: z.string().min(4, "Username is required"),
  phoneNumber: z.string().regex(/^01\d{9}$/, "Invalid phone number, must start with 01"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default formSchema;
