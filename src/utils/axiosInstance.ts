import axios from "axios";
import config from "./config";

const apiRequest = (service: "baseUrl") => {
	const axiosInstance = axios.create({
		baseURL: `${config[service]}`,
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			const accessToken = localStorage.getItem("@accesstoken");
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			config.headers["Content-Type"] = "application/json";
			config.headers["Accept"] = "application/json";
			return config;
		},
		(error) => Promise.reject(error)
	);
	return axiosInstance;
};

export { apiRequest };
