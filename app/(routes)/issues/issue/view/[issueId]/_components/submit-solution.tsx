'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {solutionIssueSchema} from "@/schema/validationSchemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Editor from "@/components/editor";
import axios from "axios";
import {toast} from "sonner"
import {useRouter} from "next/navigation";


type SubmitSolutionType = z.infer<typeof solutionIssueSchema>

export const SubmitSolution = ({issueId}: { issueId: string }) => {
    const [open, setOpen] = useState(false);
    const session = useSession();
    const router = useRouter()
    const form = useForm<SubmitSolutionType>({
        resolver: zodResolver(solutionIssueSchema),
        defaultValues: {
            data: "",
            issueId,
        }
    })

    const editorContent = form.getValues('data');


    useEffect(() => {
        form.setValue('data', form.getValues('data'), {
            shouldValidate: true,
        });
    }, [form, editorContent]);

    const onDescriptionChange = (value: string) => {
        form.setValue('data', value, {
            shouldValidate: true,
        });
    };

    const handleSolution = async (data: SubmitSolutionType) => {
        try {

            const res = await axios.post('/api/issues/solutions', data)

            toast.success("Success", {
                duration: 1000,
                position: "top-right",
                description: res.data.message,

            })

        } catch (e: Error | any) {
            toast.error("Error", {
                duration: 6000,
                position: "top-right",
                description: e.response.data.error,
            })
        } finally {
            setOpen(false);
            form.reset();
            router.refresh()
        }
    }

    if (session.status === "loading") {
        return <Skeleton className="w-32 h-10 rounded-md"/>
    }

    if (session.status === "unauthenticated") {
        return (
            <Link href={'/api/auth/signin'}>
                <Button variant={'destructive'} size={'sm'}>
                    Login to submit solution
                </Button>
            </Link>
        );
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    variant={'outline'} size={'sm'}>
                    Submit Solution
                </Button>
            </DialogTrigger>
            {open && <DialogContent className={'max-w-2xl'}>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure this solution is correct?
                    </DialogTitle>
                    <DialogDescription>
                        You can update your solution later
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSolution)} className={'space-y-4'}>
                        <FormField
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Solution
                                    </FormLabel>
                                    <FormControl className={'overflow-y-auto max-h-96'}>
                                        <Editor value={
                                            form.getValues('data')
                                        } onChange={
                                            onDescriptionChange
                                        }/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            name={"data"}
                        />

                        <DialogFooter className={'gap-2'}>
                            <Button
                                disabled={form.formState.isSubmitting}
                                onClick={() => {
                                    setOpen(false);
                                    form.reset();
                                }} variant={'outline'} size={'sm'} type={'button'}>
                                Cancel
                            </Button>
                            <Button
                                disabled={form.formState.isSubmitting}
                                type={'submit'} variant={'destructive'} size={'sm'}>
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>}
        </Dialog>
    );
};

