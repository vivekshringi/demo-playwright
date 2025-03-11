import { test as base } from "@playwright/test";

type MyFixtures = {
};

export const test = base.extend<MyFixtures>({
});

export { expect } from "@playwright/test";
