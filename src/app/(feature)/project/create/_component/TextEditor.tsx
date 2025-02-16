'use client';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import '@/app/globals.css';

interface TextEditorProps {
    value?: string;
    onChange: (content: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "<p >Enter project description (Min 50 words)...</p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700">Project Description <span className="text-red-500">*</span></label>

            {/* Toolbar */}
            <div className="flex space-x-2 my-2">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("bold") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    <b>B</b>
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("italic") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    <i>I</i>
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("strike") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    <s>S</s>
                </button>
                <button
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("paragraph") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100}"} `}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("bulletList") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    Bullet List
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("orderedList") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    Ordered List
                </button>
                <button
                    onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                    className={`p-2 h-7 rounded-md border-2 transition-all flex items-center justify-center ${editor?.isActive("horizontalRule") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-100"}`}
                >
                    HR
                </button>
            </div>

            {/* Editor Content */}
            <div className="border border-gray-300 bg-white p-4 rounded-md min-h-[250px]">
                <EditorContent editor={editor}  />
            </div>
        </div>
    );
};

export default TextEditor;
