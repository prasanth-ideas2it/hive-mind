import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext, USERACTION_TYPES } from "@/context/user-context";
import NavLinks from "./navlinks";
import { magicLogout } from "@/lib/magic";
import { shortenHex } from "@/utils/helper";

const AppHeader = () => {
  const { user, dispatch } = useContext(UserContext);
  const router = useRouter();

  const handleLogoutButtonClicked = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await magicLogout();
      router.replace("/login");
      localStorage.removeItem("hiveUser");
      dispatch({
        type: USERACTION_TYPES.LOG_OUT,
        user: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-[20px] px-[48px]">
      <div className="flex h-[44px] items-center justify-between">
        {/******  APP LOGO  *******/}
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/logo.svg"
            alt="hive mind logo"
            className="h-[48px] w-[48px]"
          />
          <img
            src="/assets/images/HiveMind.svg"
            alt="Hive Mind"
            className="w-[101px] h-[19px]"
          />
        </div>

        {/******  NAV  *******/}
        <nav>
          <NavLinks />
        </nav>

        {/******  USER MENU  *******/}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="/assets/icons/notification.svg"
              alt="notification"
              className="w-[16px] h-[20px] "
            />

            <div className="w-1.5 h-1.5 left-[11px] top-[0.5px] absolute bg-orange-600 rounded-full"></div>
          </div>
          <div className="flex items-center h-[32px] gap-1 bg-[#FFFFFF33] rounded">
            <button className="flex items-center gap-1 bg-opacity-20 h-full px-[6px]">
              <img
                className="h-[20px] w-[20px] bg-cover"
                src="/assets/icons/profile.svg"
                alt="down arrow"
              />
              <span className="text-xs text-white leading-6 font-[500]">
                {/* 0x282...E8D1 */}
                {shortenHex(user?.wallet as string)}
              </span>
            </button>
            <button
              className="px-[7px] h-full flex items-center bg-opacity-30 bg-[#FFFFFF33] rounded-r"
              onClick={handleLogoutButtonClicked}
            >
              <img src="/assets/icons/logout.svg" alt="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
