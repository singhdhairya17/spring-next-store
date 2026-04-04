const Loader: React.FC = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-canvas px-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-brand"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium text-ink-secondary">Loading…</p>
    </div>
  );
};

export default Loader;
