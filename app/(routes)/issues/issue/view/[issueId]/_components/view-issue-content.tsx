import {Issue} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const ViewIssueContent = ({issue}: {
    issue: Issue
}) => {
    return (
        <Card className={'flex-1 overflow-x-auto max-w-2xl md:max-w-full '}>
            <CardHeader>
                <CardTitle>
                    Issue Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{__html: issue?.description}} className={'text-sm'}/>
            </CardContent>
        </Card>
    );
};

export default ViewIssueContent;