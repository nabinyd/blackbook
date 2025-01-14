import { ProjectStatusRole } from '@/shared/enum/Role';

export interface CreateProjectDto {
    userId: string;
    metadata: {
        authorName: string;
        email: string;
        college: string;
        title: string;
        description: string;
        stream: string;
        category: string;
        tags: string[];
        components: string[];
        projectType: string;
        projectStatus: ProjectStatusRole;
        appAndPlatforms: string[];
        isFinalYearProject: boolean;
        imagesUrl: string[];
        projectPdfUrl: string;
        blackbookPdfUrl: string;
        viewCount: number;
        projectUrl: string;
        collaborators: string[];
        upVotes: number;
        downVotes: number;
    };
}
