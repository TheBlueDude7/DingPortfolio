
import { styles } from "../styles";
import { React, useState, useEffect, useRef } from "react"
import { HistoryCanvas } from "./canvas"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import ReactAudioPlayer from 'react-audio-player';
import { useInView } from 'react-intersection-observer';



const About = ({scrollToSection}) => {
  const mystyle = {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
  };

  //Second Text
  const middleStyle = {
    position: "relative",
    top: "3vh",
    left: "0vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }
   //Third Text
   const secondStyle = {
    position: "relative",
    top: "6vh",
    left: "0vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }

   //Fourth Text
   const thirdStyle = {
    position: "relative",
    top: "9vh",
    left: "2.5vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }

  const fourthStyle = {
    position: "relative",
    top: "80vh",
    left: "2.5vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }


  //Mobile Styles

  const mystyleMobile = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  //Second Text
  const middleStyleMobile = {
    position: "relative",
    top: "8vh",
    left: "0vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }

  //Third Text
  const secondStyleMobile = {
    position: "relative",
    top: "12vh",
    left: "0vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }

  //Routh Text
  const thirdStyleMobile = {
    position: "relative",
    top: "80vh",
    left: "0vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    color: "white"
  }

  //
  const fourthStyleMobile = {
    position: "relative",
    top: "80vh",
    left: "2.5vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
     color: "white"
  }

  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setMobile(event.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  const [volumeVal, setVolume] = useState(0.1);
  const [workingRadio, setWorking] = useState(true);
  const [beatText, setBeatText] = useState("We got some nice beats for ya! (If there's nothing playing, gently touch the boombox).");
  const [topText, setTopText] = useState("I'm currently studying Computer Science and Film!");

  let audioRef = useRef();

  function stopAudio() {
    boomboxStop.play();
    setBeatText("Why would you do that? So uncool.")
    setTopText("MY BOOMBOX! I SAID GENTLY!")
  }

  let boomboxStop = new Audio('/audio/nomoreboombox.mp3');

  boomboxStop.volume = 0.5;

  const aboutRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 2) {
      aboutRef.current.scrollIntoView();
    }
  }, [scrollToSection])

  return (
    <div ref={aboutRef} style={{height: 1000, scrollMarginTop: "10vh"}}>  
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}} > 
        <div className="absolute">
          <h1 style={isMobile ? mystyleMobile : mystyle}>About Me</h1>
          <h1 style={isMobile ? middleStyleMobile : middleStyle}>My name is Roger Ding, I'm a student at UW Madison.</h1>
          <h1 style={isMobile ? secondStyleMobile : secondStyle}>{topText}</h1>
          <h1 style={isMobile ? thirdStyleMobile : thirdStyle}>{beatText}</h1>
          {/* <h1 style={isMobile ? fourthStyleMobile : fourthStyle}> (Song is "If Heaven was a Sound" by Hotel Apache) </h1> */}
        </div>
        <HistoryCanvas stopAudio={stopAudio}/>
      </div> 
    </div>

  )
}

//inView && 
export default About