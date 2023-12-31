import React, {useState, useEffect, useRef} from 'react'
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { CamerasCanvas } from './canvas';
const Hero = ({setLoading, noShow, scrollToSection}) => {
  const [isMobile, setMobile] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 0) {
      heroRef.current.scrollIntoView();
    }
  }, [scrollToSection])

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
  // className="relative w-full h-screen mx-auto" 
  return (
    <section className="relative w-full h-screen mx-auto" ref={heroRef}>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]"/>
          <div className="w-1 sm:h-80 h-40 violet-gradient"/>
        </div>
        <div>
          <h1 className={isMobile ? "mainTextStyleMobile" : "mainTextStyle"}> Hi there! <span className="text-[#915eff]"></span></h1>
          <h2 className={"secondaryTextStyle"}>Welcome to my digital portfolio!</h2>  
          <p1></p1>
        </div>
      </div>
      <CamerasCanvas setLoading={setLoading}/>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a
        href="#about"
        >
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.dev
              animate={{
                y: [0, 24, 0]
              }} 
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1" 
              />
            </div>
        </a>
      </div>
      
    </section>
  )
}

export default Hero