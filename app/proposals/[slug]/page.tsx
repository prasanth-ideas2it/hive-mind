import ActiveProposal from "@/components/pages/proposals/active-proposals/active-proposal";
import PastProposal from "@/components/pages/proposals/past-proposals/past-proposal";
import { redirect } from "next/navigation";

export async function getProposal() {
  return {
    type: "past-proposal",
  };
}

const Proposal = async (props: any) => {
  const { params } = props;
  const proposal = (await getProposal()) as any;

  const type = proposal.type;

  return (
    <div>
      {type === "active-proposal" && <ActiveProposal />}
      {type === "past-proposal" && <PastProposal />}
    </div>
  );
};

export default Proposal;
