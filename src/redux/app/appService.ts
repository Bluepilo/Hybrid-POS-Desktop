import { apiRequest } from "../../utils/axiosInstance";

const fetchProducts = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/inventory/product/all/shop/${id}?all=true`,
	);
	return data?.data;
};

const fetchCustomers = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/global/customer?category=individual`,
	);
	return data.data;
};

const fetchSubdealers = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/global/customer?category=business`,
	);
	return data?.data;
};

const makeSale = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/inventory/sale/make-sale`,
		obj,
	);
	return data.data;
};

const fetchSaleDetails = async (ref: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/inventory/sale/view/${ref}`,
	);
	return data.data;
};

const customerTypes = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/inventory/sale/customer-types-by-category`,
	);
	return data.data;
};

const appService = {
	fetchProducts,
	fetchCustomers,
	fetchSubdealers,
	customerTypes,
	makeSale,
	fetchSaleDetails,
};

export default appService;
