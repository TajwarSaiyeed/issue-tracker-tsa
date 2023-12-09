"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Issue} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {formattedDate} from "@/lib/utils";
import IssueBadge from "@/components/issue-badge";
import Link from "next/link";
import {useSession} from "next-auth/react";

export const useUserSession = () => {
    const {data} = useSession();
    return data?.user || null;
};


const CellComponent = ({row}: {
    row: any
}) => {
    const user = useUserSession();

    if (!user || row.original.createdByUserId !== user.id) {
        return (
            <Link href={`/issues/issue/view/${row.original.id}`}>
                <Button variant={"default"} size={"sm"} className={'bg-green-600 hover:bg-green-700'}>
                    View
                </Button>
            </Link>
        );
    }

    return (
        <Link href={`/issues/issue/edit/${row.original.id}`}>
            <Button variant="ghost">
                Edit
            </Button>
        </Link>
    );
};



export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            return (
                <IssueBadge status={row.original.status}/>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        accessorFn: (issue) => {
            return `Created ${formattedDate(issue.createdAt)} days ago`
        }
    },
    {
        accessorKey: "id",
        header: "Actions",
        cell: ({row}) => <CellComponent row={row}/>
    }
]

