// import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { useState, useEffect } from "react"
import { FacesCanvas } from "./canvas"
import { technologies } from "../constants";
import { Canvas, useFrame } from '@react-three/fiber';
import { withRouter } from 'next/router';


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
    color: white,
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
    "text-align": "center",
    
  };

  const channelStyle = {
    position: "relative",
    top: "65vh",
    left: "10vh",
    "font-size": "25px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 10px black",
    "text-align": "center",
    color: "white"
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

  const descriptionStyleMobile = {
    color: "white",
    "font-size": "18px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  };

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

  const infopage = {
    position: "relative",
    top: "5vh",
    right: "3vh",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center",
    "flexWrap": 'wrap',
    color: "white"
  }
  //Amazon Info
  function link1() {
    setHovering(true);
    setExplanation("Guessing game using Amazon products, made with React, NextJS, and Puppeteer!")
  }
  //Channel Info
  function link2() {
    setHovering(true);
    setExplanation("My youtube channel! I make videos with fun vfx using Premiere Pro, After Effects, Blender, and much more!")
  }
  //Quotes
  function link3() {
    setHovering(true);
    setExplanation("Quote generator website, with a playful cat to keep you company! Made with JS, CSS, and Phaser3.")
  }
  //PF Tool
  function link4() {
    setHovering(true);
    setExplanation("Practice Fusion tool that converts patient lab information into an easy readable format for doctors. Made with JS and Tampermonkey")
  }
  const [isHovering, setHovering] = useState(false);
  const [explanationText, setExplanation] = useState("Hello");


  return (
    <div>
        <div className="flex flex-row flex-wrap justify-center" style={{height: 700}}>
        <FacesCanvas isHovering={isHovering}/>
        <div style={linksStyle}>
          <h1 style={isMobile ? mystyleMobile : mystyle}>My Projects</h1>
          <h1 style={isMobile ? descriptionStyleMobile : descriptionStyle}>To get started, have a look at my projects list! I'm even here to help you out!</h1>
          <a style={isMobile ? channelStyleMobile : channelStyle} onMouseEnter={() => link2()} onMouseLeave={() => setHovering(false)} href="https://www.youtube.com/channel/UCqJeGF-sSEy7IFYN1i80eJg">My Channel</a>
          <a style={isMobile ? amazonStyleMobile : amazonStyle} onMouseEnter={() => link1()} onMouseLeave={() => setHovering(false)} href="https://amazongame.herokuapp.com/singleGame">Guess the Amazon Price!</a>
          <a style={isMobile ? rogerDingWebMobile : rogerDingWeb} onMouseEnter={() => link3()} onMouseLeave={() => setHovering(false)} href="https://rogerdingdumbstuff.com/">Cats and Quotes</a>
          <a style={isMobile ? practiceFusionLinkMobile : practiceFusionLink} onMouseEnter={() => link4()} onMouseLeave={() => setHovering(false)} href="https://github.com/TechyChan/PracticeFusionTools">Practice Fusion tool!</a>
        </div>
        {isHovering && ( 
            <h1 style={infopage}>{explanationText}</h1>)}
        </div>
        
    </div>

    
  )
}

export default Experience