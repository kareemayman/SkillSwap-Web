import React, { useState } from "react"
import Header from "../../components/Header"
import { Tag } from "../../components/Tag"

export const Skills = () => {
  const [skillsToLearn, setSkillsToLearn] = useState("")
  const [skillsToTeach, setSkillsToTeach] = useState("")

  return (
    <>
      <Header></Header>

      <div className="flex flex-col justify-center items-center mx-auto pt-16 container">
        <div className="self-start w-full">
          <h1 className="mb-8 font-bold text-3xl">My Skills</h1>
          <p className="font-bold text-xl">Skills to Learn</p>

          <input
            type="text"
            name="skillsToLearn"
            id="skillsToLearn"
            placeholder="Search for skills to learn"
            className="mt-6 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] min-w-[30%] placeholder:text-[#4A739C] transition-all duration-300"
            value={skillsToLearn}
            onChange={(e) => setSkillsToLearn(e.target.value)}
          />

          <div className="flex gap-3 my-6 tags flex-wrap">
            <Tag>Yoga</Tag>
            <Tag>Spanish</Tag>
            <Tag>Photography</Tag>
          </div>

          <p className="font-bold text-xl">Skills to Teach</p>

          <input
            type="text"
            name="skillsToLearn"
            id="skillsToLearn"
            placeholder="Search for skills to teach"
            className="mt-6 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] min-w-[30%] placeholder:text-[#4A739C] transition-all duration-300"
            value={skillsToTeach}
            onChange={(e) => setSkillsToTeach(e.target.value)}
          />

          <div className="flex gap-3 my-6 tags flex-wrap">
            <Tag>Graphic Design</Tag>
            <Tag>Cooking</Tag>
          </div>
        </div>
      </div>
    </>
  )
}
