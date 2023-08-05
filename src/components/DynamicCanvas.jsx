import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, RenderInView} from '@/components';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
  

export default function DynamicCanvas() {

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <RenderInView>
        <Hero />
        </RenderInView>
      </div>
      <div className="bg-head-pattern bg-cover bg-no-repeat bg-center">
      <RenderInView>
        <Experience />
      </RenderInView>
      </div>
      <div className="bg-great-pattern bg-cover bg-no-repeat bg-center">
      <RenderInView>
       <About />
      </RenderInView> 
      </div>
      <div className="bg-chicken-pattern bg-cover bg-no-repeat bg-center">
      <RenderInView>
        <Tech />
      </RenderInView>
      </div>
      <div className="bg-about-pattern bg-cover bg-no-repeat bg-center">
      <RenderInView>
        <Feedbacks />
      </RenderInView>
      </div>
      <div className="bg-ip-pattern bg-cover bg-no-repeat bg-center">
      <RenderInView>
        <Contact />
      </RenderInView>
      </div>
    </div>
  )
}


