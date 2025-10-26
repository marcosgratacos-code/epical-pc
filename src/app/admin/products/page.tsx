import { prisma } from "@/lib/prisma";
import ProductsTable from "./ui/ProductsTable";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SP = {
  q?: string;
  tag?: "OFERTA" | "NUEVO" | "TOP_VENTAS" | "";
  stock?: "in" | "out" | "";
  page?: string;
  pageSize?: string;
  sort?: "createdAt" | "price" | "name";
  dir?: "asc" | "desc";
};

function parseParams(sp: SP) {
  const q = (sp.q ?? "").trim();
  const tag = (sp.tag ?? "") as SP["tag"];
  const stock = (sp.stock ?? "") as SP["stock"];

  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const pageSizeRaw = parseInt(sp.pageSize ?? "10", 10) || 10;
  const pageSize = [10, 25, 50].includes(pageSizeRaw) ? pageSizeRaw : 10;

  const sort = sp.sort ?? "createdAt";
  const dir = sp.dir === "asc" || sp.dir === "desc" ? sp.dir : "desc";

  return { q, tag, stock, page, pageSize, sort, dir };
}

async function getData(sp: ReturnType<typeof parseParams>) {
  const where: any = { AND: [] as any[] };

  if (sp.q) {
    where.AND.push({
      OR: [
        { name: { contains: sp.q } },
        { sku: { contains: sp.q } },
        { slug: { contains: sp.q } },
      ],
    });
  }
  if (sp.tag) where.AND.push({ tag: sp.tag });
  if (sp.stock === "in") where.AND.push({ inStock: true });
  if (sp.stock === "out") where.AND.push({ inStock: false });
  if (!where.AND.length) delete where.AND;

  const total = await prisma.product.count({ where });

  const skip = (sp.page - 1) * sp.pageSize;
  const take = sp.pageSize;

  const orderByKey = sp.sort as "createdAt" | "price" | "name";
  const orderBy = { [orderByKey]: sp.dir };

  const products = await prisma.product.findMany({
    where,
    orderBy: orderBy as any,
    skip,
    take,
  });

  const totalsAll = await prisma.product.groupBy({
    by: ["inStock"],
    _count: { _all: true },
  });

  const totals = {
    totalAll: await prisma.product.count(),
    inStock: totalsAll.find(t => t.inStock)?._count._all ?? 0,
    out: totalsAll.find(t => !t.inStock)?._count._all ?? 0,
  };

  return { products, total, totals, skip, take };
}

export default async function AdminProductsPage({ searchParams }: { searchParams: SP }) {
  const params = parseParams(searchParams);
  const { products, total, totals, skip, take } = await getData(params);

  return (
    <div className="p-4 sm:p-6">
      <ProductsTable
        products={products}
        totals={totals}
        initialFilters={{
          q: params.q,
          tag: params.tag,
          stock: params.stock,
          page: params.page,
          pageSize: params.pageSize,
          sort: params.sort,
          dir: params.dir,
        }}
        paging={{
          total,
          page: params.page,
          pageSize: params.pageSize,
          showingFrom: total ? skip + 1 : 0,
          showingTo: Math.min(skip + take, total),
          totalPages: Math.max(1, Math.ceil(total / params.pageSize)),
        }}
      />
    </div>
  );
}
