export class DAO {
	static async getArray(key: string): Promise<[]> {
		return await JSON.parse(localStorage.getItem(key) as string);
	}

	static async setArray(key: string, data: unknown[]): Promise<boolean> {
		await localStorage.setItem(key, JSON.stringify(data));
		return true;
	}
}
