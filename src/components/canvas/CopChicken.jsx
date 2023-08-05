import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text} from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

const ChickenSiren = ({positionx, positiony, positionz, xDirection, xRotation, yRotation}) => {
    const siren = useGLTF('./chicken/Siren.glb')
    let sirenRef = useRef();

    return (
        <mesh castShadow >
          <ambientLight intensity={0.05} />
          <primitive ref={sirenRef}
            object={siren.scene.clone()}
            scale={Math.random() * 3 + 2}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </mesh>
    
       
    
      )
}


    
  
  const chickenSirenCanvas = () => {
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
      >
        {/* Creates the chickens on the scene, fills an array and assigns them unique keys */}
        <ChickenSiren />
        {/* <Chickens position={[2, 0, 0]}/> */}
        <Suspense>
          <OrbitControls enableZoom={false} enabled={false} />
        </Suspense>
        <Preload all />
      </Canvas>
    )
  }
  
  export default chickenSirenCanvas;