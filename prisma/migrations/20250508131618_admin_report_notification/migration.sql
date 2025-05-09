-- CreateTable
CREATE TABLE "AdminReportViews" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminReportViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminReportViews_userId_key" ON "AdminReportViews"("userId");
