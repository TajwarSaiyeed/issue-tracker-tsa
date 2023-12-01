import Link from "next/link";
import {Issue} from "@prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";
import IssueBadge from "@/components/issue-badge";

type LatestIssuesProps = {
    issues: Issue[]
};

const LatestIssues = ({issues}: LatestIssuesProps) => {
    return (
        <ScrollArea className="h-96 w-full rounded-md border">
            {issues.map(i => (
                <div key={i.id} className="p-2 border-b">
                    <h3 className="text-md font-semibold mb-2">
                        <Link href={`/issues/issue/${i.id}`}>
                            {i.title}
                        </Link>
                    </h3>
                    <IssueBadge status={i.status} classname={'rounded-md'}/>
                </div>))}
        </ScrollArea>
    );
};

export default LatestIssues;