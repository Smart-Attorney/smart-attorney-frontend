export class fetchWrapper {
	static getToken() {
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			const token = currentUser;
			return token;
		}
		return "";
	}

	static get(url: string) {
		const options = {
			method: "GET",
			headers: { Authorization: this.getToken() },
		};
		return fetch(url, options);
	}

	static post(url: string, body: unknown) {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: JSON.stringify(body),
		};
		return fetch(url, options);
	}

	static put(url: string, body: unknown) {
		const options = {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: JSON.stringify(body),
		};
		return fetch(url, options);
	}

	static delete(url: string) {
		const options = {
			method: "DELETE",
			headers: { Authorization: this.getToken() },
		};
		return fetch(url, options);
	}
}
