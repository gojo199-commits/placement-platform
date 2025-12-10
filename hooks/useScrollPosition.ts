import { useEffect, useState } from 'react';

export default function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const updateScrollPosition = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', updateScrollPosition, { passive: true });
        updateScrollPosition();

        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, []);

    return scrollY;
}
