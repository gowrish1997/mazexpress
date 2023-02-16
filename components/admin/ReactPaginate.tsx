import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IUser } from "@/models/user.interface";
import { IOrderResponse } from "@/models/order.interface";
interface IProp {
    pageCount: number;
    offsetHandler: (value: number) => void;
    itemsPerPage: number;
    item: IUser[] | IOrderResponse[];
}

const ReactPaginateComponent = (props: IProp) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [props.item]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected);
        const newOffset = (event.selected * props.itemsPerPage) % props.item.length;
        props.offsetHandler(newOffset);
    };

    return (
    <div className="fixed bottom-[10px] flex flex-row justify-center items-center right-[0%] w-full">
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageCount={props.pageCount}
                previousLabel="< previous"
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageClassName="page-item"
                pageLinkClassName="prev-page-link"
                previousClassName={`${currentPage + 1 == 1 ? "prev-page-item1" : "prev-page-item"}`}
                previousLinkClassName="page-link"
                nextClassName={`${currentPage + 1 == props.pageCount ? "next-page-item1" : "next-page-item"}`}
                nextLinkClassName="next-page-link"
                breakLabel=".."
                breakClassName="page-item1"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null!}
                forcePage={currentPage}
            />
        </div>
    );
};

export default ReactPaginateComponent;
