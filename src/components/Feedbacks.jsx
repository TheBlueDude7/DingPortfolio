import { React, useState, useEffect, useRef} from 'react'
import { BubblesCanvas } from "./canvas"
import { chickenSirenCanvas } from "./canvas"
import { styles } from '../styles';

const Feedbacks = ({scrollToSection}) => {
  const [channelStyleChange, setChannelStyle] = useState("channelStyle");
  const [midStyleChange, setMidStyle] = useState("middleStyle");
  const [rightStyleChange, setRightStyle] = useState("rightStyle");
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

  useEffect(() => {
      if(isMobile) {
        setChannelStyle("channelStyleMobile");
        setMidStyle("middleStyleMobile");
        setRightStyle("rightStyleMobile");
      } else {
        setChannelStyle("channelStyle");
        setMidStyle("middleStyle");
        setRightStyle("rightStyle");
      }
  }, [isMobile])

  const [hidden, setHidden] = useState(false);

  function hideText() {
    setHidden(true);
  }
  const myStyle = {
    height: "1000px"
  };

  const bigText = {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

  const channelStyleHide = {
    position: "absolute",
    top: "80vh",
    left: "-70vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
    visibility: "hidden"
  }

  //Second Text
  const middleStyle = {
    position: "absolute",
    top: "90vh",
    left: "0vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

  //Star text
  const rightStyle = {
    position: "absolute",
    top: "80vh",
    right: "-50vh",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

   //TextWhatOtherPeople
   const otherPeopleText = {
    position: "absolute",
    fontSize: "26px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center",
     color: "white"
  }


  //Mobile Formatting

  const bigTextMobile = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

  const otherPeopleTextMobile = {
    color: "white",
    position: "absolute",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

  const channelStyleMobile = {
    color: "white",
    position: "absolute",
    top: "80vh",
    left: "-70vh",
    fontSize: "10px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  }

  const feedbackRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 4) {
      feedbackRef.current.scrollIntoView();
    }
  }, [scrollToSection])

  return (

   
    <section className="relative w-full h-screen mx-auto" style={{height: 1000, scrollMarginTop: "10vh"}} ref={feedbackRef} >
      <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}}>
      <BubblesCanvas setHidden={hideText}/>
      <div className="absolute">
        <h1 style={isMobile ? bigTextMobile : bigText}>Feedback</h1>
        <h1 style={isMobile ? otherPeopleTextMobile : otherPeopleText}>Well, uh, don't just take my word for it! Click on a smiley to hear some feedback!</h1>
        <h1 className={hidden ? "hiddenText" : channelStyleChange}>Roger did great work with my website! - Leanza Liu</h1>
        <h1 className={hidden ? "hiddenText" : midStyleChange} >Roger? He's amazing, and efficient! - David Ding</h1>
        <h1 className={hidden ? "hiddenText" : rightStyleChange} >⭐⭐⭐⭐⭐! - Brandon West</h1>
       
       
      </div>
      </div>
    </section>
      
      
  )
}

export default Feedbacks