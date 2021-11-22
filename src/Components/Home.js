import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Home.css";
import kanye1 from "../css/1.png"
import kanye2 from "../css/2.png"
import kanye3 from "../css/3.png"
import kanye4 from "../css/4.png"

const Home = () => {
    const [quote, setquote] = useState('');
    const [updater, setupdater] = useState(false);
    const [recquote, setrecquote] = useState('');
    const [quotearr, setquotearr] = useState([]);
    const dmobject = {
        container: `container ${(updater? 'darkcontainer': "")}`,
        kanye: `kanye ${(updater? 'darkkanye': "")}`,
        quotecol: `quote ${(updater? 'darkquote': "")}`,
        create: `create ${(updater? 'darkcreate': "")}`,
        ld: `lightdark ${(updater? 'lightdark2': "")}`,
        recquoteld: `recquote ${(updater? 'd': "")}`
    }
    useEffect(() => {
        newquote();
    }, [])
    const newquote = () => { 
        axios.get('https://api.kanye.rest/').then(response => editquote(response.data.quote))
    }
    const editquote = (quote) => {
        if (quote.endsWith("!") || quote.endsWith("?") || quote.endsWith('.')) {
            setquote(quote)
            setquotearr(quotearr => [...quotearr,quote]);
        }
        else {
            setquote(quote.concat("."))
            setquotearr(quotearr => [...quotearr,quote.concat(".")]);            
        }
        setrecquote(quotearr[quotearr.length-1])
    }

    return (
        <div className={dmobject.container}> 
            <div className='withbutton'>
                <p className={dmobject.kanye}>Kanye West  Quotes</p>
                <div className='quoteflex'>
                    <p className={dmobject.quotecol}>{quote}</p>
                </div>
            </div>
            <img className = 'kanyepic one' src={kanye1} alt='kanye1'/>
            <img className = 'kanyepic two' src={kanye2} alt='kanye2'/>
            <img className = 'kanyepic three' src={kanye3} alt='kanye3'/>
            <img className = 'kanyepic four' src={kanye4} alt='kanye4'/>
            <button onClick={newquote} className={dmobject.create}>new quote</button>
            <button onClick={() => {setupdater(!updater)}} className={dmobject.ld}></button>
            <p className ={dmobject.recquoteld}>Recent quote: {recquote}</p>
        </div>

    )
}

export default Home;