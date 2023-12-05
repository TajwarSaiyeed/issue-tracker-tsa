import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import IssueBadge from "@/components/issue-badge";
import {getSession} from "@/app/api/issues/route";
import NotFound from "@/components/not-found";

interface IParams {
    params: {
        issueId: string
    }
}

const EditIssue = async ({params: {issueId}}: IParams) => {
    const session = await getSession()
    const {issue} = await getIssue(issueId);

    if (!session) return (
        <NotFound
            href={'/'}
            btnText={"Back To Home"}
            title={"Need To Sign in"}
            description={"You need to login to view this page"}
        />
    )

    if (!issue) return (
        <NotFound
            href={'/'}
            btnText={"Back To Home"}
            title={"Issue Not Found"}
            description={"The issue you are looking for does not exist"}
        />
    )

    if (session.user.id !== issue.createdByUserId) return (
        <NotFound
            href={'/'}
            btnText={"Back To Home"}
            title={"Unauthorized"}
            description={"You are not authorized to view this page"}
        />
    )


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