-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "total" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "shippingName" TEXT,
    "shippingAddress" TEXT,
    "shippingCity" TEXT,
    "shippingPostal" TEXT,
    "shippingCountry" TEXT,
    "shippingPhone" TEXT,
    "trackingNumber" TEXT,
    "transportista" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "price" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockQty" INTEGER NOT NULL DEFAULT 10,
    "tag" TEXT,
    "imageUrl" TEXT,
    "images" TEXT DEFAULT '[]',
    "description" TEXT,
    "cpu" TEXT,
    "gpu" TEXT,
    "ram" TEXT,
    "storage" TEXT,
    "psu" TEXT,
    "case" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "id", "imageUrl", "inStock", "name", "price", "shortName", "sku", "slug", "tag", "updatedAt") SELECT "createdAt", "id", "imageUrl", "inStock", "name", "price", "shortName", "sku", "slug", "tag", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
