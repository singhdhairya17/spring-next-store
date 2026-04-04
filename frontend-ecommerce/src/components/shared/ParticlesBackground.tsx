"use client";

/**
 * Ambient auth background — soft mesh + grid, no random motion (stable, premium feel).
 */
export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute inset-0 mesh-noise opacity-90" aria-hidden />
      <div
        className="absolute inset-0 bg-grid-subtle opacity-[0.45]"
        aria-hidden
      />
      <div
        className="absolute -left-[20%] top-0 h-[min(70vh,520px)] w-[min(70vw,520px)] rounded-full bg-brand/[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute -right-[15%] bottom-0 h-[min(60vh,440px)] w-[min(65vw,480px)] rounded-full bg-indigo-500/[0.06] blur-[90px]"
        aria-hidden
      />
    </div>
  );
}
