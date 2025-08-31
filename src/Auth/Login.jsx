import React, { useMemo, useState } from "react";

/**
 * Single-file Auth Page (Login + Sign Up)
 * - React + TailwindCSS
 * - Accessible labels, keyboard-friendly, and responsive
 * - Client-side validation + password strength meter
 * - Social auth buttons (placeholders)
 * - Show/Hide password toggle
 *
 * How to use:
 *   export default function App() { return <AuthPage /> }
 */

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordScore = useMemo(() => {
    const p = form.password || "";
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[a-z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score; // 0..5
  }, [form.password]);

  const validate = () => {
    const e = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !emailValid(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    if (form.password && form.password.length < 8) e.password = "Use at least 8 characters.";
    if (mode === "signup" && form.password !== form.confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`${mode === "signin" ? "Signed in" : "Account created"} for ${form.email}`);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative bg-white/90 dark:bg-slate-900/80 backdrop-blur rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
          {/* Top Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400" />

          <div className="p-7 sm:p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm">
                {mode === "signin" ? "Sign in to continue" : "Join us in a few seconds"}
              </p>

              {/* Mode Switch */}
              <div className="mt-4 inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`px-4 py-1.5 text-sm rounded-full transition ${
                    mode === "signin"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                  aria-pressed={mode === "signin"}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`px-4 py-1.5 text-sm rounded-full transition ${
                    mode === "signup"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                  aria-pressed={mode === "signup"}
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <GoogleIcon className="h-4 w-4" /> Google
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <GithubIcon className="h-4 w-4" /> GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-slate-900 px-2 text-xs text-slate-500">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {mode === "signup" && (
                <FormField
                  id="name"
                  label="Full name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  error={errors.name}
                  autoComplete="name"
                />
              )}

              <FormField
                id="email"
                label="Email address"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                error={errors.email}
                autoComplete="email"
              />

              <FormField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                error={errors.password}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                }
              />

              {/* Strength meter for signup */}
              {mode === "signup" && (
                <div className="mt-1.5" aria-live="polite">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded ${i < passwordScore ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Use 8+ chars, with upper/lower case, numbers, and a symbol.
                  </p>
                </div>
              )}

              {mode === "signup" && (
                <FormField
                  id="confirm"
                  label="Confirm password"
                  type={showPassword ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  error={errors.confirm}
                  autoComplete="new-password"
                />
              )}

              {/* Remember / Terms */}
              <div className="mt-4 flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={onChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {mode === "signin" ? "Remember me" : (
                    <span>
                      I agree to the <a className="underline hover:no-underline" href="#">Terms</a>
                      {" "}and <a className="underline hover:no-underline" href="#">Privacy</a>
                    </span>
                  )}
                </label>
                {mode === "signin" && (
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-semibold shadow hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
              >
                {loading && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>

              {/* Switch small link */}
              <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
                {mode === "signin" ? (
                  <>
                    New here?{" "}
                    <button type="button" onClick={() => setMode("signup")} className="font-semibold text-indigo-600 hover:text-indigo-700">
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button type="button" onClick={() => setMode("signin")} className="font-semibold text-indigo-600 hover:text-indigo-700">
                      Sign in instead
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Tiny footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

function FormField({ id, label, type = "text", name, value, onChange, error, autoComplete, rightSlot }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
        {label}
      </label>
      <div className={`flex items-stretch rounded-xl ring-1 ${error ? "ring-rose-400" : "ring-slate-200 dark:ring-slate-700"} focus-within:ring-2 focus-within:ring-indigo-500 bg-white dark:bg-slate-900 overflow-hidden`}>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="w-full px-3 py-2 outline-none bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400"
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightSlot && (
          <div className="px-3 flex items-center">{rightSlot}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.35 11.1H12v2.9h5.3c-.23 1.5-1.8 4.4-5.3 4.4-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.4 3.5 14.4 2.6 12 2.6 6.9 2.6 2.7 6.8 2.7 12s4.2 9.4 9.3 9.4c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6z"/>
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.61-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.34c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.76 0 3.96-2.34 4.82-4.57 5.07.36.32.67.95.67 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
    </svg>
  );
}







// import React from 'react'

// const Login = () => {
//   return (
//     <div className='flex h-screen items-center justify-center gap- '>
//         <div className='border-2 border-red-400 '>
//             <form className='flex flex-col items-center justify-center'>
//                 <input className='text-white outline-none bg-transparent rounded-full py-3 px-5 placeholder:text-amber-50 border-2 border-b-cyan-500'placeholder='Enter Email' type="email" />
//                    <input className='text-white outline-none bg-transparent rounded-full py-3 px-5 placeholder:text-amber-50 border-2 border-b-cyan-500'placeholder='Enter password' type="email" />
//                    <button className='bg-amber-600 text-amber-50 py-3 px-4 rounded'>Login</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Login