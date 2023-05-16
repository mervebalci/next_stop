// This is the dynamic page that displays the single item content

import prisma from 'lib/prisma'
import { getItem } from 'lib/data'

export default function Item({ item }) {
    return (
        <div className='text-center'>
            <h1 className='mt-10 font-extrabold text-3xl'>{item.name}</h1>
            <h2 className='mt-10 px-20 font-bold'>{item.description}</h2>
            {item.rating !== 0 &&
                <h2 className='mt-10 font-bold text-xl'>
                    Rating: {item.rating / 10} / 5{' '}
                    {
                        [...Array(
                            Math.round(item.rating / 10))
                        ].map(() => '⭐️ ')
                    }
                </h2>
            }
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const item = await getItem(prisma, parseInt(params.id))
    // parseInt() function parses a string argument and returns an integer

    return {
        props: {
            item,
        },
    }
}