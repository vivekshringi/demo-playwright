import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.JIRA_API_TOKEN;
const email = "vivek.shringi01@nagarro.com";
const baseUrl = process.env.JIRA_URL;

const encodedCredentials = Buffer.from(`${email}:${token}`).toString("base64");

const JQL_QUERY = 'project = "SCRUM" AND type = Defect ORDER BY created DESC';
const JIRA_URL = `https://${baseUrl}/rest/api/2/search?jql=${encodeURIComponent(JQL_QUERY)}`;

const headers = {
  Authorization: `Basic ${encodedCredentials}`,
  Accept: "application/json",
};

axios
  .get(JIRA_URL, { headers })
  .then((response) => {
    const issues = response.data.issues.map((issue: { key: unknown; fields: { summary: unknown } }) => ({
      issueKey: issue.key,
      summary: issue.fields.summary,
    }));
    console.log(issues);
  })
  .catch((error) => {
    console.error("Error fetching issues:", error.response ? error.response.data : error.message);
  });
