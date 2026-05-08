type Variant = "slash" | "bracket" | "plain";

type Props = {
  variant?: Variant;
  className?: string;
  includeLabs?: boolean;
};

export function Wordmark({
  variant = "slash",
  className = "",
  includeLabs = true,
}: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-[family-name:var(--font-newsreader)] tracking-[-0.015em] leading-none whitespace-nowrap ${className}`}
    >
      {variant === "slash" && (
        <>
          <span>a</span>
          <span className="text-accent mx-[0.04em]">/</span>
          <span>ltrntv</span>
        </>
      )}
      {variant === "bracket" && (
        <>
          <span className="text-muted">[</span>
          <span>altrntv</span>
          <span className="text-muted">]</span>
        </>
      )}
      {variant === "plain" && <span>altrntv</span>}
      {includeLabs && (
        <span className="text-muted ml-[0.45em] italic">labs</span>
      )}
    </span>
  );
}
