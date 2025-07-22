import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth/context";
import useFirestoreGet from "../../hooks/useFirestoreGet";
import CreateProfile from "./CreateProfile/CreateProfile";
import EditProfile from "./EditProfile/EditProfile";
import ProfileView from "./ProfileView";
import { Spinner } from "flowbite-react";
import { hasNullValue } from "../../utils/helpers";
import img from "../../assets/images/wave3.svg";

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: userProfile, loading, error, request } = useFirestoreGet();
  // state to control which component should be displayed: view || edit || create
  const [displayProfileComponent, setDisplayProfileComponent] =
    useState("view");

  // Fetch user profile data when component mounts
  useEffect(() => {
    if (user?.uid) {
      request("users", user.uid);
    }
  }, [user?.uid, request]);

  useEffect(() => {
    if (
      error?.message === "Document not found" ||
      (userProfile && hasNullValue(userProfile))
    ) {
      setDisplayProfileComponent("create");
    }
  }, [error, userProfile]);

  if (loading || (!userProfile && !error)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="info" />
      </div>
    );
  }

  console.log("@ProfilePage ---- error =", error);
  // if there is unexpected error other than profile wasn't found
  if (error && error?.message !== "Document not found") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden ">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <img src={img} alt="wave" className="w-full h-auto" />
        </div>

        <div className=" container max-w-4xl mx-auto px-5 py-6 ">
          {displayProfileComponent === "create" ? (
            <CreateProfile userData={userProfile} />
          ) : displayProfileComponent === "edit" ? (
            <EditProfile />
          ) : (
            <ProfileView data={userProfile} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
