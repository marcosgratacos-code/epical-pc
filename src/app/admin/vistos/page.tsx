import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminRecentlyViewedClient from "./AdminRecentlyViewedClient";
import { notFound } from "next/navigation";

export default async function AdminVistosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "admin") notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Admin · Vistos recientemente
      </h1>
      <p className="text-white/60 mt-2">
        Analiza los productos que ven tus usuarios. Filtros, búsqueda, paginación y exportación CSV.
      </p>
      {/* Cliente interactivo */}
      <AdminRecentlyViewedClient />
    </div>
  );
}
