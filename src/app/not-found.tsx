import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold">This page is not on the plan</h1>
      <p className="prose-page mx-auto mt-4">
        The page you were looking for does not exist. Try the masterplan, the project list, or get in
        touch.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Open the masterplan
        </Link>
        <Link href="/projects" className="btn-secondary">
          Browse projects
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact us
        </Link>
      </div>
    </section>
  );
}
