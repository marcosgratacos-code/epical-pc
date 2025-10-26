"use client";

import { useState, useEffect } from "react";
import { PRODUCTS } from "../lib/products";
import { getOrdersFromStorage } from "../lib/orders";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVentas: 0,
    pedidosPendientes: 0,
    productosStock: 0,
    clientesActivos: 0,
  });

  const [ventasMensuales, setVentasMensuales] = useState<number[]>([]);

  useEffect(() => {
    // Calcular estadísticas
    const orders = getOrdersFromStorage();
    const totalVentas = orders.reduce((acc, order) => acc + order.total, 0);
    const pedidosPendientes = orders.filter(o => o.estado !== "entregado" && o.estado !== "cancelado").length;
    const productosStock = PRODUCTS.filter(p => p.inStock).length;
    
    setStats({
      totalVentas,
      pedidosPendientes,
      productosStock,
      clientesActivos: orders.length, // Simplificado
    });

    // Simular ventas mensuales (últimos 6 meses)
    setVentasMensuales([12500, 15300, 18200, 16800, 22100, 25400]);
  }, []);

  const statCards = [
    {
      title: "Ventas Totales",
      value: `${stats.totalVentas.toLocaleString('es-ES')}€`,
      change: "+12.5%",
      icon: "💰",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pedidos Pendientes",
      value: stats.pedidosPendientes.toString(),
      change: "3 nuevos",
      icon: "📦",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Productos en Stock",
      value: `${stats.productosStock}/${PRODUCTS.length}`,
      change: "Todos disponibles",
      icon: "🖥️",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Clientes Activos",
      value: stats.clientesActivos.toString(),
      change: "+8 este mes",
      icon: "👥",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const maxVenta = Math.max(...ventasMensuales);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60">Resumen general de TITAN-PC</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-white/20 transition-all duration-300"
            style={{
              animation: "fadeInUp 0.5s ease-out forwards",
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-white/60 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfica de ventas */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
        <h2 className="text-xl font-bold mb-6">Ventas Mensuales</h2>
        <div className="space-y-3">
          {ventasMensuales.map((venta, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">{meses[index]}</span>
                <span className="font-semibold">{venta.toLocaleString('es-ES')}€</span>
              </div>
              <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                  style={{ 
                    width: `${(venta / maxVenta) * 100}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
          <h2 className="text-xl font-bold mb-4">Productos Más Vendidos</h2>
          <div className="space-y-3">
            {PRODUCTS.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-2xl font-bold text-white/40">#{index + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-white/60">{product.price.toLocaleString('es-ES')}€</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                  {Math.floor(Math.random() * 20 + 5)} ventas
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
          <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {[
              { icon: "🛒", text: "Nuevo pedido #1234", time: "Hace 5 min" },
              { icon: "📦", text: "Pedido #1230 enviado", time: "Hace 15 min" },
              { icon: "⭐", text: "Nueva reseña de 5★", time: "Hace 1 hora" },
              { icon: "👤", text: "Nuevo cliente registrado", time: "Hace 2 horas" },
              { icon: "💬", text: "Mensaje de soporte", time: "Hace 3 horas" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-white/60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6">
        <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: "➕", text: "Añadir Producto", href: "/admin/productos?action=new" },
            { icon: "📦", text: "Ver Pedidos", href: "/admin/pedidos" },
            { icon: "📊", text: "Analytics", href: "/admin/analytics" },
            { icon: "⚙️", text: "Configuración", href: "/admin/settings" },
          ].map((action) => (
            <a
              key={action.text}
              href={action.href}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-black/30 border border-white/10 hover:border-white/30 hover:bg-black/50 transition-all text-center"
            >
              <span className="text-3xl mb-2">{action.icon}</span>
              <span className="text-sm font-medium">{action.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

