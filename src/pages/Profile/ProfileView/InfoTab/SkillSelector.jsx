import { useEffect, useState } from "react";
import { createSkillDoc, fetchSkillsList } from "../../../../utils/firestoreUtil";
import { filterSkillPrompt } from "../../../../utils/geminiPrompts";
import { generateFromGemini } from "../../../../api/gemini";
import { Tag } from "./Tag";
import { LuCircleX, LuCircleCheck, LuSearch } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export default function SkillSelector({ onSave, onCancel, existingSkills = [], placeholder = "Search for skills", skillType = "hasSkills" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [allSkillsList, setAllSkillsList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newCustomSkills, setNewCustomSkills] = useState([]);

  const [loadingMessage, setLoadingMessage] = useState(null);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();

  // Fetch the master list of skills once on mount
  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsArray = await fetchSkillsList();
        setAllSkillsList(skillsArray);
        console.log("@ProfilePage ---- @SkillSelector ---- Master skills list:", skillsArray);
      } catch (err) {
        console.error("Failed to fetch skills list:", err);
        setError("Could not load the skills list. Please try again.");
      }
    };
    getSkills();
  }, []);

  // Debounce the search query to avoid excessive API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // Perform the search when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const performSearch = async () => {
      setLoadingMessage("Searching ...");
      const allCurrentSkillNames = [
        ...existingSkills.map((s) => s.skillName.toLowerCase()),
        ...selectedSkills.map((s) => s.skillName.toLowerCase()),
        ...newCustomSkills.map((s) => s.skillName.toLowerCase()),
      ];

      try {
        const prompt = filterSkillPrompt(debouncedQuery.toLowerCase(), JSON.stringify(allSkillsList));
        let res = await generateFromGemini(prompt);
        res = res.replace("```json", "").replace("```", "");
        const parsedRes = JSON.parse(res);

        const results = parsedRes
          .map((id) => allSkillsList.find((skill) => skill.id === id))
          .filter((skill) => skill && !allCurrentSkillNames.includes(skill.skillName.toLowerCase()));

        setFilteredResults(results);
        setError(null);
      } catch (err) {
        console.error("Error filtering skills with Gemini:", err);
        setError("Search failed. Please check your connection.");
      } finally {
        setLoadingMessage(null);
      }
    };

    performSearch();
  }, [debouncedQuery, allSkillsList, existingSkills, selectedSkills, newCustomSkills]);

  const handleSelectSkill = (skill) => {
    setSelectedSkills((prev) => [...prev, { ...skill, skillLevel: skillType === "hasSkills" ? "intermediate" : "beginner" }]);
    setSearchQuery("");
    setFilteredResults([]);
  };

  const handleAddCustomSkill = async (skillName) => {
    if (skillName.trim() !== "" && !newCustomSkills.some((s) => s.skillName.toLowerCase() === skillName.toLowerCase())) {
      setLoadingMessage("Adding new skill...");
      try {
        const newSkill = await createSkillDoc({ skillName });

        setNewCustomSkills((prev) => [...prev, { ...newSkill, skillLevel: skillType === "hasSkills" ? "intermediate" : "beginner" }]);

        setSearchQuery("");

        setAllSkillsList((prev) => [...prev, newSkill]);
      } catch (error) {
        console.error("Error creating new skill with Gemini:\n", error);
        setError("Adding new skill failed. Please try again.");
      } finally {
        setLoadingMessage(null);
      }
    }
  };

  const handleSave = () => {
    const newSkillsToAdd = [
      ...selectedSkills.map((skill) => {
        const newSkill = { ...skill, skillId: skill.id, skillLevel: skillType === "hasSkills" ? "intermediate" : "beginner" };
        delete newSkill.id;

        return newSkill;
      }),
      // ...newCustomSkills.map((skillName) => ({ skillId: generateSkillId(), skillName })),
      ...newCustomSkills,
    ];
    onSave(newSkillsToAdd);
    setSelectedSkills([]);
    setNewCustomSkills([]);
  };

  const handleCancel = () => {
    setSelectedSkills([]);
    setNewCustomSkills([]);
    setSearchQuery("");
    setFilteredResults([]);
    setError(null);
    onCancel();
  };

  return (
    <div className="p-4 mt-4 border rounded-lg bg-gray-50/50 border-gray-300 space-y-4">
      <div className="relative">
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          className="w-full pl-10 p-3 rounded-lg border border-[var(--color-card-border)] bg-slate-50 text-[var(--color-text-secondary)] placeholder:text-[#4A739C]"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustomSkill(searchQuery);
            }
          }}
        />
        {searchQuery.trim() !== "" && (
          <div className="top-full left-0 mt-1 z-50 absolute bg-[#E8EDF5] rounded-md w-full shadow-lg">
            {loadingMessage && <div className="p-3 text-center text-gray-500">{loadingMessage}</div>}
            {!loadingMessage &&
              filteredResults.map((skill) => (
                <div
                  onClick={() => handleSelectSkill(skill)}
                  key={skill.id}
                  className="hover:bg-[#6A8FD9] p-3 border-b border-gray-200 capitalize cursor-pointer"
                >
                  {skill.skillName}
                </div>
              ))}
            {!loadingMessage && filteredResults.length === 0 && debouncedQuery && (
              <div className="p-3 text-center text-gray-500">No matches found. Press Enter to add as a new skill.</div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 my-4 tags min-h-[40px]">
        {selectedSkills.map((skill) => (
          <Tag
            key={skill.id}
            skillLevel={skill.skillLevel}
            isEditing
            onDelete={() => setSelectedSkills((prev) => prev.filter((s) => s.id !== skill.id))}
            teaching={skillType === "hasSkills"}
          >
            {i18n.language === "ar" ? (skill?.skillNameArabic ? skill?.skillNameArabic : skill?.skillName) : skill?.skillName}
          </Tag>
        ))}
        {newCustomSkills.map((skill) => (
          <Tag
            key={skill.id}
            skillLevel={skill.skillLevel}
            isEditing
            onDelete={() => setNewCustomSkills((prev) => prev.filter((s) => s !== skill))}
            teaching={skillType === "hasSkills"}
          >
            {i18n.language === "ar" ? (skill?.skillNameArabic ? skill?.skillNameArabic : skill?.skillName) : skill?.skillName}
          </Tag>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center justify-end gap-2">
        <button
          aria-label="Save new skills"
          className="p-2 rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-700 hover:text-green-100 disabled:bg-gray-200 disabled:text-gray-400"
          onClick={handleSave}
          disabled={selectedSkills.length === 0 && newCustomSkills.length === 0}
        >
          <LuCircleCheck size={22} />
        </button>
        <button
          aria-label="Cancel adding skills"
          className="p-2 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
          onClick={handleCancel}
        >
          <LuCircleX size={22} />
        </button>
      </div>
    </div>
  );
}
