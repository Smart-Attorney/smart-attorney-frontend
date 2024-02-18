export class DAO {
	static async getArray(key: string): Promise<[]> {
		return await JSON.parse(localStorage.getItem(key) as string);
	}

	static async setArray(key: string, data: unknown[]): Promise<void> {
		localStorage.setItem(key, JSON.stringify(data));
	}
}
