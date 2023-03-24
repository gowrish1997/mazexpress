import React from "react";
import Image from "next/image";
import Profile from "../../public/image.png";
import Icon from "../../public/Icon.png";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const content = [
    "We specialize in providing warehousing services in Istanbul for customers who shop online from Turkish retailers. Our warehouse is equipped with security measures to ensure that your goods are safe and secure. We have a team of experienced professionals who manage our warehouse operations and ensure that your goods are handled with care and precision.",
    "We understand that every customer has unique shipping needs, which is why we offer a wide range of transportation solutions tailored to meet your specific requirements. Whether you need air, sea, or land transportation services, we have the expertise and resources to get your goods where they need to go.",
    "So, if you're looking for a reliable logistics partner to help you with your shipping needs, look no further than our company. Contact us today to learn more about our services and how we can help you streamline your shipping operations.",
    "Once your orders are placed, we collect them from the retailers and prepare them for shipment to Libya. Our transportation services are designed to be fast, reliable, and cost-effective. We work with a network of trusted carriers to ensure that your goods arrive at their destination on time and in perfect condition.",
    "Our commitment to customer satisfaction is what sets us apart from other logistics providers. We are dedicated to providing exceptional customer service and communication throughout the entire shipping process. Our team is always available to answer your questions and address any concerns you may have.",
];

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    // var content = t("landingPage.about.Content", {
    //     returnObjeFcts: true,
    // });
    // console.log(content);

    return (
        <div
            className="w-full flex flex-col  justify-start items-center "
            ref={ref}
        >
            <div className="bg-[#35C6F4] w-full mt-[60px] flex flex-row justify-center ">
                <div className="w-[80%] flex flex-row justify-between items-center  gap-x-[15px]">
                    <div className="flex flex-col justify-start w-[65%] py-[50px] ">
                        <p className="text-[12px] md:text-[14px] xmd:text-[16px] mt-[20px] text-[#000000] font-[500] leading-[25.5px]">
                            {t("landingPage.about.Title")}
                        </p>
                        <p className="text-[20px] md:text-[30px] xmd:text-[38px] text-[#FFFFFF]  font-[500] md:font-[600] xmd:font-[700] leading-[23.5px] md:leading-[34px] xmd:leading-[45px] ">
                            {t("landingPage.about.Description")}
                        </p>
                    </div>
                    <div className="w-[35%]">
                        <div className="relative h-[150px] w-[150px] md:w-[250px] md:h-[250px] xmd:h-[335px] xmd:w-[335px] ">
                            <Image src={Profile} fill alt="imag" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[80%] mt-[70px] flex flex-row justify-start items-center flex-wrap  gap-x-[120px]">
                {content.map((data) => {
                    return (
                        <div className="w-[100%] xmd:w-[43%]  mt-[40px] flex flex-row justify-start items-start gap-x-[5px] ">
                            <div className="relative h-[22px] w-[22px] ">
                                <Image src={Icon} fill alt="imag" />
                            </div>
                            <p className="flex-1 text-[18px] text-[#090914] leading-[27px] font-[500] -mt-[5px] font-manRope">
                                {data}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default About;
