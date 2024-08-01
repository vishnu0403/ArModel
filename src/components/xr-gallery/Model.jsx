import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useCharacterAnimations } from '../../contexts/CharacterAnimations';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/car.gltf');
  const { actions, names } = useAnimations(animations, group);

  const { setAnimations, animationIndex, Color } = useCharacterAnimations();

  useEffect(() => {
    setAnimations(names);
  }, [names, setAnimations]);

  useEffect(() => {
    if (actions[names[animationIndex]]) {
      actions[names[animationIndex]].reset().fadeIn(0.5).play();

      return () => {
        actions[names[animationIndex]].fadeOut(0.5);
      };
    }
  }, [actions, names, animationIndex]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group scale={0.1}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder018_Cylinder007.geometry}
        material={materials.Car}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder018_Cylinder007_1.geometry}
        material={materials.Windshield}
      />
    </group>
  </group>
  );
}

useGLTF.preload('/models/car.gltf');
