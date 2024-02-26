// src/hooks/useClickOutsideToggle.js

import { useEffect, useRef, useState } from 'react';

// Custom hook to handle toggling based on clicks outside a specified ref
const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        // Add event listener for clicks outside the specified ref
        document.addEventListener('mouseup', handleClickOutside);

        // Clean up event listener when the component unmounts
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [ref]);

    // Provide state and functions for handling toggle
    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
