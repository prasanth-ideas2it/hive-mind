import ActiveProposal from "@/components/pages/proposals/active-proposals/active-proposal";
import PastProposal from "@/components/pages/proposals/past-proposals/past-proposal";
import {
  getProposalById,
  getVoteDetailsByProposal,
  getVotesByProposal,
} from "@/services/proposals.service";
import { redirect } from "next/navigation";
// import ProtectedRoute from "@/hoc/protectedRoute";

// async function getProposal() {
//   return {
//     type: "past-proposal",
//   };
// }

async function getProposal(id: string) {
  try {
    const result = await getProposalById(id);
    if (result.status == 200) {
      return {
        data: await result.json(),
      };
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
}

async function getVoters(id: string) {
  try {
    const result = await getVoteDetailsByProposal(id);
    if (result.status == 200) {
      return {
        data: await result.json(),
      };
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
}

async function getNumberOfVotes(id: string) {
  try {
    const result = await getVotesByProposal(id);
    if (result.status == 200) {
      return {
        data: await result.json(),
      };
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
}

const Proposal = async (props: any) => {
  const { params } = props;
  // const proposal = (await getProposal()) as any;

  const { data } = await getProposal(params?.slug);
  const { data: voters } = await getVoters("3");
  const { data: votes } = await getNumberOfVotes(params?.slug);

  const type = "active-proposal";

  return (
    <div>
      {type === "active-proposal" && (
        <ActiveProposal proposal={data?.data[0]} votes={votes?.data} />
      )}
      {/* {type === "past-proposal" && <PastProposal />} */}
    </div>
  );
};

export default Proposal;
