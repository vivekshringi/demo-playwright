import { test } from '@playwright/test';

test("Verify getting payment link via payment pop up", async ({}, testInfo) => {
  //Adding Xray properties
  testInfo.annotations.push({ type: "test_key", description: "SCRUM-40" });
  testInfo.annotations.push({
    type: "requirement",
    description: "SCRUM-1",
  });
  testInfo.annotations.push({
    type: "tags",
    description: "automated, Playwright",
  });
});

