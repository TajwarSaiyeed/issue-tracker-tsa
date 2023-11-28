import {Issue, IssueStatus} from "@prisma/client";

export type IssueQuery = {
    status: IssueStatus;
    orderBy: keyof Issue;
    page: string;
}