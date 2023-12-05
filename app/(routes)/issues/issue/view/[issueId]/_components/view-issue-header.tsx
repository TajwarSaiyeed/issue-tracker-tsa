import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IssueBadge from "@/components/issue-badge";
import {formattedDate} from "@/lib/utils";
import {Issue} from "@prisma/client";
import CreateNewIssueButton from "@/components/buttons/create-new-issue";
import EditIssueButton from "@/components/buttons/edit-issue-button";

const ViewIssueHeader = async ({issue}: { issue: Issue }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex justify-between items-center'}>
                    {issue?.title}
                    <div className={'flex items-center gap-2'}>
                        <CreateNewIssueButton/>
                        <EditIssueButton userId={issue.createdByUserId} issueId={issue?.id} buttonType={'text'}/>
                    </div>
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
    );
};

export default ViewIssueHeader;