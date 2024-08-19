import { useState, useEffect } from 'react';
import { TypewriterProps } from './types.ts';

const Typewriter = ({ texts, delay }: TypewriterProps) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (currentIndex < texts[textIndex].length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + texts[textIndex][currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
        } else {
            timeout = setTimeout(() => {
                setCurrentIndex(0);
                setCurrentText('');
                setTextIndex((prevTextIndex) => (prevTextIndex + 1) % texts.length);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, texts, textIndex]);

    return <span style={{borderRight: "1px solid white"}}>{currentText}</span>;
};

export default Typewriter;
