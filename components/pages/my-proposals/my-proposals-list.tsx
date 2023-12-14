"use client";

import CreateProposal from "@/components/ui/create-proposal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MyProposalsList = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onNavigateToProposal = () => {
    router.push("/my-proposals/1");
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
          My Proposals
        </h1>
        <button
          onClick={onOpenModal}
          className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight shadow-[0_0_13px_0_rgba(255,107,0,1)] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
        >
          Create
        </button>
      </div>
      <div className="w-full p-2.5 bg-white rounded-xl border-4 border-[#C0D7DC69] flex-col justify-start items-start gap-2.5 inline-flex">
        {Array.from({ length: 2 }).map((_, index) => {
          return (
            <div
              key={`proposal-${index}`}
              className="flex items-center px-[16px] w-full bg-slate-50 rounded-lg h-[64px] cursor-pointer"
              onClick={onNavigateToProposal}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <div className="h-[40px] w-[40px] bg-[#B9EDB8] flex items-center justify-center rounded">
                    <img src="/assets/icons/rupees.svg" alt="rupees" />
                  </div>
                  <div className="w-[389px]">
                    <h1 className="text-sm text-slate-900 font-semibold leading-snug">
                      In the next fiscal year, what should be the top priority
                      for IT budget allocation?
                    </h1>
                  </div>
                </div>
                <div className=" w-[265px] h-full flex justify-end items-center gap-2">
                  <div className=" w-[107px] flex flex-col opacity-50">
                    <div className="text-neutral-700 text-[10px] font-semibold leading-tight text-center">
                      Ended on
                    </div>
                    <div className="text-neutral-700 text-sm font-semibold leading-tight text-center">
                      3/1 2023
                    </div>
                  </div>
                  <button
                    // onClick={onVote}
                    className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                  >
                    Results
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

export default MyProposalsList;
