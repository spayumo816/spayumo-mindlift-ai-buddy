import { useEffect, useState } from "react";
import {
  Maximize2,
  Minimize2,
  Trash2,
  Pencil,
  Save,
  X,
  FileText,
  Code2,
  StickyNote,
} from "lucide-react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
} from "react-simple-wysiwyg";

import { updateNote, deleteNote } from "../utils/notesAPI";
import { AlertCard } from "./AlertCard";

export const SelectedNote = ({
  selectedNote,
  setSelectedNote,
  isNoteMaximized,
  setIsNoteMaximized,
  onNoteUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    content: "",
    codeSnippet: "",
  });
  const [alertConfig, setAlertConfig] = useState(null);

  useEffect(() => {
    if (selectedNote) {
      setFormData({
        topic: selectedNote.topic || "",
        category: selectedNote.category || "",
        content: selectedNote.content || "",
        codeSnippet: selectedNote.codeSnippet || "",
      });
      setIsEditing(false);
    }
  }, [selectedNote]);

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

  const handleContentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      topic: selectedNote?.topic || "",
      category: selectedNote?.category || "",
      content: selectedNote?.content || "",
      codeSnippet: selectedNote?.codeSnippet || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const plainTextContent = formData.content.replace(/<[^>]*>/g, "").trim();

    if (!formData.topic.trim() || !plainTextContent) {
      showAlert({
        title: "Missing required fields",
        message: "Topic and Notes are required.",
        type: "error",
      });
      return;
    }

    try {
      const data = await updateNote(selectedNote._id, {
        topic: formData.topic.trim(),
        category: formData.category,
        content: formData.content,
        codeSnippet: formData.codeSnippet,
      });

      setSelectedNote(data.note);
      setIsEditing(false);

      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (error) {
      console.error("Update note failed:", error.message);
      showAlert({
        title: "Update failed",
        message: error.message || "Failed to update note.",
        type: "error",
      });
    }
  };

  const handleDelete = () => {
    showAlert({
      title: "Delete note?",
      message:
        "Are you sure you want to delete this note? This action cannot be undone.",
      type: "error",
      showCancel: true,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteNote(selectedNote._id);

          setSelectedNote(null);
          setIsEditing(false);

          if (isNoteMaximized) {
            setIsNoteMaximized();
          }

          if (onNoteUpdated) {
            onNoteUpdated();
          }

          closeAlert();
        } catch (error) {
          console.error("Delete note failed:", error.message);
          showAlert({
            title: "Delete failed",
            message: error.message || "Failed to delete note.",
            type: "error",
          });
        }
      },
    });
  };

  return (
    <>
      {!selectedNote ? (
        <section className="flex h-full min-h-80 items-center justify-center rounded-[28px] border border-white/35 bg-white/20 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <div className="max-w-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 text-slate-700 shadow-sm">
              <StickyNote size={24} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Notes Workspace
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              No note selected
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Choose a note from the list to view its details, edit its content,
              or review code snippets.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex-1 rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6">
          <div className="mb-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0] shadow-sm">
                    <StickyNote size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                      Selected Note
                    </p>
                    {!isEditing && (
                      <p className="mt-1 text-sm text-slate-500">
                        Review and manage your saved note
                      </p>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      placeholder="Topic"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
                    />

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
                    >
                      <option value="">Select a category</option>
                      <option value="React">React</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="CSS">CSS</option>
                      <option value="HTML">HTML</option>
                      <option value="API">API</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <div className="mt-4">
                    <h3 className="wrap-break-word text-2xl font-bold tracking-tight text-slate-800">
                      {selectedNote.topic}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#8971D0]/10 px-3 py-1 text-xs font-semibold text-[#8971D0]">
                        {selectedNote.category || "General"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#8971D0] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#ADF7D1] px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:shadow-md"
                    >
                      <Pencil size={16} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      title="Delete note"
                      className="inline-flex items-center justify-center rounded-2xl bg-red-500 p-2.5 text-white shadow-sm transition hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  title={isNoteMaximized ? "Minimize note" : "Maximize note"}
                  onClick={setIsNoteMaximized}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 p-2.5 text-white shadow-sm transition hover:bg-slate-800"
                >
                  {isNoteMaximized ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <FileText size={16} className="text-slate-500" />
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Notes
                </h4>
              </div>

              {isEditing ? (
                <EditorProvider>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Toolbar>
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                    </Toolbar>

                    <Editor
                      value={formData.content}
                      onChange={handleContentChange}
                      containerProps={{
                        className: "min-h-[180px] p-4 text-slate-700",
                      }}
                    />
                  </div>
                </EditorProvider>
              ) : (
                <div
                  className="rounded-2xl border border-slate-100 bg-white p-4 text-sm leading-7 text-slate-700 shadow-inner"
                  dangerouslySetInnerHTML={{
                    __html: selectedNote.content || "<p>No notes available.</p>",
                  }}
                />
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Code2 size={16} className="text-slate-500" />
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Code Snippet
                </h4>
              </div>

              {isEditing ? (
                <textarea
                  name="codeSnippet"
                  value={formData.codeSnippet}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Paste your code snippet here..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
                />
              ) : (
                <div className="overflow-x-auto rounded-2xl bg-slate-900 p-4 text-sm text-slate-100 shadow-inner">
                  <pre className="whitespace-pre-wrap wrap-break-word font-mono leading-6">
                    {selectedNote.codeSnippet || "No code snippet available."}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
