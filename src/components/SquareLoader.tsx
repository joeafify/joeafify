export default function SquareLoader({
  text = "Loading...",
  fullScreen = false,
  className,
}: {
  text: string;
  fullScreen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div className={`flex flex-col items-center gap-4 ${fullScreen ? "fixed justify-center full-screen-loader inset-0 z-50 bg-black/90 backdrop-blur-lg" : ""} ${className}`}>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-xl animate-loader"></div>
          <div className="w-8 h-8 border-2 rotate-45 animate-loader"></div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 animate-pulse">{text}</p>
      </div>
    </>
  );
}