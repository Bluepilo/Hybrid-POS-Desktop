import { apiRequest } from "../../utils/axiosInstance";

const login = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/global/auth/login`,
		obj
	);
	return data?.data;
};

const logout = async () => {
	const { data } = await apiRequest("baseUrl").post(
		`/global/auth/logout`,
		{}
	);
	return data?.data;
};

const connectShop = async () => {
	const { data } = await apiRequest("baseUrl").get(`/shop/all?all=true`);
	return data?.data;
};

const authService = {
	login,
	logout,
	connectShop,
};

export default authService;
