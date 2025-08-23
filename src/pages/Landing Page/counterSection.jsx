import AnimatedCounter from "./AnimatedCounter";
import img from "../../assets/images/bg_banner1.jpg";
import { useTranslation } from "react-i18next";

const CounterSection = () => {
  const { t } = useTranslation();

  const stats = [
    { id: 1, value: 50000, label: "stats.activeUsers", unit: "K+", location: "stats.location.global" },
    { id: 2, value: 100000, label: "stats.skillsTraded", unit: "K+", location: "stats.location.worldwide" },
    { id: 3, value: 200, label: "stats.countries", unit: "+", location: "stats.location.acrossWorld" },
    { id: 4, value: 5000, label: "stats.verifiedInstructors", unit: "+", location: "stats.location.regions" },
  ];

  return (
    <div className="flex items-center justify-center dark:bg-transparent font-inter p-4 mt-5">
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center dark:opacity-10 opacity-35"
          style={{ backgroundImage: `url(${img})` }}
        ></div>

        <div className="relative z-10 py-16 sm:py-24 px-8 sm:px-16 flex flex-col md:flex-row justify-around items-center space-y-12 md:space-y-0 md:space-x-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <AnimatedCounter
                value={stat.value}
                label={t(stat.label)}
                unit={stat.unit}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {t(stat.location)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
