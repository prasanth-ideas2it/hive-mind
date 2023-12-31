"use client";

import React, { useReducer, useMemo, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import AppHeader from "@/components/core/header/app-header";
import CreateProposal from "@/components/ui/create-proposal";
import {
  USERACTION_TYPES,
  UserContext,
  UserReducer,
} from "@/context/user-context";
import { magic } from "@/lib/magic";
import Toaster from "@/components/core/toaster/toaster";
import Loader from "@/components/core/loader/loader";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hive Mind",
//   description: "DAO",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = null;
  const [user, dispatch] = useReducer(UserReducer, initialUser);
  // let wallet: any = "";
  // if (typeof window !== "undefined") {
  //   wallet = localStorage.getItem("hiveUser");
  // }
  const router = useRouter();
  const pathName = usePathname();
  console.log("pathName", pathName);

  React.useEffect(() => {
    const handleLoggedIn = async () => {
      if (magic === false) {
        //  setIsLoading(false)
        return;
      }
      const isLoggedIn = await magic.user.isLoggedIn();
      if (user?.wallet && pathName === "/login") {
        router.replace("/proposals");
      }
      //  setIsLoading(false)
      if (isLoggedIn) {
        const userMetadata = await magic.user.getInfo();
        dispatch({
          type: USERACTION_TYPES.LOG_IN,
          user: {
            email: userMetadata.email as string,
            issuer: userMetadata.issuer as string,
            wallet: userMetadata.publicAddress as string,
          },
        });
        console.log(userMetadata);
      } else {
        console.log("no one signed in");
        router.replace("/login");
      }
    };
    handleLoggedIn();
  }, []);

  useEffect(() => {
    if (user?.wallet && pathName === "/login") {
      router.replace("/proposals");
    }
  }, [user, pathName]);

  const value = useMemo(
    () => ({ user: user, dispatch: dispatch }),
    [user, dispatch]
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={value}>
          {!user?.wallet && children}
          {user && (
            <div className="bg-[url('/assets/images/background.jpg')] w-full bg-cover bg-no-repeat h-[285px] shadow-[0_0_8px_0_rgba(0,0,0,0.14)]">
              <Loader />
              <AppHeader />
              <div className="absolute left-1/2 transform -translate-x-1/2 top-[96px] w-[800px]">
                {children}
              </div>
              <CreateProposal />
              <Toaster />
            </div>
          )}
        </UserContext.Provider>
      </body>
    </html>
  );
}
