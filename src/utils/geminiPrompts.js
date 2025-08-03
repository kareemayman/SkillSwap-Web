export const filterSkillPrompt = (searchQuery, skillList) => {
  return `
You are a skill matcher. Given a user's search query and a list of skills, return the top 3–5 skill IDs that best match their query.
Match the skills as closely as possible to the search query based on skillName, skillNameArabic, and category.

Search Query: ${searchQuery}

Skills List:
${skillList}

Respond with only an array of matching skill IDs in JSON format without any extra explaination, like:
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
3. Location: if the skill makes sense to be taught online in primary.needSkills, ignore location; otherwise prefer same city.  
4. Rating: use only to break ties if all above are equal.  

**Input**:

PrimaryUser:
${JSON.stringify(primaryUser)}

Candidates:
${JSON.stringify(candidates)}

**Task**  
Analyze the PrimaryUser against each candidate. Score them 0–100 based on how well they satisfy the criteria above, then return:
- An array of candidate objects in order of highest to lowest score.
- Only output valid JSON array.
`
}

export const getSkillCategory = (skillName, skillCategories) => {
  return `
  You are a smart categorization assistant.

I will give you:
1. A list of existing skill categories.
2. A new skill name.

Your task is to:
- Find the most appropriate category from the list that fits the new skill.
- If no category fits, create a **new category name** that makes sense.
- Always return a category (either from the list or a new one).
- Return only the category name, no explanation.

Here’s the data:

Skill Categories:
${JSON.stringify(skillCategories)}

New Skill:
${skillName}
`
}

export const translateSkillToArabic = (skillName) => {
  return `
  You are a professional translator.

Translate the following skill name from English to Arabic.

Only return the Arabic translation, with no extra explanation or punctuation.

Skill Name: ${skillName}

Your response:
`
}

export const filterUsersPrompt = (searchQuery, userList) => {
  return `
  I have a list of user profiles, and I want to implement a search functionality.
Each user object includes the following fields: name, email, bio, and phone.
Given a search query string, return a filtered list of users where any of these fields contain the query as a substring (case-insensitive).
The match should be flexible—handle partial matches, typos, and variations (like "Jon" for "Jonathan").
Prioritize results in this order:

Exact or close matches in name

Then in email

Then in bio

Then in phone
Return only the filtered and ranked user list, sorted from most to least relevant in JSON format without explaining anything.

Search Query: ${searchQuery}

User List:
${JSON.stringify(userList)}

Your response:
  `
}

export const filterSkillObjectsPrompt = (searchQuery, skillList) => {
  return `
  I have a list of skill objects, and I want to implement a smart search filter.
Each skill object includes the following fields:

skillName (in English)

skillNameArabic (Arabic translation)

category (e.g., Design, Music, Coding)

Given a search query string, return a filtered list of skills where any of these fields contain the query as a substring (case-insensitive and typo-tolerant).
Prioritize results in this order:

Exact or close matches in skillName

Then in skillNameArabic

Then in category

Return only the filtered and ranked list of skill objects from most to least relevant match in JSON format without explaining anything.

Search Query: ${searchQuery}

Skill List:
${JSON.stringify(skillList)}

Your response:
  `
}

export const filterReviewsPrompt = (searchQuery, usersList) => {
  return `
  I have a list of user objects.
Each user object includes a name field and a reviews array.
Each review object inside that array has:

authorName

text (the review message)

rating (number from 1–5)

Given a search query string, return a filtered and ranked list of user objects, where any of the user’s reviews match the query.

The matching should be case-insensitive and typo-tolerant, and ranked in this order of priority:

Match found in the review text

Then in the user.name

Then in the authorName

Then by rating (support "5 stars", "4.5", "high rating", etc.)

Return only the users who have at least one matching review, and include only the matched reviews for each user in JSON format without explaining anything.

Search Query: ${searchQuery}

Users List:
${JSON.stringify(usersList)}

Your response:
`
}

export const generateMilestonesPrompt = (skillName, skillLevel) => {
  return `
  You are an expert mentor helping learners progress step-by-step in their skill learning journey.
Given a skill name and the teacher's experience level, generate a list of milestones that break the skill into logical, progressive steps.

Each milestone should be practical, clear, and focused on real progress.
Return the result as an array of objects, where each object contains:

id: a unique identifier for the milestone

title: a short, descriptive milestone title

description: a detailed explanation of what this milestone covers

isCompleted: a boolean always set to false

price: a number representing the cost of the milestone, default to 0

AI: a boolean always set to true

✅ Use between 3 to 7 milestones.
✅ Make sure the progression makes sense for someone starting from scratch.
✅ Adjust the complexity based on the teacher's level:

Beginner: focus on fundamentals

Intermediate: build on basics with real-world application

Advanced: cover advanced concepts, optimization, and mastery

Example Input
Skill: “Digital Marketing”
Teacher Experience Level: “Intermediate”
Expected Output Format (as JSON) without farther explanation:
[
  {
    "id": K6CBXu0ECzcT7d5cIyEE,
    "title": "Understanding the Basics of Digital Marketing",
    "description": "Learn the foundational concepts such as SEO, SEM, content marketing, email campaigns, and analytics.",
    "isCompleted": false,
    "price": 0,
    "AI": true
  },
  ...
]

Skill: ${skillName}
Teacher Experience Level: ${skillLevel}

Your response:
`
}