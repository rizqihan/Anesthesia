import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="text-[80px] font-[900] tracking-tight leading-none mb-4 text-slate-100">
        404
      </div>
      <h2 className="text-[20px] font-[700] mb-2 text-slate-100">
        Page Not Found
      </h2>
      <p className="text-[13px] mb-8 text-slate-400">
        The clinical resource you requested could not be located.
      </p>
      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="btn-primary px-6 py-2.5 text-[13px] rounded-xl"
        >
          Return to Dashboard
        </Link>
        <Link
          href="/"
          className="px-6 py-2.5 text-[13px] rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
        >
          Home Overview
        </Link>
      </div>
    </div>
  );
}
