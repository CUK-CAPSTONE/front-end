import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useGlbBringer } from '../api/glbBringer';

const GlbReal = () => {
    const { scene, camera } = useThree();
    const { glb: glbData, loading } = useGlbBringer();
    const [modelUrl, setModelUrl] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("모델 로딩 중...");
            return;
        }

        if (!glbData) {
            console.log("3d 모델 받아오기 실패");
            return;
        }

        const url = URL.createObjectURL(glbData);
        setModelUrl(url);

        return () => URL.revokeObjectURL(url); // 메모리 누수 방지를 위해 URL 해제
    }, [glbData, loading]);

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
        scene.position.set(0, 0, 0);
    }, [scene]);

    return <primitive object={scene} />;
};

export default GlbReal;
