import { cn } from "../../lib/utils";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "compact" | "regular";
  className?: string;
  href?: string;
}

const baseStyles =
  "transition leading-normal select-none w-min h-min text-nowrap flex justify-center items-center gap-2 active:translate-y-[1px] outline-none focus-visible:ring-2 focus-visible:ring-cyan-200";

const variants = {
  primary: "bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 font-bold text-slate-950 shadow-[0_14px_30px_rgba(34,211,238,0.25)] hover:brightness-110",
  secondary: "bg-white/10 font-medium text-zinc-100 hover:bg-white/15",
};

const sizes = {
  compact: "py-2 px-3 text-sm rounded-md",
  regular: "py-2.5 px-4 text-sm rounded-lg",
};

const Button = ({ children, onClick, variant = "primary", size = "compact", className, href }: ButtonProps) => {
  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <CustomLink className={combinedClasses} href={href}>
        {children}
      </CustomLink>
    );
  }
  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ children, href, className }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};

export default Button;
