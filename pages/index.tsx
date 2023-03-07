import React, { SyntheticEvent, useState, useRef } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import ShipmentCalculator from "@/components/LandingPage/ShipmentCalculator";
import Footer from "@/components/LandingPage/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession();
  
  const trackingSectionRef = useRef<HTMLDivElement>(null);
  const shipmentCalculatorSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);

  const [trackingId, setTrackingId] = useState<string>("");
  const [trackingIdError, setTrackingIdError] = useState<boolean>(false);

  const trackingIdInputHandler = (e: SyntheticEvent) => {
    setTrackingIdError(false);
    setTrackingId((e.target as HTMLInputElement).value);
  };

  const trackingHandler = () => {
    if (trackingId) {
      console.log();
      setTrackingIdError(false);
    } else {
      setTrackingIdError(true);
    }
  };

  return (
    <div className="">
      <Head>
        <title>MazExpress | Order to Libya from Turkey</title>
      </Head>
      <div className="w-full flex justify-center items-center h-[46px] bg-[#2B2B2B] text-[14px] text-[#FFFFFF] font-[500] leading-[24px] ">
        Plan your eCommerce shipments in an instant. Estimate courier charges
        using our quick courier charges.
      </div>
      <div className="px-[150px]">
        <div className="w-full flex-type3 h-[100px] text-[14px] text-[#121212] font-[500] leading-[24px] ">
          <div className="flex-type3 space-x-[20px] ">
            <div className="relative h-[47px] w-[47px] ">
              <Image
                src={logo}
                fill
                alt="logo"
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>
            <ul className="flex-type3 space-x-[20px]  ">
              <li
                className="cursor-pointer"
                onClick={() =>
                  trackingSectionRef?.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Track Order
              </li>
              <li
                className="cursor-pointer"
                onClick={() =>
                  shipmentCalculatorSectionRef?.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Shipment Calculator
              </li>
              <li
                className="cursor-pointer"
                onClick={() =>
                  supportSectionRef?.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Support
              </li>
            </ul>
          </div>
          {session?.user ? (
            <div className="flex items-center space-x-[20px]">
              {/* insert user data here */}
              <div className="flex items-center space-x-[20px]">
                <p>{session.user.email}</p>
                <Link href={"/orders"}>My orders</Link>
              </div>
              <div>
                <button
                  onClick={() => signOut()}
                  className="bg-[#2B2B2B] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] "
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-x-[20px]">
              <Link href={"/auth/gate?mode=0"}>Sign up</Link>
              <button
                onClick={() => router.push('/auth/gate')}
                className="bg-[#2B2B2B] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] "
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div className="flex-type5 mt-[55px] w-[100%]" ref={trackingSectionRef}>
          <div className="w-[65%] flex flex-row justify-center space-x-[20px]">
            <input
              className="flex-1 border-[1px] border-[#8794AD] h-[56px] pl-[10px] rounded-[4px]"
              placeholder="Tracking Number"
              onChange={trackingIdInputHandler}
            />
            <button
              className="h-[56px] bg-[#2B2B2B] rounded-[4px] px-[40px] text-[16px] text-[#FFFFFF] font-[400] leading-[24px]"
              onClick={trackingHandler}
            >
              Track Now
            </button>
          </div>
          {trackingIdError && (
            <p className="mt-[5px] text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
              Please enter the tracking Id
            </p>
          )}
          <div className="">
            <p className="text-center text-[16px] text-[#000000] font-[400] leading-[24px] mt-[10px] ">
              Need help changing your delivery?{" "}
              <span className="text-[#3672DF] cursor-pointer ">Get Help</span>
            </p>
            <h1 className="text-center text-[32px] text-[#121212] font-[600] leading-[50px] mt-[40px] ">
              Get More Done With Our MAZ Services
            </h1>
            <p className="text-center text-[16px] text-[#525D72] font-[500] leading-[25.5px]">
              Drop off and pick up packages from a location that’s open when you
              need it.
            </p>
          </div>
        </div>
        <ShipmentCalculator ref={shipmentCalculatorSectionRef} />
      </div>
      <Footer ref={supportSectionRef} />
    </div>
  );
};

export default Home;
