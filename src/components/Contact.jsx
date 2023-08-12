import React, { useEffect, useState, useRef} from 'react'
import { ChickenCarCanvas } from "./canvas"
 
const Contact = ({setLoading, scrollToSection}) => {
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


  const [ipAddress, setIPAddress] = useState('')
  const [location, setLocation] = useState('')
  const mystyle = {
    color: "white",
    fontSize: "60px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  const EarthStyle = {
    position: "absolute"
  }

  const ipStyle = {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    top: "480px",
    position: "absolute",
    left: "760px"
  }

  const descriptionStyle = {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  //Mobile Formatting

  const mystyleMobile = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    textAlign: "center"
  };

  const descriptionStyleMobile = {
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "10px 2px 9px black",
    textAlign: "center"
  }

  const ipStyleMobile = {
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    textShadow: "4px 4px 5px black",
    top: "520px",
    position: "absolute",
    left: "250px"
  }


  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))

    fetch('https://api.iplocation.net/?ip=' + ipAddress)
      .then(response => response.json())
      .then(data => setLocation(data.country_name))
      .catch(error => console.log(error))
  }, []);

  const contactRef = useRef(null);

  useEffect(() => { 
    if(scrollToSection == 5) {
      contactRef.current.scrollIntoView();
    }
  }, [scrollToSection])

  return (
    <div ref={contactRef}>
        <div className="flex flex-row flex-wrap justify-center" style={{height:"1000px"}}>
        <ChickenCarCanvas setLoading={setLoading}/>
        <div className="absolute">
          <h1 style={isMobile ? mystyleMobile : mystyle}> Contact Me</h1>
          <h1 style={isMobile ? descriptionStyleMobile : descriptionStyle}> You can find me at rogerliuding@gmail.com!</h1>
          <h1 style={isMobile ? descriptionStyleMobile : descriptionStyle}>Don't worry though, I can just contact you too!</h1>
          <h1 style={isMobile ? ipStyleMobile : ipStyle}>{ipAddress} {location}</h1>
        </div>
      </div>
    </div>
  )
}

export default Contact