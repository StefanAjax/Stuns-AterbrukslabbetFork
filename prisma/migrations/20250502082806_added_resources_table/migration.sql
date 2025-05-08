-- CreateTable
CREATE TABLE "Resources" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);
