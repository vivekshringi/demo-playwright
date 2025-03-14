import { test as base } from "@playwright/test";

type MyFixtures = object;

export const test = base.extend<MyFixtures>({});

export { expect } from "@playwright/test";
