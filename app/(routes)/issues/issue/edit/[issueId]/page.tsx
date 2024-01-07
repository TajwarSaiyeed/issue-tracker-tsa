import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import NotFound from "@/components/not-found";
import {getSession} from "@/lib/utils";
import {EditIssueHeader} from "@/app/(routes)/issues/issue/edit/[issueId]/_components/edit-issue-header";

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
            <EditIssueHeader issue={issue}/>

        </section>
    );
};


export default EditIssue;

export const metadata: Metadata = {
    title: "Issue Tracker - Edit Issue",
    description: 'Edit issue details',
}