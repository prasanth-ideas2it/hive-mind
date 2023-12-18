import ProgressBar from "@/components/ui/progress-bar";

const Results = ({ title, votedOption, proposalType, status }: any) => {
  return (
    <div className="border-4 border-[#C0D7DC69] rounded-xl bg-white px-[24px] pt-[12px] pb-[24px] flex flex-col gap-[10px]">
      <h1 className="text-sm text-black font-[500] py-2">{title}</h1>
      <div className="h-9 px-[12px] py-[8px] flex items-center gap-1 bg-[#FFF3C7] rounded-lg">
        <img src="/assets/icons/pie.svg" />
        <span className="text-[#0F172A] text-sm font-[500] ">
          {`You voted for - ${votedOption}`}
        </span>
      </div>
      {status === "concluded" && proposalType === "past-proposal" && (
        <div className="bg-[#ECEAFF] rounded-lg px-[16px] pt-[16px] pb-[8px] flex flex-col gap-[12px]">
          <div className="flex items-center gap-2">
            <img src="/assets/icons/tick-rounded.svg" alt="icon" />
            <h1 className="text-[#46008B] text-sm font-[700]">{`Management's Decision`}</h1>
          </div>
          <div className="">
            <div className="flex flex-col gap-2 bg-white rounded-lg px-[16px] py-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[#0F172A] text-sm font-[500]">
                  Yes, full-time
                </span>
                <span className="text-[#0F172A] text-sm font-[500]">7.54%</span>
              </div>
              <ProgressBar
                height="10px"
                bgColor="#EDEDED"
                barColor="#FFAA5C"
                percentage="7.54%"
              />
            </div>
          </div>
          <div>
            <p className="font-[400] text-sm text-[#0F172A]">
              Part-time remote work in an IT organization is advantageous for
              cost savings, maintaining flexibility, promoting team
              collaboration, sustaining employee morale & engagement, ensuring
              security & compliance, facilitating effective training &
              onboarding, optimizing resource allocation, preserving company
              culture, and enhancing communication & collaboration tools. This
              approach allows for a balanced integration of remote & in-person
              work, addressing the specific needs of tasks, fostering a positive
              work environment, and promoting the overall well-being of
              employees.
            </p>
          </div>
          <div className="flex justify-between items-center px-[12px] pt-[12px] pb-[8px] border-t border-[#0000001A]">
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
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">
              Yes, full-time
            </span>
            <span className="text-[#0F172A] text-sm font-[500]">92.46%</span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#00BC56"
            percentage="92.46%"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">
              Yes, part-time
            </span>
            <span className="text-[#0F172A] text-sm font-[500]">7.54%</span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#FFAA5B"
            percentage="7.54%"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#0F172A] text-sm font-[500]">
              No, prefer in-office only
            </span>
            <span className="text-[#0F172A] text-sm font-[500]">1%</span>
          </div>
          <ProgressBar
            height="10px"
            bgColor="#EDEDED"
            barColor="#7EAAFF"
            percentage="2%"
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
