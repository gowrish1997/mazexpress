interface IProp {
  close: () => void;
}

const OrderCancelConfirmModal = (props: IProp) => {
  const confirmClickHandler = () => {
    props.close();
  };
  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
        <div className="bg-[#FFFFFF] rounded-[4px] p-[20px] w-[379px] flex-type7 gap-y-[20px] ">
          <p className="text-[18px] text-[#2B2B2B] leading-[25px] font-[700] ">
            Cancel order
          </p>

          <div className="flex-type1 space-x-[10px] mt-[5px] ">
            <button
              className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center"
              onClick={() => props.close()}
            >
              Close
            </button>
            <button
              className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] px-[15px] "
              type="submit"
              onClick={confirmClickHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCancelConfirmModal;
