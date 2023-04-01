-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "to_whom" TEXT NOT NULL,
    "from_user" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
