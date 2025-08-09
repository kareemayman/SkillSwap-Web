import React from "react";
import { Rating, RatingAdvanced, RatingStar, createTheme } from "flowbite-react";
import { useTranslation } from "react-i18next";
import ReviewCard from "./ReviewCard";

export default function ReviewsTab({ userAvgRating = {}, reviews = reviewsSampleData }) {
  const { t } = useTranslation();

  const { overAllAvg, teachingSkillAvg, communicationAvg, punctualityAvg } = userAvgRating;

  const advancedRatingTheme = createTheme({
    base: "flex items-center",
    label: "text-sm font-medium text-cyan-600",
    progress: {
      base: "mx-4 h-2 w-2/4 rounded bg-gray-200 ",
      fill: "h-2 rounded bg-yellow-400",
      //   fill: "h-2 rounded bg-[--color-btn-submit-bg]",
      //   label: "text-sm font-medium text-cyan-600",
      label: "text-sm font-medium text-[--color-text-secondary]",
    },
  });

  return (
    <div>
      <div className="container mx-auto flex flex-col sm:flex-row justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl ">{overAllAvg}</p>

          <Rating size="sm">
            {Array(5)
              .fill()
              .map((_, index) => {
                // console.log("index", index);
                return <RatingStar key={index} filled={index < Math.floor(overAllAvg)} />;
              })}
          </Rating>

          <p className="text-base text-[--color-text-secondary]">
            {reviews.length} &nbsp; {t("Dashboard.Reviews")}
          </p>
        </div>

        <div className="flex flex-col min-w-80 sm:min-w-96 sm:pr-6 ">
          <RatingAdvanced theme={advancedRatingTheme} percentFilled={Math.round((teachingSkillAvg * 100) / 5)} className="p-2 justify-end">
            <p className="text-[--color-text-primary] ">{t("Teaching Skill")}</p>
          </RatingAdvanced>
          <RatingAdvanced theme={advancedRatingTheme} percentFilled={Math.round((communicationAvg * 100) / 5)} className="p-2 justify-end">
            <p className="text-[--color-text-primary] ">{t("Communication")}</p>
          </RatingAdvanced>
          <RatingAdvanced theme={advancedRatingTheme} percentFilled={Math.round((punctualityAvg * 100) / 5)} className="p-2 justify-end ">
            <p className="text-[--color-text-primary] ">{t("Punctuality")}</p>
          </RatingAdvanced>
        </div>
      </div>

      <div>
        {reviews?.map((review) => (
          <ReviewCard key={review?.id} data={review} />
        ))}
      </div>
    </div>
  );
}

const reviewsSampleData = [
  {
    reviewId: "review_001",
    reviewerId: "user_123",
    authorName: "Sara Ali",
    authorPhoto: "https://picsum.photos/200",
    overallRating: 4.5,
    teachingSkill: 5,
    communication: 4,
    punctuality: 4,
    text: "Great teaching style and very patient! Highly recommend.",
    createdAt: "2025-07-31T07:15:00.000Z",
  },
  {
    reviewId: "review_002",
    reviewerId: "user_456",
    authorName: "Ahmed Mansour",
    authorPhoto: "https://picsum.photos/200",
    overallRating: 3.0,
    teachingSkill: 3,
    communication: 3,
    punctuality: 3,
    text: "Decent experience, but could improve in preparation and clarity.",
    createdAt: "2025-07-30T18:42:00.000Z",
  },
  {
    reviewId: "review_003",
    reviewerId: "user_789",
    authorName: "Anonymous",
    authorPhoto: "",
    overallRating: 5.0,
    teachingSkill: 5,
    communication: 5,
    punctuality: 5,
    text: "Excellent in every way. Will definitely learn with them again!",
    createdAt: "2025-07-29T10:05:00.000Z",
  },
  {
    reviewId: "review_001",
    reviewerId: "user_123",
    authorName: "Sara Ali",
    authorPhoto: "https://picsum.photos/200",
    overallRating: 4.5,
    teachingSkill: 5,
    communication: 4,
    punctuality: 4,
    text: "Great teaching style and very patient! Highly recommend.",
    createdAt: "2025-07-31T07:15:00.000Z",
  },
  {
    reviewId: "review_002",
    reviewerId: "user_456",
    authorName: "Ahmed Mansour",
    authorPhoto: "https://picsum.photos/200",
    overallRating: 3.0,
    teachingSkill: 3,
    communication: 3,
    punctuality: 3,
    text: "Decent experience, but could improve in preparation and clarity.",
    createdAt: "2025-07-30T18:42:00.000Z",
  },
  {
    reviewId: "review_003",
    reviewerId: "user_789",
    authorName: "Anonymous",
    authorPhoto: "",
    overallRating: 5.0,
    teachingSkill: 5,
    communication: 5,
    punctuality: 5,
    text: "Excellent in every way. Will definitely learn with them again!",
    createdAt: "2025-07-29T10:05:00.000Z",
  },
];
