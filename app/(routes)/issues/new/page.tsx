'use client'
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {BiErrorCircle} from "react-icons/bi";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/schema/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/components/error-message";
import Spinner from "@/components/spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

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
            {/*TODO: Error text here*/}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'space-y-3'}
            >
                {/*TODO: Issue Title here*/}
                {/*<TextField.Root>*/}
                {/*    <TextField.Input*/}
                {/*        {...register("title")}*/}
                {/*        placeholder={'Title'}/>*/}
                {/*</TextField.Root>*/}
                <ErrorMessage>{errors?.title?.message}</ErrorMessage>

                <Controller
                    control={control}
                    name={'description'}
                    render={({field}) => (<SimpleMDE placeholder="Description" {...field}/>)}
                />

                <ErrorMessage>
                    {errors?.description?.message}
                </ErrorMessage>

                <button disabled={!isValid || isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner/>}
                </button>
            </form>
        </div>
    );
};

export default NewIssue;