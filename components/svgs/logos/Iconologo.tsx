import ISVGProps from "@/types/ISVGProps";

export function Iconologo({ className, color }: ISVGProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 87 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M85.0848 62.2627L48.2731 103.709L87 150.25V152H54.7016L25.0088 114.56V152H0V0L25.0088 15.0146V93.759L53.8257 60.5125H85.0848V62.2627Z"
        fill={color ?? "black"}
      />
    </svg>
  );
}
