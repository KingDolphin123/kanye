import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Home.css";
import kanye1 from "../css/1.png"
import kanye2 from "../css/2.png"
import kanye3 from "../css/3.png"
import kanye4 from "../css/4.png"
// import firestore from '../firebase'
// import {collection, getDocs, addDoc} from 'firebase/firestore/lite'


const Home = () => {
    const [quote, setquote] = useState('');
    const [updater, setupdater] = useState(false);
    const [container, setcontainer] = useState('container');
    const [kanye, setkanye] = useState('kanye');
    const [quotecol, setquotecol] = useState('quote');
    const [create, setcreate] = useState('create');
    const [ld, setld] = useState('lightdark');
    const [recquote, setrecquote] = useState('');
    const [recquoteld, setrecquoteld] = useState('recquote')
    // const [reload, setreload] = useState(false);
    const [quotearr, setquotearr] = useState([]);

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
            // const docRef = addDoc(collection(firestore, "Kanye"), {
            //     quote: quote
            //   }).then(()=>{setreload(!reload)});
        }
        else {
            setquote(quote.concat("."))
            setquotearr(quotearr => [...quotearr,quote.concat(".")]);            
            // const docRef = addDoc(collection(firestore, "Kanye"), {
            //     quote: quote
            //   }).then(()=>{setreload(!reload)});
        }
        setrecquote(quotearr[quotearr.length-1])
    }
    // useEffect(()=>{
    //     let quottes = collection(firestore, "Kanye");
    //     getDocs(quottes).then(snapshot => {
    //     //snapshot is an array of all the documents in the tweets
    //     let tempquotes = []
    //     snapshot.forEach(document => {
    //         tempquotes.push(document.data());
    //     });
    //     setrecquote(tempquotes[0].quote);
    //     });
    // },[reload])
    const lightdark = () => {
        if (!updater){
            setcontainer('container darkcontainer');
            setkanye('kanye darkkanye');
            setquotecol('quote darkquote');
            setcreate('create darkcreate')
            setld('lightdark lightdark2')
            setrecquoteld('recquote d')
            setupdater(!updater);
        }
        if (updater){
            setcontainer('container');
            setkanye('kanye');
            setquotecol('quote');
            setcreate('create')
            setld('lightdark')
            setrecquoteld('recquote')
            setupdater(!updater);
        }
    }
    return (
        <div className={container}> 
            <div className='withbutton'>
                <p className={kanye}>Kanye West  Quotes</p>
                <div className='quoteflex'>
                    <p className={quotecol}>{quote}</p>
                </div>
            </div>
            <img className = 'kanyepic one' src={kanye1} alt='kanye1'/>
            <img className = 'kanyepic two' src={kanye2} alt='kanye2'/>
            <img className = 'kanyepic three' src={kanye3} alt='kanye3'/>
            <img className = 'kanyepic four' src={kanye4} alt='kanye4'/>
            <button onClick={newquote} className={create}>new quote</button>
            <button onClick={lightdark} className={ld}></button>
            <p className ={recquoteld}>Recent quote: {recquote}</p>
        </div>

    )
}

export default Home;