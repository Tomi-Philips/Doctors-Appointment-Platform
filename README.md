# Medimeet - Doctors Appointment Platform

Medimeet is a modern, full-stack doctors appointment platform built with Next.js, Supabase (PostgreSQL), Tailwind CSS, and Shadcn UI. It features real-time video calls via Jitsi Meet and secure authentication with Supabase Auth.

## 🚀 Features

- **Doctor & Patient Dashboards**: Separate specialized views for doctors and patients.
- **Appointment Scheduling**: Easy-to-use booking system for patients.
- **Video Consultations**: Integrated video call functionality for remote appointments via Jitsi Meet.
- **Admin Panel**: Comprehensive management dashboard for system administrators.
- **Credits System**: Built-in credit system for managing consultations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) with [Supabase PostgreSQL](https://supabase.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Video/Comms**: [Jitsi Meet](https://jitsi.org/jitsi-meet/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Supabase Project
- Google Cloud Console Project (for Google Auth)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AfopTech/doctors-appointment-platform.git
   cd doctors-appointment-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your_supabase_postgresql_url"
   DIRECT_URL="your_supabase_direct_postgresql_url"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Designed & Developed by [AfopTech](https://github.com/AfopTech/)**
