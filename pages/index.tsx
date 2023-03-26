//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import React, {
    SyntheticEvent,
    useState,
    useRef,
    useEffect,
    ChangeEvent,
} from "react";
import Image from "next/image";
import newlogoBlue from "../public/new_logo_blue.png";
import ShipmentCostCalculator from "@/components/LandingPage/ShipmentCostCalculator";
import Footer from "@/components/LandingPage/Footer";
import fetchServer from "@/lib/fetchServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import PackageTrackingModal from "@/components/LandingPage/PackageTrackingModal";
import { useRouter } from "next/router";
import LanguageSwitcher from "@/components/LandingPage/LanguageSwitcher";
import MazCommunityForm from "@/components/LandingPage/MazCommunityForm";
import { useTranslation } from "next-i18next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useUser from "@/lib/hooks/useUser";
import Link from "next/link";
import fetchJson from "@/lib/fetchSelf";
import LogoutConfirmModal from "@/components/common/LogoutConfirmModal";
import About from "@/components/LandingPage/About";
import Service from "@/components/LandingPage/Service";
import Line from "../public/line.png";

const Index = () => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    var section: string[] = t("landingPage.navBar.Section", {
        returnObjects: true,
    });
    var auth: string[] = t("landingPage.navBar.Auth", { returnObjects: true });

    const { user, mutateUser } = useUser();
    console.log(user);
    const trackingSectionRef = useRef<HTMLDivElement>(null);
    const shipmentCalculatorSectionRef = useRef<HTMLDivElement>(null);
    const supportSectionRef = useRef<HTMLDivElement>(null);
    const AboutSectionRef = useRef<HTMLDivElement>(null);
    const ServicetSectionRef = useRef<HTMLDivElement>(null);
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [trackingId, setTrackingId] = useState<string>("");
    const [trackingIdError, setTrackingIdError] = useState<boolean>(false);
    const [showPackageTrackingModal, setShowPackageTrackingModal] =
        useState(false);

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

    const trackingIdInputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const isValidMazId = await fetchServer(`/api/orders/validate-maz-id`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maz_id: e.target.value }),
        });
        console.log(isValidMazId);
        if (isValidMazId) {
            setTrackingId((e.target as HTMLInputElement).value);
            setTrackingIdError(false);
        } else {
            setTrackingId("");
            setTrackingIdError(true);
        }
    };

    const trackingHandler = async () => {
        if (trackingId) {
            // console.log(trackingId);
            // check if id exists
            const isValidId = await fetchServer(
                `/api/orders?maz_id=${trackingId}`
            );

            if (isValidId.data !== null) {
                router.push(`/track/${trackingId}`);
                setTrackingIdError(false);
                return;
            }
            setTrackingIdError(true);
            return;
        } else {
            setTrackingIdError(true);
            return;
        }
    };

    const toggleLogoutConfirmModal = () => {
        setShowLogoutConfirmModal((prev) => !prev);
    };

    const logoutHandler = async () => {
        // console.log("handle logout");
        const result = await fetchJson("/api/auth/logout", { method: "GET" });
        // console.log(result);
        await mutateUser();
    };

    const openPackageTrackingModal = () => {
        if (trackingId) {
            router.push({
                query: { id: trackingId },
            });
            setShowPackageTrackingModal(true);
            setTrackingIdError(false);
        } else {
            setTrackingIdError(true);
        }
    };

    const closePackageTrackingModal = () => {
        router.back();
        setShowPackageTrackingModal(false);
    };

    console.log(user);

    return (
        <>
            <div className="w-full">
                <div className="box-border w-full flex justify-center items-center h-[46px] bg-[#2B2B2B] text-[12px] md:text-[14px] text-[#FFFFFF] font-[500] leading-[24px] p-[15px] ">
                    {t("landingPage.Header")}
                </div>

                <div className="px-[30px] xmd:px-[150px]  ">
                    <div className="w-full flex flex-row justify-between items-end h-[80px] text-[14px] text-[#121212] font-[500] leading-[24px] ">
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
                                                <li
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                                                    onClick={() =>
                                                        trackingSectionRef?.current?.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    {t(section[0])}
                                                </li>
                                                <li
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
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
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
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
                                                <li
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                                                    onClick={() =>
                                                        AboutSectionRef?.current?.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    {t(section[3])}
                                                </li>
                                                <li
                                                    className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
                                                    onClick={() =>
                                                        ServicetSectionRef?.current?.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    {t(section[4])}
                                                </li>
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

                            <ul className="flex-type3 gap-x-[20px] hidden min-[850px]:flex">
                                <li
                                    className="cursor-pointer"
                                    onClick={() =>
                                        trackingSectionRef?.current?.scrollIntoView(
                                            {
                                                behavior: "smooth",
                                            }
                                        )
                                    }
                                >
                                    {t(section[0])}
                                </li>
                                <li
                                    className="cursor-pointer"
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
                                    className="cursor-pointer"
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
                                <li
                                    className="cursor-pointer"
                                    onClick={() =>
                                        AboutSectionRef?.current?.scrollIntoView(
                                            {
                                                behavior: "smooth",
                                            }
                                        )
                                    }
                                >
                                    {t(section[3])}
                                </li>
                                <li
                                    className="cursor-pointer"
                                    onClick={() =>
                                        ServicetSectionRef?.current?.scrollIntoView(
                                            {
                                                behavior: "smooth",
                                            }
                                        )
                                    }
                                >
                                    {t(section[4])}
                                </li>
                            </ul>
                        </div>

                        {user !== null && user !== undefined ? (
                            <div className="flex items-center gap-x-[15px]">
                                <div className="flex items-center gap-x-[10px]">
                                    <p>{user.email}</p>
                                    {user.is_admin ? (
                                        <Link href={"/admin"}>Dashboard</Link>
                                    ) : (
                                        <Link href={"/orders"}>My orders</Link>
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
                            <div className="space-x-[20px]">
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
                    <div className="w-[100%] flex flex-row justify-center ">
                        <div className="w-[75%] mt-[30px] ">
                            <h1 className="text-center text-[26px] md:text-[32px] xmd:text-[36px] text-[#121212] font-[600] leading-[30px] md:leading-[40px] xmd:leading-[50px] mt-[25px] md:mt-[40px] ">
                                {t("landingPage.welcome.Title")}
                            </h1>
                            <p className="text-center text-[16px] md:text-[18px] xmd:text-[20px] text-[#121212] font-[500] leading-[20px] md:leading-[20px] xmd:leading-[25px] mt-[15px] ">
                                {t("landingPage.welcome.Caption")}
                            </p>
                            <p className="text-center text-[12px] md:text-[14px] xmd:text-[16px] mt-[20px] text-[#525D72] font-[500] leading-[15px] md:leading-[20px] xmd:leading-[25px] ">
                                {t("landingPage.welcome.Description")}
                            </p>
                        </div>
                    </div>

                    <div
                        className="flex-type5 mt-[70px] w-[100%]"
                        ref={trackingSectionRef}
                    >
                        <div className="w-[100%] md:w-[65%] flex flex-row justify-center gap-x-[20px]">
                            <input
                                className="flex-1 border-[1px] border-[#8794AD] h-[40px] md:h-[56px] px-[10px] rounded-[4px]"
                                placeholder={
                                    t(
                                        "landingPage.trackOrder.Placeholder"
                                    ) as string
                                }
                                onChange={trackingIdInputHandler}
                            />
                            <button
                                className="h-[40px] md:h-[56px] bg-[#35C6F4] w-[120px] rounded-[4px] px-[20px] text-[16px] text-[#FFFFFF] font-[400] leading-[24px]"
                                onClick={openPackageTrackingModal}
                            >
                                {t("landingPage.trackOrder.SubmitButton")}
                            </button>
                        </div>
                        {trackingIdError && (
                            <p className="mt-[5px] text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                                {" "}
                                {t("landingPage.trackOrder.Error")}
                            </p>
                        )}
                        <p className="text-center text-[16px] text-[#000000] font-[400] leading-[24px] mt-[10px] ">
                            {t("landingPage.trackOrder.CaptionPart1")}{" "}
                            <span className="text-[#35C6F4] cursor-pointer ">
                                {" "}
                                {t("landingPage.trackOrder.CaptionPart2")}
                            </span>
                        </p>
                    </div>
                </div>
                <About ref={AboutSectionRef} />
                <Service ref={ServicetSectionRef} />
                <ShipmentCostCalculator ref={shipmentCalculatorSectionRef} />
                <MazCommunityForm />
                <Footer ref={supportSectionRef} />
            </div>
            {showPackageTrackingModal && (
                <PackageTrackingModal close={closePackageTrackingModal} />
            )}
            {showLogoutConfirmModal && (
                <LogoutConfirmModal
                    logout={logoutHandler}
                    close={toggleLogoutConfirmModal}
                />
            )}
        </>
    );
};

export default Index;

export async function getStaticProps({ locale }: { locale: any }) {
    // console.log(process.env);
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
