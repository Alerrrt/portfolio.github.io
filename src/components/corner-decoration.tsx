export function CornerDecoration() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
    </>
  );
}