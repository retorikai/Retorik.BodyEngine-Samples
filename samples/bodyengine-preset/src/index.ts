import * as THREE from 'three';
import {
    Character,
    CreationTool
} from '@davi-ai/vanilla-bodyengine-three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';



let camera: THREE.PerspectiveCamera;
let orbitControls: OrbitControls;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let character: Character;
let visemeArray = [];
let rgbeLoader = new RGBELoader();

let WIDTH = 512*2;
let HEIGHT = 768*2;

let hdrList = {
    apartment: 'lebombo_1k.hdr',
    city: 'potsdamer_platz_1k.hdr',
    dawn: 'kiara_1_dawn_1k.hdr',
    forest: 'forest_slope_1k.hdr',
    lobby: 'st_fagans_interior_1k.hdr',
    night: 'dikhololo_night_1k.hdr',
    park: 'rooitou_park_1k.hdr',
    studio: 'studio_small_03_1k.hdr',
    sunset: 'venice_sunset_1k.hdr',
    warehouse: 'empty_warehouse_01_1k.hdr'
}

let toneMappings = {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
    Neutral: THREE.NeutralToneMapping,
}

let toneMapping = 'Neutral';



const init = async () => {


    await setupScene();
    await setupHDR('apartment');
    scene.environmentIntensity = 0.25; // Set the environment intensity
    presetThreePoint(scene);

    await setupCharacter();

    //setupLight();

    animate();
    setupTonemapping(toneMapping);
    //renderer.render(scene, camera);
    let hdrTexture = {}
    for (let hdr in hdrList) {
        hdrTexture[hdr] = await rgbeLoader.loadAsync("https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/" + hdrList[hdr]);
    }

    let i = 0;
    for (let hdr in hdrList) {
        i++
        console.log(hdr, hdrList[hdr]);
        await setupLoadedHDR(hdrTexture[hdr]);
        renderer.render(scene, camera);
        //screenshotThreeCanvas(renderer, `${hdr}_${toneMapping}`);
    }
    //screenshotThreeCanvas(renderer, "avatar");
};

const setupHDR = async (hdrName: string) => {
    let texture = await rgbeLoader.loadAsync("https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/" + hdrList[hdrName]);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.NoColorSpace
    scene.environment = texture;
}
const setupLoadedHDR = async (texture: THREE.DataTexture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.NoColorSpace
    scene.environment = texture;
}

const setupTonemapping = (type: string) => {
    renderer.toneMapping = toneMappings[type];
}

const setupScene = async () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);


    camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(0, 1.15, 3.2);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        precision: 'highp',
        powerPreference: 'high-performance'
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMappingExposure = 1;

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0.85, 0);
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 1.5;
    orbitControls.minPolarAngle = Math.PI / 4;
    orbitControls.minAzimuthAngle = -Math.PI / 3;
    orbitControls.maxAzimuthAngle = Math.PI / 3;
    document.body.appendChild(renderer.domElement);
    orbitControls.update();
}

const setupCharacter = async () => {
    character = new Character({
        camera: camera,
        url: 'https://cdn.retorik.ai/bodyengine-three/characters/avaturn/emma/emma.glb',
        gender: "female" as "female" | "male",
        type: CreationTool.avaturn,
        animationsUrl: "https://cdn.retorik.ai/bodyengine-three/animations/cc4/female/standingglb/",
        autoLookAt: true,
        license: "1c4416bf44696314",
    });
    await character.init();

    scene.add(character.character);

    if (character && character.character) {
        character.character.traverse((object) => {
            object.castShadow = true;
            object.receiveShadow = true;
        });
    }

    // Ajouter un sol pour visualiser les ombres
    const groundGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
    const groundMaterial = new THREE.ShadowMaterial({
        opacity: 0.25
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

function screenshotThreeCanvas(renderer, name) {
    const dataURL = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = name + '.png';
    link.click();
    link.remove()
}

const animate = () => {
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(scene, camera);
};

const onWindowResize = () => {
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
};

window.addEventListener('resize', onWindowResize, false);

init();

// Preset: 3 Point Lighting façon Unreal Engine
function presetThreePoint(scene: THREE.Scene) {
    // Key Light (fort, chaud, 45°)
    const keyLight = new THREE.DirectionalLight(0xfff2df, 2.2);
    keyLight.position.set(4, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    // Fill Light (doux, froid, opposé)
    const fillLight = new THREE.DirectionalLight(0xddeeff, 0.7);
    fillLight.position.set(-5, 2, 2);
    fillLight.castShadow = false;
    scene.add(fillLight);
    // Rim/Back Light (bleuté, arrière)
    const backLight = new THREE.DirectionalLight(0x6688ff, 0.8);
    backLight.position.set(0, 5, -6);
    backLight.castShadow = false;
    scene.add(backLight);
}

