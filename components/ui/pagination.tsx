import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount }: any) => {
  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="bg-white text-dark py-1 px-3"
      nextClassName="ml-[4px] bg-white overflow-hidden rounded border border-[#E9EDF5] w-[28px] h-full flex justify-center items-center"
      nextLinkClassName="w-full select-none"
      previousLinkClassName="w-full select-none"
      nextLabel={
        <img
          src="/assets/icons/right-arrow-orange.svg"
          className="py-2 m-auto"
        />
      }
      disabledClassName={`opacity-60 z-20`}
      disabledLinkClassName="first:opacity-40"
      previousClassName="mr-[4px] bg-white rounded border border-[#E9EDF5] w-[28px] h-full flex justify-center items-center"
      previousLabel={
        <img
          src="/assets/icons/left-arrow-orange.svg"
          className="py-2 m-auto"
        />
      }
      pageClassName="flex border-y border-[#E9EDF5] items-center justify-center h-full w-[28px] bg-white text-dark cursor-pointer"
      pageLinkClassName="block text-[#0F172A] text-[10px] leading-4 font-[400]"
      activeClassName=""
      activeLinkClassName="bg-gradient-to-b from-yellow-400 to-orange-500 rounded text-white block h-[22px] w-[24px] flex items-center justify-center"
      //   onPageChange={props.handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="flex h-full rounded [&>*:nth-child(2)]:rounded-l [&>*:nth-child(2)]:border-s [&>*:nth-last-child(2)]:rounded-r [&>*:nth-last-child(2)]:border-r"
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
