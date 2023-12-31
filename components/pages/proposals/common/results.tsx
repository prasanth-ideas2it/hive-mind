import ProgressBar from "@/components/ui/progress-bar";

const Results = ({
  title,
  votedOption,
  proposalType,
  status,
  votes,
  decision,
  voterSupport,
}: any) => {
  const againstVotes = votes?.againstVotes;
  const forVotes = votes?.forVotes;
  const abstainVotes = votes?.abstainVotes;

  const againstVotesNum = parseInt(againstVotes, 10) || 0;
  const forVotesNum = parseInt(forVotes, 10) || 0;
  const abstainVotesNum = parseInt(abstainVotes, 10) || 0;

  // Calculate total votes
  const totalVotes = againstVotesNum + forVotesNum + abstainVotesNum;

  // Calculate percentages
  const againstPercentage =
    totalVotes !== 0 ? (againstVotesNum / totalVotes) * 100 : 0;
  const forPercentage = totalVotes !== 0 ? (forVotesNum / totalVotes) * 100 : 0;
  const abstainPercentage =
    totalVotes !== 0 ? (abstainVotesNum / totalVotes) * 100 : 0;

  return (
    <div className="border-4 border-[#C0D7DC69] rounded-xl bg-white px-[24px] pt-[12px] pb-[24px] flex flex-col gap-[10px]">
      <h1 className="text-sm text-black font-[500] py-2">{title}</h1>
      <div className="h-9 px-[12px] py-[8px] flex items-center gap-1 bg-[#FFF3C7] rounded-lg">
        <img src="/assets/icons/pie.svg" />
        <span className="text-[#0F172A] text-sm font-[500] ">
          {`You voted for - ${votedOption}`}
        </span>
      </div>
      {typeof decision === "object" && decision !== null && (
        <div className="bg-[#ECEAFF] rounded-lg px-[16px] pt-[16px] pb-[8px] flex flex-col gap-[12px]">
          <div className="flex items-center gap-2">
            <img src="/assets/icons/tick-rounded.svg" alt="icon" />
            <h1 className="text-[#46008B] text-sm font-[700]">{`Management's Decision`}</h1>
          </div>
          <div className="">
            <div className="flex flex-col gap-2 bg-white rounded-lg px-[16px] py-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[#0F172A] text-sm font-[500]">
                  {decision?.managementDecision == 0
                    ? "No"
                    : decision?.managementDecision == 1
                    ? "Yes"
                    : "Abstain"}
                </span>
                <span className="text-[#0F172A] text-sm font-[500]">
                  {decision?.managementDecision == 0
                    ? `${againstPercentage}%`
                    : decision?.managementDecision == 1
                    ? `${forPercentage}%`
                    : `${abstainPercentage}`}
                </span>
              </div>
              {decision?.managementDecision == 0 ? (
                <ProgressBar
                  height="10px"
                  bgColor="#EDEDED"
                  barColor="#FFAA5C"
                  percentage={againstPercentage}
                />
              ) : decision?.managementDecision == 1 ? (
                <ProgressBar
                  height="10px"
                  bgColor="#EDEDED"
                  barColor="#00BC56"
                  percentage={forPercentage}
                />
              ) : (
                <ProgressBar
                  height="10px"
                  bgColor="#EDEDED"
                  barColor="#7EAAFF"
                  percentage={abstainPercentage}
                />
              )}
            </div>
          </div>
          <div>
            <p className="font-[400] text-sm text-[#0F172A]">
              {decision?.comment}
            </p>
          </div>
          {/* <div className="flex justify-between items-center px-[12px] pt-[12px] pb-[8px] border-t border-[#0000001A]">
            <span className="text-slate-900 text-sm font-medium leading-tight">
              Are you happy with the decision?
            </span>
            <div>
              <div className="flex items-center h-11 rounded-md">
                <button className="bg-white inline-flex items-center p-2.5 border-r border-black border-opacity-10 rounded-s-md">
                  <img src="/assets/icons/thumbs-up.svg" alt="thumbs-up" />
                </button>
                <button className="bg-white p-2.5 inline-flex items-center rounded-r-md">
                  <img src="/assets/icons/thumbs-down.svg" alt="thumbs-down" />
                </button>
              </div>
            </div>
          </div> */}
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">Yes</span>
            <span className="text-[#0F172A] text-sm font-[500]">
              {`${forPercentage}%`}
            </span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#00BC56"
            percentage={forPercentage}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">No</span>
            <span className="text-[#0F172A] text-sm font-[500]">
              {`${againstPercentage}%`}
            </span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#FFAA5B"
            percentage={againstPercentage}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">Abstain</span>
            <span className="text-[#0F172A] text-sm font-[500]">
              {`${abstainPercentage}%`}
            </span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#7EAAFF"
            percentage={abstainPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
