import React, { useState, useMemo } from "react";
import { LuChevronDown, LuSearch, LuBrain, LuTarget } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const SKILL_LEVELS = [
  { value: "beginner", label: "beginner", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "intermediate", label: "intermediate", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "advanced", label: "advanced", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

export default function SkillLevelSelector({ skills = [], onSkillLevelChange }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [skillSearch, setSkillSearch] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
const { t } = useTranslation();

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    if (!skillSearch) return skills;
    return skills.filter((skill) => skill.skillName.toLowerCase().includes(skillSearch.toLowerCase()));
  }, [skills, skillSearch]);

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setSkillSearch("");
    setShowSkillDropdown(false);

    // Set the current level for this skill
    const currentLevel = skill.skillLevel ? SKILL_LEVELS.find((level) => level.value === skill.skillLevel) : null;
    setSelectedLevel(currentLevel);
  };

  // Handle level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowLevelDropdown(false);

    // Notify parent component
    if (selectedSkill) {
      onSkillLevelChange?.(selectedSkill.skillId, level.value);
    }
  };

  // Get current skill level display info
  const getCurrentLevelInfo = () => {
    if (!selectedSkill) return null;

    if (selectedSkill.skillLevel) {
      return SKILL_LEVELS.find((level) => level.value === selectedSkill.skillLevel);
    }
    return null;
  };

  const currentLevelInfo = getCurrentLevelInfo();

  return (
    <div className="space-y-4 w-full flex flex-col md:flex-row md:justify-between md:items-start md:space-y-0">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">
          <LuBrain className="inline w-4 h-4 mr-1" />
            {t("selectskill")}
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Skills Dropdown */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowSkillDropdown(!showSkillDropdown)}
              className="w-full h-12 px-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <LuTarget className="w-4 h-4 text-gray-400" />
                {selectedSkill ? (
                  <span className="text-gray-900 text-sm font-medium truncate">{selectedSkill.skillName}</span>
                ) : (
                  <span className="text-gray-500 text-sm"> {t("Select a skill")}</span>
                )}
              </div>
              <LuChevronDown className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </button>

            {showSkillDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {/* Search input */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <LuSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search skills..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] placeholder:text-gray-500"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Skills list */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <button
                        key={skill.skillId}
                        type="button"
                        onClick={() => handleSkillSelect(skill)}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 flex items-center justify-between"
                      >
                        <span className="text-gray-900 font-medium text-sm truncate">{skill.skillName}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-center text-sm">No skills found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Level Selection Dropdown */}
          <div className="relative sm:max-w-48">
            <button
              type="button"
              onClick={() => setShowLevelDropdown(!showLevelDropdown)}
              disabled={!selectedSkill}
              className="w-full h-12 px-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                {selectedLevel || currentLevelInfo ? (
                  <span className={`px-2 py-1 text-xs rounded-full border ${(selectedLevel || currentLevelInfo)?.color}`}>
                    {(selectedLevel || currentLevelInfo)?.label}
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">{selectedSkill ? "Select level" : "Choose skill first"}</span>
                )}
              </div>
              <LuChevronDown className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </button>

            {showLevelDropdown && selectedSkill && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="py-1">
                  {SKILL_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => handleLevelSelect(level)}
                      className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 flex items-center"
                    >
                      <span className={`px-2 py-1 text-xs rounded-full border ${level.color}`}>{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Skills Display */}
      {skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)]">{t("Current Skills")}</h3>
          <div className=" max-h-64 overflow-y-auto">
            <div className="grid gap-2">
              {skills.map((skill) => (
                <div key={skill.skillId} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between md:gap-2">
                    <div className="flex items-center space-x-2">
                      <LuTarget className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">{skill.skillName}</span>
                    </div>
                    {skill.skillLevel ? (
                      <span
                        className={`px-2 py-1 text-xs rounded-full border flex-shrink-0 ${
                          SKILL_LEVELS.find((level) => level.value === skill.skillLevel)?.color ||
                          "bg-gray-50 text-[var(--color-text-primary)] border-gray-200"
                        }`}
                      >
                        {skill.skillLevel}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full border bg-gray-50 text-gray-500 border-gray-200 flex-shrink-0">{t("Not set")}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
