
import { styles } from "../styles";
import { React, useState, useEffect, useRef } from "react"
import { HistoryCanvas } from "./canvas"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import ReactAudioPlayer from 'react-audio-player';
import { useInView } from 'react-intersection-observer';


const About = () => {
  const mystyle = {
    color: "white",
    "font-size": "60px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  //Second Text
  const middleStyle = {
    position: "relative",
    top: "3vh",
    left: "0vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }
   //Third Text
   const secondStyle = {
    position: "relative",
    top: "6vh",
    left: "0vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }

   //Fourth Text
   const thirdStyle = {
    position: "relative",
    top: "9vh",
    left: "2.5vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }

  //Mobile Styles

  const mystyleMobile = {
    color: "white",
    "font-size": "40px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  //Second Text
  const middleStyleMobile = {
    position: "relative",
    top: "10vh",
    left: "0.5vh",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }

  //Third Text
  const secondStyleMobile = {
    position: "absolute",
    top: "20vh",
    left: "0.5vh",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }

  //Routh Text
  const thirdStyleMobile = {
    position: "absolute",
    top: "30vh",
    left: "0.5vh",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
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

  const [ viewRef, inView, entry] = useInView({
    threshold: 0.1
  });

  const [ middleViewRef, inMiddleView] = useInView({
    threshold: 0.2
  });

  const [volumeVal, setVolume] = useState(0.1);
  const [workingRadio, setWorking] = useState(true);
  const [beatText, setBeatText] = useState("Thanks for stopping by! We got some nice beats for ya!");
  const [topText, setTopText] = useState("I'm currently studying Computer Science and Film!");
  useEffect(() => {
    if(workingRadio) {
      if(inView) {
        setVolume(0.1);
        
      } else {
        setVolume(0);
      }
    } else {
      setVolume(0);
    }
     
  }, [inView])

  let audioRef = useRef();

  function stopAudio() {
    setVolume(0); 
    setWorking(false);
    setBeatText("Why would you do that? So uncool.")
    setTopText("MY BOOMBOX!")
  }

  return (
    <div ref={viewRef} style={{height: 1000}} inView={inView}>  
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}} > 
        <div className="absolute">
          <h1 style={isMobile ? mystyleMobile : mystyle}>About Me</h1>
          <h1 style={isMobile ? middleStyleMobile : middleStyle}>My name is Roger Ding, I'm a student at UW Madison.</h1>
          <h1 style={isMobile ? secondStyleMobile : secondStyle}>{topText}</h1>
          <h1 style={isMobile ? thirdStyleMobile : thirdStyle}>{beatText}</h1>
        </div>
        <HistoryCanvas stopAudio={stopAudio}/>
      </div> 
      <ReactAudioPlayer ref={audioRef} loop={true} src="/audio/heavenSound.mp3" autoPlay volume={volumeVal}/>
    </div>

  )
}

//inView && 
export default About