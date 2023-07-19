import { motion } from 'framer-motion';
import { styles } from "../styles";
import { useState, useEffect } from "react"
import { ChickensCanvas } from "./canvas"
import { EarthCanvas } from "./canvas"
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'



const Tech = () => {
  
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
    "font-size": "60px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const descriptionStyle = {
    color: "white",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  };

  const lowerTextStyle = {
    position: "absolute",
    marginTop: "900px"
  }

  const textStyle = {
    color: "white",
    "text-align": "center"
  }


  //Mobile Styles

  const myStyleMobile = {
    color: "white",
    "font-size": "40px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const descriptionStyleMobile = {
    color: "white",
    "font-size": "16px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  };


  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}}>
      <ChickensCanvas />
      <EarthCanvas />
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