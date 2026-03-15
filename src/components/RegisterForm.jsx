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

export const RegisterForm = ({
  registerData,
  showRegisterPassword,
  isLoading,
  onRegisterChange,
  onTogglePassword,
  onSubmit,
  onShowLogin,
}) => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.4 }}
        className="hidden items-center justify-center border-r border-white/40 bg-[#95E8D7]/28 px-10 lg:flex"
      >
        <div className="w-full max-w-sm rounded-[30px] border border-white/50 bg-white/85 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8971D0]/18 text-sm font-bold text-slate-700 shadow-sm"
          >
            ML
          </motion.div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            Start Fresh
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create a simple demo account and build your own study space for
            notes, code, and resources.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                text: "Organize study notes",
                bg: "bg-[#95E8D7]/28",
              },
              {
                text: "Keep code snippets nearby",
                bg: "bg-[#7DACE4]/14",
              },
              {
                text: "Explore learning resources",
                bg: "bg-[#8971D0]/12",
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

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-14"
      >
        <motion.form
          onSubmit={onSubmit}
          variants={formContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-md space-y-5"
        >
          <motion.div variants={formItem} className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
              New Here
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Create your account
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              Register a demo account to explore the MindLift AI Buddy
              experience.
            </p>
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={onRegisterChange}
              placeholder="Enter your first name"
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
            />
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={onRegisterChange}
              placeholder="Choose username"
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
            />
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={onRegisterChange}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
            />
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={onRegisterChange}
                placeholder="Create password"
                className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 pr-14 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              >
                {showRegisterPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div variants={formItem}>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8971D0] px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#7860c3] active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </motion.div>

          <motion.p
            variants={formItem}
            className="text-center text-sm text-slate-600"
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={onShowLogin}
              className="font-semibold text-[#7DACE4] transition hover:text-slate-800"
            >
              Login here
            </button>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};