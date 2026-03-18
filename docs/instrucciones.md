You are a senior React architect.

Your task is to refactor my existing React + TypeScript project into a scalable, production-ready architecture using:

Feature-based structure

Clean separation of concerns

Modular routing

Reusable shared layer

🎯 Goals

Refactor the project to follow this structure:

src/
app/
router/
AppRouter.tsx
providers/
shared/
components/
ui/
layouts/
feedback/
guards/
hooks/
services/
utils/
types/
features/
/
pages/
components/
hooks/
services/
types/
routes.tsx

🔥 Key Rules

Move ALL business logic into features/

Each feature must be self-contained

Extract routes into each feature (routes.tsx)

Central router must only compose routes

Move guards out of hooks/ into shared/guards/

Separate UI components (shared) from feature components

Avoid cross-feature imports

Use relative routing instead of absolute paths

Keep layouts in shared/components/layouts

🧠 Routing Rules

Use nested routes

Use layout-based routing

Use index routes properly

Avoid deeply nested guard wrappers → create composed guards if needed

🛠 Refactor Tasks

Identify all current pages and group them into features

Create a folder per feature

Move related components, hooks, and services into that feature

Extract routing into routes.tsx per feature

Refactor App router to use composition:
{authRoutes}
{clientRoutes}
{staffRoutes}

Move reusable logic into shared/

Fix imports after restructuring

Ensure the app still works after refactor

⚠️ Constraints

Do NOT break functionality

Do NOT remove existing logic

Only reorganize and improve structure

Keep TypeScript types intact

✨ Output Format

Show the new folder structure

Show updated AppRouter.tsx

Show one example feature fully refactored

Explain key decisions briefly

Now refactor the project.