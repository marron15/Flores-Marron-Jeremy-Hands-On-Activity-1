-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_postId_fkey`;

-- DropIndex
DROP INDEX `Post_postId_fkey` ON `post`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
