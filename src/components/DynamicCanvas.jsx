import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, RenderInView} from '@/components';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei'
import { createContext, useContext, useState } from 'react';

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
} 

export const LoadingContext = createContext(false); 

export default function DynamicCanvas() {
  const [finishedLoading, setLoading] = useState(false);

  return (
    <>
    <div className="loading" style={{display: finishedLoading ? 'none' : 'block', height: "100vh"}}>
    <div class="chicken">
    <div class="head">
    <div class="hair"></div>
    </div>
    <div class="beak"></div>
    <div class="body"></div>
    <div class="leg one"></div>
    <div class="leg two"></div>
  </div>
    </div>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center" style={{display: finishedLoading ? 'block' : 'none'}}>
        <Navbar />
        <RenderInView>
        <Hero setLoading={setLoading} />
        </RenderInView>
      </div>
      <div className="bg-head-pattern bg-cover bg-no-repeat bg-center" style={{display: finishedLoading ? 'block' : 'none'}}>
      <RenderInView>
        <Experience />
      </RenderInView>
      </div>
      <div className="bg-great-pattern bg-cover bg-no-repeat bg-center" style={{display: finishedLoading ? 'block' : 'none'}}>
      <RenderInView>
       <About />
      </RenderInView> 
      </div>
      <div className="bg-chicken-pattern bg-cover bg-no-repeat bg-center" style={{visibility: finishedLoading ? 'visible' : 'hidden'}}>
      <RenderInView>
        <Tech/>
      </RenderInView>
      </div>
      <div className="bg-about-pattern bg-cover bg-no-repeat bg-center" style={{display: finishedLoading ? 'block' : 'none'}}>
      <RenderInView>
        <Feedbacks />
      </RenderInView>
      </div>
      <div className="bg-ip-pattern bg-cover bg-no-repeat bg-center" style={{display: finishedLoading ? 'block' : 'none'}}>
      <LoadingContext.Provider>
      <RenderInView >
        <Contact />
      </RenderInView>
      </LoadingContext.Provider>
      </div>
      </div>
    </>
  )
}


