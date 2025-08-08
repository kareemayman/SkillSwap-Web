import React from "react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 md:px-16 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-5xl font-bold text-[var(--main-color)] mb-4">404</h1>
      <h2 className="text-2xl font-medium text-[var(--color-text-primary)] mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] mb-8 text-center max-w-xl">
        Oops! The page you're looking for doesn't exist or has been moved.<br />
        Please check the URL or return to the homepage.
      </p>
      <a
        href="/"
        className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow"
      >
        Go Home
      </a>
    </div>
  );
}