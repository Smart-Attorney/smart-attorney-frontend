// for local backend

import { v7 } from "uuid";

export class Uuid {
	private uuid;

	constructor() {
		this.uuid = v7;
	}

	/**
	 * Creates a version 7 Unix Epoch time-based UUID
	 * @returns {string} v7 UUID
	 */
	public generate(): string {
		return this.uuid();
	}

	/**
	 * Checks a string to see if its a valid uuid
	 * @param {string} uuid
	 * @returns {boolean} true if valid uuid
	 */
	public validate(uuid: string): boolean {
		return this.validate(uuid);
	}
}
