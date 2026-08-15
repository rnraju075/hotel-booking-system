import {
  Link
} from "react-router";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="mt-4 text-slate-400">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950"
      >
        Go Home
      </Link>
    </main>
  );
}