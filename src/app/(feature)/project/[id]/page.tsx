"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDescriptionWithViewCount } from "@/lib/features/project.slice";
import { RootState, AppDispatch } from "@/lib/store";
import { IProjectResponseProps } from "@/lib/type/project/IProjectDescription.types";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/Loading";
import { Eye, Clock, User, Share2, BookmarkPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface Params {
    id: string;
}

export default function ProjectDescription({ params: paramsPromise }: { params: Promise<Params> }) {
    const dispatch = useDispatch<AppDispatch>();
    const params = React.use(paramsPromise);
    const { toast } = useToast();
    const { id } = params;

    const { description, descriptionLoading, descriptionError } = useSelector(
        (state: RootState) => state.project
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProjectDescriptionWithViewCount(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (descriptionError) {
            console.error("Failed to fetch project description:", descriptionError);
            toast({
                title: "Error",
                description: descriptionError,
                variant: "destructive",
            });
        }
    }, [descriptionError, toast]);

    const { metadata } = description as IProjectResponseProps || {};

    if (descriptionLoading) {
        return <Loading />;
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {description && (
                <>
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                        <div className="max-w-7xl mx-auto px-6">
                            <h1 className="text-5xl font-bold mb-4">{metadata.title}</h1>
                            <div className="flex items-center space-x-4 text-gray-200">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span>{metadata.authorName}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{formatDate(new Date(metadata.createdAt))}</span>
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-2" />
                                    <span>{metadata.viewCount} views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Left Column - Images */}
                            <div className="lg:col-span-2">
                                <Card className="mb-8">
                                    <CardContent className="p-6">
                                        <Carousel>
                                            <CarouselContent>
                                                {metadata.imagesUrl.map((image, index) => (
                                                    <CarouselItem key={index}>
                                                        <Image
                                                            src={image}
                                                            alt={metadata.title}
                                                            width={800}
                                                            height={500}
                                                            layout="responsive"
                                                            className="object-cover"
                                                        />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </Carousel>
                                    </CardContent>
                                </Card>

                                {/* Description */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {metadata.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Details */}
                            <div>
                                <Card className="sticky top-6">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between mb-6">
                                            <Button className="flex-1 mr-2">
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Share
                                            </Button>
                                            <Button className="flex-1 ml-2">
                                                <BookmarkPlus className="w-4 h-4 mr-2" />
                                                Save
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Categories</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <Badge >{metadata.category}</Badge>
                                                    <Badge >{metadata.stream}</Badge>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {metadata.tags?.map((tag, index) => (
                                                        <Badge key={index} >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {metadata.projectPdfUrl && (
                                                <Button className="w-full">
                                                    Download Project PDF
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}