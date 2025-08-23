import AnimatedCounter from "./AnimatedCounter";
import img from "../../assets/images/bg_banner1.jpg";

const CounterSection = () => {
    const stats = [
        { id: 1, value: 50000, label: 'Active Users', unit: 'K+' },
        { id: 2, value: 100000, label: 'Skills Traded', unit: 'K+' },
        { id: 3, value: 200, label: 'Countries', unit: '+' },
        { id: 4, value: 5000, label: 'Verified Instructors', unit: '+' },
    ];

    return (
        <div className="flex items-center justify-center   dark:bg-transparent font-inter p-4 mt-5">
            <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <div 
                    className="absolute inset-0 bg-cover bg-center dark:opacity-10 opacity-35"
                    style={{ backgroundImage: `url(${img})` }}
                ></div>
                
                <div className="relative z-10 py-16 sm:py-24 px-8 sm:px-16 flex flex-col md:flex-row justify-around items-center space-y-12 md:space-y-0 md:space-x-8">
                    {stats.map(stat => (
                        <AnimatedCounter 
                            key={stat.id} 
                            value={stat.value} 
                            label={stat.label}
                            unit={stat.unit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CounterSection;