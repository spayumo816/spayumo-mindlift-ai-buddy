import { useState } from "react";
import {
  createStudyPlan,
} from "../utils/studyAPI.js";
import {
  CalendarDays,
  Clock3,
  BookOpenCheck,
  PlusCircle,
  NotebookPen,
  X,
} from "lucide-react";
import { AlertCard } from "./AlertCard";

export const AddStudyPlan = ({ onCancel, onStudyPlanAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    date: "",
    duration: "",
  });
  const [alertConfig, setAlertConfig] = useState(null);

  const showAlert = ({
    title,
    message,
    type = "info",
    onConfirm = null,
    confirmText = "OK",
    cancelText = "Cancel",
    showCancel = false,
  }) => {
    setAlertConfig({
      title,
      message,
      type,
      onConfirm,
      confirmText,
      cancelText,
      showCancel,
    });
  };

  const closeAlert = () => {
    setAlertConfig(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.topic ||
      !formData.date ||
      !formData.duration
    ) {
      showAlert({
        title: "Missing required fields",
        message: "Please complete all fields.",
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        topic: formData.topic,
        date: formData.date,
        duration: Number(formData.duration),
      };

      const data = await createStudyPlan(payload);

      const newSession = {
        ...data.studyPlan,
        id: data.studyPlan._id,
        completed: data.studyPlan.completed || false,
        completedAt: data.studyPlan.completedAt || null,
        source: data.studyPlan.source || "manual",
      };

      if (onStudyPlanAdded) {
        onStudyPlanAdded(newSession);
      }

      setFormData({
        title: "",
        topic: "",
        date: "",
        duration: "",
      });
    } catch (error) {
      console.error("Failed to create study plan:", error.message);
      showAlert({
        title: "Save failed",
        message: error.message || "Failed to save study session.",
        type: "error",
      });
    }
  };

  return (
    <>
      <section className="rounded-[28px] border border-white/30 bg-white/92 p-5 shadow-xl backdrop-blur-xl sm:p-6">
        <div className="mb-6 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0]">
              <PlusCircle size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                Study Planner
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                Add Study Plan
              </h3>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Create a focused study session and stay consistent with your learning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <NotebookPen size={16} className="text-slate-500" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Study useEffect"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BookOpenCheck size={16} className="text-slate-500" />
              Topic
            </label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
            >
              <option value="">Select a topic</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="HTML">HTML</option>
              <option value="API">API</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays size={16} className="text-slate-500" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock3 size={16} className="text-slate-500" />
                Duration
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 60"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8971D0] px-5 py-3 font-medium text-white shadow-md transition hover:brightness-110"
            >
              <PlusCircle size={18} />
              <span>Save Study Plan</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-200"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </section>

      {alertConfig && (
        <AlertCard
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={closeAlert}
          onConfirm={alertConfig.onConfirm}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          showCancel={alertConfig.showCancel}
        />
      )}
    </>
  );
};