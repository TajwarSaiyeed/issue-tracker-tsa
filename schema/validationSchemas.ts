import {z} from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required!").max(255),
    description: z.string().min(1, "Description is required!")
})


export const UpdateIssueHeaderSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED'])
})

export const UpdateIssueDescriptionSchema = z.object({
    description: z.string().min(1, {message: 'Description is required'})
})