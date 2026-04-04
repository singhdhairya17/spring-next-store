const ErrorComponent: React.FC = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-canvas px-6 text-center">
      <div className="max-w-md space-y-2">
        <h1 className="font-display text-2xl font-normal tracking-tight text-ink">
          Something went wrong
        </h1>
        <p className="text-sm leading-relaxed text-ink-secondary">
          We couldn&apos;t load this content. Check your connection or try
          again.
        </p>
      </div>
      <button
        type="button"
        className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorComponent;
