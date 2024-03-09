export function formatDate(date: Date | string) {
	return new Date(date).toLocaleString("default", {
		month: "short",
		year: "numeric",
	});
}
