"use client";

import { shortenHex, updateSearchParams } from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useContext, useState } from "react";
import PastProposalHeader from "./past-proposal-header";
import Description from "../common/description";
import Results from "../common/results";
import Voters from "../common/voters";
import { UserContext } from "@/context/user-context";
import { getProposalVote } from "@/services/proposals.service";

const PastProposal = ({ proposal, decision, votes }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const userContext = useContext<any>(UserContext);
  const [voteDetail, setVoteDetail] = useState<any>([]);

  useEffect(() => {
    updateSearchParams(
      router,
      searchParams,
      pathname,
      "type",
      "past-proposals"
    );
    checkProposalVote(proposalId, userContext?.user?.wallet as string);
  }, []);

  const checkProposalVote = async (proposalId: string, wallet: string) => {
    console.log(proposalId, wallet);
    try {
      const result = await getProposalVote(proposalId, wallet);
      if (result.status == 200) {
        const voteDetail = await result.json();
        console.table("dd", voteDetail);
        if (voteDetail.status && voteDetail.data.length === 0) {
        } else if (voteDetail.status && voteDetail.data.length > 0) {
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

  return (
    <div className="flex flex-col gap-[20px] pb-[20px]">
      <div>
        <PastProposalHeader
          title={proposalInfo?.title}
          creator={shortenHex(proposer)}
          transactionHash={shortenHex(transactionHash)}
          voteEnd={voteEnd}
          state={state}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        <Description data={proposalInfo?.proposal} />
        <Results
          title="Results"
          votedOption={
            voteDetail[0]?.support === 1
              ? "Yes"
              : voteDetail[0]?.support === 0
              ? "No"
              : "Abstain"
          }
          proposalType="past-proposal"
          decision={decision}
          votes={votes}
        />
        <Voters voters={voters} />
      </div>
    </div>
  );
};

export default PastProposal;
