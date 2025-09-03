# GameGrid Emporium

This is a web application for GameGrid Emporium, a fictional game store. The application provides a public-facing website and an admin portal for managing the store's content and customer interactions.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: SQLite (for local data), Supabase (for authentication)
- **Routing**: React Router

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd gamegrid-emporium-main
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Supabase credentials. This is required for the admin portal authentication.
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Running the Application

This project consists of two main parts: the frontend Vite server and the backend Express server. You will need to run both concurrently in separate terminals.

1.  **Start the backend server:**
    ```sh
    npm run server
    ```
    The backend will run on `http://localhost:5175`.

2.  **Start the frontend development server:**
    ```sh
    npm run dev
    ```
    The frontend will be available at `http://localhost:8080`.

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build locally.
- `npm run server`: Starts the backend Express server.

## Database Schema

The application uses a local SQLite database (`data/app.sqlite`) for storing leads and contact messages. The schema is defined in `server/db.ts`.

### `leads` table

| Column            | Type    | Description                               |
| ----------------- | ------- | ----------------------------------------- |
| `id`              | INTEGER | Primary Key                               |
| `created_at`      | TEXT    | Timestamp of creation                     |
| `name`            | TEXT    | Name of the lead                          |
| `email`           | TEXT    | Email of the lead                         |
| `phone`           | TEXT    | Phone number of the lead                  |
| `collection_type` | TEXT    | Type of collection being sold             |
| `description`     | TEXT    | Description of the items                  |
| `estimated_value` | TEXT    | Estimated value of the collection         |
| `images_json`     | TEXT    | JSON array of image URLs                  |
| `source`          | TEXT    | Source of the lead (e.g., 'sell_form')    |
| `status`          | TEXT    | 'active' or 'archived'                    |

### `contacts` table

| Column       | Type    | Description                   |
| ------------ | ------- | ----------------------------- |
| `id`         | INTEGER | Primary Key                   |
| `created_at` | TEXT    | Timestamp of creation         |
| `name`       | TEXT    | Name of the contact           |
| `email`      | TEXT    | Email of the contact          |
| `message`    | TEXT    | The message from the contact  |
| `status`     | TEXT    | 'active' or 'archived'        |

