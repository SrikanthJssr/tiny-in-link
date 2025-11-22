import "./globals.css";

export const metadata = {
  title: "TinyInLink",
  description: "URL Shortener Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body-bg">

        {/* MAIN WRAPPER */}
        <div className="layout-wrapper">
          
          {/* HEADER */}
          <header className="layout-header">
          
          </header>

          {/* MAIN CONTENT */}
          <main className="layout-content">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="layout-footer">
            © {new Date().getFullYear()} TinyInLink. All rights reserved.
          </footer>

        </div>

      </body>
    </html>
  );
}
