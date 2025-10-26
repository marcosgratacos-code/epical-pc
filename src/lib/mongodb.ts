import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectMongo() {
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI no está definido. La sincronización de productos vistos no funcionará.");
    return null;
  }
  
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "epicalpc",
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
