import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProjectCardProps } from "../type/project/IProjectCardProps";
import { BASE_URL } from "@/constant/constant";
import { IProjectResponseProps } from "../type/project/IProjectDescription.types";


interface ProjectState {
    projects: IProjectCardProps[];
    projectLoading: boolean;
    projectError: string | null;
    description: IProjectResponseProps | null;
    descriptionLoading: boolean;
    descriptionError: string | null;
    latestProjects: IProjectCardProps[];
    latestProjectsLoading: boolean;
    latestProjectsError: string | null;
    voteLoading: boolean;
    voteError: string | null;
    viewCountLoading: boolean;
    viewCountError: string | null;
    userProjects: IProjectCardProps[];
    userProjectsLoading: boolean;
    userProjectsError: string | null;
}


const initialState: ProjectState = {
    projects: [],
    projectLoading: false,
    projectError: null,
    description: null,
    descriptionLoading: false,
    descriptionError: null,
    latestProjects: [],
    latestProjectsLoading: false,
    latestProjectsError: null,
    voteLoading: false,
    voteError: null,
    viewCountLoading: false,
    viewCountError: null,
    userProjects: [],
    userProjectsLoading: false,
    userProjectsError: null,
};


export const fetchProjectsFromAPI = createAsyncThunk<IProjectCardProps[], void, { rejectValue: string }>(
    "project/fetchProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/project`);
            return response.data as IProjectCardProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch projects");
            }
            return rejectWithValue("An unknown error occurred while fetching projects");
        }
    }
);


export const fetchProjectDescriptionWithViewCount = createAsyncThunk<
    IProjectResponseProps,
    string,
    { rejectValue: string }
>("project/fetchProjectDescriptionWithViewCount", async (id, { rejectWithValue, dispatch }) => {
    try {
        await dispatch(updateProjectViewCount(id));

        const response = await axios.get(`${BASE_URL}/api/v1/project/${id}`);
        return response.data as IProjectResponseProps;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch project description after updating view count");
        }
        return rejectWithValue("An unknown error occurred while updating view count and fetching project description");
    }
});

export const fetchlatestProjects = createAsyncThunk<IProjectCardProps[], void, { rejectValue: string }>(
    "project/fetchLatestProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/project/latest`);
            return response.data as IProjectCardProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch latest projects");
            }
            return rejectWithValue("An unknown error occurred while fetching latest projects");
        }
    }
);

export const updateProjectVote = createAsyncThunk<
    IProjectCardProps,
    { id: string; isUpvote: boolean },
    { rejectValue: string }
>("project/updateProjectVote", async ({ id, isUpvote }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/v1/project/${id}/vote`, {
            upvote: isUpvote,
        });



        return response.data as IProjectCardProps;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to update vote");
        }
        return rejectWithValue("An unknown error occurred while updating vote");
    }
});


export const updateProjectViewCount = createAsyncThunk<IProjectCardProps, string, { rejectValue: string }>(
    "project/updateProjectViewCount",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/v1/project/${id}/viewcount`);
            return response.data as IProjectCardProps;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update view count");
            }
            return rejectWithValue("An unknown error occurred while updating view count");
        }
    }
);

export const fetchUserProjects = createAsyncThunk<IProjectCardProps[], string, { rejectValue: string }>(
    "project/fetchUserProjects",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/project/user/${userId}`,{
                withCredentials: true
            });
            return response.data as IProjectCardProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch user projects");
            }
            return rejectWithValue("An unknown error occurred while fetching user projects");
        }
    }
);



const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchProjectsFromAPI.pending, (state) => {
                state.projectLoading = true;
                state.projectError = null;
            })
            .addCase(fetchProjectsFromAPI.fulfilled, (state, action) => {
                state.projectLoading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjectsFromAPI.rejected, (state, action) => {
                state.projectLoading = false;
                state.projectError = action.payload || "Failed to fetch projects";
            })


            .addCase(fetchProjectDescriptionWithViewCount.pending, (state) => {
                state.descriptionLoading = true;
                state.descriptionError = null;
            })
            .addCase(fetchProjectDescriptionWithViewCount.fulfilled, (state, action) => {
                state.descriptionLoading = false;
                state.description = action.payload;
            })
            .addCase(fetchProjectDescriptionWithViewCount.rejected, (state, action) => {
                state.descriptionLoading = false;
                state.descriptionError = action.payload || "Failed to fetch project description";
            })


            .addCase(fetchlatestProjects.pending, (state) => {
                state.latestProjectsLoading = true;
                state.latestProjectsError = null;
            })
            .addCase(fetchlatestProjects.fulfilled, (state, action) => {
                state.latestProjectsLoading = false;
                state.latestProjects = action.payload;
            })
            .addCase(fetchlatestProjects.rejected, (state, action) => {
                state.latestProjectsLoading = false;
                state.latestProjectsError = action.payload || "Failed to fetch latest projects";
            });


        builder.addCase(updateProjectVote.pending, (state) => {
            state.voteError = null;
        })
            .addCase(updateProjectVote.fulfilled, (state, action) => {

                const updatedProject = action.payload;


                const projectIndex = state.projects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (projectIndex !== -1) {
                    state.projects[projectIndex] = {
                        ...state.projects[projectIndex],
                        ...updatedProject
                    };
                }


                const latestProjectIndex = state.latestProjects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (latestProjectIndex !== -1) {
                    state.latestProjects[latestProjectIndex] = {
                        ...state.latestProjects[latestProjectIndex],
                        ...updatedProject
                    };
                }


                const userProjectIndex = state.userProjects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (userProjectIndex !== -1) {
                    state.userProjects[userProjectIndex] = {
                        ...state.userProjects[userProjectIndex],
                        ...updatedProject
                    };
                }
            })
            .addCase(updateProjectVote.rejected, (state, action) => {
                state.projectError = action.payload || "Failed to update vote";
            });


        builder.addCase(updateProjectViewCount.pending, (state) => {
            state.projectError = null;
        })
            .addCase(updateProjectViewCount.fulfilled, (state, action) => {

                const updatedProject = action.payload;


                const projectIndex = state.projects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (projectIndex !== -1) {
                    state.projects[projectIndex] = {
                        ...state.projects[projectIndex],
                        ...updatedProject
                    };
                }


                const latestProjectIndex = state.latestProjects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (latestProjectIndex !== -1) {
                    state.latestProjects[latestProjectIndex] = {
                        ...state.latestProjects[latestProjectIndex],
                        ...updatedProject
                    };
                }


                const userProjectIndex = state.userProjects.findIndex(
                    (project) => project.id === updatedProject.id
                );
                if (userProjectIndex !== -1) {
                    state.userProjects[userProjectIndex] = {
                        ...state.userProjects[userProjectIndex],
                        ...updatedProject
                    };
                }
            })
            .addCase(updateProjectViewCount.rejected, (state, action) => {
                state.projectError = action.payload || "Failed to update view count";
            });


        builder.addCase(fetchUserProjects.pending, (state) => {
            state.userProjectsLoading = true;
            state.userProjectsError = null;
        })
            .addCase(fetchUserProjects.fulfilled, (state, action) => {
                state.userProjectsLoading = false;
                state.userProjects = action.payload;
            })
            .addCase(fetchUserProjects.rejected, (state, action) => {
                state.userProjectsLoading = false;
                state.userProjectsError = action.payload || "Failed to fetch user projects";
            });
    },
});

export const projectReducer = projectSlice.reducer;
