import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth].js'
import { getServerSession } from 'next-auth/next'

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(501).end()
    }
    console.log("step2")
    const session = await getServerSession(req, res, authOptions)
    console.log("step3")
    if (!session) return res.status(401).json({ message: 'Not logged in' })
    console.log("step4")
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })
    console.log("step5")
    if (!user) return res.status(401).json({ message: 'User not found' })
    console.log("step6")
    if (!user.isAdmin) return res.status(401).json({ message: 'Not authorized' })
    console.log("step7")
    await prisma.item.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            rating: 0,
        },
    })

    res.end()
}