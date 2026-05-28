export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--accent)] to-[#2dd4a8] flex items-center justify-center text-[10px] font-bold">C</div>
          <span className="font-medium text-foreground">CardWise AI</span>
          <span>· AI-powered credit card intelligence</span>
        </div>
        <div className="flex items-center gap-5">
          <span>Bank-grade encryption</span>
          <span>·</span>
          <span>Explainable AI</span>
          <span>·</span>
          <span>© {new Date().getFullYear()} CardWise AI</span>
        </div>
      </div>
    </footer>
  );
}
