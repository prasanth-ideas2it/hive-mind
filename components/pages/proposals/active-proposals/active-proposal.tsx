"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateSearchParams } from "@/utils/helper";
import ActiveProposalHeader from "./active-proposal-header";
import Description from "../common/description";
import Results from "../common/results";
import Voters from "../common/voters";

const ActiveProposal = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    updateSearchParams(
      router,
      searchParams,
      pathname,
      "type",
      "active-proposals"
    );
  }, []);

  return (
    <div className="flex flex-col gap-[20px] pb-[20px]">
      <div>
        <ActiveProposalHeader />
      </div>
      {!show ? (
        <div className="border-4 border-[#C0D7DC69] rounded-xl px-6 pb-6 pt-3 bg-white flex flex-col gap-[10px]">
          <div className="flex flex-col gap-3">
            <h6 className="font-[500] text-sm text-black">Description</h6>
            <p className="text-sm text-black leading-[22px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="font-[500] text-sm text-black">Choose an option</h6>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-1">
                <input
                  className="relative h-4 w-4 appearance-none rounded-[50%] border border-[#FF7E47] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[9.5px] checked:after:w-[9.5px] checked:after:rounded-full  checked:after:bg-[#FF7E47] checked:after:[transform:translate(-50%,-50%)]"
                  type="radio"
                  name="option"
                />
                <label className="inline-block text-[#0F172A] font-semibold text-sm leading-[22px] hover:cursor-pointer">
                  Yes, full-time
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  className="relative h-4 w-4 appearance-none rounded-full border border-[#FF7E47] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[9.5px] checked:after:w-[9.5px] checked:after:rounded-full  checked:after:bg-[#FF7E47] checked:after:[transform:translate(-50%,-50%)]"
                  type="radio"
                  name="option"
                />
                <label className="inline-block font-semibold text-[#0F172A] text-sm leading-[22px] hover:cursor-pointer">
                  Yes, part-time
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h6 className="text-[#0F172A80] font-semibold leading-[22px]">
              Comments
            </h6>
            <textarea
              className="w-full border resize-none h-[80px] border-[#CBD5E1] rounded-lg py-[8px] px-[12px] placeholder:font-[500] leading-6 text-sm text-[#475569] focus:outline-0"
              placeholder="Enter comments or your view points on your decision"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center">
              Close
            </button>
            <button
              onClick={() => setShow(true)}
              className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight border border-[#CBD5E1] shadow-[0px_1px_1px_0px_#0F172A14] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[20px]">
          <Description />
          <Results title="Current Results" votedOption="Yes, full-time" />
          <Voters />
        </div>
      )}
    </div>
  );
};

export default ActiveProposal;
