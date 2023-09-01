import { motion } from 'framer-motion';
import { styles } from "../styles";
import { useState, useEffect, useRef } from "react"
import { ChickensCanvas } from "./canvas"
import { EarthCanvas } from "./canvas"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'



const Tech = ({scrollToSection}) => {
  
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

  const mystyle = {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  const descriptionStyle = {
    color: "white",
   fontSize: "20px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  };

  const lowerTextStyle = {
    position: "absolute",
    marginTop: "900px"
  }

  const textStyle = {
    color: "white",
    textAlign: "center"
  }


  //Mobile Styles

  const myStyleMobile = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  const descriptionStyleMobile = {
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  };

  const techRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 3) {
      techRef.current.scrollIntoView();
    }
  }, [scrollToSection])

  return (
    <div ref={techRef} style={{scrollMarginTop: "10vh"}}>
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}}>
      <ChickensCanvas />
      <div className="absolute">
        <h1 style={isMobile ? myStyleMobile : mystyle}>Skills</h1>
        <h1 style={isMobile ? descriptionStyleMobile : descriptionStyle}>Check out below to see the languages and software I know! Hover over each orb to learn - wait, what? Oh...</h1>
      </div>
      <div style={lowerTextStyle}>
        <h1 style={isMobile ? descriptionStyleMobile : descriptionStyle}>Sorry about that, these feathery fellas are an amazing help... but - that happens sometimes, I don't think we're getting those back.</h1>
      </div>
    </div>
    </div>
  )
}

export default Tech