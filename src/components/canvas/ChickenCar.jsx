import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text, Float} from '@react-three/drei';
import { useSpring, animated } from "@react-spring/three"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { createContext, useContext } from 'react';
import { InViewContext } from '../RenderInView';
import { Html, useProgress } from '@react-three/drei'
import { LoadingContext } from '../DynamicCanvas';

const ChickenCar = ({ isMobile }) => {
  const chickenCar = useGLTF('./car/carChickenSwarm.glb')
  const carRef = useRef();
  useEffect(() => {
      chickenCar.scene.traverse(
      child => {
        if ( child.material ) { child.material.metalness = 0.7; }
      }
    )
  })

  let originalY = -0.75

  useFrame(({}, delta) => {
      chickenCar.scene.children[1].children[3].children[0].rotation.y -= 0.1;
      chickenCar.scene.children[1].children[3].children[1].rotation.y -= 0.1;
      chickenCar.scene.children[1].children[4].children[0].rotation.y -= 0.1;
      chickenCar.scene.children[1].children[4].children[1].rotation.y -= 0.1;
  })

  return (
    <mesh ref={carRef} >
      {/* <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1} /> */}
      {/* <spotLight intensity={3} distance={0.05} position={[0,1,10]}/> */}
      <spotLight intensity={1} position={[1, 0, 0]}/>
      <ambientLight intensity={1.5}/>
      <Float speed={4} floatIntesity={0.1} floatingRange={[0, 0.001]}>
      <primitive 
        object={chickenCar.scene}
        scale={isMobile ? 0.2 : 0.4}
        position={isMobile ? [-0.8, -0.7, 0.4] : [-1, originalY, 1.55]}
        rotation={[0, -1.85, 0]}
      />
      </Float >     
    </mesh>
    
  )
  }

  const Arrow = ({isMobile}) => {
    const { springArrow } = useSpring({
        from: {
            springArrow: 1,

        },
        to: [
            {
            springArrow: 1.2,
            delay: 1500
            },
            {
            springArrow: 1,
            delay: 1500
            }
        ],
        loop: true,
        immediate: true
    });

    const arrow = useGLTF('./car/arrowLow.glb');
    const arrowRef = useRef();
    return (
        <Float>
        <animated.group scale={springArrow}>
          <mesh ref={arrowRef}>
          <pointLight intensity={1.2} power={1}/>
          <primitive 
            object={arrow.scene.clone()}
            scale={isMobile ? 0.002 : 0.004}
            position={isMobile ? [0, -0.3, 0] : [1.1, -0.1, 1]}
            rotation={[1.5, 0, 4.7]}
          />
        </mesh>
        </ animated.group>
         </Float>
      
      )
  }

  const Sun = ({isMobile}) => {
    const sunRef = useRef();
    const sun = useLoader(FBXLoader, './car/sunfileLow.fbx');
    return (
        <mesh ref={sunRef}>
          <Float>
          <pointLight intensity={1.2} power={1}/>
          <primitive 
            object={sun}
            scale={isMobile ? 0.005 : 0.01}
            position={isMobile ? [0.8, 1.5, 1] : [2.5, 1.4, 1]}
            rotation={[0.5, -0.5, 0]}
          />
          </Float>
        </mesh>
        
      )
  }

  const Planet = ({isMobile}) => {
    const planet = useGLTF('./planet/earth.glb');
    const planetRef = useRef();
    useFrame(() => {
        planetRef.current.rotation.y += 0.01;
      })
    return (
        <mesh ref={planetRef}>
          <primitive 
            object={planet.scene.clone()}
            scale={isMobile ? 0.4 : 0.8}
            position={isMobile ? [0, 1, 0] : [0, 0.5, 0]}
            rotation={[0, 0, 0]}
          />
        </mesh>
      )
  }

  const Clock = ({isMobile}) => {
    const clock = useGLTF('./planet/clock_low_poly.glb');
    const clockRef = useRef();
    useFrame(({}, delta) => {
      clock.scene.children[0].children[0].children[1].rotation.y -= 0.02;
  })

    return (
        <mesh ref={clockRef}>
          <Float>
          <pointLight intensity={1.2} power={1}/>
          <primitive 
            object={clock.scene.clone()}
            scale={isMobile ? 1.4 : 2}
            position={isMobile ? [-1.1, 2.3, 0] : [-2.5, 2, 1]}
            rotation={[0.5, 0, 0]}
          />
          </Float>
        </mesh>
        
      )
  }

  const Road = ({ isMobile }) => {
    const road = useGLTF('./car/longroad.glb');
    useEffect(() => {
        road.scene.traverse(
        child => {
          if ( child.material ) { child.material.metalness = 0.7; }
        }
      )
    })

    return (
      
      <mesh >
        <spotLight intensity={1} position={[-2, 0, 0]}/>
        <spotLight intensity={1} position={[2, 0, 0]}/>
        <primitive 
          object={road.scene}
          scale={isMobile ? 0.05 : 0.07}
          position={isMobile ? [1.6, -1, -0] : [1.6, -1, 1]}
          rotation={[0, 0, 0]}
        />
      </mesh>
      
    )
  }

const ChickenCarCanvas = () => {
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
        shadows   
        dpr={inView ? window.devicePixelRatio : window.devicePixelRatio/15}
        antialias={false}
        frameloop={inView ? "always" : "never"}
      >
        <Sun isMobile={isMobile}/>
        <Planet isMobile={isMobile} />
        <Road isMobile={isMobile} />
        <ChickenCar isMobile={isMobile}/>
        <Arrow isMobile={isMobile}/>
        <Clock isMobile={isMobile}/>
      {/* <Preload all /> */}
      </Canvas>
    )
  } 
  
  export default ChickenCarCanvas