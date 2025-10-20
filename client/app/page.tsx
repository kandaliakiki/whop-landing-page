import LeadForm from "../components/lead-form";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-[360px] text-center">
        <h2 className="text-[1.6rem] font-semibold mb-2">Get early access.</h2>
        <p className="mb-6 text-base opacity-90">
          Drop your email and pick your side.
        </p>
        <LeadForm />
        <p className="mt-6 text-sm text-gray-500">
          Limited pre-sale access ·{" "}
          <a className="text-[color:var(--accent)]" href="#">
            Don’t miss out
          </a>
        </p>
      </div>
    </main>
  );
}
