import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Tag } from "./Tag";
import { fetchSkillsList } from "../../../../utils/firestoreUtil";
import { filterSkillPrompt } from "../../../../utils/geminiPrompts";
import { generateFromGemini } from "../../../../api/gemini";
import StatusOverlay from "../../../../components/StatusOverlay";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";

export const Skills = ({ updateStep, userId, initialData, onComplete }) => {
  const [skillsToLearn, setSkillsToLearn] = useState("");
  const [skillsToTeach, setSkillsToTeach] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [skillsToLearnSearchQuery, setSkillsToLearnSearchQuery] = useState("");
  const [skillsToTeachSearchQuery, setSkillsToTeachSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const { t } = useTranslation();

  // Initialize selected skills from initialData
  const [selectedSkillToLearn, setSelectedSkillToLearn] = useState(
    initialData?.needSkills?.map((skill) => ({
      id: skill.skillId,
      skillName: skill.skillName,
    })) || []
  );

  const [selectedSkillToTeach, setSelectedSkillToTeach] = useState(
    initialData?.hasSkills?.map((skill) => ({
      id: skill.skillId,
      skillName: skill.skillName,
    })) || []
  );

  // For new custom skills, extract ones that aren't in the original lists
  const [newTeachSkills, setNewTeachSkills] = useState(
    initialData?.hasSkills
      ?.filter((skill) => !skill.skillId.startsWith("skill_"))
      ?.map((skill) => skill.skillName) || []
  );

  const [newLearnSkills, setNewLearnSkills] = useState(
    initialData?.needSkills
      ?.filter((skill) => !skill.skillId.startsWith("skill_"))
      ?.map((skill) => skill.skillName) || []
  );

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const getSkills = async () => {
      const skillsArray = await fetchSkillsList();
      console.log("Fetched skills:", skillsArray);
      setSkillsList(skillsArray);
    };

    getSkills();
  }, []);

  useEffect(() => {
    const query = skillsToLearn;
    setTimeout(() => {
      setSkillsToLearnSearchQuery(query);
    }, 1000);
  }, [skillsToLearn]);

  useEffect(() => {
    setFilteredSkills([]);
    if (
      skillsToLearnSearchQuery === skillsToLearn &&
      skillsToLearn.trim() !== ""
    ) {
      const prompt = filterSkillPrompt(
        skillsToLearn.toLowerCase(),
        JSON.stringify(skillsList)
      );
      generateFromGemini(prompt).then((res) => {
        res = res.replace("```json", "").replace("```", "");
        console.log(res);
        const parsedRes = JSON.parse(res);
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.id === id);
          if (
            skill &&
            !filteredSkills.includes(skill) &&
            !selectedSkillToLearn.includes(skill)
          ) {
            setFilteredSkills((prev) => [...prev, skill]);
          }
        });
      });
    }
  }, [skillsToLearnSearchQuery]);

  useEffect(() => {
    const query = skillsToTeach;
    setTimeout(() => {
      setSkillsToTeachSearchQuery(query);
    }, 1000);
  }, [skillsToTeach]);

  useEffect(() => {
    setFilteredSkills([]);
    if (
      skillsToTeachSearchQuery === skillsToTeach &&
      skillsToTeach.trim() !== ""
    ) {
      const prompt = filterSkillPrompt(
        skillsToTeach.toLowerCase(),
        JSON.stringify(skillsList)
      );
      generateFromGemini(prompt).then((res) => {
        res = res.replace("```json", "").replace("```", "");

        console.log(res);
        const parsedRes = JSON.parse(res);
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.id === id);
          if (
            skill &&
            !filteredSkills.includes(skill) &&
            !selectedSkillToTeach.includes(skill)
          ) {
            setFilteredSkills((prev) => [...prev, skill]);
          }
        });
      });
    }
  }, [skillsToTeachSearchQuery]);

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  async function handleSkillsSubmit() {
    try {
      setStatus({ loading: true, error: null, data: null });

      const hasSkills = [
        ...selectedSkillToTeach.map((skill) => ({
          skillId: skill.id,
          skillName: skill.skillName,
          skillLevel: "intermediate",
        })),
        ...newTeachSkills.map((skillName) => ({
          skillId: generateSkillId(),
          skillName: skillName,
          skillLevel: "intermediate",
        })),
      ];

      const needSkills = [
        ...selectedSkillToLearn.map((skill) => ({
          skillId: skill.id,
          skillName: skill.skillName,
          skillLevel: "beginner",
        })),
        ...newLearnSkills.map((skillName) => ({
          skillId: generateSkillId(),
          skillName: skillName,
          skillLevel: "beginner",
        })),
      ];

      const updateObj = { hasSkills, needSkills };

      const userRef = doc(db, "users", userId);
      // console.log(`@handleSkillsSubmit ---- userId = ${userId} ---- userRef = ${userRef}`);
      await updateDoc(userRef, updateObj);

      onComplete(updateObj);

      setStatus({
        loading: false,
        error: null,
        data: "Great! Your skills are now updated.",
      });

      // Clear all skills
      setSelectedSkillToTeach([]);
      setNewTeachSkills([]);
      setSelectedSkillToLearn([]);
      setNewLearnSkills([]);

      // Wait for 1 seconds to show success message before moving to next step
      setTimeout(() => {
        updateStep(3);
      }, 1000);
    } catch (error) {
      console.error("Error updating skills:", error);
      setStatus({ loading: false, error: error.message, data: null });
    }
  }

  return (
    // <div className="p-4 bg-gray-50/50 border rounded-xl border-gray-300 shadow-2xl transition-all relative">
    <>
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className="self-start w-full">
        <h1 className="mb-8 font-bold text-3xl text-[var(--main-color)] italic text-center">
          {" "}
          {t("Skills.MySkillsTitle")}
        </h1>
        <p className="font-bold text-xl text-[var(--color-text-secondary)]">
          {" "}
          {t("Skills.LearnTitle")}
        </p>

        <div className="relative">
          <input
            className="backdrop-blur-sm p-3 mt-1 rounded-lg border border-[var(--color-card-border)] bg-slate-50  text-[var(--color-text-secondary)] placeholder:text-[#4A739C] transition-all duration-300 text-sm"
            type="text"
            name="skillsToLearn"
            id="skillsToLearn"
            placeholder={t("Skills.PlaceholderLearn")}
            value={skillsToLearn}
            onChange={(e) => setSkillsToLearn(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillsToLearn.trim() !== "") {
                if (
                  !skillsList.find(
                    (skill) => skill.skillName === skillsToLearn
                  ) &&
                  !newLearnSkills.includes(skillsToLearn)
                ) {
                  setNewLearnSkills((prev) => [...prev, skillsToLearn]);
                  setSkillsToLearn("");
                }
              }
            }}
          />

          {skillsToLearn.trim() !== "" && (
            <div className="top-full left-0 text-black z-50 absolute dark:bg-black bg-slate-50 rounded-md min-w-[30%]">
              {filteredSkills.map((skill) => (
                <div
                  onClick={() => {
                    setSelectedSkillToLearn((prev) => [...prev, skill]);
                    setFilteredSkills([]);
                    setSkillsToLearn("");
                  }}
                  key={skill.id}
                  className="hover:bg-[#6A8FD9] p-3 border-2 border-b-[#CFDBE8] border-solid rounded-md capitalize transition-all duration-300 cursor-pointer"
                >
                  {skill.skillName}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 my-6 max-w-[30%] tags">
          {selectedSkillToLearn.map((skill) => (
            <Tag
              key={skill.id}
              onClick={() =>
                setSelectedSkillToLearn((prev) =>
                  prev.filter((s) => s.id !== skill.id)
                )
              }
              type="learn"
            >
              {skill.skillName}
            </Tag>
          ))}
          {newLearnSkills.map((skill) => (
            <Tag
              key={skill}
              onClick={() =>
                setNewLearnSkills((prev) => prev.filter((s) => s !== skill))
              }
              type="learn"
            >
              {skill}
            </Tag>
          ))}
        </div>

        <p className="font-bold text-xl text-[var(--color-text-secondary)]">
          {t("Skills.TeachTitle")}
        </p>

        <div className="relative">
          <input
            className="backdrop-blur-sm p-3 mt-1 rounded-lg  border border-[var(--color-card-border)] bg-slate-50 text-[var(--color-text-secondary)] placeholder:text-[#4A739C] transition-all duration-300 text-sm"
            type="text"
            name="skillsToTeach"
            id="skillsToTeach"
            placeholder={t("Skills.PlaceholderTeach")}
            value={skillsToTeach}
            onChange={(e) => setSkillsToTeach(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillsToTeach.trim() !== "") {
                if (
                  !skillsList.find(
                    (skill) => skill.skillName === skillsToTeach
                  ) &&
                  !newTeachSkills.includes(skillsToTeach)
                ) {
                  setNewTeachSkills((prev) => [...prev, skillsToTeach]);
                  setSkillsToTeach("");
                }
              }
            }}
          />

          {skillsToTeach.trim() !== "" && (
            <div className="top-full left-0 text-black z-50 absolute dark:bg-[#E8EDF5] bg-white rounded-md min-w-[30%]">
              {filteredSkills.map((skill) => (
                <div
                  onClick={() => {
                    setSelectedSkillToTeach((prev) => [...prev, skill]);
                    setFilteredSkills([]);
                    setSkillsToTeach("");
                  }}
                  key={skill.id}
                  className="hover:bg-[#6A8FD9] p-3 border-2 border-b-[#CFDBE8] border-solid rounded-md capitalize transition-all duration-300 cursor-pointer"
                >
                  {skill.skillName}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 my-6 max-w-[30%] tags">
          {selectedSkillToTeach.map((skill) => (
            <Tag
              key={skill.id}
              onClick={() => {
                setSelectedSkillToTeach((prev) =>
                  prev.filter((s) => s.id !== skill.id)
                );
              }}
              type="teach"
            >
              {skill.skillName}
            </Tag>
          ))}
          {newTeachSkills.map((skill) => (
            <Tag
              key={skill}
              onClick={() =>
                setNewTeachSkills((prev) => prev.filter((s) => s !== skill))
              }
              type="teach"
            >
              {skill}
            </Tag>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            updateStep(1);
          }}
          className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
        >
          {t("Common.Back")}
        </button>

        <Button
          /**user must choose skills to teach and to learn so that he can submit and Proceed to teh next step */ disabled={
            (selectedSkillToTeach.length === 0 &&
              newTeachSkills.length === 0) ||
            (selectedSkillToLearn.length === 0 && newLearnSkills.length === 0)
          }
          value={t("Common.Next")}
          onPress={handleSkillsSubmit}
        />
      </div>
    </>
    // </div>
  );
};

function generateSkillId() {
  return `skill_${Math.random().toString(36).substring(2, 11)}`;
}
