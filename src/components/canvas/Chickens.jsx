import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useLoader  } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF} from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { createContext, useContext } from 'react';
import { InViewContext } from '../RenderInView';
import { LoadingContext } from '../DynamicCanvas';
import { Html, useProgress } from '@react-three/drei'


const ChickenFeed = ({ xDirection, xRotation, yRotation, positionx, positiony, positionz, texture, isMobile}) => {
  let texturesMap = useLoader(TextureLoader, texture);
  const sphereRef = useRef(); 
  const angryBawk = useRef(new Audio('audio/bigBawk.mp3'));
  angryBawk.current.volume = 0.3;

  useFrame((state, dt) => {
    if(xDirection >= 5) {
     sphereRef.current.position.x += dt * xDirection/5;
     if(sphereRef.current.position.x >= 7) {
      sphereRef.current.position.x = -7;
      }
    } else {
      sphereRef.current.position.x -= dt * xDirection/5;
     if(sphereRef.current.position.x <= -7) {
      sphereRef.current.position.x = 7;
     }
    }
    sphereRef.current.rotation.x += dt * xRotation;
    sphereRef.current.rotation.y += dt * yRotation;
   //  chickenRef.current.rotation.z += dt * zRotation;
   });

   function isClicked() {
    angryBawk.current.play();
   }

  return (
    <>
    <ambientLight intensity={0.1}/>
    <mesh position={[positionx, positiony, positionz]} ref={sphereRef} onClick={(e) => isClicked()}>
      <sphereGeometry args={isMobile ? [0.22, 22, 22] : [0.2, 33, 33]} />
      <meshStandardMaterial map={texturesMap}/>
    </mesh>
    </>
  )
}

const Chickens = ({ isMobile, keyVal}) => {
  const chicken = useGLTF('./chicken/chicken.glb');
  let xDirection = Math.random() * 10;
  let xRotation = Math.random() * 3;
  let yRotation = Math.random() * 3;

  let xPos = Math.random() * 10 - 5;
  let yPos = Math.random() * 3 - 1.5;
  let zPos =  Math.random() * 2;

  let picturesMap = ["react.png", "Javascript.png", "Java.png", "premierepro.png", "cSharp.png", "afterEffects.png", "css.png", "nextjs.jpg", "C_Logo.png", "php.png", "python.png"];

  const chickenRef = useRef();
  
  useFrame((state, delta) => {
   if(xDirection >= 5) {
    chickenRef.current.position.x += delta * xDirection/5;
    if(chickenRef.current.position.x >= 7) {
      chickenRef.current.position.x = -7;
     }
   } else {
    chickenRef.current.position.x -= delta * xDirection/5;
    if(chickenRef.current.position.x <= -7) {
      chickenRef.current.position.x = 7;
    }
   }
   chickenRef.current.rotation.x += delta * xRotation;
   chickenRef.current.rotation.y += delta * yRotation;
  //  chickenRef.current.rotation.z += dt * zRotation;
  });

  return (
    <mesh castShadow >
      <ambientLight intensity={0.05} />
      <ChickenFeed isMobile={isMobile} positionx={xPos} positiony={yPos} positionz={zPos} xDirection={xDirection} xRotation={xRotation} yRotation={yRotation} texture={picturesMap[keyVal]}/>
      <primitive ref={chickenRef}
        object={chicken.scene.clone()}
        scale={isMobile ? Math.random() * 1.25 + 1 : Math.random() * 5 + 2}
        position={[xPos, yPos, zPos]}
        rotation={[Math.PI/Math.random() * 2, Math.random() * 2, Math.random() * 2]}
      />
    </mesh>
  )
}

const chickensCanvas = () => {
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
    <>
    <Canvas   
    antialias={false}
    >
      {/* Creates the chickens on the scene, fills an array and assigns them unique keys */}
      {new Array(11).fill().map((item, i) => <Chickens key={i} keyVal={i} isMobile={isMobile}/> )}
      <Suspense>
        {!isMobile && <OrbitControls enableZoom={false} enabled={false} />}
      </Suspense>
      <Preload all /> 
    </Canvas>
    </>
  )
}

export default chickensCanvas