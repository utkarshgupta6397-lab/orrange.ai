interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-5 ${className}`}>
      <span
        className="block w-[3px] h-3.5 rounded-full"
        style={{ backgroundColor: "#E8500A" }}
        aria-hidden="true"
      />
      <span
        className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase"
        style={{ color: "#E8500A" }}
      >
        {label}
      </span>
    </div>
  );
}
