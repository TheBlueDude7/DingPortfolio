import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech} from '@/components';

export default function Main() {
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
          <Hero />
        </div>
        <div className="bg-great-pattern bg-cover bg-no-repeat bg-center">
          <Contact />
        </div>
        <div className="bg-chicken-pattern bg-cover bg-no-repeat bg-center">
          <About />
        </div>
        <div className="bg-head-pattern bg-cover bg-no-repeat bg-center">
        <Experience style={myStyleMobile}/>    
        </div>   
        <div className="bg-about-pattern bg-cover bg-no-repeat bg-center">
          <Tech />
        </div>
        <div className="bg-ip-pattern bg-cover bg-no-repeat bg-center">
          <Feedbacks />
        </div>
        <div className="relative z-0">
        </div>
      </div>
    // {/* </BrowserRouter> */}
   )
 }


