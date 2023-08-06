import React from 'react'
import { Suspense, useEffect, useState, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF} from '@react-three/drei';
import { createContext, useContext } from 'react';
import { InViewContext } from '../RenderInView';

const CameraChicken = ({isMobile}) => {
  const chicken = useGLTF('./chicken/chicken.glb')
  const chickenRef = useRef();
  let bawkSound = new Audio('audio/Bawk.mp3');
  function isClicked() {
    bawkSound.play();
  }
  return (
    <mesh castShadow  onClick={(e) => isClicked()} >
      <ambientLight intensity={0.05} />
      <primitive ref={chickenRef}
        object={chicken.scene.clone()}
        scale={isMobile ? 2.4 : 3.6}
        position={isMobile ? [0, -0.5, -2] : [0, -0.75, -1.5]}
        rotation={[0, 2, 0]}
      />
    </mesh>

   

  )
}


const Cameras = ({ isMobile }) => {
  const camera = useGLTF('./camera/cameraLow.glb')
  useEffect(() => {
    camera.scene.traverse(
      child => {
        if ( child.material ) { child.material.metalness = 0.5; }
      }
    )
  })
  return (
    
    <mesh >
      {/* <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1} /> */}
      {/* <spotLight intensity={3} distance={0.05} position={[0,1,10]}/> */}
      <spotLight intensity={1} position={[1, 0, 0]}/>
      <ambientLight intensity={1}/>
      <primitive 
        object={camera.scene}
        scale={isMobile ? 0.7 : 1}
        position={isMobile ? [0, -1, -2.2] : [0, -1.5, -1.5]}
      />
    </mesh>
    
  )
}

  const CamerasCanvas = () => {
    const [isMobile, setMobile] = useState(false);

    const inView = useContext(InViewContext);

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

    return (
      <Canvas
      frameloop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25 }}
      dpr={inView ? window.devicePixelRatio : window.devicePixelRatio/10}
      >
        
        <Suspense>
          <OrbitControls enableZoom={false} 
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            
          />
          <CameraChicken isMobile={isMobile}/>
          <Cameras isMobile={isMobile}/>
        </Suspense>
        <Preload all />
      </Canvas>
    )
  }

export default CamerasCanvas