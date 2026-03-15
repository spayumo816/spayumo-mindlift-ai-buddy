import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { verifyEmail, resendVerificationOTP } from "../utils/authAPI";

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

export const VerifyEmailForm = ({
  email,
  setAlert,
  onVerified,
  onBackToLogin,
}) => {
  const [otp, setOtp] = useState("");
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

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      setAlert({
        title: "Missing OTP",
        message: "Please enter the verification code.",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);

      const data = await verifyEmail({
        email,
        otp,
      });

      setAlert({
        title: "Email Verified",
        message: data.message || "Your email has been verified.",
        type: "success",
      });

      onVerified();
    } catch (error) {
      setAlert({
        title: "Verification Failed",
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

      const data = await resendVerificationOTP(email);

      setAlert({
        title: "OTP Sent",
        message: data.message || "A new OTP has been sent to your email.",
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
        <motion.form
          onSubmit={handleVerify}
          variants={formContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-md space-y-6"
        >
          <motion.div variants={formItem} className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
              Verify Email
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Enter Verification Code
            </h1>

            <p className="max-w-sm text-sm leading-6 text-slate-600">
              We sent a 6-digit code to
              <span className="font-semibold"> {email}</span>.
            </p>
          </motion.div>

          <motion.div variants={formItem}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Verification Code
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
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8971D0] px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#7860c3] active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
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
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </motion.p>

          <motion.p
            variants={formItem}
            className="text-center text-sm text-slate-600"
          >
            Already verified?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-semibold text-[#8971D0] transition hover:text-slate-800"
            >
              Back to Login
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
            Secure Verification
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            We verify your email to ensure your account is secure and to enable
            password recovery in the future.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                text: "Protect your account",
                bg: "bg-[#ADF7D1]/35",
              },
              {
                text: "Enable password recovery",
                bg: "bg-[#95E8D7]/30",
              },
              {
                text: "Confirm your email identity",
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