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
