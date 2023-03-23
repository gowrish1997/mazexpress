import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface IProp {
  pageCount: number;
  currentPageHandler: (value: number) => void;
  itemsPerPage: number;
  currentPage: number;
  // item: IUser[] | IOrderResponse[];
}

const ReactPaginateComponent = (props: IProp) => {

    // const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    //   count:true,status:['pending']
    // });
    // console.log(orders)

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    // const newOffset = (event.selected * props.itemsPerPage) % props.item.length;
    props.currentPageHandler(event.selected);
  };

  return (
    <div className=" bottom-[10px] flex flex-row justify-center items-center">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={props.pageCount}
        previousLabel="<"
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageClassName="page-item"
        pageLinkClassName="prev-page-link"
        previousClassName={`${
          currentPage + 1 == 1 ? "prev-page-item1" : "prev-page-item"
        }`}
        previousLinkClassName="page-link"
        nextClassName={`${
          currentPage + 1 == props.pageCount
            ? "next-page-item1"
            : "next-page-item"
        }`}
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
