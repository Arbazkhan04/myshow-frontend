interface CenteredFormLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CenteredFormLayout({ children, className = "" }: CenteredFormLayoutProps) {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background p-4 ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Gradient Circles */}
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-tertiary/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-tertiary/10 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}