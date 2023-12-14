const Proposal = ({
  headerName,
  proposalType,
  icon,
  iconBgColor,
  proposalBgColor,
  callback,
  isVoted,
}: any) => {
  return (
    <div
      style={{ backgroundColor: proposalBgColor }}
      className="flex items-center px-[16px] w-full rounded-lg h-[64px]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <div
            style={{ backgroundColor: iconBgColor }}
            className="h-[40px] w-[40px]  flex items-center justify-center rounded"
          >
            <img src={icon} alt="icon" />
          </div>
          <div className="w-[389px]">
            <h1 className="text-sm text-slate-900 font-semibold leading-snug">
              {headerName}
            </h1>
          </div>
        </div>
        <div className=" w-[265px] h-full flex justify-end items-center gap-2">
          <div className=" w-[107px] flex flex-col opacity-50">
            <div className="text-neutral-700 text-[10px] font-semibold leading-tight text-center">
              Ends in
            </div>
            <div className="text-neutral-700 text-sm font-semibold leading-tight text-center">
              13h 45m
            </div>
          </div>
          {
            (proposalType =
              "active-proposals" && isVoted ? (
                <div></div>
              ) : (
                <button
                  onClick={callback}
                  className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                >
                  Vote
                </button>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Proposal;
