import React from 'react'
import { Suspense, useEffect, useState, useRef, useLayoutEffect} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF} from '@react-three/drei';
import { createContext, useContext, useMemo } from 'react';
import { InViewContext } from '../RenderInView';
import { Html, useProgress } from '@react-three/drei'
import { throttle } from 'lodash';
import { useAsset } from "use-asset";

function Loader() {
  const { progress } = useProgress()
  return <>
    
  </>
}

function precompile() {
  const { gl, scene, camera } = useThree()
  useLayoutEffect(() => void gl.compile(scene, camera), [])
  return null
}

const CameraChicken = ({isMobile}) => {
  const chicken = useGLTF('./chicken/chicken.glb')
  const chickenRef = useRef();
  let bawkSound = new Audio('audio/Bawk.mp3');
  function isClicked() {
    bawkSound.play();
  }
  const cameraRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

useEffect(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
      window.removeEventListener('scroll', handleScroll);
  };
})

useFrame((t, delta) => {
      if(isMobile) {
        cameraRef.current.rotation.y += 0.005 + scrollPosition/9000;
      }
  })
  return (
    <mesh castShadow  onClick={(e) => isClicked()} ref={cameraRef} >
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
  const cameraRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

useEffect(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
      window.removeEventListener('scroll', handleScroll);
  };
})

useFrame((t, delta) => {
      if(isMobile) {
        cameraRef.current.rotation.y += 0.005 + scrollPosition/9000;
      }
  })
  


  return (
    <mesh ref={cameraRef}>
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

  const useSmartProgress = () => {
    const [smartProgress, setSmartProgress] = useState(0);
    const { progress } = useProgress(); 

    const throttledSetProgress = useMemo(() => {
      return throttle((p) => {setSmartProgress(p)}, 500);
    }, [setSmartProgress])
    useEffect(() => { 
      throttledSetProgress(progress);
    }, [throttledSetProgress, progress])

    return smartProgress;
  }

  const CamerasCanvas = ({setLoading}) => {
    const progress = useSmartProgress();
    const [loading, finishedLoading] = useState(false);

    useEffect(() => {
      console.log("uh oh");
      if(progress >= 100) {
        if(!loading) {
          finishedLoading(true);
          setLoading(true);
        }  
      }
    }, [progress])
      
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
      shadows
      camera={{position: [20, 3, 5], fov: 25 }}
      dpr={inView ? window.devicePixelRatio : window.devicePixelRatio/10}
      >
        
        <Suspense fallback={<Loader />}>
          {!isMobile && <OrbitControls enableZoom={false} 
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableRotate={!isMobile}
          />}
          <CameraChicken isMobile={isMobile}/>
          <Cameras isMobile={isMobile}/>
        </Suspense >
        {/* <Preload all /> */}
      </Canvas>
      </>
    )
  }

export default CamerasCanvas