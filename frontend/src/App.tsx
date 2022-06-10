import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourState, minuteState } from './atoms';

function App() {
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const [hours, setHours] = useRecoilState(hourState);
    const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    };
    const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);
    };
    console.log(hours);
    return (
        <div>
            <input
                type='number'
                placeholder='Minutes'
                value={minutes}
                onChange={onMinuteChange}
            />
            <input
                type='number'
                placeholder='Hours'
                value={hours}
                onChange={onHourChange}
            />
        </div>
    );
}

export default App;
