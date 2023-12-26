import moment from "moment";
import Web3 from "web3";
import { magicSign } from "@/lib/magic";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import copy from "copy-to-clipboard";

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

export function timeDifference(timestamp: number) {
  const timestampMs = timestamp * 1000;

  const currentTime = moment();
  const providedTime = moment(timestampMs);

  // Check if the provided timestamp is in the past
  if (providedTime.isBefore(currentTime)) {
    return "";
  }

  // Calculate the duration between the current time and the provided timestamp
  const duration = moment.duration(providedTime.diff(currentTime));

  // Get the days, hours, and minutes from the duration
  const daysDifference = duration.days();
  const hoursDifference = duration.hours();
  const minutesDifference = duration.minutes();

  // Check if the difference is within a day
  if (daysDifference === 0) {
    // Check if the difference is within an hour
    if (hoursDifference === 0) {
      return `${minutesDifference} mins`;
    } else {
      // Check if the difference is more than 3 hours
      return `${hoursDifference} hrs`;
    }
  } else {
    if (hoursDifference >= 1) {
      return `${daysDifference} days ${hoursDifference} hrs`;
    } else {
      return `${daysDifference} days`;
    }
  }
}

export function getStatusById(id: string) {
  const statusMap = {
    0: "Pending",
    1: "Active",
    2: "Canceled",
    3: "Defeated",
    4: "Succeeded",
    5: "Queued",
    6: "Expired",
    7: "Executed",
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

export function formatTimestampAsDate(timestamp: number) {
  // Format the timestamp using Moment.js
  const timestampInMilliseconds = timestamp * 1000;
  return moment(timestampInMilliseconds).format("M/D YYYY");
}

export const copyLink = async (id: any, msg: string) => {
  try {
    const copiedElement = document.getElementById(id) as any;
    copiedElement.style.display = "block";
    copy(msg);
    setTimeout(() => {
      copiedElement.style.display = "none";
    }, 1000);
  } catch (error) {}
};
