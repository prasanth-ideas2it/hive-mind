import ActiveProposal from "@/components/pages/proposals/active-proposals/active-proposal";
import PastProposal from "@/components/pages/proposals/past-proposals/past-proposal";
import {
  getManagementDecision,
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

async function getManagementDecisionsById(id: string) {
  try {
    const result = await getManagementDecision(id);
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
  const { data: voters } = await getVoters(params?.slug);
  const { data: votes } = await getNumberOfVotes(params?.slug);
  const { data: decision } = await getManagementDecisionsById(params?.slug);
  console.log("deci", voters);

  const type = "active";

  const state = data?.data[0]?.state;
  const pastProposals = ["2", "6", "7"];
  const activeProposals = ["0", "1", "3", "4", "5"];
  console.log(data);

  return (
    <div>
      {activeProposals.includes(state) && (
        <ActiveProposal proposal={data?.data[0]} votes={votes?.data} />
      )}
      {pastProposals.includes(state) && (
        <PastProposal
          proposal={data?.data[0]}
          decision={decision?.data}
          votes={votes?.data}
        />
      )}
    </div>
  );
};

export default Proposal;
