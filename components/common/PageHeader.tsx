import ClickOutside from "@/components/common/ClickOutside";
import { perPageOptinsList } from "@/lib/helper";
import calendarIcon from "@/public/calendar_icon.png";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import cancel from "../../public/cancel.png";
import MazStatsDropddown from "../admin/MazStats/MazStatsDropddown";
import ReactPaginateComponent from "../admin/ReactPaginate";
import { getDateInStringFormat } from "@/lib/helper";
import { Order } from "@/models/order.model";
interface IProp {
    content: string;
    className?: string;
    showCalender?: boolean;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    itemPerPageHandler?: (value: string | number) => void;
    allLiveOrders?: Order[];
    filterByDate?: (value: Date | string) => void;
    pageCount?: number;
    currentPageHandler?: (value: number) => void;
    itemsPerPage?: number;
    currentPage?: number;
    isFilterPresent?: boolean;
    createdDateFilterKey?: string | Date;
}
const PageHeader = (props: IProp) => {
    let trigger = useRef(null);
    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;

    const [showCalender, setShowCalender] = useState<boolean>(false);
    const [allOrderDeliveryDate, setAllOrderDeliveryDate] = useState<
        string[] | null
    >(null);
    const [filterDate, setFilterDate] = useState<Date | string>("");

    useEffect(() => {
        setFilterDate(props.createdDateFilterKey!);
    }, []);

    const toggleCalender = () => {
        setShowCalender((prev) => !prev);
    };

    const calendarChange = (value: Date, event: any) => {
        props.filterByDate?.(value);
        setFilterDate(value);
        // get clicked day and calc datePointer
        // console.log(value)
        // console.log(new Date())
        // console.log((value - new Date())/(1000 * 3600 * 24))
        // console.log(event)
    };
    const clearDateHandler = () => {
        props.filterByDate?.("");
        // props.filterByDate(value);
        setFilterDate("");
    };
    // console.log(allOrderDeliveryDate);

    return (
        <div
            className={
                "w-full flex-type3  pb-[20px] px-[5px] relative " +
                " " +
                props.className
            }
        >
            <Head>
                <title>{props.title ? props.title : "MazExpress | dev"}</title>
            </Head>
            <p className="text-[13px] sm:text-[18px] text-[#2B2B2B] font-[700] leading-[15px] table_md:leading-[25px]">
                {props.content}
            </p>
            {router.pathname.includes("orders") && (
                <ReactPaginateComponent
                    pageCount={props.pageCount!}
                    currentPageHandler={props.currentPageHandler!}
                    itemsPerPage={props.itemsPerPage!}
                    currentPage={props.currentPage!}
                />
            )}

            {((props.allLiveOrders && props.allLiveOrders.length > 0) ||
                props.isFilterPresent) && (
                <div className="flex-type1 gap-x-[2px] table_md:gap-x-[10px]">
                    <MazStatsDropddown
                        options={perPageOptinsList()}
                        header="per_page"
                        itemPerPage={props.itemsPerPage}
                        onChange={props.itemPerPageHandler!}
                        className="h-[38px] px-[10px]"
                        selection={[]}
                    />
                    <div className="relative flex-type1 gap-x-[3px] table_md:gap-x-[10px]">
                        <div
                            className="flex flex-row justify-start items-center border-[1px] border-[#BBC2CF] rounded-[4px] ml-[10px] py-[7px] px-[3px] table_md:px-[10px] gap-x-[3px] cursor-pointer "
                            onClick={toggleCalender}
                            ref={trigger}
                        >
                            <div className="relative h-[18px] w-[16px] text-[#9845DB] cursor-pointer">
                                <Image
                                    src={calendarIcon}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    alt="button"
                                />
                            </div>
                            <div className="box-border w-[60px] table_md:w-full font-[500] text-[10px] table_md:text-[16px] leading-[10px] table_md:leading-[22.4px] text-[#35C6F4] text-left">
                                {filterDate
                                    ? getDateInStringFormat(filterDate as Date)
                                    : "No date selected"}
                            </div>
                        </div>
                        {showCalender ? (
                            <ClickOutside
                                trigger={trigger}
                                handler={toggleCalender}
                                className={`absolute top-[50px] ${
                                    locale == "en" ? "right-[0px]" : "left-0"
                                } z-40 `}
                            >
                                <div className={`bg-white rounded shadow p-5`}>
                                    <Calendar
                                        onChange={calendarChange}
                                        // value={calendarValue}
                                        next2Label={null}
                                        prev2Label={null}
                                        nextLabel={
                                            <FontAwesomeIcon
                                                icon={faAngleRight}
                                                className="w-2"
                                            />
                                        }
                                        prevLabel={
                                            <FontAwesomeIcon
                                                icon={faAngleLeft}
                                                className="w-2"
                                            />
                                        }
                                        view={"month"}
                                        tileClassName={({ date, view }) => {
                                            if (
                                                props.allLiveOrders?.find(
                                                    (x) =>
                                                        moment(
                                                            x.created_on
                                                        ).format(
                                                            "DD-MM-YYYY"
                                                        ) ===
                                                        moment(date).format(
                                                            "DD-MM-YYYY"
                                                        )
                                                )
                                            ) {
                                                return "highlight" as any;
                                            }
                                        }}
                                    />
                                </div>
                            </ClickOutside>
                        ) : null}
                        {filterDate && (
                            <Image
                                src={cancel}
                                height={15}
                                width={15}
                                alt="cancel"
                                className="ml-[5px] cursor-pointer"
                                onClick={clearDateHandler}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
