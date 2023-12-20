import moment from "moment";
import Web3 from "web3";
import { magicSign } from "@/lib/magic";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

export const updateSearchParams = (
  router: any,
  searchParams: any,
  pathname: any,
  type: any,
  value: any
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()) as []);
  if (!value) {
    current.delete(type);
  } else {
    current.set(type, value);
  }
  const search = current.toString();
  const query = search ? `?${search}` : "";

  router.replace(`${pathname}${query}`);
};

export const convertTimestampToString = (timestamp: number) => {
  const currentMoment = moment();

  // Get the future moment using the future timestamp
  const futureMoment = moment(timestamp);

  const duration = moment.duration(futureMoment.diff(currentMoment));

  // Extract the days, hours, minutes, and seconds from the duration
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  // Display the time difference
  let formattedDifference = "";

  if (days > 0) {
    formattedDifference += `${days} day${days > 1 ? "s" : ""}, `;
  } else {
    formattedDifference += `${hours} hour${
      hours > 1 ? "s" : ""
    }, ${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds} second${
      seconds > 1 ? "s" : ""
    }`;
  }

  return formattedDifference;
};

function getStatusById(id: string) {
  const statusMap = {
    1: "Pending",
    2: "Active",
    3: "Canceled",
    4: "Defeated",
    5: "Succeeded",
    6: "Queued",
    7: "Expired",
    8: "Executed",
  } as any;

  if (statusMap.hasOwnProperty(id)) {
    return statusMap[id];
  } else {
    return "";
  }
}

export const onSign = async (message: string) => {
  if (magicSign === false) {
    return;
  }
  const provider = await magicSign.wallet.getProvider();
  const web3 = new Web3(provider);
  console.log(web3);
  const account = await magicSign.wallet.connectWithUI();
  try {
    // Personal sign code -- starts
    const signedMessage = await web3.eth.personal.sign(message, account[0], "");
    console.log("signedMessage:", signedMessage);
    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature: signedMessage,
    });
    console.log(recoveredAddress);
    console.log(
      recoveredAddress.toLocaleLowerCase() === account[0].toLocaleLowerCase()
        ? "Signing success!"
        : "Signing failed!"
    );
    return { signedMessage, status: "success" };
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
  } catch (error: any) {
    console.error("Signing error:", error);
    if (error.message.includes("User denied signing")) {
      return { status: "error" };
      // alert("You declined to sign the data. Please try again.");
    } else {
      return { status: "error" };
      // alert("An error occurred during signing. Please try again later.");
    }
  }
};

export function shortenHex(hexString: string, startLength = 6, endLength = 4) {
  const prefix = hexString?.slice(0, startLength);
  const suffix = hexString?.slice(-endLength);
  return `${prefix}...${suffix}`;
}
