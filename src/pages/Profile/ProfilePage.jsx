import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth/context";
import useFirestoreGet from "../../hooks/useFirestoreGet";
import CreateProfile from "./CreateProfile/CreateProfile";
import ProfileView from "./ProfileView/ProfileView";
import { Spinner } from "flowbite-react";
import { hasNullValue } from "../../utils/helpers";
import img from "../../assets/images/img.svg";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const isOwnProfile = id === user?.uid;

  const { data: userProfile, loading, error, request } = useFirestoreGet();

  const [displayProfileComponent, setDisplayProfileComponent] = useState("view");

  useEffect(() => {
    request("users", id);
  }, [request, id]);

  useEffect(() => {
    if (isOwnProfile && (error?.message === "Document not found" || (userProfile && hasNullValue(userProfile)))) {
      console.log(
        `@ProfilePage ---- will render crate profile isOwnProfile = ${isOwnProfile} ---- error?.message = ${
          error?.message
        } ---- !!userProfile = ${!!userProfile} ---- hasNullValue(userProfile) = ${hasNullValue(userProfile)}`
      );
      setDisplayProfileComponent("create");
    }
  }, [error, userProfile, isOwnProfile]);

  if (loading || (!userProfile && !error)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" className="fill-[--color-btn-submit-bg]" />
      </div>
    );
  }

  console.log("@ProfilePage ---- error =", error);

  if (error && error?.message !== "Document not found") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden ">
      <div className="absolute bottom-0 left-0 w-full z-0">
        <img src={img} alt="decorative wave" className="w-full h-auto object-cover" style={{ minHeight: "80px" }} />
      </div>

      <div className=" container max-w-4xl mx-auto px-5 py-6 ">
        {displayProfileComponent === "create" && isOwnProfile ? (
          <CreateProfile userData={userProfile} />
        ) : (
          <ProfileView data={userProfile} isOwnProfile={isOwnProfile} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
