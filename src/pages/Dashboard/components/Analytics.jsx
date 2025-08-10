import { useEffect, useState } from "react"
import AnalyticsCard from "./AnalyticsCard"
import { getRequests, getSkillTrades } from "../../../utils/firestoreUtil"
import { generateFromGemini } from "../../../api/gemini"
import { calculateAnalyticsPrompt } from "../../../utils/geminiPrompts"
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Bar, BarChart } from "recharts"

export default function Analytics({ allUsers, allSkills, user }) {
  const [allTrades, setAllTrades] = useState(null)
  const [allRequests, setAllRequests] = useState(null)
  const [pendingTrades, setPendingTrades] = useState(0)
  const [mostRequestedSkills, setMostRequestedSkills] = useState(null)
  const [mostCommonSkills, setMostCommonSkills] = useState(null)
  const [mostRequestedCategories, setMostRequestedCategories] = useState(null)
  const [skillPercentages, setSkillPercentages] = useState(null)
  const [userGrowthLastWeek, setUserGrowthLastWeek] = useState(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(true)

  useEffect(() => {
    getSkillTrades().then((res) => setAllTrades(res))
    getRequests().then((res) => {
      setAllRequests(res)
      setPendingTrades(res.filter((r) => r.requestStatus === "pending").length)
    })
  }, [])

  useEffect(() => {
    if (allUsers?.length && allSkills?.length) {
      setLoadingAnalytics(true)
      async function calculateAnalytics() {
        try {
          let res = await generateFromGemini(calculateAnalyticsPrompt(allUsers, allSkills))
          res = res.replace("```json", "").replace("```", "")
          const analytics = JSON.parse(res)
          console.log("Analytics response:", analytics)
          setMostRequestedSkills(analytics.mostRequestedSkills)
          setMostCommonSkills(analytics.mostCommonSkills)
          setMostRequestedCategories(analytics.mostRequestedCategories)
          setSkillPercentages(analytics.skillPercentages)
          setUserGrowthLastWeek(analytics.userGrowthLastWeek)
          setLoadingAnalytics(false)
        } catch (err) {
          console.error(err)
        }
      }

      calculateAnalytics()
    }
  }, [allUsers, allSkills])

  // Calculate percentage growth for last 7 days
  let lastWeekTotal = 0
  let lastWeekStart = 0
  let lastWeekEnd = 0
  let growthPercent = 0
  let chartData = []

  if (Array.isArray(userGrowthLastWeek) && userGrowthLastWeek.length > 0) {
    chartData = userGrowthLastWeek.map((entry, idx) => ({
      date: entry.date.slice(5), // show MM-DD
      newUsers: entry.newUsers,
    }))
    lastWeekStart = userGrowthLastWeek[0].newUsers
    lastWeekEnd = userGrowthLastWeek[userGrowthLastWeek.length - 1].newUsers
    lastWeekTotal = userGrowthLastWeek.reduce((sum, entry) => sum + entry.newUsers, 0)
    // Calculate percent growth compared to total users
    growthPercent = allUsers?.length ? Math.round((lastWeekTotal / allUsers.length) * 100) : 0
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-[var(--color-text-light)] mb-6">Key Metrics</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mb-6">
        <AnalyticsCard title="Total Users" value={allUsers?.length}></AnalyticsCard>
        <AnalyticsCard title="Total Skills" value={allSkills?.length}></AnalyticsCard>
        <AnalyticsCard title="Total Skill Trades" value={allTrades?.length || 0}></AnalyticsCard>
        <AnalyticsCard title="Pending Skill Trades" value={pendingTrades}></AnalyticsCard>
      </div>
      {loadingAnalytics ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="rounded-lg border border-[var(--color-card-border)] p-6 w-full mb-6">
            <h3 className="text-2xl font-medium text-[var(--color-text-primary)] mb-4">
              Top 5 Most Requested Skills
            </h3>
            {mostRequestedSkills?.map((skill, i) => (
              <p
                key={i}
                className="inline capitalize text-2xl tracking-wide font-bold text-[var(--color-text-light)]"
              >
                {`${skill.skillName}${i < mostRequestedSkills.length - 1 ? ", " : ""}`}
              </p>
            ))}
          </div>
          <div className="rounded-lg border border-[var(--color-card-border)] p-6 w-full mb-6">
            <h3 className="text-2xl font-medium text-[var(--color-text-primary)] mb-4">
              Top 5 Most Common Skills
            </h3>
            {mostCommonSkills?.map((skill, i) => (
              <p
                key={i}
                className="inline capitalize text-2xl tracking-wide font-bold text-[var(--color-text-light)]"
              >
                {`${skill.skillName}${i < mostCommonSkills.length - 1 ? ", " : ""}`}
              </p>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-[var(--color-text-light)] mb-6">
            Analytics Overview
          </h1>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {chartData.length > 0 && (
              <Card className="rounded-lg border border-[var(--color-card-border)] p-6 w-full mb-6 bg-[var(--color-card-bg)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[var(--color-text-primary)]">
                    User Growth Over Time
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mt-2">
                    +{growthPercent}% this week
                  </div>
                  <div className="text-sm text-green-500 mt-1">
                    Last 7 Days <span className="font-semibold">+{lastWeekTotal} new users</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chartData}>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#bfae9e", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis hide domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{
                          background: "#222",
                          borderRadius: "8px",
                          color: "#fff",
                          border: "none",
                          fontSize: "14px",
                        }}
                        labelStyle={{ color: "#e79259" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="newUsers"
                        stroke="#bfae9e"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Skill Demand Pie Chart */}
            {Array.isArray(skillPercentages) && skillPercentages.length > 0 && (
              <Card className="rounded-lg border border-[var(--color-card-border)] p-6 w-full mb-6 bg-[var(--color-card-bg)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[var(--color-text-primary)]">
                    Skill Demand Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={skillPercentages}
                        dataKey="percentage"
                        nameKey="skillName"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={35}
                        fill="#bfae9e"
                        label={({ skillName }) => skillName}
                        labelLine={false}
                      >
                        {skillPercentages.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#e79259",
                                "#bfae9e",
                                "#f8e0b1",
                                "#d9c4b1",
                                "#bfae9e",
                                "#e79259",
                                "#f8e0b1",
                                "#d9c4b1",
                              ][index % 8]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          background: "#222",
                          borderRadius: "8px",
                          color: "#fff",
                          border: "none",
                          fontSize: "14px",
                        }}
                        labelStyle={{ color: "#e79259" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center mt-4 gap-2">
                    {skillPercentages.map((entry, idx) => (
                      <span
                        key={entry.skillName}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-light)]"
                      >
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#e79259",
                              "#bfae9e",
                              "#f8e0b1",
                              "#d9c4b1",
                              "#bfae9e",
                              "#e79259",
                              "#f8e0b1",
                              "#d9c4b1",
                            ][idx % 8],
                          }}
                        ></span>
                        {entry.skillName} ({entry.percentage}%)
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

             {/* Skill Categories Bar Chart */}
            {Array.isArray(mostRequestedCategories) && mostRequestedCategories.length > 0 && (
              <Card className="rounded-lg border border-[var(--color-card-border)] p-6 w-full mb-6 bg-[var(--color-card-bg)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-[var(--color-text-primary)]">
                    Skill Categories Demand
                  </CardTitle>
                  <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Number of requests per category
                  </div>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mostRequestedCategories}>
                      <XAxis
                        dataKey="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#bfae9e", fontSize: 10 }}
                        interval={0}
                        angle={-10}
                        dy={5}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#bfae9e", fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#222",
                          borderRadius: "8px",
                          color: "#fff",
                          border: "none",
                          fontSize: "14px",
                        }}
                        labelStyle={{ color: "#e79259" }}
                        formatter={(value, name) => [value, "Requests"]}
                      />
                      <Bar
                        dataKey="count"
                        fill="#e79259"
                        radius={[8, 8, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </>
  )
}
