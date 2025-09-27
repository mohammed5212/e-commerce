# Copilot Instructions for e-commerce/frontend

## Project Overview
- **Stack:** React (with Vite), Redux Toolkit, React Router, Axios, Tailwind CSS
- **Structure:** Modular, feature-based with clear separation for API, components, context, hooks, pages, and routes.
- **Purpose:** E-commerce frontend with authentication, cart, order, and product flows.

## Key Architectural Patterns
- **Routing:** All routes are defined in `src/routes/AppRoutes.jsx` using React Router v6+.
- **State Management:** Uses Redux Toolkit (see `src/app/store.js`) for cart state. Auth state is managed via React Context (`src/context/AuthContext.jsx`).
- **API Layer:** All API calls are abstracted in `src/api/` (e.g., `authApi.js`, `cartApi.js`). Use these modules for network requests.
- **Component Organization:**
  - `components/common/` for UI primitives (e.g., `Button`, `Loader`)
  - `components/forms/` for form fields (e.g., `InputField`)
  - `components/layout/` for layout elements (e.g., `Header`, `Navbar`)
- **Pages:** Each major feature (Auth, Cart, Orders, etc.) has its own folder in `src/pages/`.
- **Styling:** Tailwind CSS is used throughout. Global styles in `src/styles/global.css`.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (runs Vite)
- **Build for Production:** `npm run build`
- **Lint:** `npm run lint` (uses ESLint with custom config in `eslint.config.js`)
- **Preview Production Build:** `npm run preview`

## Project-Specific Conventions
- **API URLs:** Hardcoded to `http://localhost:3000/api/` in API modules. Update as needed for deployment.
- **Auth:**
  - Auth state is persisted in `localStorage` (`token`, `user`).
  - Use `AuthContext` for login/logout and to access current user/token.
- **Redux:** Only cart state is currently managed via Redux. Other features may use context or local state.
- **Form Fields:** Use `InputField` component for all forms to ensure consistent UX (supports password visibility toggle).
- **Error Handling:** API errors are surfaced to users via error state in components (see `Login.jsx`, `Register.jsx`).

## Integration Points
- **External APIs:** All network requests use Axios via API modules in `src/api/`.
- **Redux Store:** Extend `src/app/store.js` to add new slices.
- **Context Providers:** Wrap new providers in `src/App.jsx` as needed.

## Examples
- **Adding a new page:** Create a folder in `src/pages/FeatureName/`, add your component, and register the route in `src/routes/AppRoutes.jsx`.
- **Adding a new API call:** Add a function to the relevant file in `src/api/` or create a new one.

## References
- `src/App.jsx` — App composition and provider setup
- `src/routes/AppRoutes.jsx` — Routing
- `src/context/AuthContext.jsx` — Auth logic
- `src/app/store.js` — Redux store
- `src/api/` — API abstraction
- `src/components/` — UI building blocks

---

**For AI agents:**
- Prefer using existing API modules and components.
- Follow the folder structure and naming conventions.
- Do not hardcode API URLs outside of `src/api/`.
- Use Tailwind classes for styling.
- Keep logic modular and composable.
