import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";

const QuillWrapper = dynamic(
    async () => {
        const {default: RQ} = await import("react-quill");
        // eslint-disable-next-line react/display-name
        return ({...props}) => <RQ {...props} />;
    },
    {
        ssr: false,
    }
) as typeof ReactQuill;

const modules = {
    toolbar: [
        [{header: "1"}, {header: "2"}, {font: []}],
        [{size: []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            {list: "ordered"},
            {list: "bullet"},
            {indent: "-1"},
            {indent: "+1"},
        ],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ],
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
];
const Editor = ({value, onChange, ...props}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <QuillWrapper
            theme={"snow"}
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default Editor;