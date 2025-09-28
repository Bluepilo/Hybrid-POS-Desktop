import { apiRequest } from "../../utils/axiosInstance";

const fetchProducts = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/product/all/shop/${id}?all=true`
	);
	return data?.data;
};

const appService = {
	fetchProducts,
};

export default appService;
