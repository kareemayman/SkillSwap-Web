const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
  
const API_KEY = import.meta.env.VITE_GEMINI_KEY

export const generateFromGemini = async (prompt) => {
  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    const data = await res.json()

    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return content || "No response from Gemini."
  } catch (err) {
    console.error("Gemini error:", err)
    return "Error connecting to Gemini."
  }
}
