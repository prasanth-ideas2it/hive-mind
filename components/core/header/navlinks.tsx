"use client";
import { navItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      <ul className="flex gap-4 items-center">
        {navItems.map((navItem) => (
          <li
            key={`app-nav-${navItem.key}`}
            className={`${
              pathname === navItem.url || pathname.includes(navItem.key)
                ? "border-b-2 border-[#FF8343]"
                : ""
            } h-[36px] px-[12px] py-[8px]`}
          >
            <Link href={navItem.url}>
              <p
                className={`text-[14px] font-medium text-[#FFFFFF] text-center leading-5`}
              >
                {navItem.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NavLinks;
