export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>404</h1>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>Page not found</p>
        <a href="/" style={{ marginTop: "1.5rem", display: "inline-block", color: "#6d28d9" }}>
          Go home
        </a>
      </body>
    </html>
  );
}
