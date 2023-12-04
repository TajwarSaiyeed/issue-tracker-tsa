import {Issue} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const ViewIssueContent = ({issue}: {
    issue: Issue
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Issue Details
                </CardTitle>
            </CardHeader>
            <CardContent className={'flex gap-x-2'}>
                <div dangerouslySetInnerHTML={{__html: issue?.description}} className={'text-sm'}/>
            </CardContent>
        </Card>
    );
};

export default ViewIssueContent;