import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend, CameraShake  } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useTexture, Text} from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { createContext, useContext } from 'react';
import { InViewContext } from '../RenderInView';

let move = false;
let movedOnce = false;
let deathSoundPlayed = false;

const Chickens = ({ isMobile, keyVal, xPosition, yPosition, copsAreHere}) => {
  let moveVal = (Math.random() - 1)/5 ;
  let xRotation = Math.random();
  let yRotation = Math.random();

  const chickenRef = useRef();
  const chicken = useGLTF('./copChicken/policeChicken.glb')
  useFrame(() => {
    if(copsAreHere) {
      chickenRef.current.position.x = chickenRef.current.position.x + moveVal; 
    }
  })

  return (
    <mesh castShadow >
      <ambientLight intensity={0.01} />
      <primitive ref={chickenRef}
        object={chicken.scene.clone()}
        scale={3}
        position={[xPosition, yPosition, 0]}
        rotation={[xRotation, yRotation, 0]}
      />
    </mesh>
  )
  
}


const Bubbles = ({ isMobile, positionX, positionY, setFear, isScared, setKey, keyVal}) => {
  let headBobYSpeed = 0;
  let headBobChange = 0.00025;
  let bobUp = true;
  let halfWay = true;
  let halfWayCounter = 0.025;
  
  const [scared, setScared] = useState(false);
  const bubbleRef = useRef();
  const shakeRef = useRef();
  // let bubble = useLoader(FBXLoader, './bubble/smiledude3.fbx')
  let bubble = useGLTF('./bubble/smileman2.glb')

  useEffect(() => {
    bubble.scene.traverse(
      child => {
        if ( child.material ) { child.material.metalness = 0.5; }
      }
    )
  })
  //Bob animation
  useFrame((state, delta) => {
    if(isScared) {
      bubbleRef.current.visible = false;
    }
    if(isHovering) {
      bubbleRef.current.rotation.x -= delta;
    }
    if(bubbleRef.current.position.y < -1) {
      bubbleRef.current.position.y = 0;
    }
    if(headBobYSpeed < 0) {
        if(bobUp) {
            bobUp = false;
        } else {
            bobUp = true;
        }
        halfWay = true;
    }
    if(halfWay) {
        if(bobUp) {
            bubbleRef.current.position.y += headBobYSpeed * delta * 20;
            
            headBobYSpeed = headBobYSpeed + headBobChange;
        } else {
            bubbleRef.current.position.y -= headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed + headBobChange;
        }
        if(headBobYSpeed >= halfWayCounter) {
            halfWay = false;
        }
    } else {
        if(bobUp) {
            bubbleRef.current.position.y += headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed - headBobChange;
        } else {
            bubbleRef.current.position.y -= headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed - headBobChange;
        }
    }
  })

let deathSound = new Audio('audio/DeathSound.mp3');
deathSound.volume = 0.3;

 function isClicked() {
  setKey(keyVal);
  bubbleRef.current.visible = false;
  setFear();
  if(!deathSoundPlayed) {
    deathSound.play();
  }
 }
 let isHovering = false;

 function setJitter() {
   isHovering = true;
 }

 function unJitter() {
  isHovering = false;
  bubbleRef.current.rotation.x = 0;
 }

  return (
    <mesh ref={bubbleRef} onClick={(e) => isClicked()} onPointerOver={(e) => setJitter()} onPointerOut={(e) => unJitter()}>
      <ambientLight intensity={0.3}/>
      <primitive 
        object={bubble.scene.clone()}
        scale={isMobile ? 0.3 : 0.4}
        position={[positionX, positionY, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  )
}

const Unhappy = ({ isMobile, positionX, positionY, isScared, isRunning, hideKey, keyVal}) => {
  const bubbleRef = useRef();
    let unhappy = useGLTF('./bubble/scared3.glb');   

  //Stuff for bobbing
  let headBobYSpeed = 0;
  let headBobChange = 0.00025;
  let bobUp = true;
  let halfWay = true;
  let halfWayCounter = 0.025;

  //Decide fleeing direction
  let negX = Math.random() * 2;
  let negY = Math.random() * 2;
  let negZ = Math.random() * 2;   

  //Decide rotation for fleeing direction
  let xRotate = 0;
  let yRotate = 0;
  let zRotate = 0;

  //Decide Increment values for rotation
  let xRotateInc = Math.random() * 0.001;
  let yRotateInc = Math.random() * 0.001;
  let zRotateInc = Math.random() * 0.001;

  //Speed of fleeing emojis
  let xSpeed = Math.random() * 2;
  let ySpeed = Math.random() * 2;
  let zSpeed = Math.random();
  let currXSpeed = 0;
  let currYSpeed = 0;
  let currZSpeed = 0;
  //Decide to rotate which way

   useFrame((state, delta) => {
    if(bubbleRef.current.position.y < -1) {
      bubbleRef.current.position.y = 0;
    }
    if(hideKey == keyVal) {
      bubbleRef.current.visible = false;
    } else {
      bubbleRef.current.visible = true;
    }
    if(isRunning) {
      if(negX >= 1) {
        bubbleRef.current.position.x = bubbleRef.current.position.x + currXSpeed;
        bubbleRef.current.rotation.x = bubbleRef.current.rotation.x + xRotate/10;
        if(currXSpeed < xSpeed) {
          currXSpeed += 0.001;
          xRotate += xRotateInc;
        } else {
          xRotate = 0;
        }
      } else {
        bubbleRef.current.position.x = bubbleRef.current.position.x - currXSpeed;
        bubbleRef.current.rotation.x = bubbleRef.current.rotation.x - xRotate/10;
        if(currXSpeed < xSpeed) {
          currXSpeed += 0.001;
          xRotate += xRotateInc;
        } else {
          xRotate = 0;
        }
      }
      if(negY >= 1) {
        bubbleRef.current.position.y = bubbleRef.current.position.y + currYSpeed;
        bubbleRef.current.rotation.y = bubbleRef.current.rotation.y + yRotate/10;
        if(currYSpeed < ySpeed) {
          currYSpeed += 0.001;
          yRotate += yRotateInc;
        } else {
          yRotate = 0;
        }
      } else {
        bubbleRef.current.position.y = bubbleRef.current.position.y - currYSpeed;
        bubbleRef.current.rotation.y = bubbleRef.current.rotation.y - yRotate/10;
        if(currYSpeed < ySpeed) {
          currYSpeed += 0.001;
          yRotate += yRotateInc;
        } else {
          yRotate = 0;
        }
      }
      if(negZ >= 1) {
        bubbleRef.current.position.z = bubbleRef.current.position.z + currZSpeed;
        bubbleRef.current.rotation.z = bubbleRef.current.rotation.z + zRotate/10;
        if(currZSpeed < zSpeed) {
          currZSpeed += 0.001;
          zRotate += zRotateInc;
        } else {
          zRotate = 0;
        }
      } else {
        bubbleRef.current.position.z = bubbleRef.current.position.z - currZSpeed;
        bubbleRef.current.rotation.z = bubbleRef.current.rotation.z - zRotate/10;
        if(currZSpeed < zSpeed) {
          currZSpeed += 0.001;
          zRotate += zRotateInc;
        } else {
          zRotate = 0;
        }
      }
    } 
    if(isScared) {
      
    } else {
      bubbleRef.current.visible = false;
    if(headBobYSpeed < 0) {
        if(bobUp) {
            bobUp = false;
        } else {
            bobUp = true;
        }
        halfWay = true;
    }
    if(halfWay) {
        if(bobUp) {
            bubbleRef.current.position.y += headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed + headBobChange;
        } else {
            bubbleRef.current.position.y -= headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed + headBobChange;
        }
        if(headBobYSpeed >= halfWayCounter) {
            halfWay = false;
        }
    } else {
        if(bobUp) {
            bubbleRef.current.position.y += headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed - headBobChange;
        } else {
            bubbleRef.current.position.y -= headBobYSpeed * delta * 20;
            headBobYSpeed = headBobYSpeed - headBobChange;
        }
    }
    }
    
  })
    return (
      <mesh ref={bubbleRef}>
        <spotLight intensity={0.05} position={[1, 0, 0]}/>
        <ambientLight intensity={0.05}/>
        <primitive 
          object={unhappy.scene.clone()}
          scale={isMobile ? 0.2 : 0.23}
          position={[positionX, positionY, 0]}
          rotation={[0, 0, 0]}
        />
      </mesh>
    )
  }

 

  const BubblesCanvas = ({setHidden}) => {
    //State for the bubbles to stop their bobbing
    const [scared, setScared] = useState(false);

    //State for them to start running
    const [running, setRunning] = useState(false);
    
    //State to know when cops should come
    const [copTime, setCopTime] = useState(false);
 
    //Audio Loading
    let scared0 = new Audio("/audio/Scream0.mp3");
    
    let scared1 = new Audio("/audio/Scream1.mp3");
    let scared2 = new Audio('/audio/Scream2.mp3');
    let scared3 = new Audio('/audio/Scream3.mp3');
    let scared4 = new Audio('/audio/Scream4.mp3');
    let scared5 = new Audio('/audio/Scream5.mp3');
    let scared6 = new Audio('/audio/Scream6.mp3');
    let initialSound = new Audio('/audio/Initial.mp3');

    scared0.volume = 0.3;
    scared1.volume = 0.3;
    scared2.volume = 0.3;
    scared3.volume = 0.3;
    scared4.volume = 0.3;
    scared5.volume = 0.3;
    scared6.volume = 0.3;
    initialSound.volume = 0.3;
    initialSound.onended = function() {
      setRunning(true);
      scared0.play();
      scared1.play();
      scared2.play();
      scared3.play();
      scared4.play();
      scared5.play();
      scared6.play();
   }

   scared6.onended = function() {
      setCopTime(true);
   }

   const inView = useContext(InViewContext);

    //Effect to determine when the guys should start moving
    useEffect(() => {
        if(move) {
          initialSound.play();
        }
      
    }, [scared])
    
    const [isMobile, setMobile] = useState(false);
    
    function setFear() {
        setHidden();
        console.log("work?1");
        move = true;
        setScared(true);
    }
    const [hideKey, setHideKey] = useState(-1);
  
    function setKey(key) {
      setHideKey(key);
    }

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
      camera={{position: [0, 0, 10], fov: 60 }}
      dpr={inView ? window.devicePixelRatio : window.devicePixelRatio/10}
      >
        {Array(4).fill().map((item, i) => <Bubbles key={i} positionY={isMobile ? 1 : 0.6} positionX={isMobile ? i * 2 - 4 : i * 4 - 5.7} setFear={setFear} isScared={scared} setKey={setKey} keyVal={i} isMobile={isMobile}/>)} 
        {Array(4).fill().map((item, i) => <Unhappy key={i} positionY={isMobile ? 1 : 0.6} positionX={isMobile ? i * 2 - 4: i * 4 - 5.7} setArray={setFear} isScared={scared} isRunning={running} hideKey={hideKey} keyVal={i} isMobile={isMobile}/>)}
        {Array(1).fill().map((item, i) =>  <Chickens xPosition={12 + (Math.random() * 10)} yPosition={i * 1.4 - 2} copsAreHere={copTime} xRotation={Math.random() * 6 - 3}/>)}  
       
        {/* {scaredArray[1]}
        {scaredArray[0]} */}
        {/*{scared ? <Bubbles /> : <Unhappy />}*/}
        <Suspense>
          <OrbitControls enabled={false}/>
        </Suspense>
        <Preload all />
      </Canvas>
    )
  }

export default BubblesCanvas