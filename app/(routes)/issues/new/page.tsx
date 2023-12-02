'use client'
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {BiErrorCircle} from "react-icons/bi";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/schema/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/components/error-message";
import Spinner from "@/components/spinner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {ssr: false});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const form = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: '',
            description: ''

        }
    })

    const router = useRouter()


    const onSubmit = async (data: IssueForm) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError("An unexpected error occurred.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={'max-w-xl'}>
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2"}>
                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={'Title'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name={"title"}
                    />
                    <Controller
                        control={form.control}
                        name={'description'}
                        render={({field}) => (
                            <SimpleMDE {...field} placeholder={"Description"}/>
                        )}
                    />

                    <Button disabled={!form.formState.isValid || isSubmitting}>
                        Submit New Issue {" "} {isSubmitting && <Spinner/>}
                    </Button>
                </form>
            </Form>

        </div>
    );
};

export default NewIssue;