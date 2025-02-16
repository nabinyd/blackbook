import { ProjectStatusRole } from "@/shared/enum/Role";

export interface ProjectMetadata {
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
    appAndPlatforms?: string[];
    isFinalYearProject?: boolean;
    imagesUrl?: string[];
    projectPdfUrl?: string;
    blackbookPdfUrl?: string;
    viewCount?: number;
    projectUrl?: string;
    collaborators?: string[];
    upVotes?: number;
    downVotes?: number;
}

export interface CreateProjectDto {
    userId: string;
    metadata: ProjectMetadata;
    createdAt?: Date;
    updatedAt?: Date;
    projectImages: File[];
    projectPdf: File[];
}


export const initialCreateProjectDto: CreateProjectDto = {
    userId: "",
    metadata: {
        authorName: "",
        email: "",
        college: "",
        title: "",
        description: "",
        stream: "",
        category: "",
        tags: [],
        components: [],
        projectType: "",
        projectStatus: ProjectStatusRole.PENDING,
        appAndPlatforms: [],
        isFinalYearProject: false,
        imagesUrl: [],
        projectPdfUrl: "",
        blackbookPdfUrl: "",
        viewCount: 150,
        projectUrl: "",
        collaborators: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    projectImages: [],
    projectPdf: [],
};
