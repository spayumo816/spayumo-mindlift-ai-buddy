import { CheckCircle, AlertCircle, Info } from "lucide-react";

export const AlertCard = ({
  title,
  message,
  type = "info",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
}) => {
  const styles = {
    success: {
      icon: <CheckCircle size={22} className="text-green-500" />,
      border: "border-green-200/90",
      bg: "bg-white/95",
      badge: "bg-green-50 text-green-700",
      button: "bg-green-600 hover:bg-green-700",
    },
    error: {
      icon: <AlertCircle size={22} className="text-red-500" />,
      border: "border-red-200/90",
      bg: "bg-white/95",
      badge: "bg-red-50 text-red-700",
      button: "bg-red-600 hover:bg-red-700",
    },
    info: {
      icon: <Info size={22} className="text-blue-500" />,
      border: "border-blue-200/90",
      bg: "bg-white/95",
      badge: "bg-blue-50 text-blue-700",
      button: "bg-slate-900 hover:bg-slate-800",
    },
  };

  const current = styles[type] || styles.info;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-[28px] border ${current.border} ${current.bg} p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-7`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 shadow-sm ring-1 ring-slate-200">
            {current.icon}
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${current.badge}`}
              >
                {type}
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight text-slate-800">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4">
          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className={`rounded-2xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition ${current.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
