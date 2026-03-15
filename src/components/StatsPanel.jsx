import { useEffect, useState } from "react";
import {
  Flame,
  CheckCircle2,
  Clock3,
  Star,
  Trophy,
  BookOpen,
  BookOpenCheck,
  NotebookPen,
  Target,
  Award,
  BarChart3,
} from "lucide-react";
import { getDashboardStats } from "../utils/statsAPI";
import { AlertCard } from "./AlertCard";

export const StatsPanel = ({ refreshKey = 0 }) => {
  const [stats, setStats] = useState(null);
  const [alertConfig, setAlertConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
        setAlertConfig({
          title: "Failed to load stats",
          message: error.message || "Could not load dashboard statistics.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [refreshKey]);

  const closeAlert = () => {
    setAlertConfig(null);
  };

  if (loading) {
    return (
      <>
        <div className="flex h-full flex-col gap-5">
          <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Progress
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                Learning Stats
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Track your progress, streaks, and milestones.
              </p>
            </div>
          </div>

          <section className="rounded-[28px] border border-slate-200/80 bg-white/94 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <p className="text-sm text-slate-500">Loading stats...</p>
          </section>
        </div>

        {alertConfig && (
          <AlertCard
            title={alertConfig.title}
            message={alertConfig.message}
            type={alertConfig.type}
            onClose={closeAlert}
          />
        )}
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <div className="flex h-full flex-col gap-5">
          <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Progress
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                Learning Stats
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Track your progress, streaks, and milestones.
              </p>
            </div>
          </div>

          <section className="rounded-[28px] border border-slate-200/80 bg-white/94 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <p className="text-sm text-slate-500">No stats available yet.</p>
          </section>
        </div>

        {alertConfig && (
          <AlertCard
            title={alertConfig.title}
            message={alertConfig.message}
            type={alertConfig.type}
            onClose={closeAlert}
          />
        )}
      </>
    );
  }

  const summaryCards = [
    {
      title: "Current Streak",
      value: `${stats.currentStreak} day${stats.currentStreak === 1 ? "" : "s"}`,
      subtext: "Consecutive days studied",
      icon: Flame,
      accent: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Completed Sessions",
      value: stats.completedStudyPlans,
      subtext: `of ${stats.totalStudyPlans} total plans`,
      icon: CheckCircle2,
      accent: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Study Minutes",
      value: stats.totalCompletedMinutes,
      subtext: "Total completed time",
      icon: Clock3,
      accent: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "XP / Level",
      value: `${stats.totalXP} XP`,
      subtext: `Level ${stats.level}`,
      icon: Star,
      accent: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <>
      <div className="flex h-full flex-col gap-5">
        <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Progress
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
              Learning Stats
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Track your progress, streaks, and milestones.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <section
                key={card.title}
                className="rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-800">
                      {card.value}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{card.subtext}</p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm ${card.bg} ${card.accent}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <section className="rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0] shadow-sm">
                  <BarChart3 size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                    Overview
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                    Learning Breakdown
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <NotebookPen size={16} className="text-slate-500" />
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Notes by Category
                  </h4>
                </div>

                <div className="space-y-4">
                  {stats.notesByCategory?.length > 0 ? (
                    stats.notesByCategory.map((item) => (
                      <div key={item.category}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">
                            {item.category}
                          </span>
                          <span className="text-slate-500">{item.count}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-200">
                          <div
                            className="h-2.5 rounded-full bg-[#8971D0]"
                            style={{
                              width: `${Math.max(
                                8,
                                (item.count /
                                  Math.max(
                                    ...stats.notesByCategory.map((x) => x.count),
                                    1
                                  )) *
                                  100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No note data yet.</p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-500" />
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Study Plans by Topic
                  </h4>
                </div>

                <div className="space-y-4">
                  {stats.studyPlansByTopic?.length > 0 ? (
                    stats.studyPlansByTopic.map((item) => (
                      <div key={item.topic}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">
                            {item.topic}
                          </span>
                          <span className="text-slate-500">{item.count}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-200">
                          <div
                            className="h-2.5 rounded-full bg-[#7DACE4]"
                            style={{
                              width: `${Math.max(
                                8,
                                (item.count /
                                  Math.max(
                                    ...stats.studyPlansByTopic.map((x) => x.count),
                                    1
                                  )) *
                                  100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No study topic data yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Target size={16} className="text-slate-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Completion Rate
                  </p>
                </div>
                <p className="text-2xl font-bold tracking-tight text-slate-800">
                  {stats.completionRate}%
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Award size={16} className="text-slate-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Top Note Category
                  </p>
                </div>
                <p className="text-lg font-bold tracking-tight text-slate-800">
                  {stats.topNoteCategory?.category || "—"}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpenCheck size={16} className="text-slate-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    Top Study Topic
                  </p>
                </div>
                <p className="text-lg font-bold tracking-tight text-slate-800">
                  {stats.topStudyTopic?.topic || "—"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0] shadow-sm">
                  <Trophy size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                    Rewards
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                    Badges Earned
                  </h3>
                </div>
              </div>
            </div>

            {stats.badges?.length > 0 ? (
              <div className="space-y-3">
                {stats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-200">
                        <span>{badge.icon}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-slate-800">
                            {badge.label}
                          </h4>
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                            {badge.tier}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                  <Trophy size={22} />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  No badges yet
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Keep studying and completing sessions to unlock rewards.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {alertConfig && (
        <AlertCard
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={closeAlert}
        />
      )}
    </>
  );
};
