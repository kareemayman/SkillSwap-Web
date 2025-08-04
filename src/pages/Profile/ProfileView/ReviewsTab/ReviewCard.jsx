import { Rating, RatingStar } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function ReviewCard({ data }) {
  const { t } = useTranslation();

  return (
    <div className="usercard border-[--color-card-border] border p-2 my-2 rounded-xl overflow-hidden transition-all duration-300">
      <div className="flex justify-between">
        {/* Avatar */}
        {data?.authorPhoto ? (
          <img
            src={data.authorPhoto}
            className="rounded-full h-12 w-12 object-cover border-2 border-[--color-card-border]"
            alt="Author profile Picture"
          />
        ) : (
          <div
            className="rounded-full h-12 w-12 bg-gray-300 text-gray-700 flex items-center justify-center font-semibold text-sm uppercase"
            aria-label="User initials"
          >
            {getInitials(data?.authorName)}
          </div>
        )}

        <div className="flex flex-col flex-1 p-2">
          {/* Name and Date */}
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold">{data?.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(data?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </div>

          {/* Ratings Row */}
          <div className=" flex items-center gap-1">
            {data?.rating != null && (
              <>
                <div className="flex flex-col items-center gap-1 text-[--color-text-secondary]">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold">{data?.rating}</p>
                    <Rating size="sm" className="gap-0.5">
                      <RatingStar />
                    </Rating>
                  </div>
                  <p className="text-sm">{t("Overall")}</p>
                </div>
              </>
            )}

            {data?.teachingSkill != null && (
              <>
                <span className={`mx-1.5 h-full w-0.5 rounded-full bg-gray-500 dark:bg-gray-400`} />

                <div className="flex flex-col items-center gap-1 text-[--color-text-secondary]">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold">{data?.teachingSkill}</p>
                    <Rating size="sm" className="gap-0.5">
                      <RatingStar />
                    </Rating>
                  </div>
                  <p className="text-xs">{t("Teaching Skill")}</p>
                </div>
              </>
            )}

            {data?.communication != null && (
              <>
                <span className={`mx-1.5 h-full w-0.5 rounded-full bg-gray-500 dark:bg-gray-400`} />

                <div className="flex flex-col items-center gap-1 text-[--color-text-secondary]">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold">{data?.communication}</p>
                    <Rating size="sm" className="gap-0.5">
                      <RatingStar />
                    </Rating>
                  </div>
                  <p className="text-xs">{t("Communication")}</p>
                </div>
              </>
            )}

            {data?.punctuality != null && (
              <>
                <span className={`mx-1.5 h-full w-0.5 rounded-full bg-gray-500 dark:bg-gray-400`} />

                <div className="flex flex-col items-center gap-1 text-[--color-text-secondary]">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold">{data?.punctuality}</p>
                    <Rating size="sm" className="gap-0.5">
                      <RatingStar />
                    </Rating>
                  </div>
                  <p className="text-xs">{t("Punctuality")}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Review Text */}
      {data?.text && <div className="p-2">{data.text}</div>}
    </div>
  );
}

function getInitials(name) {
  if (!name) return "?";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}
