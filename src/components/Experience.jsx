// import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { useState, useEffect, useRef} from "react"
import { FacesCanvas } from "./canvas"
import { technologies } from "../constants";
import { Canvas, useFrame } from '@react-three/fiber';
import { withRouter } from 'next/router';


const Experience = ({scrollToSection}) => {
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
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  const rogerDingWeb = {
    position: "relative",
    top: "30vh",
    right: "-35vh",
    color: "white",
    fontSize: "25px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  const practiceFusionLink = {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    position: "relative",
    top: "65vh",
    right: "-3vw" 

  }

  const mystyle = {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
   textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  const descriptionStyle = {
    color: "white",
    fontSize: "25px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    textAlign: "center",
    
  };

  const channelStyle = {
    position: "relative",
    top: "65vh",
    left: "8vh",
    fontSize: "25px",
    fontWeight: "bold",
   textShadow: "10px 2px 10px black",
    textAlign: "center",
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
    fontSize: "15px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    textAlign: "center",
    color: "white"
  }

  const descriptionStyleMobile = {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  };

  const rogerDingWebMobile = {
    color: "white",
    position: "absolute",
    top: "40vh",
    right: "1vh",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  
  const mystyleMobile = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
  };

  const channelStyleMobile = {
    color: "white",
    position: "absolute",
    top: "80vh",
    left: "1vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "10px 2px 10px black",
    textAlign: "center"
  }

  
  const practiceFusionLinkMobile = {
    color: "white",
    position: "absolute",
    top: "80vh",
    right: "1vh",
    fontSize: "15px",
    fontWeight: "bold",
   textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  const infopage = {
    position: "relative",
    top: "20vh",
    right: "3vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center",
    flexWrap: 'wrap',
    color: "white"
  }

  const infopageMobile = {
    position: "relative",
    top: "20vh",
    right: "0vh",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center",
    flexWrap: 'wrap',
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

  const experienceRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 1) {
      experienceRef.current.scrollIntoView({block: "nearest"});
    }
  }, [scrollToSection])
  return (
    <div ref={experienceRef} style={{scrollMarginTop: "10vh"}}>
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
            <h1 style={isMobile ? infopageMobile : infopage}>{explanationText}</h1>)}
        </div>
        
    </div>

    
  )
}

export default Experience