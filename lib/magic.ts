import {
  createVotingPower,
  getVotingPower,
} from "@/services/proposals.service";
import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!)
  );
};

const createMagicSign = () => {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
      network: "goerli",
    })
  );
};

export const getProvider = async (magicInstance: any) => {
  return await magicInstance.wallet.getProvider();
};

export const magic = createMagic();

export const magicSign = createMagicSign();

export const magicLogin = async (email: string) => {
  if (magic === false) {
    return null;
  }
  try {
    const didToken = await magic.auth.loginWithMagicLink({
      email,
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${didToken}`,
      },
    };
    const response = await fetch("/login", options);
    if (response.ok) {
      const userMetadata = await magic.user.getInfo();
      const res = await getVotingPower(userMetadata.publicAddress as any);
      if (res.status === 200) {
        const result = await res.json();
        // localStorage.setItem("hiveUser", userMetadata.publicAddress);
        if (result.data === "0") {
          const votingPower = await createVotingPower({
            to: userMetadata.publicAddress,
          });
          if (votingPower.status === 200) {
            const resultForVotingPower = await votingPower.json();
            console.log("ddd", resultForVotingPower);
          }
        }
        console.log(result);
      }
      return userMetadata;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const magicLogout = async () => {
  const errorMessage = "Error creating magic instance while trying to log out";
  if (magic === false) {
    throw new Error(errorMessage);
  }
  try {
    await magic.user.logout();
  } catch (error) {
    throw new Error(error as string);
  }
};
