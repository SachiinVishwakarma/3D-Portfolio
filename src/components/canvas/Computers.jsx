import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Component that renders both the computer and robot models
const CombinedScene = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const robotRef = useRef();
  
  // Load the robot model with animations
  const robot = useGLTF("./robot_rocket.glb");
  
  // Access the animations
  const { animations } = robot;
  const { actions, names } = useAnimations(animations, robotRef);
  
  // Play the first animation when the component mounts
  useEffect(() => {
    if (names.length > 0) {
      // Play the first available animation
      actions[names[0]]?.reset().play();
      console.log("Available robot animations:", names);
    } else {
      console.log("No animations found in the model");
    }
  }, [actions, names]);
  
  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Computer Model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 1}
        position={isMobile ? [0, -3, -2.2] : [0, -3.37, -1.6]}
        rotation={[-0.01, -0.2, -0.1]}
      />
      
      {/* Robot Model with Animations */}
      <primitive
        ref={robotRef}
        object={robot.scene}
        scale={isMobile ? 0.6 : 0.65}
        position={isMobile ? [2.0, -3, -2.2] : [-1, -2.0, 5.6]}
        rotation={[-0.01, 1.6, 0]}
      />
    </group>
  );
};

const CombinedCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'  // Changed to 'always' to ensure animations run
      shadows
      dpr={[1, 2]}
      camera={{ position: [23, 1, 5], fov: 29 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <CombinedScene isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

// Preload models to improve loading performance
useGLTF.preload("./desktop_pc/scene.gltf");
useGLTF.preload("./robot_rocket.glb");

export default CombinedCanvas;