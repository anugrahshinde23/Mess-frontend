import React from "react";
import * as MaterialDesignIcons from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import anugrah from '../../assests/images/anugrah.png'
import anugrah2 from '../../assests/images/anugrah2.png'
import elonmusk from '../../assests/images/elon_musk.png'

const OurTeam = () => {
  return (
    <>
      <div className="mx-15 h-screen flex flex-col justify-center ">
        <div className=" gap-15 flex flex-col sm:flex-row mt-50 sm:mt-0  justify-between items-center">
          <div className=" bg-indigo-500 rounded-full h-40 w-40 sm:h-80 sm:w-80">
            <img src={anugrah2} alt="Anugrah" className=" h-full w-full rounded-full object-contain" />
          </div>

          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center ">
              <p className="text-4xl sm:text-5xl font-bold">We've Been There</p>
              <p className=" text-4xl sm:text-5xl font-bold">Done That</p>
            </div>
            <div className="text-gray-500 font-semibold text-sm sm:text-lg text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                <br />
                Asperiores, aut nostrum amet placeat est ipsam ipsa eum.
                <br />
                Architecto reiciendis voluptatem dolorum ea accusantium sapiente
                <br />
                beatae sequi. Modi minima recusandae mollitia provident sit
                <br />
                similique illum ea, praesentium repellat quaerat accusantium
                <br />
                dolore sapiente earum nihil illo natus. Consequuntur quo hic
                cupiditate beatae.
              </p>
            </div>
          </div>
          <div className="bg-indigo-500  rounded-full h-40 w-40 sm:h-80 sm:w-80">
            <img src={elonmusk} alt="Elon Musk" className="   bottom-5  h-full w-full rounded-full object-contain" />
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-between   items-end mx-12 my-10 ">
          <div className=" flex flex-col items-center gap-5 ">
            <p className="text-3xl font-semibold">Anugrah Shinde</p>
            <div className="flex gap-3">
              <SocialIcon
                url="https://www.linkedin.com/in/anugrah-shinde-43617b315/"
                fgColor="#6366F1"
                className="border border-indigo-500 rounded-full"
                bgColor="#ffffff"
              />
              <SocialIcon
                network="twitter"
                fgColor="#6366F1"
                className="border border-indigo-500 rounded-full"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div >
          <button className="text-sm px-10 py-3 cursor-pointer border border-indigo-500 text-indigo-500 bg-white hover:bg-indigo-500 hover:text-white font-bold">Contact Us</button>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-3xl font-semibold">Samarth Kulthe</p>
            <div className="flex gap-3 ">
              <SocialIcon
                url="https://linkedin.com"
                fgColor="#6366F1"
                className="border border-indigo-500 rounded-full"
                bgColor="#ffffff"
              />
              <SocialIcon
                network="twitter"
                fgColor="#6366F1"
                className="border border-indigo-500 rounded-full"
                bgColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
