//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import LanguageSwitcher from "@/components/LandingPage/LanguageSwitcher";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import newlogoBlue from "../../public/new_logo_blue.png";
import LogoutConfirmModal from "./LogoutConfirmModal";

interface IProp {
    type: string;
    activeSection?: string;
    render: (
        shipmentCalculatorSectionRef?: React.MutableRefObject<HTMLDivElement>,
        enquirySectionRef?: React.MutableRefObject<HTMLDivElement>,
        supportSectionRef?: React.MutableRefObject<HTMLDivElement>
    ) => ReactNode;
}

const HomePageWrapper = (props: IProp) => {
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

    const logoutHandler = () => {
        try {
            signOut();
        } catch (err) {
            if (err) console.error(err);
        }
    };

    return (
        <>
            <div className="w-full">
                <div className="box-border w-full flex justify-center items-center h-[46px] bg-[#2B2B2B] text-[12px] md:text-[14px] text-[#FFFFFF] font-[500] leading-[24px] p-[15px] ">
                    {t("landingPage.Header")}
                </div>

                <div className="sticky top-0 px-[30px] xmd:px-[150px] bg-[#ffffff] z-30 pb-[10px] ">
                    <div className=" w-full flex flex-row justify-between items-end h-[80px] text-[14px] text-[#121212] font-[500] leading-[24px] ">
                        <div className="flex flex-row justify-between items-end gap-x-[20px] ">
                            <div className="relative h-[47px] w-[60px] ">
                                <Image src={newlogoBlue} fill alt="logo" />
                            </div>

                            <div className="min-[850px]:hidden relative ">
                                <div
                                    className="flex flex-row items-center justify-center box-border border-[1px]  rounded-[4px] text-[#121212] w-[35px] h-[35px] -mb-[3px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF]"
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
                                            boxShadow:
                                                "0px 10px 20px rgba(0, 0, 0, 0.1)",
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
                                                locale == "en"
                                                    ? "left-[36px]"
                                                    : "right-[36px]"
                                            }  w-[200px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[5px]`}
                                            style={{
                                                boxShadow:
                                                    "0px 10px 20px rgba(0, 0, 0, 0.1)",
                                            }}
                                            // ref={ref}
                                        >
                                            <ul className=" w-full text-[#121212] text-[14px] font-[400] leading-[39px]  ">
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
                                                    onClick={() =>
                                                        router.push("/about")
                                                    }
                                                >
                                                    {t(section[3])}
                                                </li>
                                                <li
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                                                    onClick={() =>
                                                        router.push("/services")
                                                    }
                                                >
                                                    {t(section[4])}
                                                </li>
                                                {!(
                                                    router.pathname ==
                                                        "/about" ||
                                                    router.pathname ==
                                                        "/services"
                                                ) ? (
                                                    <>
                                                        <li
                                                            className={`cursor-pointer ${
                                                                props.activeSection ==
                                                                "shipmentCalculatorSection"
                                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                                    : ""
                                                            }  `}
                                                            onClick={() =>
                                                                shipmentCalculatorSectionRef?.current?.scrollIntoView(
                                                                    {
                                                                        behavior:
                                                                            "smooth",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {t(section[1])}
                                                        </li>
                                                        <li
                                                            className={`cursor-pointer ${
                                                                props.activeSection ==
                                                                "enquirySection"
                                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                enquirySectionRef?.current?.scrollIntoView(
                                                                    {
                                                                        behavior:
                                                                            "smooth",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {t(section[5])}
                                                        </li>
                                                        <li
                                                            className={`cursor-pointer ${
                                                                props.activeSection ==
                                                                "supportSection"
                                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                supportSectionRef?.current?.scrollIntoView(
                                                                    {
                                                                        behavior:
                                                                            "smooth",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {t(section[2])}
                                                        </li>
                                                    </>
                                                ) : (
                                                    <li
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            router.push("/")
                                                        }
                                                    >
                                                        {t(section[0])}
                                                    </li>
                                                )}
                                                <li className="">
                                                    <button
                                                        onClick={
                                                            toggleLogoutConfirmModal
                                                        }
                                                        className="w-full bg-[#35C6F4] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] text-left "
                                                    >
                                                        {auth[2]}
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ul className=" flex-type3 gap-x-[20px] hidden min-[850px]:flex ">
                                {/* <li
               className="cursor-pointer"
               onClick={() =>
                 trackingSectionRef?.current?.scrollIntoView({
                   behavior: "smooth",
                 })
               }
             >
               {t(section[0])}
             </li> */}

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
                                    router.pathname == "/services"
                                ) ? (
                                    <>
                                        <li
                                            className={`cursor-pointer ${
                                                props.activeSection ==
                                                "shipmentCalculatorSection"
                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                    : ""
                                            }  `}
                                            onClick={() =>
                                                shipmentCalculatorSectionRef?.current?.scrollIntoView(
                                                    {
                                                        behavior: "smooth",
                                                    }
                                                )
                                            }
                                        >
                                            {t(section[1])}
                                        </li>
                                        <li
                                            className={`cursor-pointer ${
                                                props.activeSection ==
                                                "enquirySection"
                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                enquirySectionRef?.current?.scrollIntoView(
                                                    {
                                                        behavior: "smooth",
                                                    }
                                                )
                                            }
                                        >
                                            {t(section[5])}
                                        </li>
                                        <li
                                            className={`cursor-pointer ${
                                                props.activeSection ==
                                                "supportSection"
                                                    ? "border-b-[2px] border-b-[#35C6F4] pb-[2px]"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                supportSectionRef?.current?.scrollIntoView(
                                                    {
                                                        behavior: "smooth",
                                                    }
                                                )
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
                            </ul>
                        </div>

                        {session?.user ? (
                            <div className="flex items-center gap-x-[15px]">
                                <div className="flex items-center gap-x-[10px]">
                                    <p>{session.user.email}</p>
                                    {session.user.is_admin ? (
                                        <Link href={"/admin"}>
                                            {locale == "en"
                                                ? "Dashboard"
                                                : "لوحة القيادة"}
                                        </Link>
                                    ) : (
                                        <Link href={"/add-new-order"}>
                                            {locale == "en"
                                                ? "Place order"
                                                : "مكان الامر"}
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden min-[850px]:block">
                                    <button
                                        onClick={toggleLogoutConfirmModal}
                                        className="bg-[#35C6F4] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] "
                                    >
                                        {auth[2]}
                                    </button>
                                </div>
                                <LanguageSwitcher />
                            </div>
                        ) : (
                            <div className="flex flexx-row justify-start items-center gap-x-[20px]">
                                <Link href={"/auth/gate?mode=0"}>
                                    {auth[1]}
                                </Link>
                                <Link
                                    href={"/auth/gate?mode=1"}
                                    className="bg-[#35C6F4] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px]"
                                >
                                    {auth[0]}
                                </Link>

                                <LanguageSwitcher />
                            </div>
                        )}
                    </div>
                </div>
                {props.type == "home"
                    ? props.render(
                          shipmentCalculatorSectionRef,
                          enquirySectionRef,
                          supportSectionRef
                      )
                    : props.render()}
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

export default HomePageWrapper;
