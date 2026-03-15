import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const formContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const LoginForm = ({
  loginData,
  showLoginPassword,
  isLoading,
  onLoginChange,
  onTogglePassword,
  onSubmit,
  onShowRegister,
  onForgotPassword,
}) => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-14"
      >
        <motion.form
          onSubmit={onSubmit}
          variants={formContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-md space-y-6"
        >
          <motion.div variants={formItem} className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
              Welcome Back
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Sign in to MindLift AI
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              Continue reviewing notes, organizing ideas, and learning with your
              study assistant.
            </p>
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={onLoginChange}
              placeholder="Enter username"
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7DACE4] focus:ring-4 focus:ring-[#7DACE4]/20"
            />
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={onLoginChange}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 pr-14 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7DACE4] focus:ring-4 focus:ring-[#7DACE4]/20"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              >
                {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={formItem}
            className="flex items-center justify-end"
          >
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-semibold text-[#7DACE4] transition hover:text-slate-800"
            >
              Forgot password?
            </button>
          </motion.div>

          <motion.div variants={formItem}>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7DACE4] px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#6b9dd8] active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </motion.div>

          <motion.p
            variants={formItem}
            className="text-center text-sm text-slate-600"
          >
            No account yet?{" "}
            <button
              type="button"
              onClick={onShowRegister}
              className="font-semibold text-[#8971D0] transition hover:text-slate-800"
            >
              Register here
            </button>
          </motion.p>
        </motion.form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.4 }}
        className="hidden items-center justify-center border-l border-white/40 bg-[#95E8D7]/28 px-10 lg:flex"
      >
        <div className="w-full max-w-sm rounded-[30px] border border-white/50 bg-white/85 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ADF7D1] text-sm font-bold text-slate-700 shadow-sm"
          >
            ML
          </motion.div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            Focus Mode
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Access your saved study notes, coding snippets, and learning tools
            in one quiet and organized workspace.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                text: "Save notes by topic",
                bg: "bg-[#ADF7D1]/35",
              },
              {
                text: "Review concepts later",
                bg: "bg-[#95E8D7]/30",
              },
              {
                text: "Learn with AI support",
                bg: "bg-[#7DACE4]/15",
              },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.3 }}
                className={`rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 ${item.bg}`}
              >
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};