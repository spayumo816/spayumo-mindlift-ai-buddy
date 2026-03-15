import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { forgotPassword, resetPassword } from "../utils/authAPI";

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

export const ForgotPasswordForm = ({
  setAlert,
  onBackToLogin,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = await forgotPassword(email);

      setAlert({
        title: "OTP Sent",
        message: data.message || "A reset OTP has been sent to your email.",
        type: "success",
      });

      setStep(2);
      setResendCooldown(30);
    } catch (error) {
      setAlert({
        title: "Request Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = await resetPassword({
        email,
        otp,
        newPassword,
      });

      setAlert({
        title: "Password Reset Successful",
        message: data.message || "You can now login with your new password.",
        type: "success",
      });

      onSuccess();
    } catch (error) {
      setAlert({
        title: "Reset Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);

      const data = await forgotPassword(email);

      setAlert({
        title: "OTP Sent",
        message: data.message || "A new reset OTP has been sent to your email.",
        type: "success",
      });

      setResendCooldown(30);
    } catch (error) {
      setAlert({
        title: "Resend Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-14"
      >
        {step === 1 ? (
          <motion.form
            key="forgot-step-1"
            onSubmit={handleSendOTP}
            variants={formContainer}
            initial="hidden"
            animate="show"
            className="w-full max-w-md space-y-6"
          >
            <motion.div variants={formItem} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                Forgot Password
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Reset Your Password
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                Enter your email and we’ll send you a reset code.
              </p>
            </motion.div>

            <motion.div variants={formItem}>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7DACE4] focus:ring-4 focus:ring-[#7DACE4]/20"
              />
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
                    Sending...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </motion.div>

            <motion.p
              variants={formItem}
              className="text-center text-sm text-slate-600"
            >
              Remembered your password?{" "}
              <button
                type="button"
                onClick={onBackToLogin}
                className="font-semibold text-[#8971D0] transition hover:text-slate-800"
              >
                Back to Login
              </button>
            </motion.p>
          </motion.form>
        ) : (
          <motion.form
            key="forgot-step-2"
            onSubmit={handleResetPassword}
            variants={formContainer}
            initial="hidden"
            animate="show"
            className="w-full max-w-md space-y-6"
          >
            <motion.div variants={formItem} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                Reset Password
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Enter Reset Code
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                We sent a reset code to
                <span className="font-semibold"> {email}</span>.
              </p>
            </motion.div>

            <motion.div variants={formItem}>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Reset Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-center text-lg tracking-widest text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
              />
            </motion.div>

            <motion.div variants={formItem}>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 pr-14 text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#8971D0] focus:ring-4 focus:ring-[#8971D0]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </motion.div>

            <motion.p
              variants={formItem}
              className="text-center text-sm text-slate-600"
            >
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || resendCooldown > 0}
                className="font-semibold text-[#7DACE4] transition hover:text-slate-800 disabled:opacity-60"
              >
                {isResending
                  ? "Sending..."
                  : resendCooldown > 0
                  ? `Resend Code in ${resendCooldown}s`
                  : "Resend Code"}
              </button>
            </motion.p>

            <motion.p
              variants={formItem}
              className="text-center text-sm text-slate-600"
            >
              Want to go back?{" "}
              <button
                type="button"
                onClick={onBackToLogin}
                className="font-semibold text-[#8971D0] transition hover:text-slate-800"
              >
                Back to Login
              </button>
            </motion.p>
          </motion.form>
        )}
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
            Account Recovery
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Reset your password securely with a time-limited code sent to your
            verified email.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                text: "Verified email required",
                bg: "bg-[#ADF7D1]/35",
              },
              {
                text: "Time-limited reset code",
                bg: "bg-[#95E8D7]/30",
              },
              {
                text: "Secure password recovery",
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