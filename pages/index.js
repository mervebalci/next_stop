import Link from 'next/link'
import Head from 'next/head'

import prisma from 'lib/prisma'
import { getItems } from 'lib/data'

export default function Home({ restaurants, hotels, thingsToDo }) {
  return (
    <div>
      <Head>
        <title>Best in Town</title>
        <meta name='description' content='Private Area' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='text-center'>
        <a href='/api/auth/signin'>login</a>
        <h1 className='font-extrabold text-4xl mt-10'>The Best in Town</h1>
        
        <div className='flex flex-col md:grid md:grid-cols-3'>
          
          {restaurants && (
            <div>
              <h2 className='mt-10 font-bold text-2xl'>Restaurants</h2>

              <ol className='mt-4 list-inside list-decimal'>
                {restaurants.map((item, index) => (
                  <Link href={`/${item.id}`} key={index} className='block cursor-pointer'>{item.name}</Link>
                ))}
              </ol>
            </div>
          )}
          

          {hotels && (
            <div>
              <h2 className='mt-10 font-bold text-2xl'>Hotels</h2>
          
              <ol className='mt-4 list-inside list-decimal'>
                {hotels.map((item, index) => (
                  <Link href={`/${item.id}`} key={index} className='block cursor-pointer'>{item.name}</Link>
                ))}
              </ol>
            </div>
          )}

          
          {thingsToDo && (
            <div>
              <h2 className='mt-10 font-bold text-2xl'>Things to do</h2>
            
              <ol className='mt-4 list-inside list-decimal'>
                {thingsToDo.map((item, index) => (
                  <Link href={`/${item.id}`} key={index} className='block cursor-pointer'>{item.name}</Link>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const restaurants = await getItems(prisma, 'restaurant')
  const hotels = await getItems(prisma, 'hotel')
  const thingsToDo = await getItems(prisma, 'thing-to-do')

  return {
    props: {
      restaurants,
      hotels,
      thingsToDo,
    },
  }
}