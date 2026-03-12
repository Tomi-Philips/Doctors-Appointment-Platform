import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

// Global polyfill for localStorage to prevent SSR crashes from third-party libraries
if (typeof window === "undefined") {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
    key: () => null,
    length: 0,
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medimeet - Doctors Appointment Platform",
  description: "Connect with doctors anytime, anywhere. Designed and Developed by AfopTech.",
  authors: [{ name: "AfopTech", url: "https://github.com/AfopTech/" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>
                Designed & Developed by{" "}
                <a
                  href="https://github.com/AfopTech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  AfopTech
                </a>
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
