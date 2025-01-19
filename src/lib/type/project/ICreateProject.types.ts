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
    files?: File[]; // Use `File` for frontend representation of files
}


export const initialCreateProjectDto: CreateProjectDto = {
    userId: "123456789", // Example user ID
    metadata: {
        authorName: "John Doe", // Example author name
        email: "johndoe@example.com", // Example email
        college: "ABC University", // Example college name
        title: "Smart Farming System", // Example project title
        description: "A system leveraging IoT and AI to enhance agricultural productivity and monitor crop health.", // Example description
        stream: "Agriculture and Technology", // Example stream
        category: "IoT and AI", // Example category
        tags: ["IoT", "AI", "Smart Farming", "Agriculture"], // Example tags
        components: ["Raspberry Pi", "Soil Moisture Sensor", "Camera Module"], // Example components
        projectType: "Major Project", // Example project type
        projectStatus: ProjectStatusRole.PENDING, // Example status
        appAndPlatforms: ["Web", "Mobile"], // Example platforms
        isFinalYearProject: true, // Example boolean value
        imagesUrl: [], // Example image URLs
        projectPdfUrl: "https://example.com/project.pdf", // Example project PDF URL
        blackbookPdfUrl: "https://example.com/blackbook.pdf", // Example blackbook PDF URL
        viewCount: 150, // Example view count
        projectUrl: "https://example.com/project", // Example project URL
        collaborators: ["Jane Doe", "Michael Smith"], // Example collaborators
    },
    createdAt: new Date(), // Example created date
    updatedAt: new Date(), // Example updated date
    files: [],
};
