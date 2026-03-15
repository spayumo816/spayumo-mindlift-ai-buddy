import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import {
  PanelLeftClose,
  PanelLeftOpen,
  NotebookPen,
  FolderKanban,
  Wrench,
  BookOpenCheck,
  Sparkles,
  LogOut,
  Menu,
  BarChart3,
} from "lucide-react";

import { NotesCard } from "../components/NotesCard";
import { ChatAI } from "../components/ChatAI";
import { SelectedNote } from "../components/SelectedNote";
import { AddNotes } from "../components/AddNotes";
import { Resources } from "../components/Resources";
import { Tools } from "../components/Tools";
import { StudyPlanner } from "../components/StudyPlanner";
import { StatsPanel } from "../components/StatsPanel";
import background from "../assets/background.png";

import { logoutUser, getCurrentUser } from "../utils/authAPI";

const initialDashboardState = {
  currentPage: "notes",
  showAddForm: false,
  showAIChat: false,
  selectedNote: null,
  notesRefreshKey: 0,
  studyRefreshKey: 0,
  statsRefreshKey: 0,
  isNoteMaximized: false,
  searchTerm: "",
  isSidebarCollapsed: false,
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_AI_CHAT":
      return {
        ...state,
        showAIChat: !state.showAIChat,
      };

    case "CLOSE_AI_CHAT":
      return {
        ...state,
        showAIChat: false,
      };

    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };

    case "OPEN_NOTES":
      return {
        ...state,
        currentPage: "notes",
        showAddForm: false,
      };

    case "OPEN_RESOURCES":
      return {
        ...state,
        currentPage: "resources",
        showAddForm: false,
        isNoteMaximized: false,
      };

    case "OPEN_TOOLS":
      return {
        ...state,
        currentPage: "tools",
        showAddForm: false,
        isNoteMaximized: false,
      };

    case "OPEN_STUDY_PLANNER":
      return {
        ...state,
        currentPage: "study-planner",
        showAddForm: false,
        isNoteMaximized: false,
      };

    case "OPEN_STATS":
      return {
        ...state,
        currentPage: "stats",
        showAddForm: false,
        isNoteMaximized: false,
      };

    case "TOGGLE_ADD_FORM":
      return {
        ...state,
        showAddForm: !state.showAddForm,
        isNoteMaximized: false,
      };

    case "CLOSE_ADD_FORM":
      return {
        ...state,
        showAddForm: false,
      };

    case "SELECT_NOTE":
      return {
        ...state,
        selectedNote: action.payload,
      };

    case "SET_SELECTED_NOTE":
      return {
        ...state,
        selectedNote: action.payload,
      };

    case "TOGGLE_NOTE_MAXIMIZED":
      return {
        ...state,
        isNoteMaximized: !state.isNoteMaximized,
      };

    case "SET_NOTE_MAXIMIZED":
      return {
        ...state,
        isNoteMaximized: action.payload,
      };

    case "REFRESH_NOTES":
      return {
        ...state,
        notesRefreshKey: state.notesRefreshKey + 1,
      };

    case "REFRESH_STUDY_PLANS":
      return {
        ...state,
        studyRefreshKey: state.studyRefreshKey + 1,
      };

    case "REFRESH_STATS":
      return {
        ...state,
        statsRefreshKey: state.statsRefreshKey + 1,
      };

    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };

    case "CLEAR_SEARCH_TERM":
      return {
        ...state,
        searchTerm: "",
      };

    default:
      return state;
  }
}

export const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardState, dispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const {
    currentPage,
    showAddForm,
    showAIChat,
    selectedNote,
    notesRefreshKey,
    studyRefreshKey,
    statsRefreshKey,
    isNoteMaximized,
    searchTerm,
    isSidebarCollapsed,
  } = dashboardState;

  const [aiMessages, setAiMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Failed to get current user:", error.message);
        navigate("/", { replace: true });
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleCancelAddNote = () => {
    dispatch({ type: "CLOSE_ADD_FORM" });
  };

  const handleOpenNotes = () => {
    dispatch({ type: "OPEN_NOTES" });
  };

  const handleOpenResources = () => {
    dispatch({ type: "OPEN_RESOURCES" });
  };

  const handleOpenTools = () => {
    dispatch({ type: "OPEN_TOOLS" });
  };

  const handleOpenStudyPlanner = () => {
    dispatch({ type: "OPEN_STUDY_PLANNER" });
  };

  const handleOpenStats = () => {
    dispatch({ type: "OPEN_STATS" });
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const navButtonClass = (isActive, isCollapsed) =>
    `group rounded-2xl font-medium transition-all duration-300 ease-in-out ${
      isCollapsed
        ? "flex items-center justify-center p-3.5"
        : "flex items-center gap-3 px-4 py-3.5 text-left text-sm"
    } ${
      isActive
        ? "border border-white/80 bg-white text-slate-900 shadow-md ring-2 ring-white/60"
        : "border border-white/45 bg-white/78 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-md"
    }`;

  const iconClass = (isActive) =>
    isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900";

  const displayName =
    currentUser?.firstName?.trim() || currentUser?.username || "MindLifter";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(173,247,209,0.78),
            rgba(149,232,215,0.72),
            rgba(125,172,228,0.66)
          ),
          url(${background})
        `,
      }}
    >
      <div className="min-h-screen p-3 sm:p-4 lg:p-6">
        <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl flex-col gap-4 lg:min-h-[calc(100vh-3rem)]">
          <header className="shrink-0 rounded-4xl border border-white/50 bg-white/40 px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/85 text-slate-700 shadow-sm transition hover:bg-white lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={18} />
                </button>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Dashboard
                  </p>
                  <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                    Welcome back, {displayName} 👋
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Ready to learn something new today?
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </header>

          <div className="grid flex-1 gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
            <aside
              className={`
                relative rounded-4xl border border-white/40 bg-white/28 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl
                transition-all duration-300 ease-in-out
                ${
                  isSidebarCollapsed
                    ? "hidden lg:block lg:w-24"
                    : "block w-full lg:w-72"
                }
              `}
            >
              <div
                className={`mb-6 rounded-[26px] border border-white/55 bg-white/58 shadow-sm transition-all duration-300 ${
                  isSidebarCollapsed ? "px-2 py-4 text-center" : "p-4"
                }`}
              >
                <div
                  className={`flex gap-3 ${
                    isSidebarCollapsed
                      ? "flex-col items-center justify-center"
                      : "items-start justify-between"
                  }`}
                >
                  {isSidebarCollapsed ? (
                    <div className="flex flex-col items-center gap-1 transition-opacity duration-200">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-sm">
                        ML
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 transition-opacity duration-200">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-sm">
                        ML
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                          MindLift
                        </h1>
                        <p className="text-sm font-medium text-slate-600">
                          AI Buddy
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                    className="hidden h-9 w-9 items-center justify-center rounded-2xl border border-white/70 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 lg:flex"
                    aria-label={
                      isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                  >
                    {isSidebarCollapsed ? (
                      <PanelLeftOpen size={16} />
                    ) : (
                      <PanelLeftClose size={16} />
                    )}
                  </button>
                </div>

                {!isSidebarCollapsed && (
                  <div className="mt-4 border-t border-slate-300/70 pt-3">
                    <p className="text-xs text-slate-500">
                      Created by{" "}
                      <span className="font-semibold text-slate-800">
                        Stephanie Payumo
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {!isSidebarCollapsed && (
                <div className="mb-3 px-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Workspace
                  </p>
                </div>
              )}

              <div
                className={`grid gap-3 ${
                  isSidebarCollapsed
                    ? "grid-cols-1"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-1"
                }`}
              >
                <button
                  className={navButtonClass(
                    currentPage === "notes",
                    isSidebarCollapsed
                  )}
                  onClick={handleOpenNotes}
                  title={isSidebarCollapsed ? "My Notes" : ""}
                >
                  <NotebookPen
                    size={18}
                    className={iconClass(currentPage === "notes")}
                  />
                  {!isSidebarCollapsed && <span>My Notes</span>}
                </button>

                <button
                  className={navButtonClass(
                    currentPage === "study-planner",
                    isSidebarCollapsed
                  )}
                  onClick={handleOpenStudyPlanner}
                  title={isSidebarCollapsed ? "Study Planner" : ""}
                >
                  <BookOpenCheck
                    size={18}
                    className={iconClass(currentPage === "study-planner")}
                  />
                  {!isSidebarCollapsed && <span>Study Planner</span>}
                </button>

                <button
                  className={navButtonClass(
                    currentPage === "stats",
                    isSidebarCollapsed
                  )}
                  onClick={handleOpenStats}
                  title={isSidebarCollapsed ? "Stats" : ""}
                >
                  <BarChart3
                    size={18}
                    className={iconClass(currentPage === "stats")}
                  />
                  {!isSidebarCollapsed && <span>Stats</span>}
                </button>

                <button
                  className={navButtonClass(
                    currentPage === "resources",
                    isSidebarCollapsed
                  )}
                  onClick={handleOpenResources}
                  title={isSidebarCollapsed ? "My Resources" : ""}
                >
                  <FolderKanban
                    size={18}
                    className={iconClass(currentPage === "resources")}
                  />
                  {!isSidebarCollapsed && <span>My Resources</span>}
                </button>

                <button
                  className={navButtonClass(
                    currentPage === "tools",
                    isSidebarCollapsed
                  )}
                  onClick={handleOpenTools}
                  title={isSidebarCollapsed ? "My Tools" : ""}
                >
                  <Wrench
                    size={18}
                    className={iconClass(currentPage === "tools")}
                  />
                  {!isSidebarCollapsed && <span>My Tools</span>}
                </button>
              </div>
            </aside>

            <main className="min-w-0 rounded-4xl border border-white/35 bg-white/16 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-5">
              {currentPage === "notes" ? (
                <div className="flex h-full flex-col gap-5">
                  <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                          Workspace
                        </p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                          My Notes
                        </h2>
                        <p className="mt-1 text-sm text-white/80">
                          Review, organize, and study smarter.
                        </p>
                      </div>

                      <button
                        className="w-full rounded-2xl bg-white px-5 py-3 font-medium text-slate-800 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg sm:w-auto"
                        onClick={() => dispatch({ type: "TOGGLE_ADD_FORM" })}
                      >
                        + Add Note
                      </button>
                    </div>
                  </div>

                  {!showAddForm && (
                    <div className="rounded-[28px] border border-white/30 bg-white/14 p-3 shadow-sm backdrop-blur-md sm:p-4">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SEARCH_TERM",
                            payload: e.target.value,
                          })
                        }
                        placeholder="Search by topic or category..."
                        className="w-full rounded-2xl border border-white/70 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
                      />
                    </div>
                  )}

                  {showAddForm ? (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                      <AddNotes
                        cancelAddNote={handleCancelAddNote}
                        onNoteAdded={() => {
                          dispatch({ type: "REFRESH_NOTES" });
                          dispatch({ type: "REFRESH_STATS" });
                          dispatch({ type: "CLOSE_ADD_FORM" });
                        }}
                      />
                    </div>
                  ) : isNoteMaximized ? (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                      <SelectedNote
                        selectedNote={selectedNote}
                        setSelectedNote={(note) =>
                          dispatch({ type: "SET_SELECTED_NOTE", payload: note })
                        }
                        isNoteMaximized={isNoteMaximized}
                        setIsNoteMaximized={() =>
                          dispatch({ type: "TOGGLE_NOTE_MAXIMIZED" })
                        }
                        onNoteUpdated={() => {
                          dispatch({ type: "REFRESH_NOTES" });
                          dispatch({ type: "REFRESH_STATS" });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-4 xl:grid-cols-[minmax(0,390px)_minmax(0,1fr)]">
                      <div className="min-w-0">
                        <NotesCard
                          setSelectedNote={(note) =>
                            dispatch({ type: "SELECT_NOTE", payload: note })
                          }
                          selectedNote={selectedNote}
                          refreshKey={notesRefreshKey}
                          searchTerm={searchTerm}
                        />
                      </div>

                      <div className="min-w-0">
                        <SelectedNote
                          selectedNote={selectedNote}
                          setSelectedNote={(note) =>
                            dispatch({
                              type: "SET_SELECTED_NOTE",
                              payload: note,
                            })
                          }
                          isNoteMaximized={isNoteMaximized}
                          setIsNoteMaximized={() =>
                            dispatch({ type: "TOGGLE_NOTE_MAXIMIZED" })
                          }
                          onNoteUpdated={() => {
                            dispatch({ type: "REFRESH_NOTES" });
                            dispatch({ type: "REFRESH_STATS" });
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : currentPage === "resources" ? (
                <Resources />
              ) : currentPage === "tools" ? (
                <Tools />
              ) : currentPage === "study-planner" ? (
                <StudyPlanner refreshKey={studyRefreshKey} />
              ) : currentPage === "stats" ? (
                <StatsPanel refreshKey={statsRefreshKey} />
              ) : null}
            </main>
          </div>
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: "TOGGLE_AI_CHAT" })}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-white shadow-[0_20px_50px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_24px_60px_rgba(15,23,42,0.35)] sm:px-5"
        aria-label="Open AI assistant"
      >
        <Sparkles size={18} />
        <span className="hidden text-sm font-medium sm:inline">Ask AI</span>
      </button>

      {showAIChat && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => dispatch({ type: "CLOSE_AI_CHAT" })}
          />

          <div className="absolute right-0 top-0 h-full w-full sm:w-104 lg:w-124">
            <div className="h-full overflow-hidden border-l border-slate-200/80 bg-white shadow-2xl">
              <ChatAI
                closeChat={() => dispatch({ type: "CLOSE_AI_CHAT" })}
                messages={aiMessages}
                setMessages={setAiMessages}
                onNoteSaved={(savedNote) => {
                  dispatch({ type: "REFRESH_NOTES" });
                  dispatch({ type: "REFRESH_STATS" });
                  dispatch({ type: "OPEN_NOTES" });
                  dispatch({ type: "SET_SELECTED_NOTE", payload: savedNote });
                }}
                onStudyPlanSaved={() => {
                  dispatch({ type: "REFRESH_STUDY_PLANS" });
                  dispatch({ type: "REFRESH_STATS" });
                  dispatch({ type: "OPEN_STUDY_PLANNER" });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
