import React from 'react'
import Header from '../../components/Header'
import { MatchCard } from './Components/MatchCard'

export const Explore = () => {
  return (
    <>
      <Header></Header>
      <div className='mx-auto container py-6 px-4'>

        <h1 className='font-medium text-4xl my-2 text-[var(--color-text-primary)]'>AI-Powered Skill Match Suggestions</h1>

        <p className='pt-2 text-[var(--color-text-secondary)]'>Based on your profile and preferences, we've identified potential skill trade matches that align with your interests and learning goals.</p>

        <h2 className='font-medium text-2xl my-5 text-[var(--color-text-primary)]'>Recommended Matches</h2>

        <MatchCard></MatchCard>
      </div>
    </>
  )
}
