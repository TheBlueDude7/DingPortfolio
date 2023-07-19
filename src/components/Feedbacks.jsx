import React, { useEffect, useState } from 'react'
import { ChickenCarCanvas } from "./canvas"
 
const Feedbacks = () => {
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
    "font-size": "60px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const EarthStyle = {
    position: "absolute"
  }

  const ipStyle = {
    color: "white",
    "font-size": "30px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    top: "480px",
    position: "absolute",
    left: "760px"
  }

  const descriptionStyle = {
    color: "white",
    "font-size": "20px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  //Mobile Formatting

  const mystyleMobile = {
    color: "white",
    "font-size": "40px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
    "text-align": "center"
  };

  const descriptionStyleMobile = {
    color: "white",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "10px 2px 9px black",
    "text-align": "center"
  }

  const ipStyleMobile = {
    color: "white",
    "font-size": "15px",
    "font-weight": "bold",
    "text-shadow": "4px 4px 5px black",
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

  return (
    <div>
        <div className="flex flex-row flex-wrap justify-center" style={{height: 1000}}>
        <ChickenCarCanvas/>
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

export default Feedbacks