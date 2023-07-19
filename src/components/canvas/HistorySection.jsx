import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text, Float} from '@react-three/drei';
import { useSpring, animated } from "@react-spring/three"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


const ChickenFirst = ({ isMobile }) => {
    const { chickenSize } = useSpring({
        from: {
            chickenSize: 0.5,
        },
        to: [
            {
            chickenSize: isMobile ? 0.9 : 1.2,
            delay: 2000
            },
            {
            chickenSize: 0.5,
            delay: 4000
            }
        ],
        loop: true,
        immediate: true
    });

    const {chickenPos } = useSpring({
        from: {
            chickenPos: 0,
        },
        to: [
            {
            chickenPos: isMobile ? 0 : 3.5,
            delay: 2000
            },
            {
            chickenPos: 0,
            delay: 4000
            }
        ],
        loop: true
    });
    const chicken = useGLTF('./chicken/chickenComputer.glb');
    const chickenRef = useRef();
    // useEffect(() => {
    //     chickenRef.scene.traverse(
    //     child => {
    //       if ( child.material ) { child.material.metalness = 0.7; }
    //     }
    //   )
    // })

    return (

      <animated.group scale={chickenSize} position-x={chickenPos}>
        <mesh ref={chickenRef} >
        {/* <hemisphereLight intensity={0.15} groundColor="black"/>
        <pointLight intensity={1} /> */}
        {/* <spotLight intensity={3} distance={0.05} position={[0,1,10]}/> */}
        <spotLight intensity={1} position={[1, 0, 0]}/>
        <primitive 
          object={chicken.scene.clone()}
          scale={isMobile ? 0.4 : 0.8}
          position={isMobile ? [-1.5, -1, 0] : [-6, -1, 1.55]}
          rotation={[0, -0.8, 0]}
        />
      </mesh>
      </animated.group>
    )
  }

  const ChickenSecond = ({ isMobile }) => {
    const { chickenSize } = useSpring({
        from: {
            chickenSize: 0.5,
        },
        to: [
            {
            chickenSize: isMobile ? 1 : 1.2,
            delay: 4000
            },
            {
            chickenSize: 0.5,
            delay: 2000
            }
        ],
        loop: true,
        immediate: true,
    });

    const {chickenPos } = useSpring({
        from: {
            chickenPos: 0,
        },
        to: [
            {
            chickenPos: isMobile ? 0 : -5,
            delay: 4000
            },
            {
            chickenPos: 0,
            delay: 2000
            }
        ],
        loop: true,
        immediate: true,
    });
    const chicken = useGLTF('./chicken/chickenCamera.glb');
    const chickenRef = useRef();
    // useEffect(() => {
    //     chickenRef.scene.traverse(
    //     child => {
    //       if ( child.material ) { child.material.metalness = 0.7; }
    //     }
    //   )
    // })

    return (

      <animated.group scale={chickenSize} position-x={chickenPos}>
        <mesh ref={chickenRef} >
        {/* <hemisphereLight intensity={0.15} groundColor="black"/>
        <pointLight intensity={1} /> */}
        {/* <spotLight intensity={3} distance={0.05} position={[0,1,10]}/> */}
        <spotLight intensity={1} position={[1, 0, 0]}/>
        <ambientLight intensity={1}/>
        <primitive 
          object={chicken.scene.clone()}
          scale={isMobile ? 0.05 : 0.06}
          position={isMobile ? [1.5, -1, -2.2] : [6, -1.3, 1.55]}
          rotation={[0, 0, 0]}
        />
      </mesh>
      </animated.group>
    )
  }


const HistoryCanvas = () => {
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
        <ChickenFirst isMobile={isMobile}/>
        <ChickenSecond isMobile={isMobile}/>
        <Preload all />
      </Canvas>
    )
  } 
  
  export default HistoryCanvas