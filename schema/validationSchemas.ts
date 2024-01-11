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

export const solutionIssueSchema = z.object({
    issueId: z.string().min(1, {message: 'IssueId is required'}),
    data: z.string().min(1, {message: 'Data is required'})
})

export const upVoteIssueSchema = z.object({
    solutionId: z.string().min(1, {message: 'SolutionId is required'}),
    userId: z.string().min(1, {message: 'UserId is required'})
})

export const downVoteIssueSchema = z.object({
    solutionId: z.string().min(1, {message: 'SolutionId is required'}),
    userId: z.string().min(1, {message: 'UserId is required'})
})

