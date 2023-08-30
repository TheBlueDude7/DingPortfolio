import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, RenderInView} from '@/components';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei'
import { createContext, useContext, useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import ReactGA from 'react-ga';
import Script from 'next/script'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";


export const LoadingContext = createContext(false); 

export default function DynamicCanvas() {
  const sections = [About, Tech, Feedbacks, Contact];
  const backgrounds = ["bg-great-pattern", "bg-chicken-pattern", "bg-about-pattern", "bg-ip-pattern"];
  const [finishedLoading, setLoading] = useState(false);
  const [displayItems, setDisplay] = useState(false);
  const [loadingStatuses, setStatuses] = useState([true, ...Array(sections.length - 1).fill(false)]);
  const [noShow, setNoShow] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);
  const [conWidth, setWidth] = useState(window.innerWidth);
  const [conHeight, setHeight] = useState(window.innerHeight);
  const [mountLoading, setMountLoading] = useState(true);
  //Scroll into view variable
  const [scrollToSection, setScrollToSection] = useState(0);
  function handleClick() {
    if(scrollToSection == 5) {
      setScrollToSection(0);
    } else {
      setScrollToSection(scrollToSection + 1);
    }
  }

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  })

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

//  useEffect(() => {
//   const showStuff = async () => {
//     await timeout(2000);
//     setStatuses();
//     await timeout(2000);
//     setDisplay(true);
//   }
//   if(finishedLoading) {
//     showStuff();
//   }
//  }, [finishedLoading])

useEffect(() => {
  var j = 0;
  setTimeout(() => {
    setDisplay(true);
  }, 4000)
  setTimeout(() => {
    setNoShow(true);
  }, 4000)
  setTimeout(() => {
    setRunConfetti(true);
  }, 1450)
  setTimeout(() => {
    setMountLoading(false);
  }, 5000)
  for(let i = 0; i < sections.length; i++) {
    setTimeout(() => {
      setStatuses([...Array(j + 1).fill(true), ...Array(sections.length - j).fill(false)])
      j++;
    }, (i * 1000));
  }
}, [])


  //displayItems ? 'none' : 
  return (
    <>
    <GoogleAnalytics trackPageViews={true} TRACKING_ID={'G-GVNQ0FHHYE'} gaMeasurementId={'G-GVNQ0FHHYE'}/>
    <div style={{overflowY: "hidden", overflowX: "hidden"}}>
       {/* <div>
        <button className={"nextSectionButton"} style={{display: mobile ? "block" : "none",  textShadow: "2px 2px 5px black", borderRadius: "10px", padding: "5px", height: "10vh", backgroundColor: "#a1b4d4", top: "0vh", left: "0vw", position: "fixed", zIndex: 998}} onClick={() => handleClick()}>Next Section</button>
      </div> */}
      {/*displayItems ? "hiddenChicken" : */}
       {mountLoading && <div className={displayItems ? "hiddenChicken" : "loading"}  style={{overflow: "hidden", height: "100vh", position: "fixed", top: "0", left: "0", width: "100vw", backgroundColor: "white", zIndex: 999, overflowY: "hidden" }}>
       <Confetti style={{position: "absolute"}}
          width={conWidth}
          height={conHeight}
          run={runConfetti}
          numberOfPieces={8}
          recycle={false}
          confettiSource={mobile ?  {x: conWidth/2.4, y: conHeight/1.15} : {x: conWidth/2.2, y: conHeight/1.15}}
          initialVelocityX={{min: -3, max: -5}}

          />
        <h1 className="textLoading" style={{top: "50px"}}>
          <div className="first">Gener</div>
          <div className="second"> ating</div>
          <div className="third">&nbsp;feat</div>
          <div className="fourth">hers</div>
          <div className="fifth">...</div>
        </h1>
        
        <div class="chicken">
          <div class="head">
            <div class="hair"></div>
          </div>
          <div class="beak"></div>
          <div class="body"></div>
          <div class="leg one"></div>
          <div class="leg two"></div>
        </div>

        <div className="chicken2">
          <div className="headTwo"></div>
          <div className="eyeleft"></div>
          <div className="eyeright"></div>
          <div className="beakTwo"></div>

        </div>

        
      </div> }
      <div>
        <Navbar className={"textClass"}/>
        <div className={"bg-hero-pattern bg-cover bg-no-repeat bg-center"}>
          <RenderInView>    
            <Hero scrollToSection={scrollToSection} setLoading={setLoading} noShow={noShow}/>
          </RenderInView> 
        </div>
        <div className={"bg-head-pattern bg-cover bg-no-repeat bg-center"}>
          <RenderInView>    
            <Experience scrollToSection={scrollToSection} setLoading={setLoading} noShow={noShow}/>
          </RenderInView> 
        </div>
        
        {sections.map((Section, i) => 
        <div style={{display: displayItems ? "block" : "none", visible: displayItems ? "visible" : "hidden", height: loadingStatuses[3] ? "" : "0px"}} className={backgrounds[i] + " bg-cover bg-no-repeat bg-center textClass"} >  
          <RenderInView >
           {loadingStatuses[i] && <Section scrollToSection={scrollToSection} setLoading={setLoading} noShow={noShow} key={i}/>}
          </RenderInView>
        </div>
        )}
      </div>
    </div>
    </>
    
  )
}


