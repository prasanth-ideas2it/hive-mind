import type { Metadata } from "next";
import React, { useReducer, useMemo, useEffect } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import "./globals.css";
import AppHeader from "@/components/core/header/app-header";
import CreateProposal from "@/components/ui/create-proposal";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hive Mind",
//   description: "DAO",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialUser = null;
  const [user, dispatch] = useReducer(UserReducer, initialUser);
  const router = useRouter();

  React.useEffect(() => {
    const handleLoggedIn = async () => {
       if (magic === false) { 
        //  setIsLoading(false)
         return 
       }
       
       const isLoggedIn = await magic.user.isLoggedIn();
      //  setIsLoading(false)

       if (isLoggedIn) {
           const userMetadata = await magic.user.getInfo()
           dispatch({
               type: USERACTION_TYPES.LOG_IN,
               user: {
                 email: userMetadata.email as string, 
                 issuer: userMetadata.issuer as string,
                 wallet: userMetadata.publicAddress as string
               }
           })
           console.log(userMetadata)
       } else {
           console.log("no one signed in")
           router.replace('/login');
       }
   };
   handleLoggedIn();
 }, [])


  const value = useMemo(() => ({ user: user, dispatch: dispatch }), [user, dispatch]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={value}>
          {!user && children}
          {user && <div className="bg-[url('/assets/images/background.jpg')] w-full bg-cover bg-no-repeat h-[285px] shadow-[0_0_8px_0_rgba(0,0,0,0.14)]">
          <AppHeader />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[96px] w-[800px]">
            {children}
          </div>
          <CreateProposal />
        </div>}
        </UserContext.Provider>
      </body>
    </html>
  );
}