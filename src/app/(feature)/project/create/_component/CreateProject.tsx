'use client';
import { createProject } from '@/lib/features/create.project.slice';
import { AppDispatch, RootState } from '@/lib/store';
import { CreateProjectDto, initialCreateProjectDto } from '@/lib/type/project/ICreateProject.types';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, X } from 'lucide-react';
import { FormField } from './FormField';
import { FileUpload, PdfUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { IDatastoreResponseProps } from '@/lib/type/datastore/Idatastore.props';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TagSelector from './selectedTag';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditor from './TextEditor';


export default function CreateProject() {
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { loading, error } = useSelector((state: RootState) => state.createProject);
    const { datastores } = useSelector((state: RootState) => state.datastoreReducer);

    const [formState, setFormState] = useState<CreateProjectDto>(initialCreateProjectDto);
    const [projectImage, setProjectImage] = useState<File[]>([]);
    const [projectPdf, setProjectPdf] = useState<File[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [streamOptions, setStreamOptions] = useState<string[]>([]);



    const getUniqueValues = (key: keyof IDatastoreResponseProps) => {
        if (!datastores.length) return [];
        if (key === 'categoryList') {
            return Object.keys(datastores[0][key] || {});
        }
        return Array.from(new Set(datastores.flatMap(store => store[key] || [])));
    };



    const categories = getUniqueValues('categoryList');
    const projectTypes = getUniqueValues('projectTypeList');
    const availableTags = getUniqueValues('tagList').filter((tag): tag is string => typeof tag === 'string');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const categoryList = datastores[0].categoryList as { [key: string]: any };
        const streamOptions = Object.values(categoryList[category]);
        setStreamOptions(streamOptions as string[]);

        // Update form state with the selected category
        setFormState(prev => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                category: category,
                // Reset stream when category changes
                stream: ''
            }
        }));
    };

    const handleStreamChange = (stream: string) => {
        // Update form state with the selected stream
        setFormState(prev => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                stream: stream
            }
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name.startsWith("metadata.")) {
            const metadataKey = name.split(".")[1];
            setFormState((prev) => ({
                ...prev,
                metadata: {
                    ...prev.metadata,
                    [metadataKey]: value,
                },
            }));
        }
    };

    // Handle tag selection
    const handleTagSelect = (tag: string) => {
        setFormState((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                tags: prev.metadata.tags.includes(tag)
                    ? prev.metadata.tags.filter((t) => t !== tag)
                    : [...prev.metadata.tags, tag],
            },
        }));
    };

    // Remove individual tag
    const removeTag = (tagToRemove: string) => {
        setFormState((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                tags: prev.metadata.tags.filter((tag) => tag !== tagToRemove),
            },
        }));
    };


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

    const handleArrayInput = (name: string, value: string) => {
        const metadataKey = name.split(".")[1];
        setFormState((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                [metadataKey]: value.split(",").map((item) => item.trim()),
            },
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setProjectImage(prev => [...prev, ...filesArray]);
            e.preventDefault();
        }
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProjectPdf([file]);
            e.preventDefault();
        }
    };



    const editor = useEditor({
        extensions: [StarterKit],
        content: formState.metadata.description,
        onUpdate: ({ editor }) => {
            setFormState((prev) => ({
                ...prev,
                metadata: {
                    ...prev.metadata,
                    description: editor.getHTML(),
                },
            }));
        },
    });

    useEffect(() => {
        if (editor && formState.metadata.description !== editor.getHTML()) {
            editor.commands.setContent(formState.metadata.description);
        }

    }, [formState.metadata.description, editor]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast({
                title: "Error",
                description: "User not found",
                variant: "destructive",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("userId", user.id.toString());

            // Append metadata
            Object.entries(formState.metadata).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formData.append(`metadata.${key}`, value.join(","));
                } else if (value !== null && value !== undefined) {
                    formData.append(`metadata.${key}`, value.toString());
                }
            });

            // Append files
            if (projectImage.length > 0) {
                projectImage.forEach((image) => {
                    formData.append("projectImages", image);
                });
            }

            if (projectPdf && projectPdf.length > 0) {
                formData.append("projectPdf", projectPdf[0]);
            }

            await dispatch(createProject(formData)).unwrap();

            toast({
                title: "Success",
                description: "Project created successfully",
            });

            // Reset form after successful submission
            setFormState(initialCreateProjectDto);
            setProjectImage([]);
            setProjectPdf([]);

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create project",
                variant: "destructive",
            });

        }
    }



    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Create New Project</CardTitle>
                    </CardHeader>
                    <CardContent>


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="space-y-6">

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="Author Name"
                                    name="metadata.authorName"
                                    value={formState.metadata.authorName}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    required
                                />
                                <FormField
                                    label="Email"
                                    name="metadata.email"
                                    type="email"
                                    value={formState.metadata.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>

                            {/* Project Details */}
                            <div className="grid grid-cols-1 gap-6">
                                <FormField
                                    label="Project Title"
                                    name="metadata.title"
                                    value={formState.metadata.title}
                                    onChange={handleChange}
                                    placeholder="Enter project title"
                                    required
                                />
                                <TextEditor value={formState.metadata.description} onChange={(content) => handleSelectChange("metadata.description", content)} />
                            </div>

                            {/* Classification */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Category Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category <span className='text-red-500'>*</span></label>
                                    <Select
                                        value={formState.metadata.category}
                                        onValueChange={handleCategoryChange}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder= "Select a category " />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category, index) => (
                                                <SelectItem key={index} value={category.toString()}>
                                                    {category.toString()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Stream Dropdown */}
                                {selectedCategory && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stream <span className='text-red-500'>*</span></label>
                                        <Select
                                            value={formState.metadata.stream}
                                            onValueChange={handleStreamChange}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a stream" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {streamOptions.map((stream) => (
                                                    <SelectItem key={stream} value={stream}>
                                                        {stream}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Project Type <span className='text-red-500'>*</span></label>
                                    <Select
                                        value={formState.metadata.projectType}
                                        onValueChange={(value) => handleSelectChange("metadata.projectType", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select project type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projectTypes.map((type) => (
                                                <SelectItem key={type.toString()} value={type.toString()}>
                                                    {type.toString()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>

                            {/* Tags and Components */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TagSelector
                                    selectedTags={formState.metadata.tags}
                                    availableTags={availableTags}
                                    onTagSelect={handleTagSelect}
                                    onTagRemove={removeTag}
                                />

                                <FormField
                                    label="Components"
                                    name="metadata.components"
                                    value={formState.metadata.components.join(",")}
                                    onChange={(e) => handleArrayInput("metadata.components", e.target.value)}
                                    placeholder="Enter components (comma-separated)"
                                    required
                                />

                                <FormField
                                    label="Apps and platforms"
                                    name="metadata.appAndPlatforms"
                                    value={formState.metadata.appAndPlatforms?.join(",") || ""}
                                    onChange={(e) => handleArrayInput("metadata.appAndPlatforms", e.target.value)}
                                    placeholder="Enter apps & platforms (comma-separated)"
                                    required
                                />
                                <FormField
                                    label="Collaborators"
                                    name="metadata.collaborators"
                                    value={formState.metadata.collaborators?.join(",") || ""}
                                    onChange={(e) => handleArrayInput("metadata.collaborators", e.target.value)}
                                    placeholder="Enter collaborators (comma-separated)"
                                    required
                                />
                            </div>

                            {/* Create a checkbox to change state of metadat.isfinalyearproject */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">Is Final Year Project? <span className='text-red-500'>*</span></label>
                                <input
                                    type="checkbox"
                                    id="isFinalYearProject"
                                    name="metadata.isFinalYearProject"
                                    value={formState.metadata.isFinalYearProject ? 'true' : 'false'}
                                    onChange={(e) => handleSelectChange("metadata.isFinalYearProject", e.target.checked ? 'true' : 'false')}
                                    required
                                />
                            </div>

                            {/* Files */}
                            <FileUpload files={projectImage} onChange={handleImageChange} />

                            <PdfUpload file={projectPdf} onChange={handlePdfChange} />

                            {/* URLs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="Project URL"
                                    name="metadata.projectUrl"
                                    value={formState.metadata.projectUrl || ''}
                                    onChange={handleChange}
                                    placeholder="Enter project URL"
                                />
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        <div className="flex items-center">
                                            <AlertCircle className="w-6 h-6 mr-2" />
                                            {error}
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="min-w-[150px]"
                                >
                                    {loading ? "Creating..." : "Create Project"}
                                </Button>
                            </div>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
