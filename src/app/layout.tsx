import "./globals.css";
import { ThemeProvider } from './ThemeContext';

export const metadata = {
  title: "Movie & TV Show Search",
  description: "Search and find details about movies and TV shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="container mx-auto p-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
