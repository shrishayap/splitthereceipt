'use client'

import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/../public/HeroImage.png"

export default function Home() {



  return (
    <main className='flex flex-col bg-gradient-to-r from-stone-900 to-stone-800 h-full min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 self-center w-full max-w-[1000px] text-white h-full p-4 md:p-8'>

        <div className='flex flex-col h-full space-y-4 justify-center'>

          <h1 className='text-4xl font-semibold'>
            Say goodbye to complicated, time consuming bill splitting.
          </h1>

          <p>
            Receipt reader is an AI powered app that makes splitting bills easier than ever. Simply take a picture of your receipt and let our app do the rest. Receipt reader parses the bill and allows you to split the cost by item. It even takes into account tax and tip.
          </p>

          <div className='grid grid-cols-2 gap-3'>

            <Link href='/names' className='w-full'>
              <button className='rounded-md px-4 py-2 border-2 border-white bg-white text-black w-full'>
                Get started
              </button>
            </Link>

            <Link href='https://youtu.be/VR6RQ9RMOHA' className='w-full'>
              <button className='rounded-md px-4 py-2 border-2 border-white w-full hover:bg-stone-800'>
                Watch demo
              </button>
            </Link>


          </div>
        </div>

        <Image src={HeroImage} alt='Robot analyzing a receipt' className='self-center' />

      </div>
    </main>
  );
}
