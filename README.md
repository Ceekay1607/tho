# EduManager Dashboard

A responsive React + Vite dashboard for managing learners, overdue tuition reminders, revenue analytics, and a lightweight chat-style assistant. Tailwind CSS provides the utility-first styling, while lucide-react icons and Recharts power the visuals.

## Prerequisites

-   **Node.js 20.19+ or 22.12+**, as required by Vite 7.x
-   **npm 10+** (bundled with the recommended Node versions)

## Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start the dev server (requires the supported Node version):
    ```bash
    npm run dev
    ```
    Vite will print a local URL such as `http://localhost:5173`.
3. Build for production:
    ```bash
    npm run build
    ```
4. Preview the production build locally:
    ```bash
    npm run preview
    ```

## Tech Stack

-   React 19 with the SWC-based Vite plugin
-   Tailwind CSS 3 for styling
-   lucide-react for icons
-   Recharts for analytical charts

## Project Structure

-   `src/App.tsx` – Dashboard layout and feature tabs (users, overdue fees, revenue charts, chat agent)
-   `src/main.tsx` – React entry point
-   `tailwind.config.js` / `postcss.config.js` – Tailwind setup
-   `public/` – Static assets served by Vite

Feel free to replace the mock datasets inside `src/App.tsx` with live data sources once backend APIs are ready.
