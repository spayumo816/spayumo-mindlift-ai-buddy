import { useEffect, useState } from "react";
import {
  getAllStudyPlan,
  deleteStudyPlan,
  completeStudyPlan,
} from "../utils/studyAPI.js";
import {
  BookOpenCheck,
  Trash2,
  CheckCircle2,
  PlusCircle,
} from "lucide-react";
import { AlertCard } from "./AlertCard";
import { AddStudyPlan } from "./AddStudyPlan";

export const StudyPlanner = ({ refreshKey = 0 }) => {
  const [studySessions, setStudySessions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [alertConfig, setAlertConfig] = useState(null);

  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        const data = await getAllStudyPlan();

        const formattedSessions = (data.studyPlans || []).map((session) => ({
          ...session,
          id: session._id,
          duration: session.duration,
          completed: session.completed || false,
          completedAt: session.completedAt || null,
          source: session.source || "manual",
        }));

        setStudySessions(formattedSessions);
      } catch (error) {
        console.error("Failed to fetch study plans:", error.message);
        setStudySessions([]);
      }
    };

    fetchStudyPlans();
  }, [refreshKey]);

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

  const handleCompleteSession = async (id) => {
    try {
      const data = await completeStudyPlan(id);

      setStudySessions((prev) =>
        prev.map((session) =>
          session.id === id
            ? {
                ...session,
                ...data.studyPlan,
                id: data.studyPlan._id,
              }
            : session
        )
      );

      showAlert({
        title: "Study session completed",
        message:
          "Great job! Your study session has been marked as completed.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to complete study plan:", error.message);
      showAlert({
        title: "Action failed",
        message: error.message || "Failed to complete study session.",
        type: "error",
      });
    }
  };

  const handleDeleteSession = (id) => {
    showAlert({
      title: "Delete study session?",
      message:
        "Are you sure you want to delete this study session? This action cannot be undone.",
      type: "error",
      showCancel: true,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteStudyPlan(id);

          setStudySessions((prev) =>
            prev.filter((session) => session.id !== id)
          );

          closeAlert();
        } catch (error) {
          console.error("Failed to delete study plan:", error.message);
          showAlert({
            title: "Delete failed",
            message: error.message || "Failed to delete study session.",
            type: "error",
          });
        }
      },
    });
  };

  const handleStudyPlanAdded = (newSession) => {
    setStudySessions((prev) => [newSession, ...prev]);
    setShowAddForm(false);

    showAlert({
      title: "Study plan saved",
      message: "Your study plan has been added successfully.",
      type: "success",
    });
  };

  return (
    <>
      <div className="flex h-full flex-col gap-5">
        <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Planner
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                Study Planner
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Plan your study sessions and stay on track.
              </p>
            </div>

            {!showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-800 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg sm:w-auto"
              >
                <PlusCircle size={18} />
                <span>Add Study Plan</span>
              </button>
            )}
          </div>
        </div>

        {showAddForm ? (
          <AddStudyPlan
            onCancel={() => setShowAddForm(false)}
            onStudyPlanAdded={handleStudyPlanAdded}
          />
        ) : (
          <section className="min-h-0 rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0] shadow-sm">
                    <BookOpenCheck size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                      Sessions
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                      Study Sessions
                    </h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                  {studySessions.length}{" "}
                  {studySessions.length === 1 ? "session" : "sessions"}
                </span>
              </div>
            </div>

            <div className="max-h-140 space-y-4 overflow-y-auto pr-1">
              {studySessions.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                    <BookOpenCheck size={22} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    No study sessions yet
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Add your first study plan to start building your routine.
                  </p>
                </div>
              ) : (
                studySessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-3xl border p-4 shadow-sm transition-all duration-300 ${
                      session.completed
                        ? "border-green-200 bg-green-50/95"
                        : "border-slate-200 bg-slate-50/90 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4
                            className={`text-base font-bold tracking-tight ${
                              session.completed
                                ? "text-slate-500 line-through"
                                : "text-slate-800"
                            }`}
                          >
                            {session.title}
                          </h4>

                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm ring-1 ring-slate-200">
                            {session.source === "ai" ? "AI" : "MANUAL"}
                          </span>

                          {session.completed && (
                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
                              Done
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                          <span className="rounded-full bg-slate-200/70 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {session.topic}
                          </span>
                          <span>•</span>
                          <span>{session.date?.slice(0, 10)}</span>
                          <span>•</span>
                          <span>{session.duration} mins</span>
                        </div>

                        {session.completedAt && (
                          <p className="mt-3 text-xs font-semibold text-green-700">
                            Completed on{" "}
                            {new Date(session.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleCompleteSession(session.id)}
                          disabled={session.completed}
                          className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-medium transition ${
                            session.completed
                              ? "cursor-not-allowed bg-green-100 text-green-700"
                              : "bg-[#ADF7D1] text-slate-800 shadow-sm hover:shadow-md"
                          }`}
                        >
                          <CheckCircle2 size={16} />
                          <span>
                            {session.completed ? "Completed" : "Complete"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSession(session.id)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>

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
