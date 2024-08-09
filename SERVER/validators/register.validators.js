import {z} from 'zod'

const registerSchema = z.object({
    userName : z
        .string({required_error : "Username is reaquired"})
        .trim()
        .min(5, ({message : "Username must be atleast 5 character"}))
        .max(25, ({message: "Username must not be more than 25 character"})),
    email : z
        .string({required_error : "Email is required"})
        .trim()
        .min(10,({message: "Email must be atleast 10 character"}))
        .max(25, ({message: "Email must not be more than 25 character"})),
    password : z
        .string({required_error: "Password is required"})
        .trim()
        .min(8, ({message: "Password must be atleast 8 character"}))
        .max(16, ({message: "Password must not be more than 16 character"})),
    phone: z
        .string({required_error: "Phone Number is Required"})
        .trim()
        .min(10, ({message: "Phone must be atleast 10 character"}))
        .max(15, ({message: "Phone must not be more than 15 character"}))
})

export default registerSchema