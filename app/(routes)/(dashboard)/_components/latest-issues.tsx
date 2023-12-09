import Link from "next/link";
import {Issue} from "@prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";
import IssueBadge from "@/components/issue-badge";
import EditIssueButton from "@/components/buttons/edit-issue-button";

type LatestIssuesProps = {
    issues: Issue[]
};

const LatestIssues = ({issues}: LatestIssuesProps) => {
    return (
        <ScrollArea className="h-96 w-full rounded-md border">
            {issues.map(i => (
                <div key={i.id} className="p-2 border-b px-4">
                    <h3 className="text-md font-semibold mb-2 flex justify-between items-center">
                        <Link href={`/issues/issue/view/${i.id}`}>
                            {i.title}
                        </Link>
                        <EditIssueButton userId={i.createdByUserId} issueId={i.id} buttonType={'icon'}/>
                    </h3>
                    <IssueBadge status={i.status} classname={'rounded-md'}/>
                </div>))}
        </ScrollArea>
    );
};

export default LatestIssues;