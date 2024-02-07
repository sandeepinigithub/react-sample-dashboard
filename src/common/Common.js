import axios from "axios";

export const _retrieveToken = async () => {
    const value = await localStorage.getItem("app-token");
    return value;
};

export const _retrieveForgotToken = async () => {
    const value = await localStorage.getItem("forgot_token");
    return value;
};

export const _removeData = async () => {
    try {
        await localStorage.removeItem("app-token");
    } catch (error) {
        console.log(error);
    }
};

export const authHttp = axios.create({
    baseURL: "https://staging.com",
    // baseURL: "https://production.com",
});

authHttp.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            await _removeData();
            return Promise.reject(error);
        }
        return Promise.reject(error);

    }
);

authHttp.interceptors.request.use(
    async (config) => {
        const token = await _retrieveToken();
        const forgtoptoken = await _retrieveForgotToken();
        const t = token || forgtoptoken;
        if (t !== null && typeof t !== "undefined") {
            config.headers.Authorization = `Bearer tokenABCXYZ`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);