import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

// Verificar si las credenciales de Google están configuradas
const hasGoogleCredentials = 
  process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET;

// Lista de emails administradores (en producción debería estar en una BD)
const ADMIN_EMAILS = [
  "marcosgratacos@gmail.com",
  "admin@epical-pc.com",
];

export const authOptions: NextAuthOptions = {
  providers: hasGoogleCredentials ? [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ] : [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
        // Forzar actualización del rol desde el email
        const userEmail = session.user.email?.toLowerCase();
        const role = userEmail && ADMIN_EMAILS.includes(userEmail) ? "admin" : "user";
        session.user.role = role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Asignar rol basado en el email
        const userEmail = user.email?.toLowerCase();
        token.role = userEmail && ADMIN_EMAILS.includes(userEmail) ? "admin" : "user";
      } else if (token.email) {
        // También verificar en cada uso del token
        const userEmail = token.email?.toLowerCase();
        token.role = userEmail && ADMIN_EMAILS.includes(userEmail) ? "admin" : "user";
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

