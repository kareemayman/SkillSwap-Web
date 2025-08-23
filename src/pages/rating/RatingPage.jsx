import {
  getUserById,
  submitRating,
  updateUserRatingStats,
} from "../../utils/firestoreUtil";
import { useAuth } from "../../contexts/Auth/context";
import RatingSection from "./components/RatingSection";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFirestoreGet from "../../hooks/useFirestoreGet";

const RatingPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: currentUser } = useAuth();
  const { data: userProfile, request } = useFirestoreGet();

  const [ratings, setRatings] = useState({
    overall: 0,
    teaching: 0,
    communication: 0,
    punctuality: 0,
    reviewText: "",
  });
  useEffect(() => {
    if (currentUser?.uid) {
      request("users", currentUser.uid); // Assumes user data is stored in a "users" collection
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    console.log("🔥 userProfile loaded:", userProfile);
  }, [userProfile]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData?.data() || null);
        setError(!userData ? "User not found" : null);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleStarChange = (category, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ratings.overall) {
      toast.error("Please provide at least an overall rating");
      return;
    }

    if (!currentUser) {
      toast.error("You need to be logged in to submit a rating");
      return;
    }

    if (!userProfile || !userProfile.profilePicture) {
      toast.error("Please wait, loading your profile data...");
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingData = {
        revieweeId: userId,
        reviewerId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.name || "Anonymous",
        authorPhoto: userProfile.profilePicture || "",
        overallRating: ratings.overall,
        teachingSkill: ratings.teaching,
        communication: ratings.communication,
        punctuality: ratings.punctuality,
        text: ratings.reviewText,
        createdAt: new Date().toISOString(),
      };

      console.log(" Submitting ratingData:", ratingData);

      await submitRating(ratingData);
      await updateUserRatingStats(userId);
      toast.success("Rating submitted successfully!");
      setRatings({
        overall: 0,
        teaching: 0,
        communication: 0,
        punctuality: 0,
        reviewText: "",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading user data...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <>
      <div>
        <h1 className="text-[var(--main-color)] text-3xl font-bold mb-4">
          Rating
        </h1>

        <div className="mb-6">
          <h2 className="text-lg text-[var(--color-text-secondary)] leading-5 mb-4">
            Rate your experience with{" "}
            <span className="text-[var(--color-text-primary)] font-bold">
              {user.name}
            </span>
          </h2>

          <form onSubmit={handleSubmit}>
            <RatingSection
              title="Overall Rating"
              rating={ratings.overall}
              setRating={(val) => handleStarChange("overall", val)}
            />

            <h3 className="text-lg font-medium  mb-3 text-[var(--color-text-primary)] ">
              Rate specific aspects
            </h3>

            <RatingSection
              title="Teaching Skill"
              rating={ratings.teaching}
              setRating={(val) => handleStarChange("teaching", val)}
            />

            <RatingSection
              title="Communication"
              rating={ratings.communication}
              setRating={(val) => handleStarChange("communication", val)}
            />

            <RatingSection
              title="Punctuality"
              rating={ratings.punctuality}
              setRating={(val) => handleStarChange("punctuality", val)}
            />
            <textarea
              className="bg-[var(--bg-color1)] mb-6 border-black blur:border-none hover:border-[var(--color-card-border)] pl-4 py-1 rounded-lg shadow-md  w-full dark:text-[var(--color-text-light)] "
              placeholder="Write your review..."
              value={ratings.reviewText}
              onChange={(e) =>
                setRatings((prev) => ({
                  ...prev,
                  reviewText: e.target.value,
                }))
              }
            />

            <button
              type="submit"
              className={`px-6 py-3 font-semibold rounded-lg dark:text-[var(--color-text-light)] text-white shadow-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-2xl hover:backdrop-blur-xl w-full ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!ratings.overall || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RatingPage;
