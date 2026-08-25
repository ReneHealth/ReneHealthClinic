const RADIUS = 48.25;
const TICKS = 80;
const TICK_WIDTH = 0.5;
const GAP = (2 * Math.PI * RADIUS) / TICKS - TICK_WIDTH;

export default function TickRing({ index }: { index: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transformOrigin: "50% 50%",
        animation: `${index % 2 === 0 ? "tick-spin" : "tick-spin-reverse"} 90s linear infinite`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="#9db0b1"
          strokeWidth="1.5"
          strokeDasharray={`${TICK_WIDTH} ${GAP}`}
        />
      </svg>
    </div>
  );
}
