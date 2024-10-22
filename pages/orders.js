import React from 'react'
import mongoose from "mongoose";
import Order from "@/models/Order";
import { useRouter } from "next/router";

import { useEffect } from 'react';

const order = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  return (
    <div className='text-black'>
      <h1 className='font-semibold text-2xl p-8 text-center'>My Orders</h1>
      <div className="flex flex-col bg-gray-400 text-black">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table
                className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead
                  className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">First</th>
                    <th scope="col" className="px-6 py-4">Last</th>
                    <th scope="col" className="px-6 py-4">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                    <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                  <tr
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                    <td className="whitespace-nowrap px-6 py-4">Larry</td>
                    <td className="whitespace-nowrap px-6 py-4">Wild</td>
                    <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let orders = await Order.find({});

  return {
    props: {
      product: { orders: orders },
    }, // will be passed to the page component as props
  };
}



export default order