import { fetch } from "@tauri-apps/plugin-http";

export const hasInternet = async () => {
	try {
		const response = await fetch("https://www.google.com", {
			method: "HEAD",
			cache: "no-cache",
		});
		return response.ok;
	} catch (err) {
		return false;
	}
};
