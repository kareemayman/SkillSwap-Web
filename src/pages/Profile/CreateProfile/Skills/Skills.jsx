// import { useEffect, useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../../../firebase";
// import { Tag } from "./Tag";
// import { createSkillDoc, fetchSkillsList } from "../../../../utils/firestoreUtil";
// import { filterSkillPrompt } from "../../../../utils/geminiPrompts";
// import { generateFromGemini } from "../../../../api/gemini";
// import StatusOverlay from "../../../../components/StatusOverlay";
// import Button from "../../../../components/Button";
// import { useTranslation } from "react-i18next";

// export const Skills = ({ updateStep, userId, initialData, onComplete }) => {
//   const [skillsToLearn, setSkillsToLearn] = useState("");
//   const [skillsToTeach, setSkillsToTeach] = useState("");
//   const [skillsList, setSkillsList] = useState([]);
//   const [skillsToLearnSearchQuery, setSkillsToLearnSearchQuery] = useState("");
//   const [skillsToTeachSearchQuery, setSkillsToTeachSearchQuery] = useState("");
//   const [filteredSkills, setFilteredSkills] = useState([]);
//   const { t } = useTranslation();

//   // Initialize selected skills from initialData
//   const [selectedSkillToLearn, setSelectedSkillToLearn] = useState(
//     initialData?.needSkills?.map((skill) => ({
//       id: skill.skillId,
//       skillName: skill.skillName,
//     })) || []
//   );

//   const [selectedSkillToTeach, setSelectedSkillToTeach] = useState(
//     initialData?.hasSkills?.map((skill) => ({
//       id: skill.skillId,
//       skillName: skill.skillName,
//     })) || []
//   );

//   // For new custom skills, extract ones that aren't in the original lists
//   const [newTeachSkills, setNewTeachSkills] = useState(
//     initialData?.hasSkills?.filter((skill) => !skill.skillId.startsWith("skill_"))?.map((skill) => skill.skillName) || []
//   );

//   const [newLearnSkills, setNewLearnSkills] = useState(
//     initialData?.needSkills?.filter((skill) => !skill.skillId.startsWith("skill_"))?.map((skill) => skill.skillName) || []
//   );

//   const [status, setStatus] = useState({
//     loading: false,
//     error: null,
//     data: null,
//   });

//   useEffect(() => {
//     const getSkills = async () => {
//       const skillsArray = await fetchSkillsList();
//       console.log("Fetched skills:", skillsArray);
//       setSkillsList(skillsArray);
//     };

//     getSkills();
//   }, []);

//   useEffect(() => {
//     const query = skillsToLearn;
//     setTimeout(() => {
//       setSkillsToLearnSearchQuery(query);
//     }, 1000);
//   }, [skillsToLearn]);

//   useEffect(() => {
//     setFilteredSkills([]);
//     if (skillsToLearnSearchQuery === skillsToLearn && skillsToLearn.trim() !== "") {
//       const prompt = filterSkillPrompt(skillsToLearn.toLowerCase(), JSON.stringify(skillsList));
//       generateFromGemini(prompt).then((res) => {
//         res = res.replace("```json", "").replace("```", "");
//         console.log(res);
//         const parsedRes = JSON.parse(res);
//         parsedRes.forEach((id) => {
//           const skill = skillsList.find((skill) => skill.id === id);
//           if (skill && !filteredSkills.includes(skill) && !selectedSkillToLearn.includes(skill)) {
//             setFilteredSkills((prev) => [...prev, skill]);
//           }
//         });
//       });
//     }
//   }, [skillsToLearnSearchQuery]);

//   useEffect(() => {
//     const query = skillsToTeach;
//     setTimeout(() => {
//       setSkillsToTeachSearchQuery(query);
//     }, 1000);
//   }, [skillsToTeach]);

//   useEffect(() => {
//     setFilteredSkills([]);
//     if (skillsToTeachSearchQuery === skillsToTeach && skillsToTeach.trim() !== "") {
//       const prompt = filterSkillPrompt(skillsToTeach.toLowerCase(), JSON.stringify(skillsList));
//       generateFromGemini(prompt).then((res) => {
//         res = res.replace("```json", "").replace("```", "");

//         console.log(res);
//         const parsedRes = JSON.parse(res);
//         parsedRes.forEach((id) => {
//           const skill = skillsList.find((skill) => skill.id === id);
//           if (skill && !filteredSkills.includes(skill) && !selectedSkillToTeach.includes(skill)) {
//             setFilteredSkills((prev) => [...prev, skill]);
//           }
//         });
//       });
//     }
//   }, [skillsToTeachSearchQuery]);

//   function dismissOverlay() {
//     setStatus({ loading: false, error: null, data: null });
//   }

//   async function handleSkillsSubmit() {
//     try {
//       setStatus({ loading: true, error: null, data: null });

//       const hasSkills = [
//         ...selectedSkillToTeach.map((skill) => ({
//           skillId: skill.id,
//           skillName: skill.skillName,
//           skillLevel: "intermediate",
//         })),
//         ...newTeachSkills.map((skillName) => ({
//           skillId: generateSkillId(),
//           skillName: skillName,
//           skillLevel: "intermediate",
//         })),
//       ];

//       const needSkills = [
//         ...selectedSkillToLearn.map((skill) => ({
//           skillId: skill.id,
//           skillName: skill.skillName,
//           skillLevel: "beginner",
//         })),
//         ...newLearnSkills.map((skillName) => ({
//           skillId: generateSkillId(),
//           skillName: skillName,
//           skillLevel: "beginner",
//         })),
//       ];

//       const updateObj = { hasSkills, needSkills };

//       const userRef = doc(db, "users", userId);
//       // console.log(`@handleSkillsSubmit ---- userId = ${userId} ---- userRef = ${userRef}`);
//       await updateDoc(userRef, updateObj);

//       onComplete(updateObj);

//       setStatus({
//         loading: false,
//         error: null,
//         data: "Great! Your skills are now updated.",
//       });

//       // Clear all skills
//       setSelectedSkillToTeach([]);
//       setNewTeachSkills([]);
//       setSelectedSkillToLearn([]);
//       setNewLearnSkills([]);

//       // Wait for 1 seconds to show success message before moving to next step
//       setTimeout(() => {
//         updateStep(3);
//       }, 1000);
//     } catch (error) {
//       console.error("Error updating skills:", error);
//       setStatus({ loading: false, error: error.message, data: null });
//     }
//   }

//   return (
//     // <div className="p-4 bg-gray-50/50 border rounded-xl border-gray-300 shadow-2xl transition-all relative">
//     <>
//       <StatusOverlay status={status} onDismiss={dismissOverlay} />

//       <div className="self-start w-full">
//         <h1 className="mb-8 font-bold text-3xl text-[var(--main-color)] italic text-center"> {t("Skills.MySkillsTitle")}</h1>
//         <p className="font-bold text-xl text-[var(--color-text-secondary)]"> {t("Skills.LearnTitle")}</p>

//         <div className="relative">
//           <input
//             className="backdrop-blur-sm p-3 mt-1 rounded-lg border border-[var(--color-card-border)] bg-slate-50  text-[var(--color-text-secondary)] placeholder:text-[#4A739C] transition-all duration-300 text-sm"
//             type="text"
//             name="skillsToLearn"
//             id="skillsToLearn"
//             placeholder={t("Skills.PlaceholderLearn")}
//             value={skillsToLearn}
//             onChange={(e) => setSkillsToLearn(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && skillsToLearn.trim() !== "") {
//                 if (!skillsList.find((skill) => skill.skillName === skillsToLearn) && !newLearnSkills.includes(skillsToLearn)) {
//                   createSkillDoc(skillsToLearn)
//                     .then((newSkill) => {
//                       newSkill.skillLevel = "beginner";
//                       setNewLearnSkills((prev) => [...prev, newSkill]);
//                       setSkillsToLearn("");
//                     })
//                     .catch((error) => {
//                       console.error("Error creating new learn skill:", error);
//                     });

//                   // setNewLearnSkills((prev) => [...prev, skillsToLearn]);
//                   // setSkillsToLearn("");
//                 }
//               }
//             }}
//           />

//           {skillsToLearn.trim() !== "" && (
//             <div className="top-full left-0 text-black z-50 absolute dark:bg-black bg-slate-50 rounded-md min-w-[30%]">
//               {filteredSkills.map((skill) => (
//                 <div
//                   onClick={() => {
//                     setSelectedSkillToLearn((prev) => [...prev, skill]);
//                     setFilteredSkills([]);
//                     setSkillsToLearn("");
//                   }}
//                   key={skill.id}
//                   className="hover:bg-[#6A8FD9] p-3 border-2 border-b-[#CFDBE8] border-solid rounded-md capitalize transition-all duration-300 cursor-pointer"
//                 >
//                   {skill.skillName}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-3 my-6 max-w-[30%] tags">
//           {selectedSkillToLearn.map((skill) => (
//             <Tag key={skill.id} onClick={() => setSelectedSkillToLearn((prev) => prev.filter((s) => s.id !== skill.id))} type="learn">
//               {skill.skillName}
//             </Tag>
//           ))}
//           {newLearnSkills.map((skill) => (
//             <Tag key={skill.skillId} onClick={() => setNewLearnSkills((prev) => prev.filter((s) => s.skillId !== skill.skillId))} type="learn">
//               {skill.skillName || skill}
//             </Tag>
//           ))}
//         </div>

//         <p className="font-bold text-xl text-[var(--color-text-secondary)]">{t("Skills.TeachTitle")}</p>

//         <div className="relative">
//           <input
//             className="backdrop-blur-sm p-3 mt-1 rounded-lg  border border-[var(--color-card-border)] bg-slate-50 text-[var(--color-text-secondary)] placeholder:text-[#4A739C] transition-all duration-300 text-sm"
//             type="text"
//             name="skillsToTeach"
//             id="skillsToTeach"
//             placeholder={t("Skills.PlaceholderTeach")}
//             value={skillsToTeach}
//             onChange={(e) => setSkillsToTeach(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && skillsToTeach.trim() !== "") {
//                 if (!skillsList.find((skill) => skill.skillName === skillsToTeach) && !newTeachSkills.includes(skillsToTeach)) {
//                   createSkillDoc(skillsToTeach)
//                     .then((newSkill) => {
//                       newSkill.skillLevel = "intermediate";
//                       setNewTeachSkills((prev) => [...prev, newSkill]);
//                       setSkillsToTeach("");
//                     })
//                     .catch((error) => {
//                       console.error("Error creating new teach skill:", error);
//                     });
//                   // setNewTeachSkills((prev) => [...prev, skillsToTeach]);
//                   // setSkillsToTeach("");
//                 }
//               }
//             }}
//           />

//           {skillsToTeach.trim() !== "" && (
//             <div className="top-full left-0 text-black z-50 absolute dark:bg-[#E8EDF5] bg-white rounded-md min-w-[30%]">
//               {filteredSkills.map((skill) => (
//                 <div
//                   onClick={() => {
//                     setSelectedSkillToTeach((prev) => [...prev, skill]);
//                     setFilteredSkills([]);
//                     setSkillsToTeach("");
//                   }}
//                   key={skill.id}
//                   className="hover:bg-[#6A8FD9] p-3 border-2 border-b-[#CFDBE8] border-solid rounded-md capitalize transition-all duration-300 cursor-pointer"
//                 >
//                   {skill.skillName}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-3 my-6 max-w-[30%] tags">
//           {selectedSkillToTeach.map((skill) => (
//             <Tag
//               key={skill.id}
//               onClick={() => {
//                 setSelectedSkillToTeach((prev) => prev.filter((s) => s.id !== skill.id));
//               }}
//               type="teach"
//             >
//               {skill.skillName}
//             </Tag>
//           ))}
//           {newTeachSkills.map((skill) => (
//             <Tag key={skill.skillId} onClick={() => setNewTeachSkills((prev) => prev.filter((s) => s.skillId !== skill.skillId))} type="teach">
//               {skill.skillName || skill}
//             </Tag>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-end gap-4">
//         <button
//           onClick={() => {
//             updateStep(1);
//           }}
//           className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
//         >
//           {t("Common.Back")}
//         </button>

//         <Button
//           /**user must choose skills to teach and to learn so that he can submit and Proceed to teh next step */ disabled={
//             (selectedSkillToTeach.length === 0 && newTeachSkills.length === 0) || (selectedSkillToLearn.length === 0 && newLearnSkills.length === 0)
//           }
//           value={t("Common.Next")}
//           onPress={handleSkillsSubmit}
//         />
//       </div>
//     </>
//     // </div>
//   );
// };

// function generateSkillId() {
//   return `skill_${Math.random().toString(36).substring(2, 11)}`;
// }

import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import StatusOverlay from "../../../../components/StatusOverlay";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";
import SkillSelector from "../../../Profile/ProfileView/InfoTab/SkillSelector";
import { Tag } from "../../../Profile/ProfileView/InfoTab/Tag";
import toast from "react-hot-toast";

export const Skills = ({ updateStep, userId, initialData, onComplete }) => {
  const { t, i18n } = useTranslation();

  const [skillsData, setSkillsData] = useState({
    hasSkills: initialData?.hasSkills || [],
    needSkills: initialData?.needSkills || [],
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    data: null,
  });

  // Check if user is on free plan
  const isFreeUser = initialData?.subscribtion?.plan === "free";
  const SKILL_LIMIT = 2;

  // console.log("@Skills ---- initialData =", initialData);

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  const handleAddTeachSkills = (newSkills) => {
    console.log("@handleAddTeachSkills ---- isFreeUser =", isFreeUser);
    if (isFreeUser) {
      const totalSkillsAfterAdd = skillsData.hasSkills.length + newSkills.length;
      if (totalSkillsAfterAdd > SKILL_LIMIT) {
        toast.error(`Free users can only add up to ${SKILL_LIMIT} teaching skills. Upgrade to Pro for unlimited skills!`, {
          duration: 4000,
          position: "top-center",
        });
        return;
      }
    }

    setSkillsData((prev) => ({
      ...prev,
      hasSkills: [...prev.hasSkills, ...newSkills],
    }));

    toast.success(`${newSkills.length} teaching skill${newSkills.length > 1 ? "s" : ""} added!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  const handleAddLearnSkills = (newSkills) => {
    if (isFreeUser) {
      const totalSkillsAfterAdd = skillsData.needSkills.length + newSkills.length;
      if (totalSkillsAfterAdd > SKILL_LIMIT) {
        toast.error(`Free users can only add up to ${SKILL_LIMIT} learning skills. Upgrade to Pro for unlimited skills!`, {
          duration: 4000,
          position: "top-center",
        });
        return;
      }
    }

    setSkillsData((prev) => ({
      ...prev,
      needSkills: [...prev.needSkills, ...newSkills],
    }));

    toast.success(`${newSkills.length} learning skill${newSkills.length > 1 ? "s" : ""} added!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  async function handleSkillsSubmit() {
    try {
      setStatus({ loading: true, error: null, data: null });

      const updateObj = {
        hasSkills: skillsData.hasSkills,
        needSkills: skillsData.needSkills,
      };

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updateObj);

      onComplete(updateObj);

      setStatus({
        loading: false,
        error: null,
        data: "Great! Your skills are now updated.",
      });

      // Wait for 1 second to show success message before moving to next step
      setTimeout(() => {
        updateStep(3);
      }, 1000);
    } catch (error) {
      console.error("Error updating skills:", error);
      setStatus({ loading: false, error: error.message, data: null });
    }
  }

  const canProceed = skillsData.hasSkills.length > 0 && skillsData.needSkills.length > 0;

  return (
    <>
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className="self-start w-full space-y-8">
        <h1 className="mb-8 font-bold text-3xl text-[var(--main-color)] italic text-center">{t("Skills.MySkillsTitle")}</h1>

        {/* Skills I can teach */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl text-[var(--color-text-secondary)]">{t("Skills.TeachTitle")}</h2>
            {isFreeUser && (
              <span className="text-sm text-gray-500">
                {skillsData.hasSkills.length}/{SKILL_LIMIT} skills
              </span>
            )}
          </div>

          {/* Display confirmed teach skills as non-removable tags */}
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50/50 border border-gray-200 rounded-lg">
            {skillsData.hasSkills.length > 0 ? (
              skillsData.hasSkills.map((skill) => (
                <Tag
                  key={skill.skillId}
                  skillLevel={skill.skillLevel}
                  teaching={true}
                  isEditing={false} // Non-removable
                >
                  {i18n.language === "ar" ? skill?.skillNameArabic || skill?.skillName : skill?.skillName}
                </Tag>
              ))
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">{t("Skills.NoTeachSkillsYet")}</p>
            )}
          </div>

          {/* Skill selector for teaching skills */}
          {(!isFreeUser || skillsData.hasSkills.length < SKILL_LIMIT) && (
            <SkillSelector
              onSave={handleAddTeachSkills}
              onCancel={() => {}} // No cancel needed in creation mode
              existingSkills={skillsData.hasSkills}
              placeholder={t("Skills.PlaceholderTeach")}
              skillType="hasSkills"
            />
          )}

          {isFreeUser && skillsData.hasSkills.length >= SKILL_LIMIT && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              You've reached the limit for teaching skills on the free plan. Upgrade to Pro to add more skills!
            </div>
          )}
        </div>

        {/* Skills I want to learn */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl text-[var(--color-text-secondary)]">{t("Skills.LearnTitle")}</h2>
            {isFreeUser && (
              <span className="text-sm text-gray-500">
                {skillsData.needSkills.length}/{SKILL_LIMIT} skills
              </span>
            )}
          </div>

          {/* Display confirmed learn skills as non-removable tags */}
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50/50 border border-gray-200 rounded-lg">
            {skillsData.needSkills.length > 0 ? (
              skillsData.needSkills.map((skill) => (
                <Tag
                  key={skill.skillId}
                  skillLevel={skill.skillLevel}
                  teaching={false}
                  isEditing={false} // Non-removable
                >
                  {i18n.language === "ar" ? skill?.skillNameArabic || skill?.skillName : skill?.skillName}
                </Tag>
              ))
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">{t("Skills.NoLearnSkillsYet")}</p>
            )}
          </div>

          {/* Skill selector for learning skills */}
          {(!isFreeUser || skillsData.needSkills.length < SKILL_LIMIT) && (
            <SkillSelector
              onSave={handleAddLearnSkills}
              onCancel={() => {}} // No cancel needed in creation mode
              existingSkills={skillsData.needSkills}
              placeholder={t("Skills.PlaceholderLearn")}
              skillType="needSkills"
            />
          )}

          {isFreeUser && skillsData.needSkills.length >= SKILL_LIMIT && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              You've reached the limit for learning skills on the free plan. Upgrade to Pro to add more skills!
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => updateStep(1)}
          className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
        >
          {t("Common.Back")}
        </button>

        <Button disabled={!canProceed} value={t("Common.Next")} onPress={handleSkillsSubmit} />
      </div>
    </>
  );
};
