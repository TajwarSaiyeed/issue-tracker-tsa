'use client'
import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {BiErrorCircle} from "react-icons/bi";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import {z} from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
    const [error, setError] = useState('');

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)})

    const router = useRouter()
    return (
        <div className={'max-w-xl'}>
            {error && <Callout.Root color={'red'} className={'mb-5'}>
                <Callout.Icon>
                    <BiErrorCircle/>
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError("An unexpected error occurred.")
                    }
                })}
                className={'space-y-3'}
            >

                <TextField.Root>
                    <TextField.Input
                        {...register("title")}
                        placeholder={'Title'}/>
                </TextField.Root>
                {errors.title && <Text as={'p'} color={'red'}>{errors.title.message}</Text>}

                <Controller
                    control={control}
                    name={'description'}
                    render={({field}) => (<SimpleMDE placeholder="Description" {...field}/>)}
                />

                {errors.description && <Text as={'p'} color={'red'}>{errors.description.message}</Text>}

                <Button disabled={!isValid}>
                    Submit New Issue
                </Button>
            </form>
        </div>
    );
};

export default NewIssue;