import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const GlbReal = ({ glbData, loading }) => {
    const { scene, camera } = useThree();
    const [modelUrl, setModelUrl] = useState(null);

    useEffect(() => {
        if (!loading && glbData) {
            const url = URL.createObjectURL(glbData);
            setModelUrl(url);
            return () => URL.revokeObjectURL(url); // 메모리 누수 방지를 위해 URL 해제
        }
    }, [glbData, loading]);

    if (!glbData) {
        console.log("3D 모델 받아오기 실패");
        return 
    }

    return (
        <>
            {modelUrl && (
                <ModelViewer url={modelUrl} />
            )}
            <OrbitControls />
        </>
    );
};

const ModelViewer = ({ url }) => {
    const { scene } = useGLTF(url);

    useEffect(() => {
        scene.scale.set(5, 5, 5); // 모든 축에 대해 2배로 확대
        scene.position.set(0, -1, -2);
    }, [scene]);

    return <primitive object={scene} />;
};

export default GlbReal;
