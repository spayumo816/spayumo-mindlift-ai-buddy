import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  Trash2,
  X,
  SendHorizonal,
  Bot,
  User,
  Code2,
  Brain,
  FileText,
  HelpCircle,
  BookmarkPlus,
  Check,
  CalendarPlus,
} from "lucide-react";
import {
  sendAIMessage,
  getAIChatHistory,
  clearAIChatHistory,
  saveAIMessageToNotes,
  saveAIMessageToStudyPlan,
} from "../utils/aiChatAPI";
import { AlertCard } from "./AlertCard";

export const ChatAI = ({
  closeChat,
  messages,
  setMessages,
  onNoteSaved,
  onStudyPlanSaved,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [alertConfig, setAlertConfig] = useState(null);
  const [savingNoteIndex, setSavingNoteIndex] = useState(null);
  const [savingPlanIndex, setSavingPlanIndex] = useState(null);
  const [savedNoteIndexes, setSavedNoteIndexes] = useState([]);
  const [savedPlanIndexes, setSavedPlanIndexes] = useState([]);
  const chatEndRef = useRef(null);

  const defaultAIMessage = {
    role: "assistant",
    content:
      "Hi! I'm your MindLift AI Buddy 👋\n\nI can help you learn faster.\n\nTry asking me for:\n\n- Simple explanations\n- Code examples\n- Memory tricks\n- Quick summaries",
  };

  const quickPrompts = [
    {
      label: "Explain simply",
      prompt: "Explain this simply.",
      icon: Sparkles,
    },
    {
      label: "Show example",
      prompt: "Give me a simple example.",
      icon: Code2,
    },
    {
      label: "Memory trick",
      prompt: "Create a memory trick for this.",
      icon: Brain,
    },
    {
      label: "Summarize",
      prompt: "Summarize this for me.",
      icon: FileText,
    },
    {
      label: "Quiz me",
      prompt: "Quiz me on this topic.",
      icon: HelpCircle,
    },
  ];

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = await getAIChatHistory();

        const filteredMessages =
          data.messages?.filter((msg) => msg.role !== "system") || [];

        if (filteredMessages.length > 0) {
          setMessages(filteredMessages);
        } else {
          setMessages([defaultAIMessage]);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error.message);
        setMessages([defaultAIMessage]);
      } finally {
        setHistoryLoaded(true);
      }
    };

    fetchChatHistory();
  }, [setMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

  const sendPromptToAI = async (promptText) => {
    if (!promptText.trim() || loading) return;

    const trimmedInput = promptText.trim();

    const userMessage = {
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await sendAIMessage(trimmedInput);

      const aiMessage = {
        role: "assistant",
        content: data.reply || "Sorry, I could not generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI send failed:", error.message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "MindLift AI failed to respond. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const currentInput = input;
    setInput("");
    await sendPromptToAI(currentInput);
  };

  const handleQuickPrompt = async (prompt) => {
    if (loading) return;
    await sendPromptToAI(prompt);
  };

  const handleClearChat = async () => {
    if (loading) return;

    try {
      await clearAIChatHistory();
      setMessages([defaultAIMessage]);
      setSavedNoteIndexes([]);
      setSavedPlanIndexes([]);
    } catch (error) {
      console.error("Failed to clear chat history:", error.message);
    }
  };

  const handleSaveToNotes = async (messageContent, index) => {
    if (savingNoteIndex !== null || savedNoteIndexes.includes(index)) return;

    try {
      setSavingNoteIndex(index);

      const data = await saveAIMessageToNotes(messageContent);

      setSavedNoteIndexes((prev) =>
        prev.includes(index) ? prev : [...prev, index]
      );

      if (onNoteSaved && data.note) {
        onNoteSaved(data.note);
      }

      showAlert({
        title: "Saved to Notes",
        message: "The AI response has been saved to your notes.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save AI response:", error.message);

      showAlert({
        title: "Save failed",
        message: error.message || "Failed to save AI response to notes.",
        type: "error",
      });
    } finally {
      setSavingNoteIndex(null);
    }
  };

  const handleSaveToStudyPlan = async (messageContent, index) => {
    if (savingPlanIndex !== null || savedPlanIndexes.includes(index)) return;

    try {
      setSavingPlanIndex(index);

      const data = await saveAIMessageToStudyPlan(messageContent);

      setSavedPlanIndexes((prev) =>
        prev.includes(index) ? prev : [...prev, index]
      );

      if (onStudyPlanSaved && data.studyPlan) {
        onStudyPlanSaved(data.studyPlan);
      }

      showAlert({
        title: "Saved as Study Plan",
        message: "The AI response has been saved as a study plan.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save AI response as study plan:", error.message);

      showAlert({
        title: "Save failed",
        message: error.message || "Failed to save AI response as study plan.",
        type: "error",
      });
    } finally {
      setSavingPlanIndex(null);
    }
  };

  return (
    <>
      <div className="flex h-full min-h-0 flex-col bg-linear-to-b from-white to-slate-50/80">
        <div className="shrink-0 border-b border-slate-200/80 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8971D0]/10 text-[#8971D0] shadow-sm">
                <Sparkles size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                  AI Assistant
                </p>
                <h2 className="mt-1 text-base font-semibold text-slate-800">
                  MindLift Assistant
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explanations, examples, summaries, and study help.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleClearChat}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Clear</span>
              </button>

              <button
                type="button"
                onClick={closeChat}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {!historyLoaded ? (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                  <Bot size={18} />
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  Loading chat history...
                </div>
              </div>
            ) : (
              messages.map((msg, index) =>
                msg.role === "user" ? (
                  <div key={index} className="flex justify-end">
                    <div className="flex max-w-[88%] items-end gap-3">
                      <div className="whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#8971D0] px-4 py-3 text-sm leading-6 text-white shadow-sm">
                        {msg.content}
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                        <User size={16} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#8971D0] shadow-sm ring-1 ring-slate-200">
                      <Bot size={18} />
                    </div>

                    <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                      <div className="prose prose-sm max-w-none text-slate-700 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:mb-2 prose-headings:mt-3 prose-pre:my-3 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:p-4 prose-pre:text-slate-100 prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ inline, children, ...props }) {
                              if (inline) {
                                return (
                                  <code
                                    className="rounded bg-slate-100 px-1 py-0.5 text-[0.9em]"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              }

                              return (
                                <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100">
                                  <code {...props}>{children}</code>
                                </pre>
                              );
                            },
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-3">
                        <button
                          type="button"
                          onClick={() => handleSaveToNotes(msg.content, index)}
                          disabled={
                            savingNoteIndex === index ||
                            savedNoteIndexes.includes(index)
                          }
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
                            savedNoteIndexes.includes(index)
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          } disabled:cursor-not-allowed disabled:opacity-70`}
                        >
                          {savedNoteIndexes.includes(index) ? (
                            <>
                              <Check size={14} />
                              <span>Saved Note</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus size={14} />
                              <span>
                                {savingNoteIndex === index
                                  ? "Saving..."
                                  : "Save to Notes"}
                              </span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleSaveToStudyPlan(msg.content, index)
                          }
                          disabled={
                            savingPlanIndex === index ||
                            savedPlanIndexes.includes(index)
                          }
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
                            savedPlanIndexes.includes(index)
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          } disabled:cursor-not-allowed disabled:opacity-70`}
                        >
                          {savedPlanIndexes.includes(index) ? (
                            <>
                              <Check size={14} />
                              <span>Saved Plan</span>
                            </>
                          ) : (
                            <>
                              <CalendarPlus size={14} />
                              <span>
                                {savingPlanIndex === index
                                  ? "Saving..."
                                  : "Save as Plan"}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            )}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#8971D0] shadow-sm ring-1 ring-slate-200">
                  <Bot size={18} />
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  MindLift AI is thinking...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200/80 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-5">
          <div className="mx-auto max-w-3xl">
            {input.trim() === "" && (
              <div className="mb-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Quick start
                </p>

                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map(({ label, prompt, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <Icon size={14} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex min-w-0 items-end gap-3">
              <textarea
                name="askAI"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Ask MindLift Assistant..."
                className="min-h-13 max-h-32 min-w-0 flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/15"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={loading}
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-[#8971D0] px-4 py-3 font-medium text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SendHorizonal size={17} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
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
