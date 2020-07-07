# Migration `20200707172329-init`

This migration has been generated at 7/7/2020, 5:23:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `prismagram`.`User` (
`bio` varchar(191)   ,`email` varchar(191) NOT NULL  ,`firstName` varchar(191) NOT NULL DEFAULT '' ,`id` int NOT NULL  AUTO_INCREMENT,`lastName` varchar(191) NOT NULL  ,`nickName` varchar(191) NOT NULL  ,`secretcode` varchar(191)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `prismagram`.`Post` (
`caption` varchar(191) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`location` varchar(191)   ,`userId` int NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `prismagram`.`Like` (
`postId` int NOT NULL ,`userId` int NOT NULL ,
    PRIMARY KEY (`postId`,`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `prismagram`.`Comments` (
`id` int NOT NULL  AUTO_INCREMENT,`postId` int NOT NULL ,`text` varchar(191) NOT NULL  ,`userId` int NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `prismagram`.`File` (
`id` int NOT NULL  AUTO_INCREMENT,`postId` int NOT NULL ,`url` varchar(191) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `prismagram`.`_UserFollows` (
`A` int NOT NULL ,`B` int NOT NULL 
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `User.nickName` ON `prismagram`.`User`(`nickName`)

CREATE UNIQUE INDEX `User.email` ON `prismagram`.`User`(`email`)

CREATE UNIQUE INDEX `_UserFollows_AB_unique` ON `prismagram`.`_UserFollows`(`A`,`B`)

CREATE  INDEX `_UserFollows_B_index` ON `prismagram`.`_UserFollows`(`B`)

ALTER TABLE `prismagram`.`Post` ADD FOREIGN KEY (`userId`) REFERENCES `prismagram`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`Like` ADD FOREIGN KEY (`userId`) REFERENCES `prismagram`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`Like` ADD FOREIGN KEY (`postId`) REFERENCES `prismagram`.`Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`Comments` ADD FOREIGN KEY (`userId`) REFERENCES `prismagram`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`Comments` ADD FOREIGN KEY (`postId`) REFERENCES `prismagram`.`Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`File` ADD FOREIGN KEY (`postId`) REFERENCES `prismagram`.`Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`_UserFollows` ADD FOREIGN KEY (`A`) REFERENCES `prismagram`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `prismagram`.`_UserFollows` ADD FOREIGN KEY (`B`) REFERENCES `prismagram`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE `prismagram`.`_migration`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200707172329-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,60 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  nickName String @unique
+  email   String   @unique
+  firstName String @default(value:"")
+  lastName String
+  bio String?
+  following User[] @relation("UserFollows", references: [id])
+  followers User[] @relation("UserFollows", references: [id])
+  posts Post[]
+  likes Like[]
+  comments Comments[]
+    secretcode String?
+}
+model Post{
+    id      Int      @default(autoincrement()) @id
+    location String?
+    caption String
+
+    files File[]
+    likes Like[]
+    comments Comments[]
+    userId Int 
+    user    User    @relation(fields: [userId], references: [id])
+}
+model Like{
+
+    user    User    @relation(fields: [userId], references: [id])
+    userId Int
+    post Post @relation(fields: [postId], references: [id])
+    postId Int
+    @@id([postId, userId])
+}
+model Comments{
+    id      Int      @default(autoincrement()) @id
+        user    User    @relation(fields: [userId], references: [id])
+    userId Int
+    post Post @relation(fields: [postId], references: [id])
+    postId Int
+    text String 
+}
+model File{
+    id      Int      @default(autoincrement()) @id
+url String
+post Post @relation(fields: [postId], references: [id])
+    postId Int
+}
```


