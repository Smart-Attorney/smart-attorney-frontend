class DAO {
	static getArray(key: string) {
		return JSON.parse(localStorage.getItem(key) as string);
	}

	static setArray(key: string, data: unknown) {
		localStorage.setItem(key, JSON.stringify(data));
	}
}

export default DAO;
