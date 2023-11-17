import Footer from "@/components/Footer";
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

import Accordion from "@/components/Accordion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";

import { useRouter } from "next/router";

import { createMonthlyCheckout } from "@/stripe/createMonthlyCheckout";
import { createYearlyCheckout } from "@/stripe/createYearlyCheckout";


export default function ChoosePlan() {
  const [activeYearly, setActiveYearly] = useState(false);
  const [activeMonthly, setActiveMonthly] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  function yearlyPlan() {
    setActiveYearly(true);
    setActiveMonthly(false);
  }

  function monthlyPlan() {
    setActiveMonthly(true);
    setActiveYearly(false);
  }

  async function purchasePlan() {
    if (!user.currentUser) {
      dispatch(openLoginModal());
    }

    if (activeMonthly) {
      createMonthlyCheckout(user.uid)
    }

    if (activeYearly) {
      createYearlyCheckout(user.uid)
    }
  }

  const accordionData = [
    {
      title: "How does the 7 day free trial work?",
      description:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      title: "Can I switch subscriptions from yearly, or yearly to monthly?",
      description:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "Whats included in the Premium Plan?",
      description:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle",
    },
    {
      title: "Can I cancel my trial or my subscription",
      description:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  return (
    <>
      <div className="h-screen ">
        <div className="w-full h-[50%] md:h-[65%] bg-[#032b41] md:rounded-b-[16rem] pt-12 mb-6 relative">
          <div className="px-6 lg:mx-28 flex flex-col items-center">
            <div className="flex flex-col items-center text-white text-center mb-8 ">
              <h1 className="text-[26px] md:text-[48px] font-bold mb-6">
                Get unlimited access to many amazing books to read
              </h1>
              <h2 className=" text-[16px] md:text-[20px]">
                Turn Ordinary moments into amazing learning oppurtunities
              </h2>
            </div>

            <figure className="absolute bottom-0">
              <img
                src="/assets/pricing-top.webp"
                className="max-w-[340px] overflow-hidden  rounded-t-full"
              />
            </figure>
          </div>
        </div>

        <div className="row flex justify-center">
          <div className="container">
            <div className="flex justify-center">
              <div className=" md:mx-28 mb-14 space-y-6 flex flex-col items-center md:flex-row md:justify-evenly w-full  ">
                <div className="w-full flex flex-col items-center md:w-[250px]">
                  <i className="text-[60px] text-[#032b41]">
                    <IoDocumentText />
                  </i>
                  <h1 className="text-[#394547]  text-center">
                    <b>Key ideas in few minutes</b> with many books to read
                  </h1>
                </div>

                <div className="w-full flex flex-col items-center md:w-[250px]">
                  <i className="text-[60px] text-[#032b41]">
                    <RiPlantFill />
                  </i>
                  <h1 className="text-[#394547] text-center">
                    <b>3 million</b> people growing with summarist everyday
                  </h1>
                </div>

                <div className="w-full flex flex-col items-center md:w-[250px]">
                  <i className="text-[60px] text-[#032b41]">
                    <FaHandshake />
                  </i>
                  <h1 className="text-[#394547] text-center">
                    <b>Precise recommendations</b> collections curated by
                    experts
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-[#032b41]">
              <div className="flex justify-center mb-8">
                <h1 className="text-[24px] md:text-[32px] font-bold">
                  Choose the plan that fits you
                </h1>
              </div>

              <div className="flex flex-col space-y-10 items-center">
                <div
                  onClick={yearlyPlan}
                  className={`transition-all duration-300 w-full border-4 ${
                    activeYearly ? "border-[#2BD97C]" : "border-[#bac8ce]"
                  }  p-6 bg-[#f1f6f4] cursor-pointer max-w-[680px] `}
                >
                  <div className="flex items-start space-x-6">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center   border-black`}
                    >
                      <div
                        className={` w-1.5 h-1.5 rounded-full  ${
                          activeYearly && "bg-black"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                      <div className="text-lg space-y-1 font-semibold">
                        <h1>Premium Plus Yearly</h1>
                        <h1 className="text-lg md:text-2xl">$99.99/year</h1>
                      </div>
                      <span className="text-xs md:text-[14px] text-[#6B757B]">
                        7-day free trial included
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center ">
                    <span className="content-none h-[1px] w-[105px] bg-[#bac8ce]"></span>
                    <h1 className="text-[#6B757B] text-sm px-4">or</h1>
                    <span className="content-none h-[1px] w-[105px] bg-[#bac8ce]"></span>
                  </div>
                </div>

                <div
                  onClick={monthlyPlan}
                  className={`transition-all duration-300  w-full border-4 ${
                    activeMonthly ? "border-[#2BD97C]" : "border-[#bac8ce]"
                  } p-6 bg-[#f1f6f4] cursor-pointer max-w-[680px]`}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center">
                      <div
                        className={` w-1.5 h-1.5 rounded-full  ${
                          activeMonthly && "bg-black"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                      <div className="text-lg space-y-1 font-semibold">
                        <h1>Premium Monthly</h1>
                        <h1 className="text-lg md:text-2xl">$9.99/year</h1>
                      </div>
                      <span className="text-xs md:text-[14px] text-[#6B757B]">
                        No trial included
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-8 flex justify-center sticky bottom-0 bg-white">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-[300px]">
                  <button onClick={purchasePlan} className="btn ">
                    {activeMonthly
                      ? "Start your first month"
                      : "Start your 7 day free trial"}
                  </button>
                </div>
                <span className="text-[12px] text-[#6b757B]">
                  {activeMonthly
                    ? "30 day money back, no questions asked"
                    : "Cancel your trial at any time before it ends, and you wont be charged"}
                  
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row flex flex-col items-start transition-all 300ms ease ">
          {accordionData.map((accordion, index) => (
            <Accordion
              key={index}
              title={accordion.title}
              description={accordion.description}
            />
          ))}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

{
  /* <div className="container">
          <div className="row flex justify-center">
            <div className="flex justify-between space-x-2 mx-16">
              <div className="flex flex-col items-center space-y-2  w-[calc(100%/3)]">
                <i className="text-[60px] text-[#032b41]">
                  <IoDocumentText />
                </i>
                <h1 className="text-[#394547] text-center">
                  <b>Key ideas in few minutes</b> with many books to read
                </h1>
              </div>
              <div className="flex flex-col items-center space-y-2 w-[calc(100%/3)]">
                <i className="text-[60px] text-[#032b41]">
                  <RiPlantFill />
                </i>
                <h1 className="text-[#394547] text-center">
                  <b>3 million</b> people growing with summarist everyday
                </h1>
              </div>
              <div className="flex flex-col items-center space-y-2 w-[calc(100%/3)]">
                <i className="text-[60px] text-[#032b41]">
                  <FaHandshake />
                </i>
                <h1 className="text-[#394547] text-center">
                  <b>Precise recommendations</b> collections curated by experts
                </h1>
              </div>
            </div>
          </div>
        </div> */
}
