const generateId = (length = 6) => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let id = "";
	for (let i = 0; i < length; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return id;
};

const getInitials = (name: string) => {
	return (name || "")
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part[0])
		.join("")
		.toUpperCase();
};

export { generateId, getInitials };
