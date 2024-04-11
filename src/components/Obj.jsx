import { useLoader } from '@react-three/fiber';
import React from 'react';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import sea_turtle from '../obj/sea_turtle.obj';
import turtle_texture from '../obj/sea_turtle_texture.jpg';
import { useTexture } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const Obj = () => {
    const model=useLoader(OBJLoader,sea_turtle);
    const texture=useTexture(turtle_texture);
    return (
        <mesh position={[0,0, 0]}>
            <primitive object={model} scale={4.0}/>
            <meshStandardMaterial map={texture} attach="meterial"/>
            {/* 텍스쳐 필요!!! 지금없음 */}
        </mesh>
    );
};

export default Obj;