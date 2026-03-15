import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCard } from "../components/AlertCard";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { VerifyEmailForm } from "../components/VerifyEmailForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import background from "../assets/background.png";

import { registerUser, loginUser } from "../utils/authAPI";

const pageTransition = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

const titleVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.28 },
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [alert, setAlert] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState("");

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const initialLoginForm = {
    username: "",
    password: "",
  };

  const initialRegisterForm = {
    firstName: "",
    username: "",
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialLoginForm);
  const [registerData, setRegisterData] = useState(initialRegisterForm);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetLoginForm = () => {
    setLoginData(initialLoginForm);
    setShowLoginPassword(false);
  };

  const resetRegisterForm = () => {
    setRegisterData(initialRegisterForm);
    setShowRegisterPassword(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsRegisterLoading(true);

      const data = await registerUser(registerData);

      setVerificationEmail(registerData.email.trim().toLowerCase());

      setAlert({
        title: "Success",
        message:
          data.message || "Registration successful. Please verify your email.",
        type: "success",
      });

      resetRegisterForm();
      setView("verify-email");
    } catch (error) {
      setAlert({
        title: "Registration Failed",
        message: error.message,
        type: "error",
      });

      resetRegisterForm();
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoginLoading(true);

      await loginUser(loginData);

      resetLoginForm();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setAlert({
        title: "Login Failed",
        message: error.message,
        type: "error",
      });

      resetLoginForm();
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setAlert(null);
    setView("forgot-password");
  };

  const getTitle = () => {
    switch (view) {
      case "login":
        return "Login";
      case "register":
        return "Register";
      case "verify-email":
        return "Verify Email";
      case "forgot-password":
        return "Forgot Password";
      default:
        return "Login";
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(173,247,209,0.78),
            rgba(149,232,215,0.72),
            rgba(125,172,228,0.68)
          ),
          url(${background})
        `,
      }}
    >
      {alert && (
        <AlertCard
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <motion.div
          layout
          className="relative w-full overflow-hidden rounded-[36px] border border-white/50 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
        >
          <div className="border-b border-white/50 bg-white/45 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="relative h-8 min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={view}
                    initial={titleVariants.initial}
                    animate={titleVariants.animate}
                    exit={titleVariants.exit}
                    transition={titleVariants.transition}
                    className="absolute left-0 top-0 truncate text-2xl font-bold tracking-tight text-slate-800"
                  >
                    {getTitle()}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6">
                <a
                  href="/blog-demo"
                  className="transition hover:text-[#8971D0]"
                >
                  About
                </a>

                <a
                  href="/about-demo"
                  className="hidden transition hover:text-slate-800 sm:inline"
                >
                  GitHub
                </a>

                <a
                  href="/journey-demo"
                  className="hidden transition hover:text-slate-800 sm:inline"
                >
                  Blog
                </a>
              </nav>
            </div>
          </div>

          <div className="relative min-h-200 lg:min-h-168">
            <AnimatePresence mode="wait">
              {view === "login" && (
                <motion.div
                  key="login"
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                  transition={pageTransition.transition}
                  className="absolute inset-0"
                >
                  <LoginForm
                    loginData={loginData}
                    showLoginPassword={showLoginPassword}
                    isLoading={isLoginLoading}
                    onLoginChange={handleLoginChange}
                    onTogglePassword={() =>
                      setShowLoginPassword((prev) => !prev)
                    }
                    onSubmit={handleLogin}
                    onShowRegister={() => {
                      setAlert(null);
                      setView("register");
                    }}
                    onForgotPassword={handleForgotPassword}
                  />
                </motion.div>
              )}

              {view === "register" && (
                <motion.div
                  key="register"
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                  transition={pageTransition.transition}
                  className="absolute inset-0"
                >
                  <RegisterForm
                    registerData={registerData}
                    showRegisterPassword={showRegisterPassword}
                    isLoading={isRegisterLoading}
                    onRegisterChange={handleRegisterChange}
                    onTogglePassword={() =>
                      setShowRegisterPassword((prev) => !prev)
                    }
                    onSubmit={handleRegister}
                    onShowLogin={() => {
                      setAlert(null);
                      setView("login");
                    }}
                  />
                </motion.div>
              )}

              {view === "verify-email" && (
                <motion.div
                  key="verify-email"
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                  transition={pageTransition.transition}
                  className="absolute inset-0"
                >
                  <VerifyEmailForm
                    email={verificationEmail}
                    setAlert={setAlert}
                    onVerified={() => {
                      setAlert(null);
                      setView("login");
                      setVerificationEmail("");
                    }}
                    onBackToLogin={() => {
                      setAlert(null);
                      setVerificationEmail("");
                      setView("login");
                    }}
                  />
                </motion.div>
              )}

              {view === "forgot-password" && (
                <motion.div
                  key="forgot-password"
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                  transition={pageTransition.transition}
                  className="absolute inset-0"
                >
                  <ForgotPasswordForm
                    setAlert={setAlert}
                    onBackToLogin={() => {
                      setAlert(null);
                      setView("login");
                    }}
                    onSuccess={() => {
                      setAlert(null);
                      setView("login");
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
};