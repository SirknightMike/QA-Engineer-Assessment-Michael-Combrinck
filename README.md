# Playwright E2E Testing Setup

Welcome to the Playwright E2E testing project! Follow the steps below to set up and run the end-to-end (E2E) tests.

---

## Setup Instructions


### Step 1: Install Dependencies

Install the required Node.js dependencies:

- With **npm**:
  ```bash
  npm install
  ```

- Or with **yarn**:
  ```bash
  yarn install
  ```

---

## Running the Tests

### Step 1: Install Playwright Browsers

Install the required Playwright browsers:

```bash
npx playwright install
```

### Step 2: Run Tests

Run the end-to-end tests in UI Mode:

```bash
npm run test:e2e
```

or

```bash
yarn test:e2e
```

### Step 3: Debugging Tests (Optional)

If you need to debug a failing test, use the following command to open Playwright in debug mode:

```bash
npm run test:e2e:debug
```

or

```bash
yarn test:e2e:debug
```

### Step 4: View Test Report (Optional)

After running the tests, you can generate and view the HTML report:

```bash
npm run test:e2e:report
```

or

```bash
yarn test:e2e:report
```

---

## Notes

- Ensure you have **Node.js** (v20 or later) installed on your system.
- If you encounter any issues, try reinstalling dependencies by deleting the `node_modules` folder and running:
  ```bash
  npm install
  ```
  or
  ```bash
  yarn install
  
