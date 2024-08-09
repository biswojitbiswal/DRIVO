import {z} from 'zod'

const loginSchema = z.object({
    email: z
        .string({required_error : "Email is required"})
        .trim()
        .min(10,({message: "Email must be atleast 10 character"}))
        .max(25, ({message: "Email must not be more than 25 character"})),
    password : z
        .string({required_error: "Password is required"})
        .trim()
        .min(8, ({message: "Password must be atleast 8 character"}))
        .max(16, ({message: "Password must not be more than 16 character"})),
});

export default loginSchema