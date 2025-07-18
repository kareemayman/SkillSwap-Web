export const filterSkillPrompt = (searchQuery, skillList) => {
  return `
You are a skill matcher. Given a user's search query and a list of skills, return the top 3–5 skill IDs that best match their query.
Match the skills as closely as possible to the search query based on skillName and category.

Search Query: ${searchQuery}

Skills List:
${skillList}

Respond with only an array of matching skill IDs, like:
["id corrosponding to guitar", "id corrosponding to piano"]
`
}

export const skillMatch = (primaryUser, candidates) => {
  return `
  You are the “Skill Trade” matching engine.  
Given a primary user and a list of candidate users, your job is to return a JSON array of the top matches, ordered by likelihood (highest first).  

Criteria (in priority order):  
1. Skill match: candidate.hasSkills must intersect primary.needSkills.  
2. Reciprocal exchange: candidate.needSkills should intersect primary.hasSkills (bonus points).  
3. Availability overlap: intersect primary.availability with candidate.availability.  
4. Location: if the skill makes sense to be taught online in primary.needSkills, ignore location; otherwise prefer same city.  
5. Rating: use only to break ties if all above are equal.  

**Input**:

PrimaryUser:
${JSON.stringify(primaryUser)}

Candidates:
${JSON.stringify(candidates)}

**Task**  
Analyze the PrimaryUser against each candidate. Score them 0–100 based on how well they satisfy the criteria above, then return:
- An array of candidate uids in order of highest to lowest score.
- Only output valid JSON array.
`
}