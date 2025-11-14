import { toast } from "sonner";

const displayError = (error: any, display?: boolean) => {
	let status = error?.response?.status;
	let message;
	if (error?.response?.data?.message) {
		message = error.response.data.message;
	} else if (status === 500) {
		message = "Internal Server Error";
	} else if (status === 400) {
		message = "Bad Request";
	} else if (status === 410) {
		message = "Resource not available";
	} else if (status === 504) {
		message = "Timeout Error";
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = `Server Error`;
	}
	if (display) {
		toast.error("Error", {
			description: message,
			position: "top-right",
		});
	}
	return message;
};

const displaySuccess = (title: string, desc: string) => {
	toast.success(title, { description: desc, position: "top-right" });
	return "";
};

export { displayError, displaySuccess };
