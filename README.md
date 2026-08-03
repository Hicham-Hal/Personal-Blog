# Personal Blog

A simple personal blog built with **Node.js**, **Express**, and **EJS**, using the filesystem as storage (each article is a JSON file). No database, no build step, no client-side JavaScript required.

> ⚠️ **Status: work in progress.** This project is being actively debugged and hardened. See [Known Issues](#known-issues--todo) before deploying or relying on it.

## Features

**Guest section** (public)
- Home page — lists all published articles
- Article page — shows a single article's title, content, and publish date

**Admin section** (currently unauthenticated — see [Known Issues](#known-issues--todo))
- Dashboard — list articles with add/edit/delete actions
- Add Article page — form to create a new article
- Edit Article page — form to update an existing article

## Tech Stack

- **Backend:** Node.js, Express
- **Templating:** EJS (server-rendered HTML, no client-side JS)
- **Storage:** Filesystem — each article stored as `articles/<id>.json`

## Project Structure

```
Personal-Blog/
├── controllers/
│   ├── admin.controller.js   # add / edit / delete article logic
│   └── user.controller.js    # list / view article logic
├── routes/
│   ├── admin.route.js        # mounted at /dashboard
│   └── user.route.js         # mounted at /articles
├── views/
│   ├── home.ejs               # guest: article list
│   ├── article.ejs            # guest: single article
│   ├── dashboard.ejs          # admin: article list + actions
│   ├── add.ejs                # admin: add article form
│   └── update.ejs             # admin: edit article form
├── articles/                  # article storage (JSON files) — create manually for now
└── index.js                   # app entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/Hicham-Hal/Personal-Blog.git
cd Personal-Blog
npm install
```

### Storage setup (required for now)

The app reads/writes articles from an `articles/` folder that is **not** created automatically yet. Create it manually before running the app:

```bash
mkdir articles
```

Optionally seed it with a sample article:

```bash
echo '{"id":1,"title":"Hello World","content":"My first post.","date":"Jan 1 2026"}' > articles/1.json
```

### Running the app

```bash
node index.js
# or, for auto-restart on changes:
npx nodemon index.js
```

The server runs on **http://localhost:3000**.

| Page | URL |
|---|---|
| Home (guest) | `http://localhost:3000/articles` |
| Article (guest) | `http://localhost:3000/articles/article/:id` |
| Add article (admin) | `http://localhost:3000/dashboard/add` |
| Edit article (admin) | `http://localhost:3000/dashboard/update/:id` |
| Dashboard (admin) | *not wired up yet — see Known Issues* |

## Manual Testing

Basic smoke test:
```bash
curl -i http://localhost:3000/articles
curl -i http://localhost:3000/articles/article/1
```

Path traversal check (read-only, safe to run):
```bash
curl -i "http://localhost:3000/articles/article/..%2f..%2fpackage"
```
This should return a "not found" response. If it returns the contents of `package.json` instead, the `:id` validation fix hasn't been applied yet.

## License

ISC

## Project Link
https://roadmap.sh/projects/personal-blog