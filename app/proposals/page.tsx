import ActiveProposalList from "@/components/pages/proposals/active-proposals/active-proposal-list";
import MyProposalsList from "@/components/pages/proposals/my-proposals/my-proposals-list";
import PastProposalsList from "@/components/pages/proposals/past-proposals/past-proposals-list";

const Home = (props: any) => {
  const { searchParams } = props;
  const { type } = searchParams;
  return (
    <div>
      {(!type || type === "active-proposals") && <ActiveProposalList />}
      {type === "past-proposals" && <PastProposalsList />}
      {type === "my-proposals" && <MyProposalsList />}
    </div>
  );
};

export default Home;
