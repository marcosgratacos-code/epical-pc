"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white font-sans">
      {/* Logo o nombre */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 tracking-tight">
        <span className="text-[#00ffae]">E</span>PICAL
        <span className="text-[#00aaff]">-PC</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-xl">
        Potencia extrema, diseño impecable ⚡  
        PCs personalizados para gamers y creadores exigentes.
      </p>

      {/* Imagen central */}
      <div className="relative w-[320px] h-[320px] mb-10">
        <Image
          src="/next.svg"
          alt="PC render"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="px-6 py-3 bg-[#00ffae] text-black font-bold rounded-xl hover:bg-[#00cc8a] transition"
        >
          Ver montajes
        </a>
        <a
          href="https://github.com/marcosgratacos-code/epical-pc"
          target="_blank"
          className="px-6 py-3 border border-[#00ffae] text-[#00ffae] rounded-xl hover:bg-[#00ffae] hover:text-black transition"
        >
          GitHub
        </a>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500">
        © 2025 Epical-PC · by Marcos Gratacós
      </footer>
    </main>
  );
}
