import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useObjBringer } from '../api/objBringer';

const ObjReal = () => {
    const { scene, camera } = useThree();
    const { obj: objData, loading } = useObjBringer();

    useEffect(() => {
        if (loading) {
            console.log("모델 로딩 중...");
            return;
        }

        if (!objData) {
            console.log("3d 모델 받아오기 실패");
            return;
        }

        const loaderObj = new OBJLoader();

        // Assuming objData contains the URL or data for the OBJ file
        loaderObj.load(URL.createObjectURL(objData), (obj) => {
            // 모델의 크기 조정
            obj.scale.set(2, 2, 2); // 모든 축에 대해 2배로 확대
            obj.position.set(0, 0, 0);

            scene.add(obj);

            // 카메라의 초기 위치 설정
            camera.position.set(5, 3, 0.5);
            camera.lookAt(obj.position);
        });
    }, [objData, loading]);

    return null;
};

export default ObjReal;
