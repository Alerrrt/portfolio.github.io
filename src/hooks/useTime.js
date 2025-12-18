import { useState, useEffect } from 'react';

const useTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeInfo = (timeZone) => {
        const options = { timeZone, hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(time);
        // Get 24h hour for day/night logic
        const hour24 = parseInt(new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hour12: false }).format(time), 10);
        const isDay = hour24 >= 6 && hour24 < 18;
        return { timeString, isDay };
    };

    return { time, getTimeInfo };
};

export default useTime;
