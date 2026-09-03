export default function WaxSeal() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="96"
      height="96"
      role="img"
      aria-label="A wax seal, pressed shut"
    >
      <circle cx="60" cy="60" r="52" fill="var(--wax)" />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="black"
        strokeOpacity="0.15"
        strokeWidth="3"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        stroke="black"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="6" fill="black" fillOpacity="0.15" />
      <path
        d="M31 44 L52 58 L46 66 L66 76 L60 88"
        fill="none"
        stroke="black"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
