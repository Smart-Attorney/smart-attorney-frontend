import { describe, expect, test } from "vitest";
import { DateUtils } from "./date-utils";

describe("DateUtils", () => {
	const unixDate: number = 1608872400000; // milliseconds

	test("formatToMDY", () => {
		expect(DateUtils.formatToMDY(unixDate)).toBe("12/25/20");
	});

	test("formatToYMD", () => {
		expect(DateUtils.formatToYMD(unixDate)).toBe("2020-12-25");
	});

	test("empty date", () => {
		expect(DateUtils.formatToYMD(0)).toBe("");
	});
});
