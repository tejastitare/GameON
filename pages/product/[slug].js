import React from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Post = ({ product }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden bg-gray-50">
        <div className="container mx-auto px-5 py-16">
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={5}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="flex flex-col lg:flex-row lg:w-4/5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Product Image or Video */}
            <div className="lg:w-1/2 w-full h-[60vh] md:h-[75vh] relative">
              <div className="block relative h-full rounded">
                {product.video ? (
                  <iframe
                    src={product.video}
                    title={product.title}
                    className="w-full h-full object-cover rounded"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={product.img}
                    alt="Product"
                    className="object-cover object-center w-full h-full m-auto block rounded"
                  />
                )}
              </div>
            </div>
            {/* Product Details */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 px-5 pb-6">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mb-1">
              GameOn !
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-semibold mb-4">
                {product.title}
              </h1>
              <p style={{ whiteSpace: 'pre-line' }} className="leading-relaxed text-justify text-gray-700 font-serif mb-5">
                {product.desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default Post;
