const Voters = () => {
  return (
    <div className="border-4 border-[#C0D7DC69] rounded-xl bg-white pl-[24px] pr-[12px] pt-[12px] pb-[24px] h-[372px]">
      <div className="h-full flex flex-col gap-[10px]">
        <div className="flex items-center gap-2 py-2">
          <span className="text-black font-[500] text-sm">Voters</span>
          <span className="px-2 text-white h-[20px] inline-flex items-center text-xs font-semibold rounded-full leading-tight bg-[#597D9E]">
            431
          </span>
        </div>
        <div className="pr-2 flex flex-col flex-1 overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-slate-300 scrollbar-thumb-rounded ">
          {Array.from({ length: 50 }).map((_, index) => {
            return (
              <div
                key={`user-${index}`}
                className="flex items-center gap-2 py-2 border-b border-b-[#0000001A]"
              >
                <img src="/assets/icons/profile-black.svg" alt="profile icon" />
                <span className="text-black text-sm font-[500] leading-6 inline-flex items-center">
                  0xbf47...c2a2
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Voters;
