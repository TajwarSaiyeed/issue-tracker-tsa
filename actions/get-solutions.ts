import prisma from "@/prisma/client";


export const getSolutions = async (issueId: string) => {
    try {

        const solutions = await prisma.solution.findMany({
            where: {
                issueId: issueId
            },
            include: {
                user: true
            }
        })

        if (!solutions) {
            return {
                status: 404,
                message: "No solutions available for this issue yet!",
                solutions: []
            }
        }


        return {
            status: 200,
            message: "Success",
            solutions
        }

    } catch (error: Error | any) {
        return {
            status: 500,
            message: "Something went wrong",
            solutions: []
        }
    }
}