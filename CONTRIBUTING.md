# Contributing to react-snackify

Thank you for your interest in contributing to `react-snackify`! We welcome contributions from the community to make this lightweight, customizable React Snackbar component with Tailwind CSS support even better. This guide outlines how you can contribute, whether through reporting issues, suggesting features, or submitting code.

## How to Contribute

### 1. Reporting Issues

If you encounter a bug or have a feature request, please open an issue on the [GitHub Issues page](https://github.com/poojandhebariya/react-snackify/issues). When submitting an issue, please include:

- A clear and descriptive title.
- A detailed description of the issue or feature request.
- Steps to reproduce the issue (if applicable).
- Any relevant screenshots, code snippets, or error messages.
- Your environment (e.g., React version, browser, Node.js version).

### 2. Suggesting Features

We love hearing ideas for new features! To suggest a feature:

- Open a new issue with the `[Feature Request]` prefix in the title.
- Describe the feature, why it would be useful, and any potential use cases.
- If possible, provide examples or mockups of how the feature could work.

### 3. Contributing Code

To contribute code, follow these steps:

#### Step 1: Fork the Repository

- Fork the `react-snackify` repository on GitHub.
- Clone your fork locally:

```bash
git clone https://github.com/poojandhebariya/react-snackify.git
cd react-snackify
```
#### Step 2: Set Up the Development Environment

Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

Ensure you have Node.js (version 16 or higher) and npm/yarn installed.

#### Step 3: Create a Branch
Create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
```
Use a descriptive branch name, such as fix/bug-description or feature/new-animation.

#### Step 4: Make Changes

Modify the source code in the /src directory.
Follow the coding style and conventions used in the project (e.g., TypeScript, Tailwind CSS, Prettier, ESLint if configured).
Ensure your changes are well-documented, especially for new features or public API changes.
Update or add tests in the /tests directory if your changes affect functionality.
If you modify styles in /src/styles/snack-bar.css, ensure they are compatible with Tailwind CSS.
Keep your changes focused and avoid unrelated modifications.

#### Step 5: Build and Test Your Changes

Run the development build to watch for changes and compile the library in CommonJS and ESM formats:

```bash
npm run dev
```
or
```bash
yarn dev
```

Build the library to ensure it compiles correctly (this also minifies the CSS):

```bash
npm run build
```
or
```bash
yarn build
```
Run tests to ensure your changes don't break existing functionality (if tests are set up):

```bash
npm test
```
or
```bash
yarn test
```
Note: If no tests are currently configured, consider adding unit tests using a framework like Jest to verify your changes.
To test your changes in a real React application, use npm link to link your local react-snackify package to a test project:

In the react-snackify directory, run:
```bash
npm link
```
Create a separate test React project (if you don't already have one):

```bash
npx create-react-app react-snackify-test --template typescript
cd react-snackify-test
```

Link react-snackify to your test project:

```bash
npm link react-snackify
```
Copy the CSS file to your test project (since react-snackify requires the dist/styles/snack-bar.css file):

```bash
cp node_modules/react-snackify/dist/styles/snack-bar.css src/snack-bar.css
```
Then, import the CSS in your test project's index.tsx or App.tsx:
```jsx
import 'react-snackify/dist/styles/snack-bar.css';
```
In your test project, import and use react-snackify as shown in the README to verify your changes. For example:

```jsx
import { SnackbarProvider, useSnackbar } from 'react-snackify';

function App() {
  const { showSnackbar } = useSnackbar();
  return (
    <SnackbarProvider globalPosition="bottom-center">
      <button onClick={() => showSnackbar({ message: 'Test', variant: 'info' })}>
        Show Snackbar
      </button>
    </SnackbarProvider>
  );
}
```

After making changes to react-snackify, run npm run build in the react-snackify directory to rebuild, then restart the test project's development server to see updates.

#### Step 6: Commit Your Changes
Write clear and concise commit messages following the Conventional Commits format, e.g.:
```bash
git commit -m "feat: add new slide-up animation type"
```
#### Step 7: Push and Create a Pull Request
Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```
Create a pull request (PR) on the main react-snackify repository:

Go to the Pull Requests page.
Click "New Pull Request" and select your branch.
Provide a clear title and description for your PR, referencing any related issues (e.g., Fixes #123).
Ensure your PR passes all CI checks (e.g., linting, tests).

#### Step 8: Code Review

Respond to feedback from maintainers or other contributors.
Make any requested changes and push updates to the same branch.
Once approved, your PR will be merged!

### 4. Code Style and Standards

Use TypeScript for type safety.
Follow the existing code structure and naming conventions.
If linting is configured, run npm run lint or yarn lint to check for linting errors before committing.
Ensure styles in /src/styles/snack-bar.css use Tailwind CSS utilities consistently.
Ensure accessibility (e.g., ARIA labels, keyboard navigation) in UI changes.
Write unit tests for new functionality using a testing framework like Jest (if tests are set up).

### 5. Community Guidelines

Be respectful and inclusive in all interactions.
Follow the Code of Conduct (if available).
Provide constructive feedback during code reviews or issue discussions.

## Getting Help
If you have questions or need assistance, feel free to:

Open an issue with the [Question] prefix.
Reach out to the maintainers via GitHub Discussions (if enabled).
Contact the author, Poojan Dhebariya, via the GitHub repository.

## License
By contributing to react-snackify, you agree that your contributions will be licensed under the MIT License.
