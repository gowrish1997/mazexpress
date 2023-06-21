import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "@/components/LandingPage/LanguageSwitcher";
import AuthIcon from "@/public/authIcon.svg";
import New_logo from "@/public/new_logo_blue.png";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { useRouter } from "next/router";
import LogoutConfirmModal from "./LogoutConfirmModal";
import New_logo_white from "@/public/new_logo_white.png";

const HomepageNavbar = (props: {
  color: string;
  shipmentCalculatorSectionRef?: any;
  supportSectionRef?: any;
  enquirySectionRef?: any;
}) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;
  const { data: session, update }: { data: any; update: any } = useSession();

  var section: string[] = t("landingPage.navBar.Section", {
    returnObjects: true,
  });
  var auth: string[] = t("landingPage.navBar.Auth", { returnObjects: true });

  const shipmentCalculatorSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);
  const enquirySectionRef = useRef<HTMLDivElement>(null);
  const [showOptionModal, setShowOptionModal] = useState(false);

  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${router.locale};path=/`;
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

  const toggleOptionModalHandler = () => {
    setShowOptionModal((prev) => !prev);
  };

  const toggleLogoutConfirmModal = () => {
    setShowLogoutConfirmModal((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      await update(null);
      localStorage.removeItem("nextauth.message");
      router.push(
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/auth/gate?mode=1`
          : `https://${process.env.NEXT_PUBLIC_HOST}/auth/gate?mode=1`
      );
    } catch (err) {
      if (err) console.error(err);
    }
  };

  return (
    <>
      <div className="px-[10px] md:px-[30px] xmd:px-[150px]  z-30 pt-[20px] ">
        <div className=" w-full flex flex-row justify-between items-center  text-[14px] text-[#121212] font-[500] leading-[24px] ">
          <div className="flex flex-row justify-between items-center gap-x-[20px] ">
            <div className="table_md:hidden relative ">
              <div
                className={`flex flex-row items-center justify-center box-border border-[1px]  rounded-[4px] text-[${props.color}] w-[35px] h-[35px] -mb-[3px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF]`}
                style={
                  showOptionModal
                    ? {
                        backgroundColor: "#35C6F4",
                        color: "#FFFFFF",
                      }
                    : {}
                }
                onClick={toggleOptionModalHandler}
              >
                <div
                  className="h-[15px] w-[15px] cursor-pointer flex flex-row items-center justify-center  "
                  style={{
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {showOptionModal ? (
                    <FontAwesomeIcon icon={faXmark} />
                  ) : (
                    <FontAwesomeIcon icon={faBars} />
                  )}
                </div>
                {showOptionModal && (
                  <div
                    className={`absolute top-[0px] ${
                      locale == "en" ? "left-[36px]" : "right-[36px]"
                    } w-[200px]  bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-30 flex flex-col justify-between items-start p-[5px]`}
                    style={{
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    // ref={ref}
                  >
                    <ul
                      className={` w-full text-[#000000] text-[14px] font-[400] leading-[30px]  `}
                    >
                      {/* <li
                       className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                       onClick={() =>
                         trackingSectionRef?.current?.scrollIntoView({
                           behavior: "smooth",
                         })
                       }
                     >
                       {t(section[0])}
                     </li> */}

                      <li
                        className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                        onClick={() => router.push("/about")}
                      >
                        {t(section[3])}
                      </li>
                      <li
                        className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                        onClick={() => router.push("/services")}
                      >
                        {t(section[4])}
                      </li>
                      {!(
                        router.pathname == "/about" ||
                        router.pathname == "/services"
                      ) ? (
                        <>
                          <li
                            className={`cursor-pointer   `}
                            onClick={() =>
                              props.shipmentCalculatorSectionRef?.current?.scrollIntoView(
                                {
                                  behavior: "smooth",
                                }
                              )
                            }
                          >
                            {t(section[1])}
                          </li>
                          <li
                            className={`cursor-pointer `}
                            onClick={() =>
                              props.enquirySectionRef?.current?.scrollIntoView({
                                behavior: "smooth",
                              })
                            }
                          >
                            {t(section[5])}
                          </li>
                          <li
                            className={`cursor-pointer `}
                            onClick={() =>
                              props.supportSectionRef?.current?.scrollIntoView({
                                behavior: "smooth",
                              })
                            }
                          >
                            {t(section[2])}
                          </li>
                        </>
                      ) : (
                        <li
                          className="cursor-pointer"
                          onClick={() => router.push("/")}
                        >
                          {t(section[0])}
                        </li>
                      )}
                      {session?.user && (
                        <li className="">
                          <button
                            onClick={toggleLogoutConfirmModal}
                            className="w-full bg-[#35C6F4] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] text-left "
                          >
                            {auth[2]}
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start items-end  ">
              <div className="h-[38px] w-[54px]  relative ">
                <Image src={New_logo_white} fill alt="document" />
              </div>
              {/* <div className="relative h-[47px] w-[60px] ">
                <Image src={New_logo} fill alt="logo" />
              </div> */}
              <p className={`text-[${props.color}] text-[12.5px] font-[800] `}>
                Express
              </p>
            </div>
          </div>
          <ul
            className={` flex-type3 gap-x-[20px] hidden table_md:flex -mb-[5px] text-[14px]  font-[500] text-[${props.color}]`}
          >
            <li
              className={`cursor-pointer ${
                router.pathname.includes("about")
                  ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                  : ""
              } `}
              onClick={() => router.push("/about")}
            >
              {t(section[3])}
            </li>
            <li
              className={`cursor-pointer ${
                router.pathname.includes("services")
                  ? " border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                  : ""
              } `}
              onClick={() => router.push("/services")}
            >
              {t(section[4])}
            </li>
            {!(
              router.pathname == "/about" ||
              router.pathname == "/services" ||
              router.pathname == "/TermsAndCondition"
            ) ? (
              <>
                <li
                  className={`cursor-pointer
                   
                    `}
                  onClick={() =>
                    props.shipmentCalculatorSectionRef?.current?.scrollIntoView(
                      {
                        behavior: "smooth",
                      }
                    )
                  }
                >
                  {t(section[1])}
                </li>
                <li
                  className={`cursor-pointer `}
                  onClick={() =>
                    props.enquirySectionRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {t(section[5])}
                </li>
                <li
                  className={`cursor-pointer `}
                  onClick={() =>
                    props.supportSectionRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {t(section[2])}
                </li>
              </>
            ) : (
              <li className="cursor-pointer" onClick={() => router.push("/")}>
                {t(section[0])}
              </li>
            )}
          </ul>
          {session?.user ? (
            <div className="flex items-center gap-x-[15px] table_md:-mb-[11px]">
              <div
                className={`flex items-center gap-x-[10px] text-[${props.color}]`}
              >
                {/* <p>{session.user.email}</p> */}
                {session.user.is_admin ? (
                  <Link href={"/admin"}>
                    {locale == "en" ? "Dashboard" : "لوحة القيادة"}
                  </Link>
                ) : (
                  <Link href={"/add-new-order"}>
                    {locale == "en" ? "Place order" : "مكان الامر"}
                  </Link>
                )}
              </div>
              <div className="hidden min-[850px]:block">
                <button
                  onClick={toggleLogoutConfirmModal}
                  className="bg-[#FFFFFF] text-[#000000] rounded-[4px] px-[15px] py-[5px] "
                >
                  {auth[2]}
                </button>
              </div>
              <LanguageSwitcher color={props.color} />
            </div>
          ) : (
            <div
              className={`flex flexx-row justify-start items-center gap-x-[16px] text-[14px] text-[${props.color}] font-[500]  table_md:-mb-[12px] `}
            >
              <Link href={"/auth/gate?mode=0"} className="hidden add_sm:block ">
                {auth[1]}
              </Link>
              <Link
                href={"/auth/gate?mode=1"}
                className=" rounded-[4px] border-[1px] text-[14px] text-[#000000] font-[500] bg-[#FFFFFF] px-[15px] py-[5px] hidden add_sm:block "
              >
                {auth[0]}
              </Link>
              <div
                className=" h-[18px] w-[18px] add_sm:hidden cursor-pointer rounded-[50%]  flex justify-center items-center"
                onClick={() => router.push("/auth/gate?mode=1")}
              >
                <AuthIcon
                  className={`${
                    router.pathname == "/services"
                      ? "auth_icon_svg_service"
                      : "auth_icon_svg"
                  }`}
                />
              </div>

              <LanguageSwitcher color={props.color} />
            </div>
          )}
        </div>
      </div>
      {showLogoutConfirmModal && (
        <LogoutConfirmModal
          logout={logoutHandler}
          close={toggleLogoutConfirmModal}
        />
      )}
    </>
  );
};

export default HomepageNavbar;
