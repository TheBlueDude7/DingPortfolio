import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, RenderInView} from '@/components';

export default function DynamicCanvas() {
  const myStyleMobile = {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh"
    
  };

  return (
    // <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <RenderInView height="700px">
          <Hero />
          </RenderInView>
          
        </div>
        <div className="bg-head-pattern bg-cover bg-no-repeat bg-center">
        <RenderInView height="850px">
        <Experience/>    
        </ RenderInView>
        </div> 
        <div className="bg-great-pattern bg-cover bg-no-repeat bg-center">
          <About />
        </div>
          
        <div className="bg-chicken-pattern bg-cover bg-no-repeat bg-center">
        <RenderInView>
          <Tech />
          </ RenderInView>
        </div>
       
        <div className="bg-about-pattern bg-cover bg-no-repeat bg-center">
          <Feedbacks />
        </div>
        <div className="bg-ip-pattern bg-cover bg-no-repeat bg-center">
        <RenderInView>
          <Contact />
          </ RenderInView>
        </div>
        <div className="relative z-0">
        </div>
      </div>
    // {/* </BrowserRouter> */}
   )
 }


