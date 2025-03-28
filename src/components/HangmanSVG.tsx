interface HangmanSVGProps {
  errors: number;
}

export const HangmanSVG = ({ errors }: HangmanSVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="250"
      viewBox="0 0 200 250"
      style={{ display: "block", margin: "0 auto" }}
    >

      {errors >= 1 && (
        <line x1="20" y1="230" x2="100" y2="230" stroke="white" strokeWidth="4" />
      )}

      {errors >= 2 && (
        <line x1="60" y1="230" x2="60" y2="30" stroke="white" strokeWidth="4" />
      )}

      {errors >= 3 && (
        <line x1="60" y1="30" x2="150" y2="30" stroke="white" strokeWidth="4" />
      )}

      {errors >= 4 && (
        <line x1="60" y1="60" x2="90" y2="30" stroke="white" strokeWidth="4" />
      )}

      {errors >= 5 && (
        <line x1="150" y1="30" x2="150" y2="60" stroke="white" strokeWidth="2" />
      )}

      {errors >= 6 && (
        <circle cx="150" cy="80" r="20" stroke="white" strokeWidth="2" fill="none" />
      )}

      {errors >= 7 && (
        <line x1="150" y1="100" x2="150" y2="160" stroke="white" strokeWidth="2" />
      )}

      {errors >= 8 && (
        <line x1="150" y1="120" x2="120" y2="140" stroke="white" strokeWidth="2" />
      )}

      {errors >= 9 && (
        <line x1="150" y1="120" x2="180" y2="140" stroke="white" strokeWidth="2" />
      )}

      {errors >= 10 && (
        <line x1="150" y1="160" x2="130" y2="190" stroke="white" strokeWidth="2" />
      )}

      {errors >= 11 && (
        <line x1="150" y1="160" x2="170" y2="190" stroke="white" strokeWidth="2" />
      )}
    </svg>
  );
};
