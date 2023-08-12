import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, RenderInView} from '@/components';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei'
import { createContext, useContext, useState, useEffect } from 'react';

export const LoadingContext = createContext(false); 

export default function DynamicCanvas() {
  const sections = [Hero, Experience, About, Tech, Feedbacks, Contact];
  const backgrounds = ["bg-hero-pattern", "bg-head-pattern", "bg-great-pattern", "bg-chicken-pattern", "bg-about-pattern", "bg-ip-pattern"];
  const [finishedLoading, setLoading] = useState(false);
  const [displayItems, setDisplay] = useState(false);
  const [loadingStatuses, setStatuses] = useState([true, ...Array(sections.length - 1).fill(false)]);
  const [noShow, setNoShow] = useState(false);
  const [mobile, setMobile] = useState(false);
 
  //Scroll into view variable
  const [scrollToSection, setScrollToSection] = useState(0);
  
  function handleClick() {
    if(scrollToSection == 5) {
      setScrollToSection(0);
    } else {
      setScrollToSection(scrollToSection + 1);
    }
  }

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
  for(let i = 0; i < sections.length; i++) {
    setTimeout(() => {
      setStatuses([...Array(j + 1).fill(true), ...Array(sections.length - j).fill(false)])
      j++;
    }, (i * 1000));
  }
}, [])

  //displayItems ? 'none' : 
  return (
    <div style={{overflowY: "hidden"}}>
       {/* <div>
        <button className={"nextSectionButton"} style={{display: mobile ? "block" : "none",  textShadow: "2px 2px 5px black", borderRadius: "10px", padding: "5px", height: "10vh", backgroundColor: "#a1b4d4", top: "0vh", left: "0vw", position: "fixed", zIndex: 998}} onClick={() => handleClick()}>Next Section</button>
      </div> */}
       <div className={displayItems ? "hiddenChicken" : "loading"}  style={{height: "100vh", position: "fixed", top: "0", left: "0", width: "100vw", backgroundColor: "white", zIndex: 999, overflowY: "hidden" }}>
        <h1 class="textLoading">Generating Feathers...</h1>
        <div class="chicken" >
          <div class="head">
            <div class="hair"></div>
          </div>
          <div class="beak"></div>
          <div class="body"></div>
          <div class="leg one"></div>
          <div class="leg two"></div>
        </div>
      </div> 
      <div >
        <Navbar />
        {sections.map((Section, i) => 
        <div style={{visible: noShow ? "visible" : "hidden", height: loadingStatuses[3] ? "" : "0px"}} className={backgrounds[i] + " bg-cover bg-no-repeat bg-center"} >  
          <RenderInView >
           {loadingStatuses[i] && <Section scrollToSection={scrollToSection} setLoading={setLoading} noShow={noShow} key={i}/>}
          </RenderInView>
        </div>
        )}
      </div>
    </div>
  )
}


