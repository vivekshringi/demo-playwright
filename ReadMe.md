# Demo Playwright

This project demonstrates end-to-end testing using [Playwright](https://playwright.dev/) for a sample coffee cart web application.

## Features

- Automated UI tests for the coffee cart app
- Parameterized and mock data-driven tests
- Integration with Jira Xray for test reporting
- Test result archiving and reporting scripts
- GitHub Actions CI workflow for automated test runs
- Implemented Prettier and lint for static testing 
- Implemented playwrite linting to cache playwright specific errors 


## Playwright Features implemented in the project

- Test steps are used to write given, when, then as BDD tests  
- Sharding to run the tests on multiple machines and performing parallel execution
- Page Object Model is used to declare all locators for application 
- Fixtures is used to prepare pages with prerequisite
- Running tests parallel or serially mentioning spec files 
- Test Parameterization running a single test with multiple test data set
- Testing websites with modified response
- Defining test as slow and timeout will be 3 times of usual time
- Using random data using fakersjs
- Running tests using slow motion 
- Grouping tests to run tests based on @tags 
- Implementing global setup and tear down to perform pre and post test activities
- Implementing soft assertiong which continues the test execution but fail the test for soft assertion


## Project Structure

```
.
├── data/                   # Test data (JSON)
├── output/                 # Test reports and artifacts
├── pages/                  # Page Object Models
├── tests/                  # Playwright test specs
├── util/                   # Utility scripts (Jira integration, archiving)
├── .github/workflows/      # CI workflows
├── package.json            # NPM scripts and dependencies
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vivekshringi/demo-playwright.git
   cd demo-playwright
   ```

2. Install dependencies:
   ```sh
   npm ci
   ```

3. Set up your `.env` file with Jira credentials (see below).

### Running Tests

Run all Playwright tests:
```sh
npm test
```

Run only E2E tests:
```sh
npm run e2e
```

### Test Reporting & Archiving

After running tests, report results to Jira Xray and archive test results:
```sh
npm run reportToJira
```

### Linting & Formatting

Check code formatting:
```sh
npm run format:check
```

Lint and type-check:
```sh
npm run lint
```

## Jira Integration

To enable Jira Xray reporting, create a `.env` file in the project root with the following variables:

```
JIRA_API_TOKEN=your_jira_api_token
JIRA_URL=your_jira_instance_url
JIRA_PROJECT_KEY=your_project_key
TEST_PLAN_KEY=your_test_plan_key
EMAIL=your_email_address
```

## Continuous Integration

GitHub Actions workflow is configured in `.github/workflows/playwright.yml` to run tests and upload reports on every push or pull request to `main` or `master`.

## Useful Scripts

- `npm run fetch` — Import data from Jira
- `npm run archiveTestResults` — Archive test results
- `npm run reportResultsToXray` — Report results to Jira Xray

## License

This project is licensed under the ISC License.

---

**Author:** [Vivek Shringi](https://github.com/vivekshringi)

