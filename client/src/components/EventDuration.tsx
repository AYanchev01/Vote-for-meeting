import React, { useState } from 'react';
import "./EventDuration.css"

interface DurationProps {
    onSelectDuration: (duration: number | 'all-day' | 'custom') => void;
    onCustomDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customDuration: number;
}

const EventDuration: React.FC<DurationProps> = ({ onSelectDuration, onCustomDurationChange, customDuration }) => {
    const [selectedDuration, setSelectedDuration] = useState<number | 'all-day' | 'custom' | null>(null);

    const handleDurationSelection = (duration: number | 'all-day' | 'custom') => {
        setSelectedDuration(duration);
        onSelectDuration(duration);
    };

    return (
        <div>
            <h2>Duration:</h2>
            <div className='event-duration-options'>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value={15}
                        checked={selectedDuration === 15}
                        onChange={() => handleDurationSelection(15)}
                    />
                    15 minutes
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value={30}
                        checked={selectedDuration === 30}
                        onChange={() => handleDurationSelection(30)}
                    />
                    30 minutes
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value={60}
                        checked={selectedDuration === 60}
                        onChange={() => handleDurationSelection(60)}
                    />
                    60 minutes
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value="all-day"
                        checked={selectedDuration === 'all-day'}
                        onChange={() => handleDurationSelection('all-day')}
                    />
                    All Day
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value="custom"
                        checked={selectedDuration === 'custom'}
                        onChange={() => handleDurationSelection('custom')}
                    />
                    Custom
                </label>
                {selectedDuration === 'custom' && (
                    <>
                        <input
                            type="number"
                            value={customDuration}
                            onChange={onCustomDurationChange}
                            placeholder="Enter custom duration"
                        />
                        <span>minutes</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventDuration;
