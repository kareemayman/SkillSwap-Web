import { useEffect, useState } from "react"
import { Tag } from "../../components/Tag"
import { fetchSkillsList } from "../../utils/firestoreUtil"
import { filterSkillPrompt } from "../../utils/geminiPrompts"
import { generateFromGemini } from "../../api/gemini"

export const Skills = () => {
  const [skillsToLearn, setSkillsToLearn] = useState("")
  const [skillsToTeach, setSkillsToTeach] = useState("")
  const [skillsList, setSkillsList] = useState([])
  const [skillsToLearnSearchQuery, setSkillsToLearnSearchQuery] = useState("")
  const [skillsToTeachSearchQuery, setSkillsToTeachSearchQuery] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [selectedSkillToLearn, setSelectedSkillToLearn] = useState([])
  const [selectedSkillToTeach, setSelectedSkillToTeach] = useState([])
  const [newTeachSkills, setNewTeachSkills] = useState([])
  const [newLearnSkills, setNewLearnSkills] = useState([])

  useEffect(() => {
    const getSkills = async () => {
      const skillsArray = await fetchSkillsList()
      setSkillsList(skillsArray)
    }

    getSkills()
  }, [])

  useEffect(() => {
    const query = skillsToLearn
    setTimeout(() => {
      setSkillsToLearnSearchQuery(query)
    }, 1000)
  }, [skillsToLearn])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToLearnSearchQuery === skillsToLearn && skillsToLearn.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToLearn.toLowerCase(), JSON.stringify(skillsList))
      generateFromGemini(prompt).then((res) => {
        console.log(res)
        const parsedRes = JSON.parse(res)
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.skillId === id)
          if (skill && !filteredSkills.includes(skill) && !selectedSkillToLearn.includes(skill)) {
            setFilteredSkills((prev) => [...prev, skill])
          }
        })
      })
    }
  }, [skillsToLearnSearchQuery])

  useEffect(() => {
    const query = skillsToTeach
    setTimeout(() => {
      setSkillsToTeachSearchQuery(query)
    }, 1000)
  }, [skillsToTeach])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToTeachSearchQuery === skillsToTeach && skillsToTeach.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToTeach.toLowerCase(), JSON.stringify(skillsList))
      generateFromGemini(prompt).then((res) => {
        console.log(res)
        const parsedRes = JSON.parse(res)
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.skillId === id)
          if (skill && !filteredSkills.includes(skill) && !selectedSkillToTeach.includes(skill)) {
            setFilteredSkills((prev) => [...prev, skill])
          }
        })
      })
    }
  }, [skillsToTeachSearchQuery])

  return (
    <>
      <div className="self-start w-full">
        <h1 className="mb-8 font-bold text-3xl">My Skills</h1>
        <p className="font-bold text-xl">Skills to Learn</p>

        <div className="relative">
          <input
            className="z-0 bg-transparent mt-6 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] min-w-[30%] placeholder:text-[#4A739C] transition-all duration-300"
            type="text"
            name="skillsToLearn"
            id="skillsToLearn"
            placeholder="Search for skills to learn"
            value={skillsToLearn}
            onChange={(e) => setSkillsToLearn(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillsToLearn.trim() !== "") {
                if (
                  !skillsList.find((skill) => skill.skillName === skillsToLearn) &&
                  !newLearnSkills.includes(skillsToLearn)
                ) {
                  setNewLearnSkills((prev) => [...prev, skillsToLearn])
                  setSkillsToLearn("")
                }
              }
            }}
          />

          {skillsToLearn.trim() !== "" && (
            <div className="top-full left-0 z-50 absolute bg-[#E8EDF5] rounded-md min-w-[30%]">
              {filteredSkills.map((skill) => (
                <div
                  onClick={() => {
                    setSelectedSkillToLearn((prev) => [...prev, skill])
                    setFilteredSkills([])
                    setSkillsToLearn("")
                  }}
                  key={skill.skillId}
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
              key={skill.skillId}
              onClick={() =>
                setSelectedSkillToLearn((prev) => prev.filter((s) => s.skillId !== skill.skillId))
              }
            >
              {skill.skillName}
            </Tag>
          ))}
          {newLearnSkills.map((skill) => (
            <Tag
              key={skill}
              onClick={() => setNewLearnSkills((prev) => prev.filter((s) => s !== skill))}
            >
              {skill}
            </Tag>
          ))}
        </div>

        <p className="font-bold text-xl">Skills to Teach</p>

        <div className="relative">
          <input
            className="z-0 bg-transparent mt-6 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] min-w-[30%] placeholder:text-[#4A739C] transition-all duration-300"
            type="text"
            name="skillsToTeach"
            id="skillsToTeach"
            placeholder="Search for skills to teach"
            value={skillsToTeach}
            onChange={(e) => setSkillsToTeach(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillsToTeach.trim() !== "") {
                if (
                  !skillsList.find((skill) => skill.skillName === skillsToTeach) &&
                  !newTeachSkills.includes(skillsToTeach)
                ) {
                  setNewTeachSkills((prev) => [...prev, skillsToTeach])
                  setSkillsToTeach("")
                }
              }
            }}
          />

          {skillsToTeach.trim() !== "" && (
            <div className="top-full left-0 z-50 absolute bg-[#E8EDF5] rounded-md min-w-[30%]">
              {filteredSkills.map((skill) => (
                <div
                  onClick={() => {
                    setSelectedSkillToTeach((prev) => [...prev, skill])
                    setFilteredSkills([])
                    setSkillsToTeach("")
                  }}
                  key={skill.skillId}
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
              key={skill.skillId}
              onClick={() => {
                setSelectedSkillToTeach((prev) => prev.filter((s) => s.skillId !== skill.skillId))
              }}
            >
              {skill.skillName}
            </Tag>
          ))}
          {newTeachSkills.map((skill) => (
            <Tag
              key={skill}
              onClick={() => setNewTeachSkills((prev) => prev.filter((s) => s !== skill))}
            >
              {skill}
            </Tag>
          ))}
        </div>
      </div>
    </>
  )
}
