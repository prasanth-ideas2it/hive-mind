"use client";

import IconButton from "@/components/ui/icon-button";
import { copyLink, formatTimestampAsDate, getStatusById } from "@/utils/helper";
import { useRouter } from "next/navigation";

const PastProposalHeader = ({
  title,
  creator,
  transactionHash,
  voteEnd,
  state,
}: any) => {
  const router = useRouter();
  const onChangeRoute = () => {
    router.push("/proposals/?type=past-proposals");
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
            <h1 className="text-white text-2xl font-semibold">{title}</h1>
          </div>
          <IconButton name={transactionHash} icon="/assets/icons/cube.svg" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[#FF7A00] capitalize px-2 inline-flex items-center rounded-[36px] h-[20px] font-semibold leading-5 text-[12px] border border-[#FF7A00] shadow-[0px_0px_6px_0px_rgba(255,122,0,1)]">
                {getStatusById(state)}
              </span>
              <span className="text-[#FF7A00] font-semibold text-sm">
                {formatTimestampAsDate(voteEnd)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white text-sm">Created by</span>
              <IconButton name={creator} icon="/assets/icons/profile.svg" />
            </div>
          </div>
          <div className="opacity-[50%] flex items-center gap-2">
            <div
              onClick={() => copyLink("past-proposal", window.location.href)}
              className="flex items-center gap-1 relative"
            >
              <img
                src="/assets/icons/share.svg"
                alt="share icon"
                className="h-[15px] w-[12px] mb-[3px]"
              />
              <span
                id="past-proposal"
                className="text-center"
                style={{
                  position: "absolute",
                  display: "none",
                  top: "-23px",
                  fontSize: "13px",
                  fontWeight: 600,
                  left: "1px",
                  right: "0px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "4px",
                  padding: "2px 1px",
                }}
              >
                Copied
              </span>
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
