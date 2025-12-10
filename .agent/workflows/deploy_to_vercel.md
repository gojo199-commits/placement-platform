---
description: How to deploy the PlacePrep application to Vercel
---

# Deploying to Vercel

This guide outlines the steps to deploy your Next.js application to Vercel.

## Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository.
2.  **Vercel Account**: You need an account at [vercel.com](https://vercel.com).

## Steps

1.  **Push to GitHub**
    - If you haven't already, commit your changes and push them to your GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Import Project in Vercel**
    - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Import your `placement-platform` repository.

3.  **Configure Project**
    - **Framework Preset**: Vercel should automatically detect `Next.js`.
    - **Root Directory**: Ensure it is set to `placement-platform` (or `./` if the repo root is the app root).
    - **Build Command**: `next build` (default)
    - **Output Directory**: `.next` (default)
    - **Install Command**: `npm install` (default)

4.  **Environment Variables**
    - Expand the **"Environment Variables"** section.
    - Add the following variables (copy values from your `.env` file):
        - `DATABASE_URL`: Your production database connection string (e.g., from Neon, Supabase, or MongoDB Atlas).
        - `NEXTAUTH_SECRET`: Your NextAuth secret (generate a new one for production if needed).
        - `NEXTAUTH_URL`: Set this to your Vercel deployment URL (e.g., `https://your-project.vercel.app`) once you have it, or use the default provided by Vercel.
        - Any other API keys or secrets your app uses.

5.  **Deploy**
    - Click **"Deploy"**.
    - Vercel will build your application. Watch the logs for any errors.

6.  **Post-Deployment**
    - Once deployed, you will get a live URL.
    - **Database Migration**: You might need to run migrations against your production database. You can often do this from your local machine if you update your local `.env` to point to the production DB temporarily, or use the Vercel integration if available.
    - Command: `npx prisma db push` (careful with production data) or `npx prisma migrate deploy`.

## Troubleshooting

- **Build Errors**: Check the "Build Logs" in Vercel. Common issues include type errors (`npm run build` runs type checking) or lint errors.
- **Runtime Errors**: Check the "Runtime Logs" in the Vercel dashboard.
