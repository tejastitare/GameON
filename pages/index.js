import Slideshow from "@/components/Slideshow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chatbot from "./chatbot";

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <Slideshow/>
      <div>
     <Chatbot/>
    </div>
      <section className="text-gray-600 body-font bg-white">
        <div className="HomeBottom my-10 space-y-8 flex flex-col justify-center items-center">

          <h1 className=" text-gray-900 font-bold text-3xl mt-0 flex justify-center space-x-6">
            <span>Our Mission</span>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hand-holding-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="text-primary svg-inline--fa fa-hand-holding-heart fa-w-18 w-11 -mt-1">
              <path fill="currentColor" d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"></path></svg></h1>


          <div className="space-y-0 lg:grid lg:grid-cols-3">
            <div className="px-16 sm:px-10 py-5">
              <dt className="text-lg text-gray-800 font-bold">Empowering Athletes Through Knowledge
              </dt>
              <dd className="mt-2 text-gray-700">Our mission is to empower athletes of all levels by providing expert training resources, comprehensive tutorials, and personalized coaching, allowing them to unlock their full potential in their chosen sport.</dd></div>
            <div className="px-16 py-5">
              <dt className="text-lg text-gray-800 font-bold">Building a Strong Foundation for Future Champions</dt>
              <dd className="mt-2 text-gray-700">We are dedicated to fostering the next generation of champions by offering accessible, high-quality sports education and training. Our goal is to provide athletes with the tools and knowledge they need to excel in every aspect of their game.</dd></div>
            <div className="px-16 py-5"><dt className="text-lg text-gray-800 font-bold">Revolutionizing Sports Learning</dt>
              <dd className="mt-2 text-gray-700">Our mission is to revolutionize sports education by offering engaging, interactive tutorials and world-class training programs. We aim to make learning any sport easier, more enjoyable, and accessible to everyone, regardless of location or skill level.</dd></div></div>

          <button onClick={() => {
            router.push("/WhoWeAre")
          }} className="moreAbout bg-pink-500 text-white  font-semibold py-3 px-4 border rounded-full"> <i className="uil uil-info-circle   rounded-full text-xl" /> More About Our Mission</button>

          <div className='bg-cover min-w-full h-auto flex justify-center items-center space-y-3' style={{
            backgroundImage: `url('/banner2.png')`,
            height: '100vh', // Set the height of the container to 100% of the viewport height
            backgroundSize: 'cover', // Ensure the background image covers the entire container
            backgroundPosition: 'center' // Center the background image
          }}>
            <div className="bottom-image flex md:flex-row flex-col">

              <div className="image-content md:space-y-7 md:ml-10 space-y-1">
                <h1 className='text-4xl font-bold text-orange-400'>Empowering Athletes Everywhere</h1>
                <h2 className='text-white font-bold '>Join us in making a difference in your sports journey! Report challenges, collaborate with fellow athletes, and engage with coaches to create a positive change in your performance and the sports community.</h2>
                <button className="Who-we-are bg-sky-400 px-3 py-2 md:px-7 md:py-4 border rounded-full font-bold text-white mx-4"> <i className="uil uil-plus text-lg" /> Get Involved!!</button>
              </div>
              {/* <img
                src="/banner3.png"
                alt="Placeholder"
                className="rounded-full md:h-96 md:max-w-96 md:mr-20"
              /> */}
            </div>
          </div>
          <div className="combine-image flex " style={{ margin: "0" }}>

            <div className='merge-image h-auto' style={{
              backgroundImage: `url('/banner4.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 'cover',
              height: '50vh',
              width: '50vw', // Corrected 'widht' to 'width'
              margin: "0",
              backgroundPosition: 'center' // Center the background image
            }}>
            </div>
            <div className='merge-image h-auto' style={{
              backgroundColor: "black",
              height: '50vh',
              width: '50vw', // Corrected 'widht' to 'width'
              margin: "0",
              backgroundPosition: 'center' // Center the background image
            }}>
              <div className="image-content flex flex-col justify-center space-x-11 space-y-5">
                <h1 className='text-white text-lg md:text-3xl font-bold ml-11 mt-10'>What is "Game-On !"</h1>
                <p className='text-white md:text-lg md:w-3/4'>Game-On! is an innovative platform designed for athletes to enhance their performance. It provides comprehensive training sessions, tutorials, and guided practice routines. With daily performance tracking, athletes can monitor their progress, receive feedback, and continually improve their skills, helping them achieve their full potential in their respective sports.</p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}
