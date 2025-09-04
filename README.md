# Ready Up Gamestore

This is a web application for Ready Up Gamestore, a game store in Ontario, Ohio. The application provides a public-facing website and an admin portal for managing the store's content and customer interactions.

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
    cd ready-up-gamestore
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

This project was bootstrapped with [Vite](https://vitejs.dev/).

---

_This line was added to trigger a fresh Cloudflare deployment._

To run the application locally, start the frontend development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build locally.

## Database

The application uses two databases:

-   **Supabase**: Handles user authentication, contact form submissions, and job applications.
-   **SQLite**: A local database (`data/app.sqlite`) used for storing leads from the "Sell Your Collection" form.

### Supabase Schema

The following tables are managed in Supabase. You can create them using the SQL queries provided in the project setup or in the Supabase SQL Editor.

#### `contacts` table

Stores messages from the "Contact Us" form.

| Column     | Type                  | Description                       |
| ---------- | --------------------- | --------------------------------- |
| `id`       | `bigint` (Primary Key)| Unique identifier for the contact |
| `created_at` | `timestamp with time zone` | Timestamp of creation             |
| `name`     | `text`                | Name of the person contacting     |
| `email`    | `text`                | Email of the person contacting    |
| `message`  | `text`                | The message content               |
| `status`   | `text`                | 'active' or 'archived'            |

#### `applications` table

Stores job applications from the "Careers" page.

| Column                 | Type                  | Description                               |
| ---------------------- | --------------------- | ----------------------------------------- |
| `id`                   | `bigint` (Primary Key)| Unique identifier for the application     |
| `created_at`           | `timestamp with time zone` | Timestamp of submission                   |
| `name`                 | `text`                | Applicant's full name                     |
| `email`                | `text`                | Applicant's email                         |
| `phone`                | `text`                | Applicant's phone number                  |
| `position`             | `text`                | Position applied for                      |
| `cover_letter`         | `text`                | Cover letter content                      |
| `resume_name`          | `text`                | Filename of the uploaded resume           |
| `resume_data_url`      | `text`                | Base64 encoded resume data                |
| `address`              | `text`                | Applicant's street address                |
| `city`                 | `text`                | Applicant's city                          |
| `state`                | `text`                | Applicant's state                         |
| `zip`                  | `text`                | Applicant's postal code                   |
| `start_date`           | `text`                | Desired start date                        |
| `desired_pay`          | `text`                | Desired compensation                      |
| `availability_type`    | `text`                | e.g., 'Full-time', 'Part-time'            |
| `hours_per_week`       | `text`                | Available hours per week                  |
| `work_auth`            | `text`                | Work authorization status                 |
| `over_18`              | `text`                | Confirmation of being over 18             |
| `has_transport`        | `text`                | Confirmation of reliable transportation   |
| `website`, `linkedin`, etc. | `text`           | Links to professional profiles            |
| `consent`              | `boolean`             | Consent to terms                          |
| `status`               | `text`                | 'active' or 'archived'                    |

### Local SQLite Schema

The schema for the local database is defined in `server/db.ts`.

#### `leads` table

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
