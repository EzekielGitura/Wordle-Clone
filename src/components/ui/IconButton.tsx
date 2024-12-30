import { cn } from "../../lib/utils";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "compact" | "regular";
  className?: string;
}

const baseStyles =
  "transition leading-normal aspect-square select-none w-min h-min text-nowrap flex justify-center items-center active:translate-y-[1px]";

const variants = {
  primary: "bg-zinc-700 text-zinc-100 hover:opacity-95",
  secondary: "bg-transparent text-zinc-300 hover:bg-zinc-700",
};

const sizes = {
  compact: "p-2 rounded-md",
  regular: "p-2.5 rounded-lg",
};

const Button = ({ children, onClick, variant = "primary", size = "compact", className }: ButtonProps) => {
  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
