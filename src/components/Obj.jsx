import { useLoader, useThree } from '@react-three/fiber';
import React from 'react';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

const Obj = () => {
    const textureLoader = new TextureLoader();
    const loaderObj = new OBJLoader();
    const loaderMtl = new MTLLoader();
    const colorMap = textureLoader.load(require('../obj/catt.jpg'));

    const {scene,camera}= useThree();

    loaderMtl.load('models/obj/catm.mtl',
        mtl=>{
            mtl.preload();
            
            loaderObj.setMaterials(mtl);
            loaderObj.load(
                'models/obj/cat.obj',
                obj=>{
                    obj.children[0].material.map = colorMap;
                    // const geometry=new BoxGeometry(100,10,100);
                    // const newbox=Mesh(geometry,mtl);
                    // newbox.position.set(0, 10, 0);
                    // scene.add(newbox);
                    scene.add(obj);
                }
            )
        })
        
    // const materials=useLoader(MTLLoader,'models/obj/catm.mtl');
    // const texture=useLoader(TextureLoader,'models/obj/catt.jpg');
    // const object = useLoader(OBJLoader, 'models/obj/cat.obj', loader => {
    //     materials.preload();
    //     loader.setMaterials(materials);
    // })
    return (
        // <mesh position={[0,0, 0]}>
        //     <primitive object={object} scale={1.0}/>
        //     <meshBasicMaterial attach="material"/>
        //     <meshStandardMaterial map={texture}/>
        // </mesh>
        null
    );
};

export default Obj;