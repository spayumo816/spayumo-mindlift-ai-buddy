import { Sparkles, LoaderCircle } from "lucide-react";

export const LoadingCard = ({
  title = "Loading...",
  message = "Please wait while we prepare your dashboard.",
  fullScreen = true,
}) => {
  const wrapperClass = fullScreen
    ? "flex min-h-screen items-center justify-center px-4"
    : "flex h-full items-center justify-center px-4 py-8";

  return (
    <div className={wrapperClass}>
      <div className="w-full max-w-md rounded-4xl border border-white/50 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
            <Sparkles size={22} />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8971D0]/10 px-3 py-1.5 text-[#8971D0]">
            <LoaderCircle size={18} className="animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              MindLift AI Buddy
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-800">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {message}
          </p>

          <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#8971D0]" />
          </div>
        </div>
      </div>
    </div>
  );
};
