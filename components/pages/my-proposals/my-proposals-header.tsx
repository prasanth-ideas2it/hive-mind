"use client";

import IconButton from "@/components/ui/icon-button";
import { useRouter } from "next/navigation";

const PastProposalHeader = () => {
  const router = useRouter();
  const onChangeRoute = () => {
    router.push("/past-proposals");
  };
  return (
    <>
      <div>
        <button
          onClick={onChangeRoute}
          className="flex items-center gap-2 opacity-50"
        >
          <img src="/assets/icons/left-arrow.svg" alt="icon" />
          <span className="text-[10px] font-semibold leading-[32px] text-white">
            Back
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center justify-between">
          <div className="w-[481px]">
            <h1 className="text-white text-2xl font-semibold">
              Should the organization offer a flexible work-from-home option?
            </h1>
          </div>
          <IconButton name="0xbf47...c2a2" icon="/assets/icons/cube.svg" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[#FF7A00] capitalize px-2 inline-flex items-center rounded-[36px] h-[20px] font-semibold leading-5 text-[12px] border border-[#FF7A00] shadow-[0px_0px_6px_0px_rgba(255,122,0,1)]">
                active
              </span>
              <span className="text-[#FF7A00] font-semibold text-sm">
                1 day 3 hours left
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white text-sm">Created by</span>
              <IconButton
                name="0xbf47...c2a2"
                icon="/assets/icons/profile.svg"
              />
            </div>
          </div>
          <div className="opacity-[50%] flex items-center gap-2">
            <div className="flex items-center gap-1">
              <img
                src="/assets/icons/share.svg"
                alt="share icon"
                className="h-[15px] w-[12px] mb-[3px]"
              />
              <span className="font-semibold h-[20px] cursor-pointer text-white text-sm inline-flex items-center">
                Share
              </span>
            </div>
            <img
              src="/assets/icons/menu.svg"
              alt="share icon"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PastProposalHeader;
