// for local backend

import { parse, v7, validate, version } from "uuid";

export class Uuid {
	constructor() {}

	/**
	 * Creates a version 7 Unix Epoch time-based UUID
	 * @returns {string} v7 UUID
	 */
	public generate(): string {
		return v7();
	}

	/**
	 * Checks a UUID string to see if its a valid UUID
	 * @param {string} uuid
	 * @returns {boolean} true if valid uuid
	 */
	public validate(uuid: string): boolean {
		return validate(uuid);
	}

	/**
	 * Checks the RFC version of a UUID string
	 * @param {string} uuid
	 * @returns {number} RFC version
	 */
	public version(uuid: string): number {
		return version(uuid);
	}

	/**
	 * Checks if UUID is a valid UUID and is RFC version 7
	 * @param {string} uuid
	 * @returns {boolean} true if valid uuid and version 7
	 */
	public isValid(uuid: string): boolean {
		const isUuid = validate(uuid);
		const isV7 = version(uuid) === 7;
		return isUuid && isV7;
	}

	/**
	 * Converts UUIDv7 to UTC Date string
	 *
	 * Source: https://gist.github.com/wllmsash/bcb337ce0662ed044012e2d7170f7ed0#file-uuidv7-get-timestamp-ts
	 * @param {string} uuid
	 * @returns {string} UTC Date string
	 */
	public toUtcDate(uuid: string): string {
		// 1704067200000 msecs unix epoch, Monday 01 Jan 2024 00:00:00 GMT
		const timestampBytes = new Uint8Array(8);
		timestampBytes.set(new Uint8Array(parse(uuid).buffer.slice(0, 6)), 2);
		const timestampMs = new DataView(timestampBytes.buffer).getBigUint64(0, false);
		const localDate = new Date(Number(timestampMs));
		const utcDateString = localDate.toUTCString();
		return utcDateString;
	}
}
