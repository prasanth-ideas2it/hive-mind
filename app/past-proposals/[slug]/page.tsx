import Description from "@/components/pages/active-proposals/description";
import Results from "@/components/pages/active-proposals/results";
import Voters from "@/components/pages/active-proposals/voters";
import PastProposalHeader from "@/components/pages/past-proposals/past-proposal-header";

const PastProposal = () => {
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
