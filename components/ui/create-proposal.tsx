"use client";

import { useEffect, useState, useRef } from "react";
import SingleSelect from "./single-select";

const CreateProposal = () => {
  const [step, setStep] = useState("");
  const options = [
    { id: 1, name: "organization" },
    { id: 2, name: "payroll" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef(null);

  const [proposalData, setProposalData] = useState<any>({
    title: "",
    category: "",
    options: [{ option: "" }],
    description: "",
  });

  useEffect(() => {
    function handler(e: any) {
      const stepValue = e.detail.type;
      setStep(stepValue);
    }
    document.addEventListener("showModal", handler);
    return function () {
      document.removeEventListener("showModal", handler);
    };
  }, []);

  const onCloseModal = () => {
    setStep("");
    setProposalData({
      title: "",
      category: "",
      options: [{ option: "" }],
      description: "",
    });
  };

  const onAddOption = () => {
    if (proposalData.options.length < 3) {
      setProposalData({
        ...proposalData,
        options: [...proposalData.options, { option: "" }],
      });
    }
  };

  const onDeleteOption = (index: number) => {
    const options = [...proposalData.options];
    options.splice(index, 1);
    setProposalData({ ...proposalData, options: options });
  };

  const onUpdateOption = (value: string, index: number) => {
    const options = [...proposalData.options];
    options[index] = { ...options[index], option: value };
    setProposalData({ ...proposalData, options: options });
  };

  return (
    <>
      {step && (
        <div className="bg-[#3D416680] fixed top-0 left-0 right-0 w-screen h-screen z-[4]">
          <div className="relative flex justify-center h-full items-center">
            <div className="bg-white relative m-auto rounded-lg">
              <button
                onClick={onCloseModal}
                className="cursor-pointer border-0 rounded-[50%] absolute z-[10] top-[-10px] bg-[#475569] h-[26px] w-[26px] right-[-10px] flex items-center justify-center"
              >
                <img src="assets/icons/close-white.svg" alt="close icon" />
              </button>
              {step === "create-proposal" && (
                <div className="flex flex-col gap-4 w-[550px] px-[10px] py-[20px] max-h-[75vh]">
                  <div className="px-[10px]">
                    <h1 className="font-semibold text-[20px] leading-[26px] text-[#0F172A]">
                      Create Proposal
                    </h1>
                  </div>
                  <div className=" flex-1 px-[10px] flex flex-col gap-6 overflow-auto scrollbar scrollbar-w-1 scroll-m-3 scrollbar-thumb-slate-300 scrollbar-thumb-rounded">
                    <div className="flex flex-col gap-[12px]">
                      <label className="font-semibold text-sm text-[#0F172A]">
                        Proposal Title
                      </label>
                      <input
                        className="text-sm border border-[#CBD5E1] px-[12px] py-[8px] w-full rounded-lg placeholder:text-sm leading-6 font-[500] focus:outline-0"
                        placeholder="Enter Propsal Title Here"
                        value={proposalData?.title}
                        onChange={(e) =>
                          setProposalData({
                            ...proposalData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      <label className="font-semibold text-sm text-[#0F172A]">
                        Select Category
                      </label>
                      <SingleSelect
                        placeholder="Select Category"
                        selectedValue={proposalData?.category}
                        options={options}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        menuRef={menuRef}
                        onChange={(option: string) =>
                          setProposalData({
                            ...proposalData,
                            category: option,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      <label className="font-semibold text-sm text-[#0F172A]">
                        Enter Options*
                      </label>
                      <div className="flex flex-col gap-[12px]">
                        {proposalData?.options.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                key={`option-${index}`}
                                className="flex items-center justify-between"
                              >
                                <input
                                  className="text-sm border border-[#CBD5E1] px-[12px] py-[8px] w-[486px] rounded-lg placeholder:text-sm leading-6 font-[500] focus:outline-0"
                                  //   placeholder="Enter Propsal Title Here"
                                  value={item.option}
                                  onChange={(e) =>
                                    onUpdateOption(e.target.value, index)
                                  }
                                />
                                <div>
                                  <img
                                    src="/assets/icons/close-black.svg"
                                    alt="icon"
                                    className="cursor-pointer"
                                    onClick={() => onDeleteOption(index)}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                      {proposalData.options.length < 3 && (
                        <div className="px-2.5">
                          <button
                            className="flex items-center gap-2"
                            onClick={onAddOption}
                          >
                            <img src="/assets/icons/plus-blue.svg" alt="icon" />
                            <span className="text-[14px] leading-6 font-[500] text-[#156FF7]">
                              Add Option
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      <label className="font-semibold text-sm text-[#0F172A]">
                        Description
                      </label>
                      <textarea
                        className="w-full border resize-none h-[140px] border-[#CBD5E1] rounded-lg py-[8px] px-[12px] placeholder:font-[500] leading-6 text-sm text-[#475569] focus:outline-0"
                        placeholder="Enter Details Here"
                        value={proposalData?.description}
                        onChange={(e) =>
                          setProposalData({
                            ...proposalData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={onCloseModal}
                        className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                      >
                        Close
                      </button>
                      <button className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight border border-[#CBD5E1] shadow-[0px_1px_1px_0px_#0F172A14] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProposal;