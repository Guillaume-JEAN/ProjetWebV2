import React from "react";

import './GetQuotes.css';


function GetQuote() {
    const [data, setData] = React.useState(null);
    async function updateQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const { statusCode, statusMessage, ...data } = await response.json();
            if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
            setData(data);
        } catch (error) {
            console.error(error);
            setData({ content: "Opps... Something went wrong" });
        }
    }

    React.useEffect(() => {
        updateQuote();
    }, []);

    if (!data) return null;


    return (
        <div className="GetQuote">
            <div style={{ width: "90%", maxWidth: "40rem" }}>

                    <blockquote className="blockquote mb-0">
                        <p>{data.content}</p>
                        {data.author && (
                            <footer className="blockquote-footer">
                                <cite title="Source Title">{data.author}</cite>
                            </footer>
                        )}
                    </blockquote>


                    <button variant="primary" onClick={updateQuote}>
                        New Quote
                    </button>

            </div>
        </div>
    );

}
export default GetQuote
