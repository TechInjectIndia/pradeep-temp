"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Something went wrong</h1>
        <button
          onClick={reset}
          style={{ marginTop: "1.5rem", padding: "0.5rem 1rem", background: "#6d28d9", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
