import NavLinks from "./navlinks";

const AppHeader = () => {
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
                0x282...E8D1
              </span>
            </button>
            <button className="px-[7px] h-full flex items-center bg-opacity-30 bg-[#FFFFFF33] rounded-r">
              <img src="/assets/icons/logout.svg" alt="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
