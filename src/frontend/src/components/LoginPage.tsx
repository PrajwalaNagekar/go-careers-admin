import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Briefcase, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient background with features */}
      <div
        className="hidden lg:flex w-[45%] flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #0E2A55 50%, #1a3a7a 100%)",
        }}
      >
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10"
          style={{ background: "#2F80ED" }}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10"
          style={{ background: "#60A5FA" }}
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full opacity-5"
          style={{ background: "#93C5FD" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-8"
          >
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)",
              }}
            >
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-4"
          >
            GoCareer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 text-lg mb-12 max-w-sm"
          >
            The complete platform for recruitment management
          </motion.p>

          {/* Features list */}
          <div className="space-y-4">
            {[
              { title: "Secure", desc: "Enterprise-grade authentication" },
              { title: "Real-time", desc: "Live analytics and updates" },
              { title: "Scalable", desc: "Built for growth" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{feature.title}</p>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-4">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-gray-50 to-white">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-left"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-sm">
                  Sign in to your admin dashboard
                </p>
              </motion.div>
            </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 py-6"
            data-ocid="login.dialog"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Email Address
                </Label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gocareer.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 text-sm font-medium transition-all placeholder:text-gray-400"
                    data-ocid="login.input"
                  />
                </motion.div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-800"
                >
                  Password
                </Label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 text-sm font-medium transition-all pr-12 placeholder:text-gray-400"
                    data-ocid="login.input"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.button>
                </motion.div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <motion.button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  whileHover={{ x: 2 }}
                  data-ocid="login.forgot_password"
                >
                  Forgot Password?
                </motion.button>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background: isLoading
                      ? "#9CA3AF"
                      : "linear-gradient(135deg, #2F80ED 0%, #1E40AF 100%)",
                  }}
                  disabled={isLoading}
                  data-ocid="login.submit_button"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        aria-hidden="true"
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </motion.div>


            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-center"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} GoCareer. All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Support text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-blue-100 mt-6"
        >
          Need help? Contact{" "}
          <button
            type="button"
            className="font-semibold text-white hover:text-blue-100 transition-colors underline"
            data-ocid="login.support"
          >
            support@gocareer.com
          </button>
        </motion.p>
      </motion.div>
    </div>
    </div>
  ); 
}