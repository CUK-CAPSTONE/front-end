import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import colorMapPath from '../obj/perfectt.jpg';
import mtlPath from '../obj/perfectm.mtl';
import objPath from '../obj/perfect.obj';

const Obj = () => {
    const { scene, camera } = useThree();

    useEffect(() => {
        const textureLoader = new TextureLoader();
        const loaderObj = new OBJLoader();
        const loaderMtl = new MTLLoader();
        const colorMap = textureLoader.load(colorMapPath);

        loaderMtl.load(mtlPath, (mtl) => {
            mtl.preload();
            loaderObj.setMaterials(mtl);
            loaderObj.load(objPath, (obj) => {
                // 모델의 크기 조정
                obj.scale.set(2, 2, 2); // 모든 축에 대해 2배로 확대
                obj.position.set(0, 0, 0);

                obj.traverse((child) => {
                    if (child.isMesh) {
                        child.material.map = colorMap;
                    }
                });
                scene.add(obj);

                // 카메라의 초기 위치 설정
                camera.position.set(5, 3, 0.5);
                camera.lookAt(obj.position);
            });
        });
    }, [scene, camera]);

    return null;
};

export default Obj;
