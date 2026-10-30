# A Little Friendship Gift

A responsive, static friendship-note website with interactive questions and an optional Node.js reply API.

## Preview locally

1. Open the `public` folder in VS Code.
2. Open `index.html` in a browser (or use the Live Server extension).

## Publish the front end with GitHub Pages

1. Create a GitHub repository.
2. Upload the **contents of the `public` folder** to the repository root.
3. In GitHub, open **Settings → Pages** and select the `main` branch and `/ (root)`.
4. Save. GitHub will provide the website URL.

The front end works on GitHub Pages without a backend. Replies will not be saved online until the backend is deployed and connected.

## Optional Node.js backend

1. Deploy this project (the root containing `server.js` and `package.json`) to a Node.js hosting provider.
2. Set the start command to `npm start`.
3. Copy the backend URL.
4. In `public/script.js`, change `const API_BASE = '';` to `const API_BASE = 'https://YOUR-BACKEND-URL';`.
5. Re-upload the updated `public` files to GitHub Pages.

The included example stores replies in `data/responses.json`. Some hosting services use temporary filesystems, so for reliable long-term storage, connect a hosted database before collecting real replies. Do not publish private phone numbers or sensitive information in the site.
