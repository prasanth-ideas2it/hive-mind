"use client";

import { UserContext } from "@/context/user-context";
import { getAllMyProposals } from "@/services/proposals.service";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

const MyProposalsList = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [myProposals, setMyProposals] = useState([]);

  const onOpenModal = () => {
    document.dispatchEvent(
      new CustomEvent("showModal", { detail: { type: "create-proposal" } })
    );
  };

  useEffect(() => {
    async function getAllMyProposals() {
      const myProposals = await getMyProposals(
        "0x632F7BFCDa843C6F779e38ffeF8ff01761db4a16"
      );
      setMyProposals(myProposals?.data?.data);
    }
    getAllMyProposals();
  }, []);

  async function getMyProposals(account: string) {
    try {
      const result = await getAllMyProposals(account);
      if (result.status == 200) {
        return {
          data: await result.json(),
        };
      } else {
        return {
          data: [],
        };
      }
    } catch (err) {
      return {
        data: [],
      };
    }
  }

  const pastProposals = ["3", "7", "8"];
  const activeProposals = ["1", "2", "4", "5", "6"];

  const onViewProposal = (id: string) => {
    router.push(`/proposals/${id}`);
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
        {myProposals?.map((item: any, index: number) => {
          const description = JSON.parse(item.description);
          return (
            <div
              key={`proposal-${index}`}
              className="flex items-center px-[16px] w-full bg-slate-50 rounded-lg h-[64px] cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <div className="h-[40px] w-[40px] bg-[#B9EDB8] flex items-center justify-center rounded">
                    <img src="/assets/icons/rupees.svg" alt="rupees" />
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
                      Ended on
                    </div>
                    <div className="text-neutral-700 text-sm font-semibold leading-tight text-center">
                      3/1 2023
                    </div>
                  </div>
                  <button
                    onClick={() => onViewProposal(item?.proposalId)}
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
