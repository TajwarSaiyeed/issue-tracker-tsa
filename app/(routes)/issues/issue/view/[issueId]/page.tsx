import {getIssue} from "@/actions/get-issue";
import {Metadata} from "next";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IssueBadge from "@/components/issue-badge";
import {formattedDate} from "@/lib/utils";

interface IParams {
    params: {
        issueId: string
    }
}

const ViewIssue = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);


    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {issue?.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className={'flex gap-x-2'}>
                    <IssueBadge status={issue?.status} classname={'rounded-md'}/>
                    <p className={'text-sm text-gray-400'}>
                        {(issue?.status === "OPEN" || issue?.status === "IN_PROGRESS") ?
                            `created ${formattedDate(issue?.createdAt as Date)} days ago`
                            : `was closed ${formattedDate(issue?.updatedAt as Date)} days ago`}
                    </p>
                </CardContent>
            </Card>
        </section>
    );
};


export default ViewIssue;

export const metadata: Metadata = {
    title: 'Issue Tracker - View Issue',
    description: 'View issue details'
}