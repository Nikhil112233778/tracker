# Job Tracker

A mobile-first Progressive Web App (PWA) for tracking job applications, HR contacts, conversations, and follow-up reminders.

## Features

- 📱 **Mobile-First Design** - Optimized for 375px-430px viewports
- 💼 **Job Tracking** - Manage applications, roles, and HR contacts
- 💬 **Conversation Timeline** - Log all interactions with recruiters
- ⏰ **Smart Reminders** - In-app notifications with browser push support
- 🔒 **Privacy-Focused** - Single user, no auth required, data stored in your database
- 🆓 **Zero Cost** - Deploy to Vercel free tier with Turso (cloud SQLite)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: Turso (libSQL - cloud SQLite)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Turso Database

Install Turso CLI (if not already installed):

```bash
# Windows (PowerShell)
irm https://get.tur.so/install.ps1 | iex

# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash
```

Create the database:

```bash
# Authenticate with Turso (first time only)
turso auth signup  # or turso auth login

# Create your database
turso db create job-tracker

# Get the database URL
turso db show job-tracker

# Create an authentication token
turso db tokens create job-tracker
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
TURSO_DATABASE_URL=libsql://job-tracker-[your-org].turso.io
TURSO_AUTH_TOKEN=eyJhbGc...your-token-here
```

Replace the values with your actual database URL and token from step 2.

### 4. Run Database Migrations

```bash
npm run db:generate  # Generate migration files
npm run db:push      # Apply migrations to Turso
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Drizzle migration files
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
job-tracker/
├── src/
│   ├── app/                 # Next.js app directory (pages & routes)
│   ├── components/          # React components
│   ├── lib/                 # Utilities, types, database
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
├── drizzle/                 # Database migrations
└── ...config files
```

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
4. Deploy!

## Database Schema

### Jobs Table
- Company, Role, HR Contact Info
- Status (Applied, In Touch, Interview, etc.)
- Notes, Salary Info

### Conversations Table
- Type (Call, Email, LinkedIn, etc.)
- Date, Summary

### Reminders Table
- Reminder Date/Time, Note
- Done status, Snooze functionality

## License

MIT
