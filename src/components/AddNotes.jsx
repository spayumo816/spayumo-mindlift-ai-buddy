import { useState } from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
} from "react-simple-wysiwyg";
import { PlusCircle, Save, X, FileText, Code2, BookOpen } from "lucide-react";
import { createNote } from "../utils/notesAPI";

export const AddNotes = ({ cancelAddNote, onNoteAdded }) => {
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    content: "",
    codeSnippet: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plainTextContent = formData.content.replace(/<[^>]*>/g, "").trim();

    if (!formData.topic.trim() || !plainTextContent) {
      alert("Topic and Notes are required.");
      return;
    }

    try {
      await createNote({
        topic: formData.topic.trim(),
        category: formData.category,
        content: formData.content,
        codeSnippet: formData.codeSnippet,
      });

      setFormData({
        topic: "",
        category: "",
        content: "",
        codeSnippet: "",
      });

      if (onNoteAdded) {
        onNoteAdded();
      }
    } catch (error) {
      console.error("Create note failed:", error.message);
      alert(error.message || "Failed to save note.");
    }
  };

  return (
    <section className="rounded-[28px] border border-white/30 bg-white/92 p-5 shadow-xl backdrop-blur-xl sm:p-6">
      <div className="mb-6 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0]">
            <PlusCircle size={20} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
              Create Note
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
              Add a New Study Note
            </h2>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Save your concepts, examples, and code snippets for future review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BookOpen size={16} className="text-slate-500" />
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g. useState Basics"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText size={16} className="text-slate-500" />
              Category
            </label>
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
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <FileText size={16} className="text-slate-500" />
            Notes
          </label>

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
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <Code2 size={16} className="text-slate-500" />
            Code Snippet
          </label>

          <textarea
            name="codeSnippet"
            value={formData.codeSnippet}
            onChange={handleChange}
            placeholder="Paste example code here..."
            rows="8"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8971D0] px-5 py-3 font-medium text-white shadow-sm transition hover:brightness-110"
          >
            <Save size={18} />
            <span>Save Note</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-200"
            onClick={cancelAddNote}
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </section>
  );
};