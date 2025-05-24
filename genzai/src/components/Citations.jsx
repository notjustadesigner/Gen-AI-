import { useEffect, useState } from 'react';
import './citations.css';
import "../app.css";


function Citations({ data }) {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            const learning = data
                .map(row => row["Describe one, if any, specific way you used AI to help with your learning."])
                .filter(val => val && val.trim().length > 10);

            const concerns = data
                .map(row => row["What concerns, if any, do you have about using AI for your education?"])
                .filter(val => val && val.trim().length > 10);

            // Combine and shuffle
            const allQuotes = [...learning, ...concerns];
            const shuffled = allQuotes
                .map(q => ({ q, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ q }) => q);

            setQuotes(shuffled.slice(0, 50));
        }
    }, [data]);

    return (
        <>
            <div className='tag'>Students are saying...</div>
            <div className="scrolling-container">
                <div className="scrolling-track">
                    {[...quotes, ...quotes].map((quote, index) => (
                        <div className="quote" key={index}>
                            <img
                                src="/“.svg"
                                alt="Quote mark"
                                style={{ width: "1.5em", marginBottom: "0.3em", display: "block", marginLeft: "auto", marginRight: "auto" }}
                            />
                            {quote.trim()}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Citations;
