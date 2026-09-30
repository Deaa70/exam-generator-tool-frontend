interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="space-y-1 sm:space-y-2">
      <h1 className="text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xs text-gray-400 sm:text-sm">{subtitle}</p>
      )}
    </header>
  );
}