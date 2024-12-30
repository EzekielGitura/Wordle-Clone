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
  "transition leading-normal select-none w-min h-min text-nowrap flex justify-center items-center gap-1 active:translate-y-[1px]";

const variants = {
  primary: "bg-emerald-500 font-medium text-black hover:opacity-95",
  secondary: "bg-zinc-700 font-medium text-zinc-100 hover:opacity-95",
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
