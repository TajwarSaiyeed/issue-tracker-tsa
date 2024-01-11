import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {SubmitSolution} from "./submit-solution";
import {getSolutions} from "@/actions/get-solutions";
import {cn, formattedDate, getSession} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const IssueSolutions = async ({issueId}: { issueId: string }) => {
    const session = await getSession();
    const data = await getSolutions(issueId);

    const solutions = data?.solutions;
    const user = session?.user;

    if (!solutions || solutions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className={'flex justify-between items-center gap-2'}>
                        Solutions <SubmitSolution issueId={issueId}/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={'text-center text-gray-500'}>No solutions submitted yet</p>
                </CardContent>
            </Card>
        );
    }

    const userSolution = solutions.find((solution) => solution.user.id === user?.id);
    const otherSolutions = solutions.filter((solution) => solution.user.id !== user?.id);


    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex justify-between items-center gap-2'}>
                    Solutions {!userSolution && <SubmitSolution issueId={issueId}/>}
                </CardTitle>
            </CardHeader>
            <CardContent className={'space-y-2'}>
                {userSolution && (
                    <Card key={userSolution.id} className={cn("", "border-green-500")}>
                        <CardHeader>
                            <CardTitle className={'text-sm'}>
                                Submitted by you
                            </CardTitle>
                        </CardHeader>

                        <CardContent className={'overflow-x-auto max-w-2xl md:max-w-full'}>
                            <div dangerouslySetInnerHTML={{__html: userSolution.data}}/>
                        </CardContent>

                        <CardFooter className={'flex justify-end items-end'}>
                            <div className={'text-xs text-gray-500'}>
                                Submitted {formattedDate(userSolution.createdAt)} days ago
                            </div>
                            <Avatar className={'rounded-md ml-2 border'}>
                                <AvatarImage src={userSolution?.user?.image || ""}
                                             alt={userSolution?.user?.name || ""}/>
                                <AvatarFallback>
                                    {userSolution?.user?.name!.charAt(0)}
                                </AvatarFallback>

                            </Avatar>
                        </CardFooter>
                    </Card>
                )}
                {otherSolutions.map(solution => (
                    <Card key={solution.id}
                          className={cn("",
                              solution?.user?.id === user?.id && "border-green-500"
                          )}
                    >
                        <CardHeader>
                            <CardTitle className={'text-sm'}>
                                Submitted by {solution?.user?.id === user?.id ? 'you' : solution?.user?.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div dangerouslySetInnerHTML={{__html: solution.data}}/>
                        </CardContent>

                        <CardFooter className={'flex justify-end items-end'}>
                            <div className={'text-xs text-gray-500'}>
                                Submitted {formattedDate(solution.createdAt)} days ago
                            </div>
                            <Avatar className={'rounded-md ml-2 border'}>
                                <AvatarImage src={solution?.user?.image || ""} alt={solution?.user?.name || ""}/>
                                <AvatarFallback>
                                    {solution?.user?.name!.charAt(0)}
                                </AvatarFallback>

                            </Avatar>
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
        ;
};

