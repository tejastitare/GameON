import Link from 'next/link';
import React from 'react';
import Product from "@/models/Product";
import mongoose from "mongoose";

const Press = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((item) => {
           console.log('Product item:', products[item]);

            return (
              <Link 
                key={products[item]._id} 
                href={`/product/${products[item].slug}`}
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
              >
                <div className="block relative rounded overflow-hidden">
                  {/* Conditionally render video or image */}
                  {products[item].video ? (
                    <iframe
                      className="mx-auto h-[36vh] block"
                      width="100%"
                      height="200"
                      src={products[item].video}
                      title={products[item].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img 
                      alt="ecommerce" 
                      className="mx-auto h-[36vh] block" 
                      src={products[item].img} 
                    />
                  )}
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Press</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) { 
  const { sport } = context.query; // Get the sport from query parameters
  console.log('Fetched products:', sport);


  if (!mongoose.connections[0].readystate) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Fetch products filtered by the selected sport
  let products = await Product.find({ sport: sport });

  let filteredProducts = {}; // To hold filtered products

  for (let item of products) {
    if (item.title in filteredProducts) {
      if (!filteredProducts[item.title].color.includes(item.color) && item.availableQty > 0) {
        filteredProducts[item.title].color.push(item.color);
      }
      if (!filteredProducts[item.title].size.includes(item.size) && item.availableQty > 0) {
        filteredProducts[item.title].size.push(item.size);
      }
    } else {
      filteredProducts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        filteredProducts[item.title].color = [item.color];
        filteredProducts[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(filteredProducts)) }, // will be passed to the page component as props
  };
}

export default Press;
