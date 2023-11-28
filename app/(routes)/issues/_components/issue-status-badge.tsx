import { IssueStatus } from '@prisma/client'
import React from 'react'

const statusMap: Record<
    IssueStatus,
    { label: string, color: 'red' | 'violet' | 'green' }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' }
};

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
    return (
        <div color={statusMap[status].color}>
            {statusMap[status].label}
        </div>
    )
}

export default IssueStatusBadge