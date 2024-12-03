
# iWebwiser React Boilerplate

This repository contains the boilerplate code for building React applications using **Vite** and **TypeScript**, with state management powered by **React-Redux** and middleware implemented using **Redux Thunk**.

## **Project Structure**

The project follows a clean and modular folder structure to promote scalability and maintainability.

```
public/
src/
  ├── api/                # API call logic
  ├── components/         # Reusable components
  │     ├── Layout/       # Layout-specific components
  │     ├── Todo/         # Todo-related components
  │     ├── UI/           # Common UI components (Buttons, Forms, Modals, etc.)
  ├── hooks/              # Custom React hooks
  ├── interfaces/         # TypeScript interfaces and types
  ├── pages/              # Application pages
  ├── store/              # Redux store and slices
  ├── utility/            # Utility functions
  ├── App.tsx             # Root application component
  ├── main.tsx            # Application entry point
  └── vite-env.d.ts       # TypeScript environment configuration
```

---

## **Technologies Used**

- **Framework**: [Vite](https://vitejs.dev/) for fast development builds
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **State Management**: [React-Redux](https://react-redux.js.org/) with **Thunk** middleware
- **UI Framework**: Custom modular components for scalability
- **Linting**: ESLint for coding standards and error checking

---

## **Setup Instructions**

1. Clone this repository:
   ```bash
   git clone https://github.com/iwebwiser007/iwebwiserReactBoilerPlate.git
   ```

2. Navigate into the project directory:
   ```bash
   cd iwebwiserReactBoilerPlate
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## **Coding Standards**

Follow these coding standards to ensure consistency across the project:

### **1. TypeScript Interfaces**
- Always define interfaces in the `src/interfaces/` directory for props, API responses, and other data structures.
- Example:
  ```ts
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  ```

### **2. Common Components**
- Place reusable UI components (buttons, forms, modals, etc.) in `src/components/UI/`.
- Always import common components from this directory.

### **3. Commenting**
- Add meaningful comments to explain complex logic or important functions.
- Add a comment before each function to describe its purpose and usage.
  ```ts
  // Function to fetch todos from the API
  const fetchTodos = async () => {
    // API call logic here
  };
  ```

### **4. Folder Structure**
- Organize the components into logical directories. Use:
  - `components/` for reusable components
  - `pages/` for route-specific components
  - `store/` for Redux slices and actions
  - `api/` for managing API calls
  - `interfaces/` for TypeScript types and interfaces

### **5. Utility Functions**
- Place common helper functions in the `src/utility/` directory.

### **6. State Management**
- Use **Redux** for state management and **Thunk** for handling async actions.
- Keep actions, reducers, and slices well-structured in the `store/` directory.

### **7. File and Variable Naming**
- Use `camelCase` for variables and functions.
- Use `PascalCase` for component file names and React components.

### **8. Linting**
- Run lint checks before every commit to maintain code quality.
- Use the configured ESLint rules:
  ```bash
  npm run lint
  ```

---

## **Folder Structure Overview**

### **Components**
- `components/Layout`: Contains components specific to the application layout (e.g., headers, sidebars).
- `components/Todo`: Handles todo-related UI components.
- `components/UI`: Contains reusable UI components like buttons, forms, modals, etc.

### **Pages**
- Each page represents a distinct route, stored in `src/pages/`.

### **Store**
- Centralized Redux store:
  - `store/index.ts`: Store configuration
  - `store/slices/`: Redux slices

### **API**
- All API logic resides in the `api/` directory for easy management.

### **Hooks**
- Place custom hooks in the `hooks/` directory.

### **Interfaces**
- Define all TypeScript interfaces and types in the `interfaces/` directory.

---

## **Best Practices**

- Keep all reusable code modular and consistent.
- Use comments to document your logic.
- Separate concerns: Keep logic and UI independent.
- Write tests for critical business logic.

---
