import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IssueBadge from "@/components/issue-badge";
import {formattedDate} from "@/lib/utils";
import {Issue} from "@prisma/client";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ViewIssueHeader = ({issue}: { issue: Issue }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex justify-between items-center'}>
                    {issue?.title}
                    <Button variant={"default"} size={"sm"} className={'bg-green-600 hover:bg-green-700'}>
                        <Link href={`/issues/new`}>
                            New Issue
                        </Link>
                    </Button>
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