import React, { useState, useEffect, useRef } from 'react';
import TimerIcon from '@material-ui/icons/Timer';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [timeout, settimeout] = useState(false);
    const prevTime = usePrevious({ seconds, minutes });

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(true);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        let interval = null;
        if (isActive && !props.pause) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds == 59 ? 0 : seconds + 1);
            }, 1000);

        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
        if (seconds == 59) {
            setMinutes( minutes => minutes + 1);
        }
    }, [isActive, seconds]);

    useEffect(() => {
        if (minutes == 59) {
            setIsActive(false);
            settimeout(true);
        }
    }, [isActive, minutes])

    return (
        <div className="timer">
            <h3 className="time">
                <TimerIcon style={{ paddingRight: '5px' }} /> {timeout ? <span className="oot"> You're out of time.</span> : <span>{minutes}  : {seconds}</span>}
            </h3>
        </div>
    );
};

export default Timer;