import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

const AnimatedCounter = ({ value, label, unit }) => {
    const ref = useRef(null);
   
    const inView = useInView(ref, { once: true, amount: 0.5 }); 

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 15,
        stiffness: 100,
        restDelta: 0.001
    });

    const displayValue = useTransform(springValue, (current) => {
        const formatted = Math.round(current).toLocaleString();
        return `${formatted}${unit ? unit : ''}${label.includes('+') ? '+' : ''}`;
    });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, motionValue, value]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <motion.span 
                className=" text-shadow-[#68482f91] text-4xl sm:text-5xl md:text-6xl font-bold font-inter"
            >
                {displayValue}
            </motion.span>
            <p className=" dark:text-[var(--color-text-secondary)] text-[var(--color-text-primary)] text-lg sm:text-xl font-light font-inter mt-2 opacity-80">
                {label.replace('+', '').trim()}
            </p>
        </div>
    );
};
export default AnimatedCounter;