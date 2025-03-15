import { PrismaClient } from '@prisma/client'
import { log } from 'console'

const prisma = new PrismaClient()

async function main() {

    // const userWithPost = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //     }
    // })

    // const addUser = await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         email: 'alice@gmail.com',
    //         age: 30,
    //         posts: {
    //             create: { title: 'Hello World' },
    //         },
    //     },
    // })

    // const addPost = await prisma.post.createMany({
    //     data: [
    //         {
    //             postId: 'de3ea7b7-5339-4367-935e-ced1e7ff5de4',
    //             title: 'Hello World',
    //             content: 'This is a test post',
    //         },
    //         {
    //             postId: 'de3ea7b7-5339-4367-935e-ced1e7ff5de4',
    //             title: 'Hello World',
    //             content: 'This is a test post',
    //         },

    //     ],
    // })


    // const updateUser = await prisma.user.update({
    //     data: {
    //         name: "Alice Wonderland",
    //     },
    //     where: {
    //         userId: "1378ec64-5e7f-4be8-8c6f-041c99b9e8e6"
    //     }
    // })

    // const deletePost = await prisma.post.delete({
    //     where: {
    //         id: 1
    //     }
    // })

    // const getAllPost = await prisma.post.findMany();

    const getAllUser = await prisma.user.findMany();

    console.dir(getAllUser, { depth: null });
    
    // const deleteUser = await prisma.user.delete({
    //     where: {
    //         userId: "de3ea7b7-5339-4367-935e-ced1e7ff5de4"
    //     }
    // })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })