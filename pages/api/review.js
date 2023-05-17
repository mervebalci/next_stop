// Creating POST API route to save the reviews to the database and link them to the items

import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth].js'
import { getServerSession } from 'next-auth/next'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(501).end()
    }

    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ messagee: 'Not logged in' })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })

    await prisma.review.create({
        data: {
            description: req.body.description,
            rating: parseInt(req.body.rating),
            item: {
                connect: { id: req.body.item },
            },
        },
    })

    const reviews = await prisma.review.findMany({
        where: {
            item: {
                id: req.body.item,
            },
        },
    })

    const ratingsValues = reviews.reduce((acc, review) => {
        console.log(acc, review.rating)
        return acc + review.rating
    }, 0)

    const rating = ratingsValues / reviews.length

    await prisma.item.update({
        data: {
            rating: Math.floor(rating * 10),
        },
        where: {
            id: req.body.item,
        },
    })

    res.end()
}