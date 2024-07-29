// for local backend

import shortUUID, { Translator } from "short-uuid";

export class ShortUuid {
	private shortUuid: Translator;

	constructor() {
		this.shortUuid = shortUUID();
	}

	/**
	 * Generates a random 22 character short uuid
	 * @returns {string} short uuid
	 */
	public newShort(): string {
		return this.shortUuid.generate();
	}

	/**
	 * Translates a regular UUID to a 22 character shortened format
	 * @param {string} uuid
	 * @returns {string} shortened uuid
	 */
	public toShort(uuid: string): string {
		return this.shortUuid.fromUUID(uuid);
	}

	/**
	 * Translates a shortened UUID to a regular 32 character format
	 * @param {string} shortId
	 * @returns {string} uuid
	 */
	public toUUID(shortId: string): string {
		return this.shortUuid.toUUID(shortId);
	}

	/**
	 * Checks a string to see if its a valid short UUID and translates to a valid UUID v4
	 * @param {string}shortId
	 * @returns {boolean} true if valid short uuid
	 */
	public validate(shortId: string): boolean {
		return this.shortUuid.validate(shortId, true);
	}
}
