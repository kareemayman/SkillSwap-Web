import React, { useContext, useEffect, useState } from "react"
import Header from "../../components/Header"
import { MatchCard } from "./Components/MatchCard"
import { AuthContext } from "../../contexts/Auth/context"
import { getAllUsers, getUserById } from "../../utils/firestoreUtil"
import { generateFromGemini } from "../../api/gemini"
import { skillMatch } from "../../utils/geminiPrompts"
import { Spinner } from "flowbite-react"

export const Explore = () => {
  const { user } = useContext(AuthContext)
  const [primaryUser, setPrimaryUser] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [matches, setMatches] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((res) => setPrimaryUser(res.data()))
    }
  }, [user])

  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res))
  }, [])

  useEffect(() => {
    if (allUsers && primaryUser) {
      generateFromGemini(skillMatch(primaryUser, allUsers))
        .then((res) => {
          res = res.replace("```json", "").replace("```", "")
          setMatches(JSON.parse(res))
          setIsLoading(false)
        })
        .catch((err) => {
          setIsError(true)
          setIsLoading(false)
          console.log(err)
        })
    }
  }, [allUsers, primaryUser])

  return (
    <>
      <Header></Header>
      <div className="mx-auto container py-6 px-4 md:px-16">
        <h1 className="font-medium text-4xl my-2 text-[var(--color-text-primary)]">
          AI-Powered Skill Match Suggestions
        </h1>

        <p className="pt-2 text-[var(--color-text-secondary)]">
          Based on your profile and preferences, we've identified potential skill trade matches that
          align with your interests and learning goals.
        </p>

        <h2 className="font-medium text-2xl my-5 text-[var(--color-text-primary)]">
          Recommended Matches
        </h2>

        {isLoading && (
          <Spinner
            aria-label="Extra large center-aligned spinner example"
            size="xl"
            color="success"
            className="w-full mt-32"
          ></Spinner>
        )}

        {matches &&
          matches.map((match) => {
            if (user.uid !== match) return <MatchCard key={match} userId={match} />
          })}

        {isError && (
          <p className="pt-2 text-[var(--color-text-secondary)]">
            Oopsie! Our super-smart AI seems to be on a coffee break and couldn't find any
            skill-tastic matches. Try again later!
          </p>
        )}
      </div>
    </>
  )
}
