export function TrustRibbon() {
  return (
    <div className="fixed top-0 inset-x-0 z-30 pointer-events-none">
      <div className="mx-auto mt-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] tracking-widest uppercase text-muted-foreground w-fit pointer-events-auto">
        <span className="text-[var(--success)]">●</span> Bank-grade encryption · No data sold · Explainable AI
      </div>
    </div>
  );
}
