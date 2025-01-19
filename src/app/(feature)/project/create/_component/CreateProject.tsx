import { createProject } from '@/lib/features/create.project.slice';
import { AppDispatch, RootState } from '@/lib/store';
import { CreateProjectDto, initialCreateProjectDto } from '@/lib/type/project/ICreateProject.types';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

export default function CreateProject() {
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { loading, error } = useSelector((state: RootState) => state.createProject);

    const [formState, setFormState] = useState<CreateProjectDto>(initialCreateProjectDto);
    const [files, setFiles] = useState<File[]>([]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("metadata.")) {
            const metadataKey = name.split(".")[1];
            setFormState((prev) => ({
                ...prev,
                metadata: {
                    ...prev.metadata,
                    [metadataKey]: value,
                },
            }));
        } else {
            setFormState((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formState);
        if (!user) {
            toast({
                title: "Error",
                description: "User not found",
                variant: "destructive",
            })
            return;
        }

        const formData = new FormData();
        formData.append("userId", user.id.toString());
        formData.append("metadata.authorName", formState.metadata.authorName);
        formData.append("metadata.email", formState.metadata.email);
        formData.append("metadata.college", formState.metadata.college);
        formData.append("metadata.title", formState.metadata.title);
        formData.append("metadata.description", formState.metadata.description);
        formData.append("metadata.stream", formState.metadata.stream);
        formData.append("metadata.category", formState.metadata.category);
        formData.append("metadata.tags", formState.metadata.tags.join(","));
        formData.append("metadata.components", formState.metadata.components.join(","));
        formData.append("metadata.projectType", formState.metadata.projectType);
        formData.append("metadata.projectStatus", formState.metadata.projectStatus);
        formData.append("metadata.appAndPlatforms", formState.metadata.appAndPlatforms ? formState.metadata.appAndPlatforms.join(",") : '');
        formData.append("metadata.isFinalYearProject", (formState.metadata.isFinalYearProject ?? false).toString());
        formData.append("metadata.projectPdfUrl", formState.metadata.projectPdfUrl || '');
        formData.append("metadata.blackbookPdfUrl", formState.metadata.blackbookPdfUrl || '');
        formData.append("metadata.projectUrl", formState.metadata.projectUrl || '');
        formData.append("metadata.collaborators", (formState.metadata.collaborators ?? []).join(","));
        formData.append('metadata.upVotes', formState.metadata.upVotes?.toString() || '0');
        formData.append('metadata.downVotes', formState.metadata.downVotes?.toString() || '0');
        formData.append('metadata.viewCount', formState.metadata.viewCount?.toString() || '0');

        files.forEach((file) => {
            console.log(file);
            formData.append("files", file);
        });

        try {
            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });
            dispatch(createProject(formData));
        } catch (error) {
            console.error(error);

        }
        setFormState(initialCreateProjectDto);
        setFiles([]);
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="metadata.authorName"
                    placeholder="Author Name"
                    value={formState.metadata.authorName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="metadata.email"
                    placeholder="Email"
                    value={formState.metadata.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.college"
                    placeholder="College"
                    value={formState.metadata.college}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.title"
                    placeholder="Project Title"
                    value={formState.metadata.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    name="metadata.description"
                    placeholder="Project Description"
                    value={formState.metadata.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
                <input
                    type="text"
                    name="metadata.stream"
                    placeholder="Stream"
                    value={formState.metadata.stream}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.category"
                    placeholder="Category"
                    value={formState.metadata.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.tags"
                    placeholder="Tags (comma-separated)"
                    value={formState.metadata.tags.join(",")}
                    onChange={(e) =>
                        setFormState((prev) => ({
                            ...prev,
                            metadata: {
                                ...prev.metadata,
                                tags: e.target.value.split(",").map((tag) => tag.trim()),
                            },
                        }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.components"
                    placeholder="Components (comma-separated)"
                    value={formState.metadata.components.join(",")}
                    onChange={(e) =>
                        setFormState((prev) => ({
                            ...prev,
                            metadata: {
                                ...prev.metadata,
                                components: e.target.value.split(",").map((component) => component.trim()),
                            },
                        }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.projectType"
                    placeholder="Project Type"
                    value={formState.metadata.projectType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.projectStatus"
                    placeholder="Project Status"
                    value={formState.metadata.projectStatus}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.appAndPlatforms"
                    placeholder="App and Platforms (comma-separated)"
                    value={formState.metadata.appAndPlatforms?.join(",") || ""}
                    onChange={(e) =>
                        setFormState((prev) => ({
                            ...prev,
                            metadata: {
                                ...prev.metadata,
                                appAndPlatforms: e.target.value.split(",").map((app) => app.trim()),
                            },
                        }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.isFinalYearProject"
                    placeholder="Is Final Year Project"
                    value={(formState.metadata.isFinalYearProject ?? '').toString()}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="file"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <div>
                    {files.map((file) => (
                        <p key={file.name}>{file.name}</p>
                    ))}
                </div>
                <input
                    type="text"
                    name="metadata.projectPdfUrl"
                    placeholder="Project PDF URL"
                    value={formState.metadata.projectPdfUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.blackbookPdfUrl"
                    placeholder="Blackbook PDF URL"
                    value={formState.metadata.blackbookPdfUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.projectUrl"
                    placeholder="Project URL"
                    value={formState.metadata.projectUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="metadata.collaborators"
                    placeholder="Collaborators (comma-separated)"
                    value={formState.metadata.collaborators?.join(",") || ""}
                    onChange={(e) =>
                        setFormState((prev) => ({
                            ...prev,
                            metadata: {
                                ...prev.metadata,
                                collaborators: e.target.value.split(",").map((collaborator) => collaborator.trim()),
                            },
                        }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                />

                {/* Add other fields similarly */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </div>
    )
}
