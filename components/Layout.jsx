"use client";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-5xl mx-auto px-6 py-4">
          
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">{children}</div>
      </main>

      <footer className="py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TinyInLink
      </footer>
    </div>
  );
}
