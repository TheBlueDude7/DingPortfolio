
import { styles } from "../styles";
import { React, useState, useEffect } from "react"
import { HistoryCanvas } from "./canvas"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Contact = () => {
  const mystyle = {
    color: "white",
    "font-size": "60px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  //Second Text
  const middleStyle = {
    position: "absolute",
    top: "15vh",
    left: "0vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }
   //Third Text
   const secondStyle = {
    position: "absolute",
    top: "30vh",
    left: "0vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  }

   //Fourth Text
   const thirdStyle = {
    position: "absolute",
    top: "45vh",
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
    position: "absolute",
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


  return (
    <div style={{height: 1000}}> 
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}}>
        <div className="absolute">
          <h1 style={isMobile ? mystyleMobile : mystyle}>About Me</h1>
          <h1 style={isMobile ? middleStyleMobile : middleStyle}>My name is Roger Ding, I'm a student at UW Madison.</h1>
          <h1 style={isMobile ? secondStyleMobile : secondStyle}>I'm currently studying Computer Science and Film!</h1>
          <h1 style={isMobile ? thirdStyleMobile : thirdStyle}>Thanks for stopping by!</h1>
        </div>
        <HistoryCanvas />
      </div>  
    </div>

  )
}

export default Contact