"use client";
import Proposal from "@/components/core/proposals/proposal";
import { proposals } from "@/utils/constants";
import { useRouter } from "next/navigation";

const ActiveProposalList = () => {
  const router = useRouter();

  const onVote = () => {
    router.push("/active-proposals/1");
  };

  const onOpenModal = () => {
    document.dispatchEvent(
      new CustomEvent("showModal", { detail: { type: "create-proposal" } })
    );
  };

  return (
    <div className="flex flex-col gap-[18px] mt-[36px]">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-extrabold leading-7">
          Active Proposals
        </h1>
        <button
          onClick={onOpenModal}
          className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight shadow-[0_0_13px_0_rgba(255,107,0,1)] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
        >
          Create
        </button>
      </div>
      <div className="w-full p-2.5 bg-white rounded-xl border-4 border-[#C0D7DC69] flex-col justify-start items-start gap-2.5 inline-flex">
        {proposals.map((item, index) => {
          return (
            <div
              key={`proposal-${index}`}
              className="flex items-center px-[16px] w-full bg-slate-50 rounded-lg h-[64px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <div
                    style={{ backgroundColor: item?.bgColor }}
                    className="h-[40px] w-[40px] flex items-center justify-center rounded"
                  >
                    <img src={`/assets/icons/${item.name}.svg`} alt="icon" />
                  </div>
                  <div className="w-[389px]">
                    <h1 className="text-sm text-slate-900 font-semibold leading-snug">
                      {item.title}
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
                  <button
                    onClick={onVote}
                    className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveProposalList;
