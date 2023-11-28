import {Metadata} from "next";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    return (
        <section className={'flex flex-col md:flex-row justify-between gap-x-6'}>
            <Card className={'w-full p-5 md:flex-1'}>
                <div className={'flex gap-x-2'}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h2>Open Issues</h2>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                50
                            </p>
                        </CardContent>
                    </Card><Card>
                        <CardHeader>
                            <CardTitle>
                                <h2>Open Issues</h2>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                50
                            </p>
                        </CardContent>
                    </Card><Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Open Issues</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            50
                        </p>
                    </CardContent>
                </Card>

                </div>
            </Card>
            <Card className={'w-full p-5 md:w-[500px]'}>
                Latest Issue
            </Card>
        </section>

    )
}


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'View a summary of project issues'
};