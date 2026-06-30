"use client";

interface ScrollToButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

export function ScrollToButton({ targetId, className, children }: ScrollToButtonProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY - 80;
    const distance = end - start;
    const duration = 1400;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * easeOutQuint(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
