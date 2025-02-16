import { IUserProps } from "../user/Iuser.type";

export interface IProjectFeedbackResponseProps {
    id: string;
    projectId: string;
    userId: IUserProps;
    authorName: string;
    email: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface ICreateProjectFeedbackDto {
    projectId: string;
    userId: string;
    authorName: string;
    email: string;
    comment: string;
}