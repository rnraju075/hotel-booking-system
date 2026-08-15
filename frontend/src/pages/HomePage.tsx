import {
  useQuery
} from "@tanstack/react-query";

import {
  getApiStatus
} from "../features/system/system.api";

export function HomePage() {
  const {
    data,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: [
      "system",
      "api-status"
    ],

    queryFn: getApiStatus
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
          Hotel Booking System
        </p>

        <h1 className="text-center text-4xl font-bold sm:text-6xl">
          Hotel Booking &
          Management Platform
        </h1>

        <p className="mt-6 max-w-2xl text-center text-lg text-slate-300">
          React, GraphQL,
          Socket.IO, PostgreSQL,
          Redis, Docker,
          Kubernetes and AWS.
        </p>

        <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">
            Backend Connection
          </h2>

          {isPending && (
            <p className="mt-4 text-slate-400">
              Checking backend...
            </p>
          )}

          {isError && (
            <p className="mt-4 text-red-400">
              {error instanceof Error
                ? error.message
                : "Unable to connect to backend"}
            </p>
          )}

          {data && (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                Status:{" "}
                <span className="font-semibold text-green-400">
                  {data.status}
                </span>
              </p>

              <p>
                Service:{" "}
                {data.service}
              </p>

              <p>
                Environment:{" "}
                {data.environment}
              </p>

              <p className="break-all text-slate-400">
                Request ID:{" "}
                {data.requestId}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}