import React, {useEffect, useState} from 'react'

const UpButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 0) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <a href='#'>
            <button className={(showButton) ?'up-button ' :''}>
                <i className="fa fa-arrow-up fa-lg fa-inverse" ></i>
            </button>
        </a>
    )
}

export default UpButton