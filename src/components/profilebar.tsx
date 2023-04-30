import { SignOutButton, useUser } from "@clerk/nextjs";
import { Menu } from "@headlessui/react";
import Link from "next/link";

function MyDropdown() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="rounded-full">
        <img
          src={user.profileImageUrl}
          alt=""
          className="inline h-12 w-12 rounded-full "
        />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-md border bg-white shadow-lg focus:outline-none">
        <Menu.Item>
          <Link href="/help" className="flex px-4 py-2 text-sm text-gray-700">
            Help
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a>
            <SignOutButton>
              <button className="flex px-4 py-2 text-sm text-gray-700">
                Sign Out
              </button>
            </SignOutButton>
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

const ProfileBar = () => {
  return (
    <div className="flex h-14 items-center justify-end rounded-lg bg-gray-100 px-4 text-gray-700 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:shadow-lg md:h-14 md:items-center md:space-x-6 md:px-6 lg:space-x-8 lg:px-8 xl:space-x-10">
      <MyDropdown />
    </div>
  );
};

export default ProfileBar;
