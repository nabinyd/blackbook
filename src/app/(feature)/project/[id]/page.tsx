"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDescriptionWithViewCount, toggleFavouriteProject, resetFavoriteState, checkFavouriteProject } from "@/lib/features/project.slice";
import { RootState, AppDispatch } from "@/lib/store";
import { IProjectResponseProps } from "@/lib/type/project/IProjectDescription.types";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/Loading";
import { Eye, Clock, User, Share2, BookmarkPlus, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { createFeedback, fetchFeedbackByProjectId } from "@/lib/features/project.feedback.slice";
import { ICreateProjectFeedbackDto } from "@/lib/type/project/IProjectFeedback.types";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Params {
    id: string;
}

export default function ProjectDescription({ params: paramsPromise }: { params: Promise<Params> }) {
    const dispatch = useDispatch<AppDispatch>();
    const params = React.use(paramsPromise);
    const { toast } = useToast();
    const { id } = params;

    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { description, descriptionLoading, descriptionError, isFavourite, favoriteCheckLoading,
        favoriteCheckError, userFavoriteProjectsLoading } = useSelector(
            (state: RootState) => state.project
        );

    const { feedbacks, loading: feedbackLoading } = useSelector((state: RootState) => state.feedbackReducer);

    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(fetchProjectDescriptionWithViewCount(id));
            dispatch(fetchFeedbackByProjectId(id));

            if (user?.id && isAuthenticated) {
                dispatch(checkFavouriteProject({ projectId: id, userId: user.id.toString() }));

            }
        }
        return () => {
            dispatch(resetFavoriteState());
        };
    }, [id, dispatch, user, isAuthenticated]);

    useEffect(() => {
        if (descriptionError) {
            toast({
                title: "Error",
                description: "Failed to fetch project description",
                variant: "destructive",
            });
        }
    }, [descriptionError, toast]);

    const { metadata } = description as IProjectResponseProps || {};


    const handleProjectPdf = async () => {
        try {
            toast({
                title: "Error",
                description: "project pdf not available",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to download project pdf",
                variant: "destructive",
            });
        }
    }

    if (descriptionLoading || !metadata || feedbackLoading) {
        return <Loading />;
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Success",
                description: "Project URL copied to clipboard",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy project URL to clipboard",
                variant: "destructive",
            });
        }
    };

    const handleFavourite = async () => {
        if (!isAuthenticated) {
            toast({
                title: "Error",
                description: "Please log in to add project to favourites",
                variant: "destructive",
            });
            return;
        }

        if (!user?.id) {
            toast({
                title: "Error",
                description: "User information not available",
                variant: "destructive",
            });
            return;
        }

        try {
            await dispatch(toggleFavouriteProject({
                projectId: id,
                userId: user.id.toString()
            })).unwrap();

            await dispatch(checkFavouriteProject({
                projectId: id,
                userId: user.id.toString()
            })).unwrap();

            toast({
                title: "Success",
                description: isFavourite
                    ? "Project removed from favourites"
                    : "Project added to favourites",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update favourite status",
                variant: "destructive",
            });
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast({
                title: "Error",
                description: "Please enter a comment",
                variant: "destructive",
            });
            return;
        }

        if (!user) {
            toast({
                title: "Error",
                description: "Please log in to submit feedback",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const feedbackData: ICreateProjectFeedbackDto = {
                projectId: id,
                userId: user.id.toString(),
                authorName: user.name,
                email: user.email,
                comment: comment.trim()
            };


            await dispatch(createFeedback(feedbackData)).unwrap();
            setComment("");

            toast({
                title: "Success",
                description: "Feedback submitted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit feedback",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const FeedbackForm = () => {
        if (!user) {
            return (
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <p className="text-center text-gray-500 text-sm">
                            Please log in to leave feedback
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-lg">Add Your Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                        <Textarea
                            placeholder="Share your thoughts about this project..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[80px] text-sm"
                        />
                        <Button
                            type="submit"
                            className="w-full py-2 text-sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Feedback
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {description && (
                <>
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <h1 className="text-3xl font-semibold mb-3">{metadata.title}</h1>
                            <div className="flex items-center space-x-4 text-gray-200 text-sm">
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
                                <div className="flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    <span>{feedbacks.length} feedbacks</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Images and Description */}
                            <div className="lg:col-span-2">
                                <Card className="mt-6">
                                    <CardContent className="p-4">
                                        <Carousel>
                                            <CarouselContent>
                                                {metadata.imagesUrl.map((image, index) => (
                                                    <CarouselItem key={index}>
                                                        <Image
                                                            src={image}
                                                            alt={metadata.title}
                                                            width={200}
                                                            height={200}
                                                            layout="responsive"
                                                            className="object-cover "
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
                                <Card className="mb-6">
                                    <CardContent className="p-4">
                                        <h2 className="text-xl font-semibold mb-3">About This Project</h2>
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {metadata.description}
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Feedback Section */}
                                <FeedbackForm />

                                {/* Feedback List */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Feedbacks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {feedbacks.map((feedback, index) => (
                                            <Card key={index} className="mb-4">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            {feedback.userId?.metadata?.profilePicUrl && feedback.userId.metadata.profilePicUrl.trim() !== "" ? (
                                                                <Avatar>
                                                                    <AvatarImage src={feedback.userId.metadata.profilePicUrl} />
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                                                                    No Image
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className="text-sm font-semibold">{feedback.authorName}</h3>
                                                                <p className="text-gray-500 text-xs">{formatDate(new Date(feedback.createdAt))}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 text-gray-700 text-sm">{feedback.comment}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Details */}
                            <div>
                                <Card className="sticky top-6">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between mb-4">
                                            <Button className="flex-1 mr-2 text-sm" onClick={handleShare}>
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Share
                                            </Button>
                                            <Button
                                                className="flex-1 text-sm"
                                                onClick={handleFavourite}
                                                variant={isFavourite ? "default" : "outline"}
                                                disabled={userFavoriteProjectsLoading}
                                            >
                                                <BookmarkPlus className="w-4 h-4 mr-2" />
                                                {userFavoriteProjectsLoading ? (
                                                    "Updating..."
                                                ) : isFavourite ? (
                                                    "Favourited"
                                                ) : (
                                                    "Favourite"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-xs font-medium text-gray-500">Categories</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <Badge>{metadata.category}</Badge>
                                                    <Badge>{metadata.stream}</Badge>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xs font-medium text-gray-500">Tags</h3>
                                                <div className="flex flex-wrap mt-2">
                                                    {metadata.tags.map((tag, index) => (
                                                        <p key={index}>{tag.split(',').slice(0, 3).map((tag, index) => (
                                                            <Badge key={index} className=" px-2 py-0.5 m-1 rounded text-xs ">
                                                                {tag}
                                                            </Badge>
                                                        ))}</p>
                                                    ))}
                                                </div>
                                            </div>

                                            {metadata.projectPdfUrl && (
                                                <Button onClick={handleProjectPdf} className="w-full text-sm">
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
