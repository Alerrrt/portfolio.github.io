
import React from 'react';
import { motion } from 'motion/react';

const ThemeToggle = ({ toggled, onToggle }) => {
    return (
        <div
            className="cursor-pointer relative"
            onClick={onToggle}
            style={{
                width: 44,
                height: 24,
                borderRadius: 500,
                // Using a simpler approach: toggled ? orange : gray
                backgroundColor: toggled ? 'rgb(255, 97, 26)' : 'rgb(238, 238, 238)',
                transition: 'background-color 0.3s ease'
            }}
        >
            <motion.div
                className="absolute top-1/2"
                initial={false}
                animate={{
                    x: toggled ? 22 : 2, // 2px padding on left, 44-20-2 = 22px on right
                    y: "-50%"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #E3E3E3 100%)',
                    boxShadow: `
                        0px 0.8px 1.1px -0.625px rgba(0, 0, 0, 0.26),
                        0px 2.1px 2.9px -1.25px rgba(0, 0, 0, 0.25),
                        0px 4.2px 5.9px -1.875px rgba(0, 0, 0, 0.243),
                        0px 8px 11.2px -2.5px rgba(0, 0, 0, 0.224),
                        0px 15.9px 22.3px -3.125px rgba(0, 0, 0, 0.184),
                        0px 35px 49px -3.75px rgba(0, 0, 0, 0.086)
                    `
                }}
            >
                {/* Inner knob visual detail from Variant 2 if I want to be 100% precise, 
                    but the screenshot shows a clean knob. The instructions asked to follow existing styles. 
                    The extracted styles had a second div inside the knob. 
                    Let's stick to the main knob for now as it matches the "clean" aesthetic and the screenshot. 
                */}
            </motion.div>
        </div>
    );
};

export default ThemeToggle;
