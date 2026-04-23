import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, currentModel, container;

export function init3DViewer() {
    container = document.getElementById('viewer3d-container');
    if (!container) {
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'viewer3d-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 2, 8);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.target.set(0, 0, 0);


    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 5, 3);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-2, 4, -3);
    scene.add(backLight);


    const gridHelper = new THREE.GridHelper(8, 16, 0x888888, 0x444444);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const backBtn = document.getElementById('back-to-catalog');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hide3DViewer();
        });
    }
}


export function show3DModel(modelPath, modelName) {
    if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
    }

    if (container) container.style.display = 'block';
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) contentContainer.style.display = 'none';
    const header = document.querySelector('.header');
    if (header) header.style.zIndex = '0';

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        currentModel = gltf.scene;

        if (modelName === 'Метро') currentModel.scale.set(0.6, 0.6, 0.6);
        if (modelName === 'МЦК') currentModel.scale.set(0.03, 0.03, 0.03);
        if (modelName === 'МЦД') currentModel.scale.set(0.4, 0.4, 0.4);

        const box = new THREE.Box3().setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        const minY = box.min.y;
        currentModel.position.y = -minY;
        currentModel.position.x = -center.x;
        currentModel.position.z = -center.z;

        scene.add(currentModel);
    });
}

export function hide3DViewer() {
    if (container) container.style.display = 'none';
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) contentContainer.style.display = 'block';
    const header = document.querySelector('.header');
    if (header) header.style.zIndex = '1000';

    if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
    }
}
