"use client";

import { useEffect, useState, useContext } from "react";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import Web3 from "web3";
import { magicSign } from "@/lib/magic";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { UserContext } from "@/context/user-context";

export const signTypedDataV3Payload = {
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "verifyingContract",
        type: "address",
      },
    ],
    Proposal: {
      name: "title",
      type: "string",
    },
    Vote: {
      user: {
        type: "address",
      },
      choice: {
        type: "string",
      },
    },
  },
  primaryType: "Vote",
  domain: {
    name: "hive-mind",
    version: "1",
    verifyingContract: "0xbaf289a8c7a9809e13ac81dc073bd10e051de1df",
  },
  message: {
    user: "0xABCDEFabcdef1234567890abcdef1234567890",
    choice: "Yes",
  },
};

export const signTypedDataV4Payload = {
  domain: {
    // Defining the chain aka Rinkeby goerli or Ethereum Main Net
    chainId: 5,
    // Give a user friendly name to the specific contract you are signing for.
    name: "Ether Mail",
    // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    verifyingContract: "0xbaf289a8c7a9809e13ac81dc073bd10e051de1df",
    // Just let's you know the latest version. Definitely make sure the field name is correct.
    version: "1",
  },

  // Defining the message signing data content.
  message: {
    contents: "Hello, Bob!",
    attachedMoneyInEth: 4.2,
    from: {
      name: "Cow",
      wallets: [
        "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
      ],
    },
    to: [
      {
        name: "Bob",
        wallets: [
          "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
          "0xB0B0b0b0b0b0B000000000000000000000000000",
        ],
      },
    ],
  },
};

const ActiveProposalList = (props: any) => {
  const data = props?.data?.data;
  const { proposalCreateds = [] } = data;
  const user = localStorage.getItem("hiveUser");
  const [activeProposals, setActiveProposals] = useState(proposalCreateds);
  console.log("qqq", activeProposals, user);

  const router = useRouter();

  useEffect(() => {
    function handler(e: any) {
      console.log("ooo", e.detail.activeProposals);
      setActiveProposals(e.detail.activeProposals);
    }

    document.addEventListener("updateActiveProposals", handler);
    return function () {
      document.removeEventListener("updateActiveProposals", handler);
    };
  }, []);

  const onOpenModal = () => {
    document.dispatchEvent(
      new CustomEvent("showModal", { detail: { type: "create-proposal" } })
    );
  };

  const onSign = async () => {
    const provider = await magicSign.wallet.getProvider();
    const web3 = new Web3(provider);
    const account = await magicSign.wallet.connectWithUI();
    try {
      // Personal sign code -- starts
      const signedMessage = await web3.eth.personal.sign(
        "Here is a basic message!",
        account[0],
        ""
      );
      console.log("signedMessage:", signedMessage);
      const recoveredAddress = recoverPersonalSignature({
        data: "Here is a basic message!",
        signature: signedMessage,
      });
      console.log(
        recoveredAddress.toLocaleLowerCase() === account[0].toLocaleLowerCase()
          ? "Signing success!"
          : "Signing failed!"
      );
      // personal sign code -- end

      // v4 code -- starts
      // const payload = signTypedDataV3Payload; // or signTypedDataV4Payload

      // const params = [account[0], payload];
      // const method = "eth_signTypedData";
      // const signature = await magicSign?.rpcProvider.request({
      //   method,
      //   params,
      // });
      // console.log("Signature:", signature);
      // v4 code -- ends

      alert("Data signed successfully!");
    } catch (error: any) {
      console.error("Signing error:", error);
      if (error.message.includes("User denied signing")) {
        alert("You declined to sign the data. Please try again.");
      } else {
        alert("An error occurred during signing. Please try again later.");
      }
    }
  };

  const onVotePost = (id: string) => {
    router.push(`/proposals/${id}`);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[18px] mt-[36px]">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-extrabold leading-7">
            Active Proposals
          </h1>
          <button
            onClick={onOpenModal}
            className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight shadow-[0_0_13px_0_rgba(255,107,0,1)] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
          >
            Create
          </button>
          {/* <button
            onClick={onSign}
            className="text-white h-10 px-6 py-2.5 text-sm font-semibold leading-tight shadow-[0_0_13px_0_rgba(255,107,0,1)] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"
          >
            sign
          </button> */}
        </div>
        <div className="w-full p-2.5 bg-white rounded-xl border-4 border-[#C0D7DC69] flex-col justify-start items-start gap-2.5 inline-flex">
          {activeProposals.slice(-3).map((item: any, index: number) => {
            const description = JSON.parse(item?.description);
            console.log("xxx", item?.voters, user);
            return (
              <div
                key={`proposal-${index}`}
                className="flex items-center px-[16px] w-full bg-slate-50 rounded-lg h-[64px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2 items-center">
                    <div
                      style={{ backgroundColor: item?.bgColor }}
                      className="h-[40px] w-[40px] flex items-center justify-center rounded"
                    >
                      <img
                        src={`${
                          description.category === "Organisation"
                            ? "/assets/icons/organization.svg"
                            : ""
                        }`}
                        alt="icon"
                      />
                    </div>
                    <div className="w-[389px]">
                      <h1 className="text-sm text-slate-900 font-semibold leading-snug">
                        {description?.title}
                      </h1>
                    </div>
                  </div>
                  <div className=" w-[265px] h-full flex justify-end items-center gap-2">
                    <div className=" w-[107px] flex flex-col opacity-50">
                      <div className="text-neutral-700 text-[10px] font-semibold leading-tight text-center">
                        Ends in
                      </div>
                      <div className="text-neutral-700 text-sm font-semibold leading-tight text-center">
                        13h 45m
                      </div>
                    </div>

                    {item.voters?.includes(user?.toLocaleLowerCase()) ? (
                      <button
                        onClick={() => onVotePost(item?.proposalId)}
                        className="w-[97px] text-[#0B8A00] text-sm font-semibold leading-tight justify-center h-10 flex gap-2 items-center"
                      >
                        <img src="/assets/icons/tick-green.svg" alt="icon" />
                        Voted
                      </button>
                    ) : (
                      <button
                        onClick={() => onVotePost(item?.proposalId)}
                        className="w-[97px] text-neutral-700 text-sm font-semibold leading-tight shadow h-10 bg-white border border-slate-300 rounded-lg flex justify-center items-center"
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[28px] flex justify-center items-center">
        <Pagination pageCount={5} />
      </div>
    </div>
  );
};

export default ActiveProposalList;
