"use client";

import { useEffect, useState, useContext } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { onSign, shortenHex, updateSearchParams } from "@/utils/helper";
import ActiveProposalHeader from "./active-proposal-header";
import Description from "../common/description";
import Results from "../common/results";
import Voters from "../common/voters";
import { UserContext } from "@/context/user-context";
import { castVote, getProposalVote } from "@/services/proposals.service";
import { toast } from "react-toastify";
import Modal from "@/components/ui/modal";

const ActiveProposal = ({ proposal, votes }: any) => {
  console.log(proposal);
  const {
    description,
    proposer,
    transactionHash,
    proposalId,
    voters,
    voteEnd,
    state,
  } = proposal;
  const proposalInfo = JSON.parse(description);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useContext(UserContext);
  const [voteData, setVoteData] = useState({
    optionSelected: "",
    comment: "",
    wallet: user?.wallet,
    proposalId: proposalId,
  });

  const [voteDetail, setVoteDetail] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateSearchParams(
      router,
      searchParams,
      pathname,
      "type",
      "active-proposals"
    );
    checkProposalVote(proposalId, user?.wallet as string);
  }, []);

  const checkProposalVote = async (proposalId: string, wallet: string) => {
    try {
      const result = await getProposalVote(proposalId, wallet);
      if (result.status == 200) {
        const voteDetail = await result.json();
        if (voteDetail.status && voteDetail.data.length === 0) {
          setShow(false);
        } else if (voteDetail.status && voteDetail.data.length > 0) {
          setShow(true);
          setVoteDetail(voteDetail.data);
        }
      } else {
        return {
          data: {},
        };
      }
    } catch (err) {
      return {
        data: {},
      };
    }
  };

  const onVoteChange = (ev: any) => {
    setVoteData({ ...voteData, optionSelected: ev.target.value });
  };

  const saveVote = async (payload: any) => {
    document.dispatchEvent(
      new CustomEvent("show-loader", {
        detail: true,
      })
    );
    const signResponse = await onSign("New Message for vote proposal");

    if (signResponse?.status === "success") {
      try {
        const saveVoteResponse = await castVote({
          ...payload,
          signedMessage: signResponse?.signedMessage,
        });
        if (
          saveVoteResponse?.status === 201 ||
          saveVoteResponse?.status === 200
        ) {
          const res = await saveVoteResponse.json();
          console.log("voteRes", res);
          if (res.status) {
            setIsModalOpen(false);
            toast.success("Voted Successfully");
            document.dispatchEvent(
              new CustomEvent("show-loader", {
                detail: false,
              })
            );
            checkProposalVote(proposalId, user?.wallet as string);
            router.refresh();
          }
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        document.dispatchEvent(
          new CustomEvent("show-loader", {
            detail: false,
          })
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[20px] pb-[20px]">
        <div>
          <ActiveProposalHeader
            title={proposalInfo?.title}
            creator={shortenHex(proposer)}
            transactionHash={shortenHex(transactionHash)}
            voteEnd={voteEnd}
            state={state}
          />
        </div>
        {!show ? (
          <div className="border-4 border-[#C0D7DC69] rounded-xl px-6 pb-6 pt-3 bg-white flex flex-col gap-[10px]">
            <div className="flex flex-col gap-3">
              <h6 className="font-[500] text-sm text-black">Description</h6>
              <p className="text-sm text-black leading-[22px]">
                {proposalInfo?.proposal}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-[500] text-sm text-black">
                Choose an option
              </h6>
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-1">
                  <input
                    className="relative h-4 w-4 appearance-none rounded-[50%] border border-[#FF7E47] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[9.5px] checked:after:w-[9.5px] checked:after:rounded-full  checked:after:bg-[#FF7E47] checked:after:[transform:translate(-50%,-50%)]"
                    type="radio"
                    name="option"
                    onChange={onVoteChange}
                    value={1}
                  />
                  <label className="inline-block text-[#0F172A] font-semibold text-sm leading-[22px] hover:cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    className="relative h-4 w-4 appearance-none rounded-full border border-[#FF7E47] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[9.5px] checked:after:w-[9.5px] checked:after:rounded-full  checked:after:bg-[#FF7E47] checked:after:[transform:translate(-50%,-50%)]"
                    type="radio"
                    name="option"
                    value={0}
                    onChange={onVoteChange}
                  />
                  <label className="inline-block font-semibold text-[#0F172A] text-sm leading-[22px] hover:cursor-pointer">
                    No
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    className="relative h-4 w-4 appearance-none rounded-[50%] border border-[#FF7E47] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[9.5px] checked:after:w-[9.5px] checked:after:rounded-full  checked:after:bg-[#FF7E47] checked:after:[transform:translate(-50%,-50%)]"
                    type="radio"
                    name="option"
                    value={2}
                    onChange={onVoteChange}
                  />
                  <label className="inline-block text-[#0F172A] font-semibold text-sm leading-[22px] hover:cursor-pointer">
                    Abstain
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
                onChange={(e) =>
                  setVoteData({ ...voteData, comment: e?.target?.value })
                }
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center">
                Close
              </button>
              <button
                onClick={() => saveVote(voteData)}
                className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight border border-[#CBD5E1] shadow-[0px_1px_1px_0px_#0F172A14] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <Description data={proposalInfo?.proposal} />
            <Results
              title="Current Results"
              votedOption={
                voteDetail[0].support === 1
                  ? "Yes"
                  : voteDetail[0].support === 0
                  ? "No"
                  : "Abstain"
              }
              votes={votes}
            />
            <Voters voters={voters} />
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} overlay>
        <div className="w-[400px]">
          <div className="text-black text-sm p-3">
            Please Sign to create your proposal
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
            >
              Close
            </button>
            <button
              onClick={() => saveVote(voteData)}
              className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight border border-[#CBD5E1] shadow-[0px_1px_1px_0px_#0F172A14] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
            >
              Sign
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActiveProposal;
