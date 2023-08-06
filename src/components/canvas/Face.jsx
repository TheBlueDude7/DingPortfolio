import React from 'react'
import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';
import { InViewContext } from '../RenderInView';
import { createContext, useContext } from 'react';

//Chickens that support the face nodding in canvas, appear only on the side when needed
const FaceChicken = ({isMobile, height, isHovering, rotation, xPos}) => {
    const chicken = useGLTF('./chicken/chicken.glb')
    const chickenRef = useRef();
    const [goUp, setUp] = useState(true);
    let scaleVal = 0;
    let changeVal = 0;
    let noddingExcitement = Math.random();
    useFrame(({viewport}, delta) => {
        if(isHovering) {       
            if(goUp) {
                 if(changeVal >= 8) {
                    setUp(false);
                    scaleVal = 0.06 * noddingExcitement;
                } else {
                    chickenRef.current.position.y = chickenRef.current.position.y + scaleVal * delta * 100;
                    scaleVal += -0.005 * noddingExcitement; 
                    // faceRef.current.position.x = faceRef.current.position.x - 0.01;
                    changeVal++;
                }
            } else {
                if(changeVal <= -8) {
                    setUp(true);
                    scaleVal = 0.06 * noddingExcitement;
                } else {
                    chickenRef.current.position.y = chickenRef.current.position.y - scaleVal * delta * 100;
                    scaleVal += -0.005 * noddingExcitement;
                    changeVal--;
                }
            }
        }
    })
    return (
      <mesh castShadow>
        <ambientLight intensity={0.05} />
        <primitive ref={chickenRef}
          object={chicken.scene.clone()}
          scale={2}
          position={[xPos, height, -1.5]}
          rotation={[0, rotation, 0]}
        />
      </mesh>
  
     
  
    )
  }
  

const Face = ({ isMobile, mouseCoordsRef, isHovering }) => {
    //Setting up the audio for the face
    const [audioPlaying, setAudioPlaying] = useState(false);

    let mhmNoise = new Audio('/audio/mhm.mp3');
    let clickIt = new Audio('/audio/ComeOnClickit.mp3');
    let yesNoise = new Audio('/audio/Yes.mp3');
    let ohYeahNoise = new Audio('/audio/OhYeah.mp3');
    mhmNoise.onended = function() {
       setAudioPlaying(false);
       console.log("1");
    }
    clickIt.onended = function() {
        setAudioPlaying(false);
        console.log("2");
     }
     yesNoise.onended = function() {
        setAudioPlaying(false);
        console.log("3");
     }
     ohYeahNoise.onended = function() {
        setAudioPlaying(false);
        console.log("4");
     }

    function checkPaused() {
        if(clickIt.paused && yesNoise.paused && ohYeahNoise.paused && mhmNoise.paused) {
            return true;
        } else {
            return false;
        }
     }

    function play() {
        if(!audioPlaying) {
            setAudioPlaying(true);
            let chooseSound = Math.random() * 4;
            if(chooseSound >= 3 && checkPaused()) {
                mhmNoise.play();
            }  
            if (chooseSound >= 2 && chooseSound < 3 && checkPaused()) {
                yesNoise.play();
            } 
            if (chooseSound >= 1 && chooseSound < 2 && checkPaused()) {
                ohYeahNoise.play();
            }  
            if (chooseSound < 1 && checkPaused()) {
                clickIt.play();
            }
        } 
        
    }

    const face = useGLTF('./face/facelow2.glb')
    const faceRef = useRef();
    //For head shake
    const [goUp, setUp] = useState(true);
    let changeVal = 0;
    
    useEffect(() => {
        face.scene.traverse(
            child => {
                if (child.material) { child.material.metalness = 0.4; }
            }
        )
    })

    const { camera, mouse } = useThree()
    let scaleVal = 0;
    useFrame(({viewport}, delta) => {
        var vector = new THREE.Vector3(mouseCoordsRef.current[0], mouseCoordsRef.current[1], 0.5);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        const x = (pos.x * viewport.width) / 3;
        const y = (pos.y * viewport.height) / 2;
        if(isHovering) { 
            if(!isMobile) {
                if(goUp) {
                    play();
                    if(changeVal >= 1400 * delta) {
                        setUp(false);
                        scaleVal = 0.06;
                    } else {
                        faceRef.current.lookAt(x, y + changeVal/15, 1);
                        faceRef.current.position.y = faceRef.current.position.y + scaleVal * delta;
                        faceRef.current.rotation.x = faceRef.current.rotation.x + scaleVal * 2 * delta;
                        scaleVal += -0.005;
                        // faceRef.current.position.x = faceRef.current.position.x - 0.01;
                        changeVal++;
                    }
                } else {
                    if(changeVal <= -1400 * delta) {
                        setUp(true);
                        scaleVal = 0.06;
                    } else {
                        faceRef.current.lookAt(x, y + changeVal/15, 1);
                        faceRef.current.position.y = faceRef.current.position.y - scaleVal * delta;
                        faceRef.current.rotation.x = faceRef.current.rotation.x - scaleVal * 2 * delta;
                        scaleVal += -0.005;
                        changeVal--;
                    }
                }
            } else {
                if(goUp) {
                    play();
                    if(changeVal >= 100 * delta) {
                        setUp(false);
                        scaleVal = 0.06;
                    } else {
                        faceRef.current.lookAt(x, y + changeVal/15, 1);
                        faceRef.current.position.y = faceRef.current.position.y + (scaleVal * 0.1 * delta);
                        scaleVal += -0.005;
                        // faceRef.current.position.x = faceRef.current.position.x - 0.01;
                        changeVal++;
                    }
                } else {
                    if(changeVal <= -100 * delta) {
                        setUp(true);
                        scaleVal = 0.06;
                    } else {
                        faceRef.current.lookAt(x, y + changeVal/15, 1);
                        faceRef.current.position.y = faceRef.current.position.y - (scaleVal * 0.1 * delta);
                        scaleVal += -0.005;
                        changeVal--;
                    }
                }
            } 
            
        } else {
            scaleVal = 0;
            faceRef.current.position.x = 0;
            faceRef.current.position.y = -0.1;
            changeVal = 0;
            faceRef.current.lookAt(x, y, 1);
        }
       
        
    })

    return (

        <mesh ref={faceRef}>
            {/* <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1} /> */}
            {/* <spotLight intensity={3} distance={0.05} position={[0,1,10]}/> */}
            <spotLight intensity={1.3} position={[1, 0, 0]} />
            <ambientLight intensity={1.1} />
            <primitive
                object={face.scene}
                scale={isMobile ? 0.5 : 0.7}
                position={isMobile ? [0, 0, -2.2] : [0, -0.2, -1.5]}
            />
        </mesh>

    )
}

function Rig({mouseCoordsRef}) {
    const { camera, mouse } = useThree()
    const vec = new Vector3()
    return useFrame(() => {      
        var vector = new THREE.Vector3(mouseCoordsRef.current[0], mouseCoordsRef.current[1], 0.5);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        camera.position.lerp(vec.set(pos.x, pos.y, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
        
    })
}

const FacesCanvas = ({isHovering}) => {
    const mouseCoordsRef = useRef([]);
    const canvasRef = useRef();
    const inView = useContext(InViewContext);

    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 500px)');
        setMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event) => {
            setMobile(event.matches);
        }

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        document.addEventListener('mousemove', (event) => {
            const pos = [];
            event.preventDefault();
            pos[0] = (event.clientX / window.innerWidth) * 2 - 1;
            pos[1] = - (event.clientY / window.innerHeight) * 2 + 1;
            mouseCoordsRef.current = pos;
        });
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, [])

    return (
        <Canvas 
            ref={canvasRef}
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            dpr={inView ? window.devicePixelRatio : window.devicePixelRatio/15}
            antialias={false}
            
        >
            
            <Suspense>
                <OrbitControls
                    enabled={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Face isMobile={isMobile} mouseCoordsRef={mouseCoordsRef} isHovering={isHovering}/>
            </Suspense>
            <FaceChicken height={0.4} isHovering={isHovering} rotation={3.5} xPos={-3.5}/>
            <FaceChicken height={-0.8} isHovering={isHovering} rotation={3.5} xPos={-3.5}/>
            <FaceChicken height={0.4} isHovering={isHovering} rotation={0.5} xPos={3.5}/>
            <FaceChicken height={-0.8} isHovering={isHovering} rotation={0.5} xPos={3.5}/>
            <Preload all />
            <Rig mouseCoordsRef={mouseCoordsRef}/>
        </Canvas>
    )
}

export default FacesCanvas