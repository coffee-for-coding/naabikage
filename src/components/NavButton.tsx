"use client";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

const SIZE = 88;
const RECT_INSET = 1;
const RECT_RADIUS = 12;
const PERIM = 2 * (SIZE - RECT_INSET * 2 + (SIZE - RECT_INSET * 2));

export default function NavButton({ direction, onClick }: Props) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous work" : "Next work"}
      className="navbtn"
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "left" : "right"]: 28,
        transform: "translateY(-50%)",
        width: SIZE,
        height: SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
        style={{ position: "absolute", inset: 0 }}
      >
        <rect
          className="navbtn__rect"
          x={RECT_INSET}
          y={RECT_INSET}
          width={SIZE - RECT_INSET * 2}
          height={SIZE - RECT_INSET * 2}
          rx={RECT_RADIUS}
          ry={RECT_RADIUS}
          fill="none"
          stroke="rgba(26,24,20,0.7)"
          strokeWidth="0.75"
          pathLength={PERIM}
          strokeDasharray={PERIM}
          strokeDashoffset={PERIM}
        />
      </svg>
      <svg width="22" height="22" viewBox="0 0 14 14" aria-hidden>
        {isLeft ? (
          <polyline
            points="9,2 3,7 9,12"
            fill="none"
            stroke="rgba(26,24,20,0.75)"
            strokeWidth="1"
          />
        ) : (
          <polyline
            points="5,2 11,7 5,12"
            fill="none"
            stroke="rgba(26,24,20,0.75)"
            strokeWidth="1"
          />
        )}
      </svg>
      <style jsx>{`
        .navbtn:hover :global(.navbtn__rect) {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 1s linear;
        }
        .navbtn :global(.navbtn__rect) {
          transition: none;
        }
      `}</style>
    </button>
  );
}
