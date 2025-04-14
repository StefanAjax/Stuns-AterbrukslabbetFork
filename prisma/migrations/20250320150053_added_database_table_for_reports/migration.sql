-- CreateTable
CREATE TABLE "ReportedPosts" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "postLink" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reporterLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportedPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportedPosts" ADD CONSTRAINT "ReportedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
