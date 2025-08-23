import { useContext, useEffect, useState } from "react";
import { MatchCard } from "./Components/MatchCard";
import { AuthContext } from "../../contexts/Auth/context";
import { getAllUsers, getUserById } from "../../utils/firestoreUtil";
import { generateFromGemini } from "../../api/gemini";
import { skillMatch } from "../../utils/geminiPrompts";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const { user } = useContext(AuthContext);
  const [primaryUser, setPrimaryUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();


  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((res) => setPrimaryUser(res.data()));
    }
  }, [user]);

  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res));
  }, []);

  useEffect(() => {
    if (allUsers && primaryUser) {
      generateFromGemini(skillMatch(primaryUser, allUsers))
        .then((res) => {
          res = res.replace("```json", "").replace("```", "");
          setMatches(JSON.parse(res));
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [allUsers, primaryUser]);

  return (
    <>
      <div className="mx-auto container py-6 px-4 md:px-16">
        <h1 className="font-medium text-4xl my-2 text-[var(--color-text-primary)]">
          <span className="text-[var(--main-color)]">{t("explore.AI")}{t("explore.SkillMatchSuggestions")} 🤖</span>
        </h1>

        <p className="pt-2 text-[var(--color-text-secondary)]">
          {t("explore.title")}
        </p>

        <h2 className="font-medium text-2xl my-5 text-[var(--color-text-primary)]">
          {t("explore.RecommendedMatches")}
        </h2>

        {isLoading && (
          <LoadingAnimation></LoadingAnimation>
        )}

        {matches &&
          matches.map((match) => {
            if (user.uid !== match.uid)
              return <MatchCard key={match.uid} user={match} />;
          })}

        {(isError || matches?.length === 0) && (
          <p className="pt-2 text-red-800 font-bold text-lg">
            Oopsie! Our super-smart AI seems to be on a coffee break and
            couldn't find any skill-tastic matches. Try again later!
          </p>
        )}
      </div>
    </>
  );
};

export default Explore;
