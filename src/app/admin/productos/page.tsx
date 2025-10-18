"use client";

import { useState } from "react";
import { PRODUCTS, type Product } from "../../lib/products";
import Image from "next/image";

export default function AdminProductos() {
  const [productos, setProductos] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStock, setFilterStock] = useState<"todos" | "stock" | "sin-stock">("todos");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar productos
  const productosFiltrados = productos.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStock = 
      filterStock === "todos" ? true :
      filterStock === "stock" ? p.inStock :
      !p.inStock;
    
    return matchSearch && matchStock;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProductos(productos.filter(p => p.id !== productId));
      alert("✅ Producto eliminado (simulado - en producción se eliminaría de la BD)");
    }
  };

  const handleToggleStock = (productId: string) => {
    setProductos(productos.map(p => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Productos</h1>
          <p className="text-white/60">Administra el catálogo de PCs gaming</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all"
        >
          ➕ Añadir Producto
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-white/60 text-sm mb-1">Total Productos</p>
          <p className="text-2xl font-bold">{productos.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-white/60 text-sm mb-1">En Stock</p>
          <p className="text-2xl font-bold text-green-400">{productos.filter(p => p.inStock).length}</p>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-white/60 text-sm mb-1">Sin Stock</p>
          <p className="text-2xl font-bold text-red-400">{productos.filter(p => !p.inStock).length}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <select
          value={filterStock}
          onChange={(e) => setFilterStock(e.target.value as any)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <option value="todos">Todos</option>
          <option value="stock">En Stock</option>
          <option value="sin-stock">Sin Stock</option>
        </select>
      </div>

      {/* Tabla de productos */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-left text-sm font-semibold">Producto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Precio</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Tag</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={producto.image}
                          alt={producto.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{producto.name}</p>
                        <p className="text-xs text-white/60">{producto.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold">{producto.price.toLocaleString('es-ES')}€</p>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggleStock(producto.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        producto.inStock
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                    >
                      {producto.inStock ? '✓ En Stock' : '✗ Sin Stock'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    {producto.tag && (
                      <span className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium">
                        {producto.tag}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(producto)}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(producto.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No se encontraron productos</p>
        </div>
      )}

      {/* Modal de edición/creación (simplificado) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <p className="text-white/60 mb-6">
              En producción, aquí aparecería un formulario completo para editar/crear productos.
              Por ahora, los cambios son simulados y no se guardan en una base de datos.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-medium hover:bg-white/10 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert("✅ Cambios guardados (simulado)");
                  setIsModalOpen(false);
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold hover:shadow-lg transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

