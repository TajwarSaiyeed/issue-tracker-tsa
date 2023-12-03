import {cn} from "@/lib/utils";

import {Badge} from "@/components/ui/badge";

import {IssueStatus} from "@prisma/client";

const IssueBadge = ({status, classname} : {
    status?: IssueStatus
    classname?: string
}) => {
    return (
        <Badge
            variant={status === 'OPEN' ? 'destructive' : 'outline'}
            className={cn("capitalize", {
                'bg-red-100 text-red-800': status === IssueStatus.OPEN,
                'bg-violet-100 text-violet-800': status === IssueStatus.IN_PROGRESS,
                'bg-green-100 text-green-800': status === IssueStatus.CLOSED
            }, classname)}
        >
            {status?.toLowerCase().split("_").join(" ")}
        </Badge>
    );
};

export default IssueBadge;