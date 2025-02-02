import React, { useState } from "react";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/src/assets/img/login_bg.jpg')] bg-cover bg-center dark:bg-[url('/src/assets/img/login_bg.jpg')] dark:bg-cover dark:bg-center] text-foreground">
      <div
        style={{ backgroundColor: "hsl(var(--background))" }}
        className="absolute top-0 left-0 w-full h-full opacity-50 blur-lg"
      ></div>

      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-card text-card-foreground shadow-gray-700 dark:shadow-gray-900 z-20">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-muted-foreground text-center text-sm mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 bg-input text-foreground rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-2 rounded-lg transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
