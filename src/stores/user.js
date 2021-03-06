import { SatelliteAltOutlined } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { serverUrl } from "config/server";

const initialState = {
    user: {},
    token: "",
    users: [],
    roles: [],
    categories: [],
    tasks: [],
    clients: [],
    status: [],
    teams: [],
    projects: [],
    project: {},
    periority: [],
    isLogged: false,
    userNotFound: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setUserNotFound(state, action) {
            state.userNotFound = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsLogged(state, action) {
            state.isLogged = action.payload;
        },
        setUsers(state, action) {
            state.users = action.payload;
        },
        setCatergories(state, action) {
            state.categories = action.payload;
        },
        setRoles(state, action) {
            state.roles = action.payload;
        },
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        setClients(state, action) {
            state.clients = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setTeams(state, action) {
            state.teams = action.payload;
        },
        setProjects(state, action) {
            state.projects = action.payload;
        },
        setPeriority(state, action) {
            state.periority = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const userAuthentication = createAsyncThunk(
    "user/authentication",
    async ({ username, password }, { dispatch }) => {
        try {
            await axios
                .post(`${serverUrl}/users/signin`, {
                    username,
                    password,
                })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setUserNotFound(false));
                        dispatch(setToken(res.data.jwt));
                        dispatch(setUser(res.data));
                        dispatch(setIsLogged(true));
                    }
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .get(`${serverUrl}/users`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setUsers(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (user, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            console.log(user);
            await axios
                .post(
                    `${serverUrl}/users`,
                    {
                        username: user.username,
                        password: user.password,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone,
                        email: user.email,
                        enable: true,
                        roles: [
                            {
                                id: user.role,
                            },
                        ],
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    dispatch(getUsers());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .delete(`${serverUrl}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    dispatch(getUsers());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getRoles = createAsyncThunk(
    "user/getRoles",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .get(`${serverUrl}/roles`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setRoles(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getTasks = createAsyncThunk(
    "user/getTasks",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .get(`${serverUrl}/task`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log(res.data);
                    dispatch(setTasks(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const createTask = createAsyncThunk(
    "user/createTask",
    async (task, { dispatch, getState }) => {
        const { token } = getState().user;
        console.log(task);
        try {
            await axios
                .post(
                    `${serverUrl}/task`,
                    {
                        name: task.name,
                        description: task.description,
                        startDate: task.startdate,
                        expectedEndDate: task.enddate,
                        project: {
                            id: task.project,
                        },
                        status: {
                            id: task.state,
                        },
                        priority: {
                            id: task.perior,
                        },
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    dispatch(getTasks());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const deleteTask = createAsyncThunk(
    "user/deleteTask",
    async (taskId, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .delete(`${serverUrl}/task/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    dispatch(getTasks());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getCategories = createAsyncThunk(
    "user/getCategories",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        console.log(token);
        try {
            await axios
                .get(`${serverUrl}/categorie`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setCatergories(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const createCategorie = createAsyncThunk(
    "user/createCategorie",
    async (name, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .post(
                    `${serverUrl}/categorie`,
                    {
                        designation: name,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    dispatch(getCategories());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const deleteCategorie = createAsyncThunk(
    "user/deleteCategorie",
    async (categorieId, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .delete(`${serverUrl}/categorie/${categorieId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    dispatch(getCategories());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getClients = createAsyncThunk(
    "user/getClients",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        console.log(token);
        try {
            await axios
                .get(`${serverUrl}/clients`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setClients(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const createClient = createAsyncThunk(
    "user/createClient",
    async (client, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .post(
                    `${serverUrl}/clients`,
                    {
                        nom: client.nom,
                        company: client.company,
                        phone: client.phone,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    dispatch(getClients());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const deleteClient = createAsyncThunk(
    "user/deleteClient",
    async (clientId, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .delete(`${serverUrl}/clients/${clientId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    dispatch(getClients());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getStatus = createAsyncThunk(
    "user/getStatus",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        console.log(token);
        try {
            await axios
                .get(`${serverUrl}/status`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setStatus(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getTeams = createAsyncThunk(
    "user/getTeams",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        console.log(token);
        try {
            await axios
                .get(`${serverUrl}/team`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setTeams(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getProjects = createAsyncThunk(
    "user/getProjects",
    async (device, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .get(`${serverUrl}/project`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatch(setProjects(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const createProject = createAsyncThunk(
    "user/createProject",
    async (project, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .post(
                    `${serverUrl}/project`,
                    {
                        name: project.name,
                        description: project.description,
                        startdate: project.startdate,
                        enddate: project.enddate,
                        expectedenddate: project.expectedend,
                        status: {
                            id: project.state,
                        },
                        categories: {
                            id: project.category,
                        },
                        clients: {
                            id: project.client,
                        },
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    dispatch(getProjects());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const deleteProject = createAsyncThunk(
    "user/deleteProject",
    async (projectId, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .delete(`${serverUrl}/project/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    dispatch(getProjects());
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const getPeriority = createAsyncThunk(
    "user/getPeriority",
    async (periority, { dispatch, getState }) => {
        const { token } = getState().user;
        try {
            await axios
                .get(`${serverUrl}/priority`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log(res.data);
                    dispatch(setPeriority(res.data));
                });
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setUserNotFound(true));
                dispatch(setIsLogged(false));
                dispatch(setToken(""));
            }
            if (e.response.status === 403) {
                dispatch(setToken(""));
                dispatch(setIsLogged(false));
            }
        }
    }
);

export const signOut = createAsyncThunk("user/signOut", async (userId, { dispatch, getState }) => {
    try {
        dispatch(setToken(""));
        dispatch(setIsLogged(false));
    } catch (e) {}
});

// Action creators are generated for each case reducer function
export const {
    setToken,
    setUser,
    setUserNotFound,
    setIsLogged,
    setUsers,
    setRoles,
    setCatergories,
    setTasks,
    setClients,
    setStatus,
    setPeriority,
    setTeams,
    setProjects,
} = userSlice.actions;

export default userSlice.reducer;
