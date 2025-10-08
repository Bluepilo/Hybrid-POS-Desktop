import { apiRequest } from "../../utils/axiosInstance";

const fetchProducts = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/product/all/shop/${id}?all=true`
	);
	return data?.data;
};

const fetchCustomers = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/customer/all?page=1&limit=1000&shopId=${id}`
	);
	return data?.data;
};

const fetchSubdealers = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subdealer/all?page=1&limit=1000&shopId=${id}`
	);
	return data?.data;
};

const appService = {
	fetchProducts,
	fetchCustomers,
	fetchSubdealers,
};

export default appService;
