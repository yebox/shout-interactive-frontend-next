import Head from "next/head";
import Image from "next/image";
import Carousel from "../components/Landing/Carousel";
import BaseLayout from "../components/Layouts/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-[1.6rem]">
        {/* #000 Header */}
        <header className="flex items-center my-[2.4rem]">
          <h2 className="headline_heavy text-primary whitespace-nowrap overflow-hidden text-ellipsis">Hi, Chuks</h2>
          <div className="flex items-center ml-auto">
            <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl">
              <Image src="/images/coin.svg" height={24} width={24} alt="coins"></Image>
              <span className="subheader_heavy !text-gray-darker ml-[.5rem]">5.1M</span>
            </div>
            <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl ml-[1.6rem]">
              <i className="icon-gift-box text-[2.4rem] text-[#FA4A0C]"></i>
              {/* <Image src="/images/gift-box.svg" height={24} width={24} alt="coins"></Image> */}
            </div>
            <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl ml-[1.6rem]">
              <Image src="/images/trophy-star.svg" height={24} width={24} alt="coins"></Image>
              {/* <i className="icon-trophy-star text-[2.4rem] text-[#FA9330]"></i> */}
            </div>
          </div>
        </header>

        {/* Carousel */}
        <div>
          <Carousel></Carousel>
        </div>
        <div className=" grid grid-cols-2 gap-6 mt-7">
          {/* Big Card */}
          <Link href={"/parties"}>
            <div className=" rounded-[1.3rem] relative bg-[#FA4A0C] px-6 pb-[1.6rem] pt-[5.6rem] cursor-pointer hover:scale-[1.04] transition-all col-span-2 shadow">
              <h2 className="title_heavy !text-white ">Shout! Party</h2>
              <p className="caption_light !text-white">Party with your friends everyday!</p>
              <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                {/* <img src="/images/chevron-right.svg"></img> */}
                <i className="icon-chevron-right text-white text-[1.4rem]"></i>
              </button>
            </div>
          </Link>

          {/* Smaller Cards */}
          <Link href={"/parties"}>
            <div className=" rounded-[1.3rem] relative bg-[#14B363] px-6 pb-[1.6rem] pt-[5.6rem] cursor-pointer hover:scale-[1.04] transition-all shadow">
              <h2 className="body_heavy !text-white ">Shout! Party</h2>
              <p className="small_light max-w-[11rem] !text-white">Party with your friends everyday!</p>
              <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                {/* <img src="/images/chevron-right.svg"></img> */}
                <i className="icon-chevron-right text-white text-[1.4rem]"></i>
              </button>
            </div>
          </Link>
          <Link href={"/parties"}>
            <div className=" rounded-[1.3rem] relative bg-[#110066] px-6 pb-[1.6rem] pt-[5.6rem] cursor-pointer hover:scale-[1.04] transition-all shadow">
              <h2 className="body_heavy !text-white ">Shout! Party</h2>
              <p className="small_light !text-white max-w-[11rem]">Party with your friends everyday!</p>
              <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                {/* <img src="/images/chevron-right.svg"></img> */}
                <i className="icon-chevron-right text-white text-[1.4rem]"></i>
              </button>
            </div>
          </Link>
        </div>
      </main>
    </BaseLayout>
  );
}
