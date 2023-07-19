import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text, Float} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const Planet = () => {
  const planet = useLoader(FBXLoader, './car/planet.fbx');
  const planetRef = useRef();

  return (
      <mesh ref={planetRef}>
        <spotLight intensity={0.05} position={[1, 0, 0]}/>
        <ambientLight intensity={0.005}/>
        <primitive 
          object={planet.clone()}
          scale={0.8}
          position={[0, 0.5, 0]}
          rotation={[0, 0, 0]}
        />
      </mesh>
    )
}

const EarthCanvas = () => {
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


  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}      
    >
       <Suspense>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default EarthCanvas