"use client";

import { updateSearchParams } from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PastProposalHeader from "./past-proposal-header";
import Description from "../common/description";
import Results from "../common/results";
import Voters from "../common/voters";

const PastProposal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    updateSearchParams(
      router,
      searchParams,
      pathname,
      "type",
      "past-proposals"
    );
  }, []);

  return (
    <div className="flex flex-col gap-[20px] pb-[20px]">
      <div>
        <PastProposalHeader />
      </div>
      <div className="flex flex-col gap-[20px]">
        <Description />
        <Results
          title="Results"
          votedOption="Yes, full-time"
          proposalType="past-proposal"
          status="concluded"
        />
        <Voters />
      </div>
    </div>
  );
};

export default PastProposal;
