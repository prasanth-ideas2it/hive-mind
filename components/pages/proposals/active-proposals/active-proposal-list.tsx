"use client";

import { useEffect, useState, useContext } from "react";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user-context";
import { timeDifference } from "@/utils/helper";

const ActiveProposalList = (props: any) => {
  const data = props?.data;
  const { user } = useContext(UserContext);
  const [activeProposals, setActiveProposals] = useState(data ?? []);
  console.log("qqq", data, user);

  const router = useRouter();

  useEffect(() => {
    function handler(e: any) {
      console.log("ooo", e.detail.activeProposals);
      setActiveProposals(e.detail.activeProposals);
    }

    document.addEventListener("updateActiveProposals", handler);
    return function () {
      document.removeEventListener("updateActiveProposals", handler);
    };
  }, []);

  const onOpenModal = () => {
    document.dispatchEvent(
      new CustomEvent("showModal", { detail: { type: "create-proposal" } })
    );
  };

  const onVotePost = (id: string) => {
    router.push(`/proposals/${id}`);
  };

  return (
    <div className="flex flex-col gap-[20px]">
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
          {/* <button
            onClick={onSign}
            className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight shadow-[0_0_13px_0_rgba(255,107,0,1)] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
          >
            sign
          </button> */}
        </div>
        <div className="w-full p-2.5 bg-white rounded-xl border-4 border-[#C0D7DC69] flex-col justify-start items-start gap-2.5 inline-flex">
          {activeProposals?.map((item: any, index: number) => {
            if (item?.proposalId !== "4") {
              const description = JSON.parse(item?.description);
              return (
                <div
                  key={`proposal-${index}`}
                  className="flex items-center px-[16px] w-full bg-slate-50 rounded-lg h-[64px]"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2 items-center">
                      <div
                        style={{ backgroundColor: "#FFD4B5" }}
                        className="h-[40px] w-[40px] flex items-center justify-center rounded"
                      >
                        <img
                          src={`${
                            description.category === "Organisation"
                              ? "/assets/icons/organization.svg"
                              : ""
                          }`}
                          alt="icon"
                        />
                      </div>
                      <div className="w-[389px]">
                        <h1 className="text-sm text-slate-900 font-semibold leading-snug">
                          {description?.title}
                        </h1>
                      </div>
                    </div>
                    <div className=" w-[265px] h-full flex justify-end items-center gap-2">
                      <div className=" w-[107px] flex flex-col opacity-50">
                        <div className="text-neutral-700 text-[10px] font-semibold leading-tight text-center">
                          {timeDifference(item?.voteEnd)
                            ? "Ends in"
                            : "Time Ended"}
                        </div>
                        <div className="text-neutral-700 text-sm font-semibold leading-tight text-center">
                          {timeDifference(item?.voteEnd)}
                        </div>
                      </div>

                      {item.voters?.includes(
                        user?.wallet?.toLocaleLowerCase()
                      ) ? (
                        <button
                          onClick={() => onVotePost(item?.proposalId)}
                          className="w-[97px] text-[#0B8A00] text-sm font-semibold leading-tight justify-center h-10 flex gap-2 items-center"
                        >
                          <img src="/assets/icons/tick-green.svg" alt="icon" />
                          Voted
                        </button>
                      ) : (
                        <button
                          onClick={() => onVotePost(item?.proposalId)}
                          className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                        >
                          Vote
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="h-[28px] flex justify-center items-center">
        <Pagination pageCount={5} />
      </div>
    </div>
  );
};

export default ActiveProposalList;
