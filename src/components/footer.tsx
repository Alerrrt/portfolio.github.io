export function Footer() {
  return (
    <footer className="relative bg-background">
      {/* Giant wordmark — left-aligned, animated accent color, top 75% visible */}
      <div className="relative overflow-hidden" style={{ height: "12em" }}>
        {/* Background image */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/footer-alpha.jpg')" }}
        />
        {/* Avatar on top of wordmark */}
        <span
          className="text-shine absolute left-6 top-0 select-none font-bold leading-none tracking-tighter sm:left-10"
          style={{ fontSize: "16vw", lineHeight: 1 }}
        >
          A71n
        </span>
      </div>
    </footer>
  );
}