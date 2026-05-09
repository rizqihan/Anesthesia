import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div
        className="text-[80px] font-[900] tracking-tight leading-none mb-4 gradient-text"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        404
      </div>
      <h2 className="text-[20px] font-[700] mb-2" style={{ color: 'var(--text-primary)' }}>
        Page Not Found
      </h2>
      <p className="text-[13px] mb-8" style={{ color: 'var(--text-secondary)' }}>
        The resource you requested could not be located.
      </p>
      <Link
        href="/"
        className="btn-primary px-6 py-2.5 text-[13px] rounded-lg"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
