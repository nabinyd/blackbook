'use client';
import { useState } from 'react';
import { IProjectCardProps } from '@/lib/type/IProjectCardProps';
import { Button } from '@/components/ui/button';

export default function ProjectCard(props: IProjectCardProps) {
    const {
        title,
        description,
        authorName,
        college,
        tags,
        projectStatus,
        isFinalYearProject,
        imagesUrl,
        viewCount,
        upVotes,
        downVotes,
        projectUrl,
    } = props;

    // Local state for upvotes and downvotes (can be modified based on your logic)
    const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
    const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);

    // Handle upvote
    const handleUpvote = () => {
        setCurrentUpVotes(currentUpVotes + 1);
    };

    // Handle downvote
    const handleDownvote = () => {
        setCurrentDownVotes(currentDownVotes + 1);
    };

    return (
        <div className="project-card bg-gray-900 shadow-md rounded-md overflow-hidden p-3 transform transition-all duration-150 hover:scale-[1.01]">
            {/* Project Image */}
            <div className="project-image w-full h-24 bg-cover bg-center rounded-md mb-2" style={{ backgroundImage: `url(${imagesUrl[0]})`,  width: "auto" }} />

            {/* Project Content */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-100 truncate">{title}</h3>
                <p className="text-xs text-gray-400 truncate">{description}</p>

                {/* Project Meta */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{authorName} | {college}</span>
                    <span
                        className={`px-2 py-1 rounded-full ${isFinalYearProject ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                    >
                        {isFinalYearProject ? 'Final Year' : 'Ongoing'}
                    </span>
                </div>

                {/* Project Status */}
                <div className="mt-1">
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${projectStatus === 'accepted'
                            ? 'bg-blue-600 text-white'
                            : projectStatus === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-400 text-white'
                            }`}
                    >
                        {projectStatus}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>

                {/* Upvote/Downvote and View Count */}
                <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
                    {/* Upvote/Downvote */}
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleUpvote}
                            className="bg-gray-600 text-gray-200 py-1 px-2 rounded-full hover:bg-gray-500 transition-all"
                        >
                            Upvote
                        </Button>
                        <span>{currentUpVotes}</span>

                        <Button
                            onClick={handleDownvote}
                            className="bg-gray-600 text-gray-200 py-1 px-2 rounded-full hover:bg-gray-500 transition-all"
                        >
                            Downvote
                        </Button>
                        <span>{currentDownVotes}</span>
                    </div>

                    {/* View Count */}
                    <div className="text-xs text-gray-500">
                        <span>{viewCount} Views</span>
                    </div>
                </div>

                {/* Project Link */}
                <div className="mt-2">
                    <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xs">
                        View Project Details
                    </a>
                </div>
            </div>
        </div>

    );
}
