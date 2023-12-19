import {Issue, IssueStatus} from "@prisma/client";

export type IssueQuery = {
    status: IssueStatus;
    orderBy: keyof Issue;
    page: string;
}


export type issuesSummaryProps = {
    issuesSummary: {
        title: string,
        value: number
    } []
}
