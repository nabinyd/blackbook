'use client';
import { useState } from 'react';
import { IProjectCardProps } from '@/lib/type/project/IProjectCardProps';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { updateProjectVote } from '@/lib/features/project.slice';
import Link from 'next/link';
import { Routes } from '@/config/Routes';
import { ArrowUpCircle, ArrowDownCircle, Eye, ExternalLink, Users } from 'lucide-react';
import Image from 'next/image';
import { ProjectStatusRole } from '@/shared/enum/Role';

export default function ProjectCard(props: IProjectCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isVoting, setIsVoting] = useState(false);

    const handleVote = async (id: string, isUpvote: boolean) => {
        if (isVoting) return;
        setIsVoting(true);
        try {
            await dispatch(updateProjectVote({ id, isUpvote })).unwrap();
        } catch (error) {
            console.error('Failed to update vote:', error);
        } finally {
            setIsVoting(false);
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-300 p-1 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
            {/* User Header Section */}
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={props.userId.metadata.profilePicUrl}
                            alt="Profile Picture"
                            fill
                            sizes="(max-width: 768px) 32px, (max-width: 1200px) 64px, 100px"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">@{props.userId.username}</span>
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                            <Users className="w-3 h-3" />
                            <span>{props.userId.metadata.followers?.length} followers</span>
                        </div>
                    </div>
                </div>
                <span className="text-xs text-gray-500">
                    {new Date(props.userId.createdAt).toLocaleDateString()}
                </span>
            </div>

            {/* Image and Status Section */}
            <div className="relative h-32">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${props.imagesUrl[0]})` }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${props.projectStatus === ProjectStatusRole.ACCEPTED ? 'bg-green-100 text-green-800' :
                        props.projectStatus === ProjectStatusRole.PENDING ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                        {props.projectStatus}
                    </span>
                    {props.isFinalYearProject && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            Final Year
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Title and Description */}
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{props.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{props.description}</p>
                </div>

                {/* Author and College */}
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">{props.authorName}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">{props.college}</span>
                </div>

                {/* Category and Stream */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="bg-gray-50 px-2 py-0.5 rounded">{props.category}</span>
                    <span>•</span>
                    <span className="bg-gray-50 px-2 py-0.5 rounded">{props.stream}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {props.tags[0].split(',').slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                            {tag}
                        </span>
                    ))}
                    {props.tags[0].split(',').length > 3 && (
                        <span className="text-xs text-gray-500">+{props.tags[0].split(',').length - 3}</span>
                    )}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => handleVote(props.id, true)}
                            disabled={isVoting}
                            className="h-8 bg-green-50 text-green-600 hover:bg-green-100 px-2"
                        >
                            <ArrowUpCircle className="w-4 h-4 mr-1" />
                            {props.upVotes}
                        </Button>
                        <Button
                            onClick={() => handleVote(props.id, false)}
                            disabled={isVoting}
                            className="h-8 bg-red-50 text-red-600 hover:bg-red-100 px-2"
                        >
                            <ArrowDownCircle className="w-4 h-4 mr-1" />
                            {props.downVotes}
                        </Button>
                        <div className="flex items-center text-gray-500 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {props.viewCount}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={Routes.PROJECT_DESCRIPTION(props.id)}
                            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                        >
                            Details
                        </Link>
                        <Link
                            href={props.projectUrl}
                            target="_blank"
                            className="text-xs flex items-center px-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                        >
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}