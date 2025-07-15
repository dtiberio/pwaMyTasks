# Task Manager PWA - File Overview

This document provides an overview of the key files in the Task Manager PWA project as they were initially created and how they are intended to interact.

## How the Files Work Together

The application starts with `index.html`, which defines the user interface structure. It links to `css/styles.css` for custom styling and `js/main.js` for client-side logic, including task management using local storage.

To enable Progressive Web App (PWA) features:

- `index.html` links to `manifest.json`.
- `index.html` also registers `service-worker.js`. This script runs in the background to cache assets for offline use.

**Important Path Considerations:** For the PWA to function correctly, all paths to assets (`manifest.json`, `service-worker.js`, images, CSS, JS) within `index.html`, `manifest.json`, and `service-worker.js` must be relative to their location within the `public_html/tasks-v1/` directory. This directory acts as the web root for the application (e.g., `https://yourdomain.com/tasks-v1/`). The file descriptions below detail these updated relative paths.

## Project Structure

This is the project structure for the Task Manager PWA, which is designed to be deployed on a cPanel LAMP stack. The `tasks-v1` project includes a private directory (`/home/username/tasks-v1/`) for server-side code and sensitive files, and a public directory (`/home/username/public_html/tasks-v1/`) for web-accessible assets. This `README.md` file resides in the private `tasks-v1` directory.

```plaintext
/home/username/                       ← cPanel account root
│
├── tasks-v1/                         ← **PRIVATE** project root (this project, outside web root)
│   ├── src/                          ← PHP classes, future business logic
│   ├── vendor/                       ← Composer packages (create later)
│   ├── config/                       ← .env, keys, config.php
│   ├── storage/                      ← logs & uploads (chmod 700)
│   └── README.md                     ← This documentation file
│
└── public_html/
    └── tasks-v1/                     ← **PUBLIC** assets & entry point for this project
        ├── css/
        │   └── styles.css
        ├── js/
        │   └── main.js
        ├── images/
        │   └── logo.png
        ├── manifest.json
        ├── service-worker.js
        ├── index.html                ← Main HTML application file
        └── about.html                ← About page for the application
```

## File Descriptions

### 1. `index.html` (in `public_html/tasks-v1/`)

- **Location:** `public_html/tasks-v1/index.html`
- **Purpose:** The main HTML file structuring the web application. It includes a header, task input section, task list display area, and a footer. It uses Bootstrap 5 (via CDN) for styling and components.
- **Links to Local Assets (relative to `public_html/tasks-v1/index.html`):**
  - CSS: `css/styles.css`
  - JavaScript: `js/main.js`
  - Manifest: `manifest.json`
  - Service Worker Registration: `service-worker.js` (registered as `navigator.serviceWorker.register('service-worker.js')`)
  - About Page: `about.html`

### 2. `about.html` (in `public_html/tasks-v1/`)

- **Location:** `public_html/tasks-v1/about.html`
- **Purpose:** Provides information about the Task Manager PWA, explaining its features, PWA nature, and local data storage.
- **Links to Local Assets (relative to `public_html/tasks-v1/about.html`):**
  - CSS: `css/styles.css`
  - Manifest: `manifest.json`
  - Service Worker Registration: `service-worker.js` (registered as `navigator.serviceWorker.register('service-worker.js')`)
  - Home Page: `index.html`

### 3. `css/styles.css` (in `public_html/tasks-v1/css/`)

- **Location:** `public_html/tasks-v1/css/styles.css`
- **Purpose:** Contains custom CSS rules to style the application, complementing Bootstrap. It includes styles for page layout, typography, task sections, completed tasks, and responsive adjustments.

### 4. `js/main.js` (in `public_html/tasks-v1/js/`)

- **Location:** `public_html/tasks-v1/js/main.js`
- **Purpose:** Handles client-side logic for `index.html`:
  - Adds event listeners for task form submission.
  - Manages tasks (add, delete, toggle completion) using browser local storage.
  - Dynamically renders tasks in the UI.
  - Includes basic input validation.

### 5. `manifest.json` (in `public_html/tasks-v1/`)

- **Location:** `public_html/tasks-v1/manifest.json`
- **Purpose:** The Web App Manifest, providing PWA metadata:
  - `name`: "PWA App", `short_name`: "PWAApp"
  - `start_url`: `"index.html"` (Relative to `manifest.json`'s location, resolves to `public_html/tasks-v1/index.html`)
  - `display`: "standalone"
  - `background_color`: "#ffffff", `theme_color`: "#007bff"
  - `icons`:
    - `src`: `"images/logo.png"` (Relative to `manifest.json`'s location, resolves to `public_html/tasks-v1/images/logo.png` for both 192x192 and 512x512 sizes)
- This file is crucial for "add to home screen" functionality.

### 6. `service-worker.js` (in `public_html/tasks-v1/`)

- **Location:** `public_html/tasks-v1/service-worker.js`
- **Purpose:** The service worker script enabling offline functionality.
- **Functionality:**
  - **`install` event:** Opens a cache (named "v1") and pre-caches assets. Paths are relative to `service-worker.js` (i.e., within `public_html/tasks-v1/`):
    - `"index.html"`
    - `"about.html"`
    - `"manifest.json"`
    - `"images/logo.png"`
    - `"css/styles.css"`
    - `"js/main.js"`
  - **`fetch` event:** Intercepts network requests, serving from cache if available, otherwise fetching from the network.
  - **`activate` event:** Manages old caches.
- This script is key for offline reliability. Ensure all cached paths accurately reflect the deployed file structure relative to the web root.

# tasks-v1 PWA App

`tasks-v1` is a client-side Progressive Web App (PWA) designed for simple task management. It allows users to create, read, update, and delete tasks directly in their browser, with offline capabilities provided by a service worker.

## Project Overview

This application is built using HTML, CSS, and JavaScript (ES6+), leveraging Bootstrap 5 for responsive design and a polished user interface. As a client-only application, it does not rely on a backend server or database for its core functionality. All data is stored locally in the user's browser.

## Folder Structure

The project is organized into public and private folders, following a structure suitable for cPanel hosting environments, although for this client-side PWA, only the `public_html` contents are strictly necessary for deployment.

```plaintext
/home/username/                ← cPanel account root folder
│
├── public_html/               ← Web-accessible content
│   ├── tasks-v1/              ← Public folder for the tasks-v1 project
│   │   ├── css/               ← CSS files (e.g., styles.css)
│   │   ├── js/                ← JavaScript files (e.g., scripts.js, app.js)
│   │   ├── images/            ← Image assets (e.g., logo.png)
│   │   ├── index.html         ← Main HTML file for the application
│   │   ├── manifest.json      ← PWA manifest file
│   │   └── service-worker.js  ← Service worker script
│   │
│   └── …                      ← Other projects
│
├── tasks-v1/                  ← **Private** folder for project tasks-v1 (Not used for this client-only PWA)
│   ├── src/
│   ├── templates/
│   ├── vendor/
│   ├── config/
│   └── storage/
│
└── …                          ← Other private project folders, shared_libs, backups
```

**Key Components in `public_html/tasks-v1/`:**

*   **`index.html`**: The main entry point of the application. It contains the structure of the task manager interface, including forms for adding tasks and lists for displaying them.
*   **`css/styles.css`**: Contains custom CSS rules to style the application, complementing Bootstrap 5.
*   **`js/scripts.js` (or `app.js`)**: This is where the core client-side logic resides. It handles:
    *   Task creation, display, updates, and deletion.
    *   Event handling for user interactions (e.g., button clicks, form submissions).
    *   Interaction with browser storage (e.g., `localStorage` or `IndexedDB`) to persist tasks.
    *   Registration of the service worker.
*   **`manifest.json`**: The PWA manifest file. It provides metadata about the application, such as its name, icons, start URL, and display mode. This allows users to "install" the app to their home screen.
*   **`service-worker.js`**: This script runs in the background and enables offline functionality. It:
    *   Caches essential app assets (HTML, CSS, JavaScript, images) during the "install" event.
    *   Intercepts network requests ("fetch" event) and serves cached assets when offline, falling back to the network if available.
    *   Manages cache versions ("activate" event) to ensure the app uses the latest assets.
*   **`images/`**: Contains images and icons used in the application, such as the app logo referenced in `manifest.json`.

## How It Works Together

1.  **Loading the App**: When a user first visits `index.html`, the browser loads the HTML structure, CSS styles, and JavaScript logic.
2.  **Service Worker Registration**: The main JavaScript file (`scripts.js` or `app.js`) registers `service-worker.js`.
3.  **Caching Assets**: Upon successful registration, the service worker's `install` event fires. It opens a cache (e.g., "v1") and stores the core application files (`index.html`, `styles.css`, `scripts.js`, `logo.png`, etc.).
4.  **Offline Access**: On subsequent visits, or if the user goes offline, the service worker's `fetch` event intercepts requests. If a requested resource is in the cache, it's served directly from there, making the app available even without an internet connection. If not in the cache and the network is available, it fetches from the network.
5.  **PWA Installation**: The `manifest.json` file allows the browser to prompt the user to add the application to their home screen or install it as a desktop app, providing a more native-like experience.
6.  **Task Management**:
    *   Users interact with the HTML interface (`index.html`) to add, view, edit, or delete tasks.
    *   JavaScript in `scripts.js` handles these interactions, updating the UI dynamically.
    *   Tasks are typically stored in the browser's `localStorage` or `IndexedDB` to persist them across sessions.
7.  **Styling and Responsiveness**: Bootstrap 5 classes are used throughout `index.html` for layout, components (buttons, forms, lists), and responsive design. Custom styles in `css/styles.css` can override or extend Bootstrap's styling.

This combination of client-side technologies enables `tasks-v1` to function as a reliable, installable, and offline-capable task management application directly within the user's web browser.
