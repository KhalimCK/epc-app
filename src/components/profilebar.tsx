import { useUser } from "@clerk/nextjs";

const ProfileBar = () => {
  const { user } = useUser();

  if (!user) return null;

  console.log(user);

  return (
    <div className="flex h-14 items-center justify-end rounded-lg bg-gray-100 px-4 text-gray-700 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:shadow-lg md:h-14 md:items-center md:space-x-6 md:px-6 lg:space-x-8 lg:px-8 xl:space-x-10">
      <button>
        <img
          src={user.profileImageUrl}
          alt="Profile Image"
          className="h-12 w-12 justify-end rounded-full "
        />
      </button>
    </div>
  );
};

export default ProfileBar;
