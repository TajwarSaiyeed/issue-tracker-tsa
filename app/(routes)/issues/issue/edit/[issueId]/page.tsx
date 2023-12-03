import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IssueBadge from "@/components/issue-badge";

interface IParams {
    params: {
        issueId: string
    }
}

const EditIssue = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);
    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {issue?.title}
                    </CardTitle>
                    <CardContent>
                        Test
                        <IssueBadge status={issue?.status} classname={'rounded-md'}/>
                    </CardContent>

                </CardHeader>
            </Card>
        </section>
    );
};


export default EditIssue;

export const metadata: Metadata = {
    title: 'Issue Tracker - Edit Issue',
    description: 'Edit issue details'
}