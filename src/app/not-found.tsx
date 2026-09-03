import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto max-w-[68ch] px-4 py-24">
      <h1 className="title title-page">Página no encontrada</h1>
      <p className="mt-4 text-muted">
        Esa ruta no existe. Volvé a la calculadora o a las guías.
      </p>
      <p className="mt-6">
        <Link href="/" className="font-semibold text-accent hover:text-accent-hover">
          Ir a la calculadora
        </Link>
      </p>
    </article>
  );
}
