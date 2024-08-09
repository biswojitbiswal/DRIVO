import {z} from 'zod'

const contactSchema = z.object({
    message: z
        .string({required_error: "Message is required"})
        .trim()
        .min(16, ({message: "Message must be atleast 16 character"}))
        .max(256, ({message: "Message must not be more than 256 character"}))
})

export default contactSchema