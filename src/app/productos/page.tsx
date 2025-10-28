import { PRODUCTS } from "@/app/lib/products";
import ProductosClient from "./ProductosClient";

export default function ProductosPage() {
  return <ProductosClient products={PRODUCTS} />;
}
