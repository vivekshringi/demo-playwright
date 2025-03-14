import dotenv from "dotenv";
import child_process from "child_process";
dotenv.config();
const exec = child_process.exec;
const token = process.env.JIRA_API_TOKEN;
const baseUrl = process.env.JIRA_URL;
const projectKey = process.env.JIRA_PROJECT_KEY;
const testPlanKey = process.env.TEST_PLAN_KEY;

const command = `curl -H "Content-Type: text/xml" -X POST -H "Authorization: Bearer ${token}" --data @"output/playwright-report/xray-report.xml" ${baseUrl}/api/v2/import/execution/junit?projectKey=${projectKey}&testPlanKey=${projectKey}-${testPlanKey}`;

exec(command, (err, stdout, stderr) => {
  // Important: Exec output is blocked as it also logs the bearer token. In case of local debugging, please uncomment temporarily.
  // if (err) {
  //  console.error(`exec error: ${err}`);
  // }
  console.log(command);
  if (!stderr && !err) {
    console.log(`Report of the test results to Xray was successful (Test plan ID = ${projectKey}-${testPlanKey})`);
  }
  if (stderr) {
    console.error(`Push to Jira XRay stderr: ${stderr}`);
  }
  if (stdout) {
    console.log(`Push to Jira XRay stdout: ${stdout}`);
  }
});
