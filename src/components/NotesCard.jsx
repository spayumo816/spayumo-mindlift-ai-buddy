import { useEffect, useState } from "react";
import { getUserNotes } from "../utils/notesAPI";
import { NotebookPen, ChevronRight } from "lucide-react";

export const NotesCard = ({
  setSelectedNote,
  selectedNote,
  refreshKey,
  searchTerm,
}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getUserNotes();
        setNotes(data.notes || []);
      } catch (error) {
        console.error("Failed to fetch notes:", error.message);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [refreshKey]);

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    const topic = (note.topic || "").toLowerCase();
    const category = (note.category || "").toLowerCase();

    return topic.includes(search) || category.includes(search);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="h-full rounded-[28px] border border-white/35 bg-white/20 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-5">
      <div className="mb-5 rounded-3xl border border-white/40 bg-white/18 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/85 text-slate-700 shadow-sm">
              <NotebookPen size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Notes Library
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight text-white">
                Recent Notes
              </h3>
              <p className="mt-1 text-xs text-white/75">
                Your latest saved study notes
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
          </span>
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        <div className="space-y-3">
          {filteredNotes.map((note) => {
            const isSelected = selectedNote?._id === note._id;

            return (
              <button
                key={note._id}
                type="button"
                onClick={() => setSelectedNote(note)}
                className={`w-full rounded-3xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-[#8971D0]/50 bg-white shadow-[0_14px_34px_rgba(137,113,208,0.14)] ring-2 ring-[#8971D0]/20"
                    : "border-white/45 bg-white/92 shadow-sm hover:-translate-y-0.5 hover:border-white hover:bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#8971D0]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8971D0]">
                        {note.category || "General"}
                      </span>

                      {isSelected && (
                        <span className="rounded-full bg-[#8971D0] px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
                          Selected
                        </span>
                      )}
                    </div>

                    <h4 className="line-clamp-1 text-base font-bold tracking-tight text-slate-800 sm:text-lg">
                      {note.topic || "Untitled Note"}
                    </h4>

                    <div
                      className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600"
                      dangerouslySetInnerHTML={{
                        __html: note.content || "No content",
                      }}
                    />

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200/80 pt-3">
                      <span className="text-xs font-medium text-slate-400">
                        Updated {formatDate(note.updatedAt || note.createdAt)}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition group-hover:text-slate-700">
                        View
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/45 bg-white/80 px-5 py-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
            <NotebookPen size={20} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            No notes found
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {searchTerm.trim() ? (
              <>
                Try a different keyword for{" "}
                <span className="font-semibold text-slate-700">
                  "{searchTerm}"
                </span>
                .
              </>
            ) : (
              "Your saved notes will appear here."
            )}
          </p>
        </div>
      )}
    </section>
  );
};
