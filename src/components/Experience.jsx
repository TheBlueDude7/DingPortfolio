// import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { useState, useEffect } from "react"
import { FacesCanvas } from "./canvas"
import { technologies } from "../constants";
import { Canvas, useFrame } from '@react-three/fiber';


const Experience = () => {
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

  const amazonStyle = {
    position: "relative",
    top: "30vh",
    left: "-20vh",
    color: "white",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  const rogerDingWeb = {
    position: "relative",
    top: "30vh",
    right: "-35vh",
    color: "white",
    "font-size": "25px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  const practiceFusionLink = {
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    position: "relative",
    top: "65vh",
    right: "-2vw" 

  }

  const mystyle = {
    color: "white",
    "font-size": "60px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const descriptionStyle = {
    color: "white",
    "font-size": "25px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  };

  const channelStyle = {
    position: "relative",
    top: "65vh",
    left: "10vh",
    "font-size": "25px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 10px black",
    "text-align": "center"
  }

  const linksStyle = {
    position: "absolute"
  }

  //Mobile Formatting
  const amazonStyleMobile = {
    position: "absolute",
    top: "40vh",
    left: "1vh",
    color: "white",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  const rogerDingWebMobile = {
    position: "absolute",
    top: "40vh",
    right: "7vh",
    color: "white",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  
  const mystyleMobile = {
    color: "white",
    "font-size": "40px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const channelStyleMobile = {
    position: "absolute",
    top: "80vh",
    left: "3vh",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 10px black",
    "text-align": "center"
  }

  
  const practiceFusionLinkMobile = {
    position: "absolute",
    top: "80vh",
    right: "3vh",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"

  }


  const [isHovering, setHovering] = useState(false);
  return (
    <div>
        <div className="flex flex-row flex-wrap justify-center" style={{height: 700}}>
        <FacesCanvas isHovering={isHovering}/>
        <div style={linksStyle}>
          <h1 style={isMobile ? mystyleMobile : mystyle}>My Projects</h1>
          <h1 style={descriptionStyle}>To get started, check out my other projects! I'm even here to help you out!</h1>
          <a style={isMobile ? channelStyleMobile : channelStyle} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://www.youtube.com/channel/UCqJeGF-sSEy7IFYN1i80eJg">My Channel</a>
          <a style={isMobile ? amazonStyleMobile : amazonStyle} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://amazongame.herokuapp.com/singleGame">Guess the Amazon Price!</a>
          <a style={isMobile ? rogerDingWebMobile : rogerDingWeb} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://rogerdingdumbstuff.com/">Cats and Quotes</a>
          <a style={isMobile ? practiceFusionLinkMobile : practiceFusionLink} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://github.com/TechyChan/PracticeFusionTools">Practice Fusion tool!</a>
        </div>
        </div>
        
    </div>

    
  )
}

export default Experience