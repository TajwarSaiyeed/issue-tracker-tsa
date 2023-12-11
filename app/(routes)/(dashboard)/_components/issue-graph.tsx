"use client"
import {Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {IssueStatus} from "@prisma/client";

type IssueGraphProps = {
    OpenIssues: number;
    InProgressIssues: number;
    ClosedIssues: number;
}

const IssueGraph = ({
                        OpenIssues, InProgressIssues, ClosedIssues
                    }: IssueGraphProps) => {

    const data = [
        {label: 'Open', value: OpenIssues,},
        {label: 'In Progress', value: InProgressIssues,},
        {label: 'Closed', value: ClosedIssues},
    ]

    return (
        <Card className={'mt-4 py-4'}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label"/>
                    <YAxis/>
                    <Bar
                        dataKey="value"
                        barSize={60}
                    >
                        {
                            data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 0 ? '#ff6363' : index === 1 ? '#8B5CF6' : '#10B981'}
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueGraph;