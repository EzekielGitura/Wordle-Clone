interface SeparatorProps {
  title: string;
}

const Separator = ({ title }: SeparatorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-full h-px bg-zinc-800" />
      <p className="text-xs uppercase text-zinc-500 font-medium">{title}</p>
      <span className="w-full h-px bg-zinc-800" />
    </div>
  );
};

export default Separator;
