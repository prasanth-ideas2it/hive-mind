import ActiveProposalList from "@/components/pages/proposals/active-proposals/active-proposal-list";
import MyProposalsList from "@/components/pages/proposals/my-proposals/my-proposals-list";
import PastProposalsList from "@/components/pages/proposals/past-proposals/past-proposals-list";
import {
  getAllMyProposals,
  getAllProposals,
} from "@/services/proposals.service";

async function getProposals(type: string) {
  try {
    const result = await getAllProposals(type);
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

async function getMyProposals(account: string) {
  try {
    const result = await getAllMyProposals(account);
    console.log(result.status);
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

const Home = async (props: any) => {
  const { searchParams } = props;
  const { type } = searchParams;
  const { data } = await getProposals("active");
  const myProposals = await getMyProposals(
    "0x3A6D2faBDf51Af157F3fC79bb50346a615c08BF6"
  );

  console.log("data", data);
  return (
    <div>
      {(!type || type === "active-proposals") && (
        <ActiveProposalList data={data?.data} />
      )}
      {type === "past-proposals" && <PastProposalsList />}
      {type === "my-proposals" && <MyProposalsList data={myProposals} />}
    </div>
  );
};

export default Home;
