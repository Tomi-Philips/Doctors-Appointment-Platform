# Medimeet - Doctors Appointment Platform

Medimeet is a modern, full-stack doctors appointment platform built with Next.js, Neon (PostgreSQL), Tailwind CSS, and Shadcn UI. It features real-time video calls via Vonage and secure authentication with Clerk.

## 🚀 Features

- **Doctor & Patient Dashboards**: Separate specialized views for doctors and patients.
- **Appointment Scheduling**: Easy-to-use booking system for patients.
- **Video Consultations**: Integrated video call functionality for remote appointments.
- **Admin Panel**: Comprehensive management dashboard for system administrators.
- **Credits System**: Built-in credit system for managing consultations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) with [Neon PostgreSQL](https://neon.tech/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Video/Comms**: [Vonage Video API](https://www.vonage.com/communications-apis/video/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Neon PostgreSQL database
- Clerk Account
- Vonage Account

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
   DATABASE_URL="your_postgresql_url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   VONAGE_API_KEY=your_vonage_key
   VONAGE_API_SECRET=your_vonage_secret
   VONAGE_APPLICATION_ID=your_vonage_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Designed & Developed by [AfopTech](https://github.com/AfopTech/)**
