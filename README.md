# PlacePrep - Placement Preparation Platform

A comprehensive Next.js 14 platform for campus placement preparation with practice questions, performance analytics, and intelligent job matching.

## Features

- 🎓 **Student Portal**: Practice aptitude, technical, and coding questions
- 📊 **Performance Analytics**: Track progress with detailed charts and topic-wise breakdowns
- 💼 **Company Portal**: Post jobs and find candidates with smart matching
- 🎯 **AI Recommendations**: Get personalized question recommendations based on weak topics
- 📈 **Match Scoring**: Automatic candidate-job matching based on skills, CGPA, and performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd placement-platform
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/placement_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```
   
   Generate a secret: `openssl rand -base64 32`

3. **Set up the database**:
   ```bash
   npm run db:push      # Push schema to database
   npm run db:generate  # Generate Prisma client
   npm run db:seed      # Seed with sample data
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Test Accounts

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | rahul@example.com | student123 |
| Student | priya@example.com | student123 |
| Company | hr@techcorp.com | company123 |
| Company | hr@innovatesoft.com | company123 |

## Project Structure

```
placement-platform/
├── app/
│   ├── api/              # API routes
│   ├── (auth)/           # Login & register pages
│   ├── (student)/        # Student dashboard, practice, performance
│   ├── (company)/        # Company dashboard, post-job, candidates
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
├── lib/                  # Utilities and configurations
├── prisma/               # Database schema and seed
└── types/                # TypeScript definitions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Matching Algorithm

The platform uses a weighted scoring system:

- **CGPA Score (25%)**: Based on meeting minimum CGPA requirements
- **Skills Match (35%)**: Overlap between student skills and job requirements  
- **Performance (40%)**: Practice question accuracy and relevant topic performance

## License

MIT
