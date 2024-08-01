import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useCharacterAnimations } from '../../contexts/CharacterAnimations';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/Turkey.gltf');
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.turkey.geometry}
        material={materials.brownDark}
        material-color={Color}
      >
        <group position={[-0.144, 0, -0.19]} rotation={[0, 0.262, 0]} scale={1.305}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_leg.geometry}
            material={materials.brownDark}
            material-color={Color}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_leg_1.geometry}
            material={materials.brownLight}
            material-color={Color}
          />
        </group>
        <group position={[-0.144, 0, 0.19]} rotation={[0, -0.262, 0]} scale={1.305}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_leg_2.geometry}
            material={materials.brownDark}
            material-color={Color}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_leg_3.geometry}
            material={materials.brownLight}
            material-color={Color}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/Turkey.gltf');
