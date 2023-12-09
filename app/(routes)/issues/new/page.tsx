'use client';
import {useForm} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/schema/validationSchemas";
import {z} from "zod";
import Spinner from "@/components/spinner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Editor from "@/components/editor";


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
    const editorContent = form.getValues('description');


    useEffect(() => {
        // Update the form value when the React Quill editor content changes
        form.setValue('description', form.getValues('description'), {
            shouldValidate: true,
        });
    }, [form, editorContent]);

    const onDescriptionChange = (value: string) => {
        // Manually update the form value when the React Quill editor content changes
        form.setValue('description', value, {
            shouldValidate: true,
        });
    };

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
        <div className={'max-w-5xl mx-auto w-full'}>
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2 w-full"}>
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

                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Editor value={
                                        form.getValues('description')
                                    } onChange={
                                        onDescriptionChange
                                    }/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name={"description"}
                    />


                    <Button disabled={!form.formState.isValid || isSubmitting} className={'flex gap-2'}>
                        Submit New Issue {isSubmitting && <Spinner/>}
                    </Button>
                </form>
            </Form>

        </div>
    );
};

export default NewIssue;