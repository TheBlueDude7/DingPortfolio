import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text, Float} from '@react-three/drei';
import { useSpring, animated } from "@react-spring/three"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useInView } from 'react-intersection-observer';

const Chicken = ({isMobile, changeChicken}) => {
  
  const chicken = useGLTF('./chicken/chicken.glb')
  const chickenRef = useRef();
  let gravValue = -0.001;

  useFrame((state, delta) => {
    if(changeChicken) {
      chickenRef.current.position.y = chickenRef.current.position.y + gravValue * delta;
      chickenRef.current.rotation.x = chickenRef.current.rotation.x + gravValue * delta;
      gravValue = gravValue + gravValue/2;
      if(chickenRef.current.position.y < -5) {
        chickenRef.current.visible = false;
      }
    }
  })

  return (
    <Float speed={10}>
    <mesh castShadow>
      <ambientLight intensity={0.05} />
      <primitive ref={chickenRef}
        object={chicken.scene.clone()}
        scale={2}
        position={[1, 0, 1]}
        rotation={[0, 1.2, 0]}
      />
    </mesh>
    </Float>
  )
}

const Radio = ({isMobile, stopAudio, setChicken, highVolume, lowVolume}) => {
  const radio = useGLTF("./radio/scene.gltf");
  const radioRef = useRef();
  const [isHovering, setHovering] = useState(false);
  const [brokenRadio, setBrokenRadio] = useState(false);
  const { chickenSize } = useSpring({
    from: {
        chickenSize: 1,
        delay: 50
    },
    to: [
        {
          chickenSize: 1,
          delay: 50
        },
        {
        chickenSize: 1.2,
        delay: 50
        }
      ]
});

  let gravValue = -0.001;


  useFrame((state, delta) => {
    if(brokenRadio) {
      radioRef.current.position.y = radioRef.current.position.y + gravValue * delta;
      gravValue = gravValue + gravValue/2;
    }
  })

  function brokeRadio() {
    stopAudio();
    setBrokenRadio(true);
    setChicken();
  }

  function hoveringOver() {
    setHovering(true);
    highVolume();
  }

  function notHovering() {
    setHovering(false);
    lowVolume();
  }

  return (
    <Float speed={10} floatIntesity={1}  >
    <animated.group scale={isHovering ? chickenSize : 1}>
      <mesh ref={radioRef} onPointerOver={(e) => hoveringOver()} onPointerOut={(e) => notHovering()} onClick={(e) => brokeRadio()}>
      <spotLight intensity={1} position={[1, 0, 0]}/>
      <primitive onMouse
        object={radio.scene}
        scale={0.4}
        position={isMobile ? [-1.5, -1, 0] : [0.5, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
    </animated.group >
    </Float>
  )
}

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


const HistoryCanvas = ({stopAudio, highVolume, lowVolume}) => {
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

     const [changeChicken, setChangeChicken] = useState(false);

     function setChicken() {
      setChangeChicken(true);
     }

     

      // let edmTrack = new Audio('/audio/heavenSound.mp3');
      // edmTrack.volume = 0.1;
      // useEffect(() => {
      //   edmTrack.play();
      // }, [])

      // useEffect(() => {
      //   if(inView) {
      //     edmTrack.volume = 0.2;
      //   } else {
      //     edmTrack.volume = 0.4;
      //   }
      // }, [inView])

    return (
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}   
      >
        <Radio stopAudio={stopAudio} setChicken={setChicken} highVolume={highVolume} lowVolume={lowVolume}/>
        <ChickenFirst isMobile={isMobile}/>
        <ChickenSecond isMobile={isMobile}/>
        <Preload all />
        <Chicken changeChicken={changeChicken}/>
      </Canvas>
    )
  } 
  
  export default HistoryCanvas