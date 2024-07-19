"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Cookies from "js-cookie";
import NavbarSelectProject from "./NavbarSelectProject";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("project");
    router.push("/login");
  };
  return (
    <div className="navbar bg-base-100 border-b ">
      <div className="flex-1">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-square btn-ghost drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <Link href="/" className="btn btn-ghost lg:hidden">
          <Image src="/antrein-logo.svg" alt="logo" width={74} height={29} />
        </Link>
      </div>
      <div className="flex-none">
        <NavbarSelectProject />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle "
          >
            <div className="w-10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#292C27"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
