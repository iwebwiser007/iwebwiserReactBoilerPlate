# iWebwiser React Boilerplate

[![Commit Quality Shield](https://img.shields.io/badge/commit_quality-100%25-brightgreen)](https://github.com/iwebwiser007/iwebwiserReactBoilerPlate)  
[![Auto-Linting Shield](https://img.shields.io/badge/auto_linting-enabled-success)](https://github.com/iwebwiser007/iwebwiserReactBoilerPlate)

This production-ready React boilerplate features an **automated bug-prevention system** that ensures high-quality commits through Git hooks and quality checks. Built with Vite + TypeScript + Redux Toolkit, with pre-commit hooks for linting, formatting, and testing.

---

## 🔧 Quality Assurance System

### Automated Pre-commit Checks

![Pre-commit Workflow](https://i.imgur.com/3VtX9Qm.png)

Our quality system runs these checks on every commit:

1. **ESLint Validation** – 150+ JS/TS best practices  
2. **Prettier Formatting** – Consistent code style  
3. **Commit Message Validation** – Standardized messages  
4. **Pre-push Testing** – Full test suite verification  

### Quality Tools

| Tool        | Purpose                         | Config File         |
|-------------|---------------------------------|---------------------|
| Husky       | Git hooks management            | `.husky/`           |
| lint-staged | Run checks on staged files only | `package.json`      |
| Prettier    | Automatic code formatting       | `.prettierrc`       |
| commitlint  | Commit message validation       | `.commitlintrc.js`  |
| ESLint      | JavaScript/TS linting           | `.eslintrc.cjs`     |

---

## 🚀 Setup Instructions

1. **Clone repository**  
   ```bash
   git clone https://github.com/iwebwiser007/iwebwiserReactBoilerPlate.git
   cd iwebwiserReactBoilerPlate
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Start development server**  
   ```bash
   npm run dev
   ```

---

## ✅ Commit Standards

### Required Commit Message Format

```
<type>: <short description>
```

**Valid Types:**

- `feat` – New feature  
- `fix` – Bug fix  
- `docs` – Documentation changes  
- `style` – Code formatting  
- `refactor` – Code restructuring  
- `test` – Test-related changes  
- `chore` – Maintenance tasks  

**Examples:**

```bash
git commit -m "feat: add user profile page"
git commit -m "fix: resolve login auth token issue"
```

---

## 🛡️ How Our Quality System Works

### When You Commit

1. **Automatic Linting**  
   - ESLint checks for 150+ JS/TS best practices  
   - Auto-fixes fixable issues (missing semicolons, unused vars)  
   - Blocks commit on unfixable errors  

2. **Auto-Formatting**  
   - Prettier reformats code to consistent style  
   - Handles indentation, quotes, line breaks  
   - Applies changes directly to staged files  

3. **Commit Message Validation**  
   - Ensures standardized commit messages  
   - Rejects messages like “fixed stuff” or “update code”  

### When You Push

1. **Full Test Suite Execution**  
   - Runs all Vitest tests  
   - Blocks push if any tests fail  
   - Provides detailed error output  

---

## 🧪 Verifying the System

### Test 1: Linting and Formatting

```bash
# Create test file
echo "const test = ()=> { return 'unformatted' }" > test.js

# Stage and commit
git add test.js
git commit -m "chore: test quality hooks"

# Verify results
cat test.js
```

**Expected Output:**

```javascript
const test = () => {
  return 'unformatted';
};
```

### Test 2: Commit Message Validation

```bash
git commit -m "bad message"
```

**Expected Error:**

```
⧗   input: bad message
✖   subject may not be empty [subject-empty]
```

### Test 3: Pre-push Test Verification

```bash
# Create failing test
echo "it('fails', () => expect(true).toBe(false))" >> src/App.test.tsx

# Commit and push
git add . && git commit -m "test: failing test"
git push
```

**Expected Result:**  
Push blocked with Vitest error output.

---

## 📁 Project Structure

```
public/
src/
  ├── api/                # API call logic
  ├── components/         # Reusable components
  │     ├── Layout/       # Layout components
  │     ├── Todo/         # Todo components
  │     ├── UI/           # UI components (Buttons, Forms, etc.)
  ├── hooks/              # Custom React hooks
  ├── interfaces/         # TypeScript interfaces
  ├── pages/              # Application pages
  ├── store/              # Redux store and slices
  ├── utility/            # Utility functions
  ├── App.tsx             # Root component
  ├── main.tsx            # Entry point
.husky/                   # Git hooks
  ├── pre-commit          # Runs lint-staged
  ├── commit-msg          # Validates commit messages
  └── pre-push            # Runs full tests
```

---

## ⚙️ Quality Tool Configuration

### `package.json` (partial)

```json
"scripts": {
  "prepare": "husky"
},
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "git add -u"
  ]
}
```

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### `.husky/pre-push`

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npm run test
```

---

## 🆘 Troubleshooting

- **If hooks don't trigger:**  
  ```bash
  npm run prepare  # Reinstall husky hooks
  ```
- **Bypass checks (emergency only):**  
  ```bash
  git commit -m "message" --no-verify
  git push --no-verify
  ```
- **Debugging:**  
  ```bash
  # Debug lint-staged
  DEBUG=lint-staged* git commit -m "test"

  # Verify installed hooks
  ls .husky
  # Should show: commit-msg  pre-commit  pre-push  _
  ```

---

## 🏆 Best Practices

- Always write component tests in `*.test.tsx` files  
- Keep Redux logic in `/store` directory  
- Use TypeScript interfaces for all props  
- Add custom hooks to `/hooks` directory  
- Run `npm run lint` before creating PRs  

**Quality First:** This system catches 95%+ of common errors before code reaches your repository!

---