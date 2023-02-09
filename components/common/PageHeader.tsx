import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import useUser from "@/lib/useUser";
import useTrackings from "@/lib/useTrackings";
import ClickOutside from "@/components/common/ClickOutside";
interface IProp {
    content: string;
    className?: string;
    showCalender?: boolean;
    title?: string;
}
const PageHeader = (props: IProp) => {

    let trigger = useRef(null);

    const { user, mutateUser, userIsLoading } = useUser();
    const { tracking, trackingIsLoading } = useTrackings({
        user_id: user?.id_users,
    });

    const [showCalender, setShowCalender] = useState<boolean>(false);
    const [allOrderDeliveryDate, setAllOrderDeliveryDate] = useState<string[] | null>(null);
    const [calendarValue, setCalendarValue] = useState<Date>(new Date());

    useEffect(() => {
        const deliveryDate = tracking?.map((data) => {
            return moment(data.created_on_tracking).format("DD-MM-YYYY");
        });

        setAllOrderDeliveryDate(deliveryDate!);
    }, [tracking]);

    const toggleArrivalCalender = () => {
        setShowCalender((prev) => !prev);
    };
    const smarttoggleCalenderHandler = () => {
        setShowCalender(false);
    };

    const calendarChange = (value: Date, event: any) => {
        // get clicked day and calc datePointer
        // console.log(value)
        // console.log(new Date())
        // console.log((value - new Date())/(1000 * 3600 * 24))
        // console.log(event)
    };

    return (
        <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative " + " " + props.className}>
            <Head>
                <title>{props.title ? props.title : "MazExpress | dev"}</title>
            </Head>
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">{props.content}</p>
            <div className="relative">
                {props.showCalender && (
                    <button
                        className="border-[1px] border-[#BBC2CF] text-[14px] text-[#2b2b2b] font-[19px] leading-[19px] p-[10px] rounded-[4px] hover:bg-[#EDF5F9] hover:text-[#2b2b2b] "
                        onClick={toggleArrivalCalender}
                    >
                        Order Calendar
                    </button>
                )}
                {showCalender ? (
                    <ClickOutside trigger={trigger} handler={smarttoggleCalenderHandler}>
                        <div className="absolute top-[50px] right-0 bg-white rounded shadow z-40 p-5">
                            <Calendar
                                onChange={calendarChange}
                                value={calendarValue}
                                next2Label={null}
                                prev2Label={null}
                                nextLabel={<FontAwesomeIcon icon={faAngleRight} size="xs" />}
                                prevLabel={<FontAwesomeIcon icon={faAngleLeft} size="xs" />}
                                view={"month"}
                                tileClassName={({ date, view }) => {
                                    if (allOrderDeliveryDate?.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                                        return "highlight" as any;
                                    }
                                }}
                            />
                        </div>
                    </ClickOutside>
                ) : null}
            </div>
        </div>
    );
};

export default PageHeader;
