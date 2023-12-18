"use client";
import { navItems } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const updateSearchParams = (type: any, value: any) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value) {
      current.delete(type);
    } else {
      current.set(type, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    const path = pathname.replace(/\/proposals\/.*/, "/proposals");
    router.replace(`${path}${query}`);
  };

  // useEffect(() => {
  //   updateSearchParams("proposal", "active-proposals");
  // }, []);

  return (
    <>
      <ul className="flex gap-4 items-center">
        {navItems.map((navItem) => (
          <li
            key={`app-nav-${navItem.key}`}
            className={`${
              type === navItem.key ||
              (!type && navItem.key === "active-proposals")
                ? "border-b-2 border-[#FF8343]"
                : ""
            } h-[36px] px-[12px] py-[8px]`}
          >
            <div
              className="cursor-pointer"
              onClick={() => updateSearchParams("type", navItem.key)}
            >
              <p
                className={`text-[14px] font-medium text-[#FFFFFF] text-center leading-5`}
              >
                {navItem.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NavLinks;
