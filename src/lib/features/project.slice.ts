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
    userFavoriteProjects: IProjectCardProps[];
    userFavoriteProjectsLoading: boolean;
    userFavoriteProjectsError: string | null;
    isFavourite: boolean;
    favoriteCheckLoading: boolean;
    favoriteCheckError: string | null;
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
    userFavoriteProjects: [],
    userFavoriteProjectsLoading: false,
    userFavoriteProjectsError: null,
    isFavourite: false,
    favoriteCheckLoading: false,
    favoriteCheckError: null,
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
            const response = await axios.get(`${BASE_URL}/api/v1/project/user/${userId}`, {
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

export const fetchUserFavoriteProjects = createAsyncThunk<IProjectCardProps[], string, { rejectValue: string }>(
    "project/fetchUserFavoriteProjects",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/project/favorites/${userId}`, {
                withCredentials: true
            });
            return response.data as IProjectCardProps[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch user favorite projects");
            }
            return rejectWithValue("An unknown error occurred while fetching user favorite projects");
        }
    }
);

export const toggleFavouriteProject = createAsyncThunk<
    IProjectCardProps[],
    { projectId: string; userId: string },
    { rejectValue: string }
>("project/toggleFavouriteProject", async ({ projectId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/v1/project/add-to-favorites`, {
            projectId,
            userId,
        });
        return response.data as IProjectCardProps[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to toggle favourite project");
        }
        return rejectWithValue("An unknown error occurred while toggling favourite project");
    }
});

interface CheckFavoriteParams {
    projectId: string;
    userId: string;
}



export const checkFavouriteProject = createAsyncThunk<
    boolean,
    CheckFavoriteParams,
    { rejectValue: string }
>("project/checkFavouriteProject",
    async ({ projectId, userId }, { rejectWithValue }) => {
        if (!projectId || !userId) {
            return rejectWithValue("Project ID and User ID are required");
        }

        try {
            const response = await axios.get<boolean>(
                `${BASE_URL}/api/v1/project/favorites/${userId}/${projectId}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return false;
                }
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to check favourite status"
                );
            }
            return rejectWithValue("An unexpected error occurred while checking favourite status");
        }
    }
);


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        resetFavoriteState: (state) => {
            state.isFavourite = false;
            state.favoriteCheckLoading = false;
            state.favoriteCheckError = null;
        }
    },
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
        builder.addCase(toggleFavouriteProject.pending, (state) => {
            state.userFavoriteProjectsError = null;
            state.userFavoriteProjectsLoading = true;
        })
            .addCase(toggleFavouriteProject.fulfilled, (state, action) => {
                state.userFavoriteProjectsLoading = false;
                state.userFavoriteProjects = action.payload;
            })
            .addCase(toggleFavouriteProject.rejected, (state, action) => {
                state.userFavoriteProjectsError = action.payload || "Failed to toggle favourite project";
                state.userFavoriteProjectsLoading = false;

            });
        builder.addCase(fetchUserFavoriteProjects.pending, (state) => {
            state.userFavoriteProjectsLoading = true;
            state.userFavoriteProjectsError = null;
        })
            .addCase(fetchUserFavoriteProjects.fulfilled, (state, action) => {
                state.userFavoriteProjectsLoading = false;
                state.userFavoriteProjects = action.payload;
            })
            .addCase(fetchUserFavoriteProjects.rejected, (state, action) => {
                state.userFavoriteProjectsLoading = false;
                state.userFavoriteProjectsError = action.payload || "Failed to fetch user favorite projects";
            });

        builder
            .addCase(checkFavouriteProject.pending, (state) => {
                state.favoriteCheckLoading = true;
                state.favoriteCheckError = null;
            })
            .addCase(checkFavouriteProject.fulfilled, (state, action) => {
                state.favoriteCheckLoading = false;
                state.isFavourite = action.payload;
            })
            .addCase(checkFavouriteProject.rejected, (state, action) => {
                state.favoriteCheckLoading = false;
                state.favoriteCheckError = action.payload || "Failed to check favourite status";
            });

    },
});
export const { resetFavoriteState } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
