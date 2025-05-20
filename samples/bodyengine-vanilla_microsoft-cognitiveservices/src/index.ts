import * as THREE from 'three';
import {
    Character,
    CreationTool
} from '@davi-ai/vanilla-bodyengine-three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

let camera: THREE.PerspectiveCamera;
let orbitControls: OrbitControls;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let character: Character;
let visemeArray = [];

const visemeCodes = new Map<number, string>([
    [0, "sil"],
    [1, "aa"],
    [2, "aa"],
    [3, "O"],
    [4, "E"],
    [5, "E"],
    [6, "I"],
    [7, "U"],
    [8, "O"],
    [9, "U"],
    [10, "O"],
    [11, "aa"],
    [12, "kk"],
    [13, "RR"],
    [14, "nn"],
    [15, "SS"],
    [16, "CH"],
    [17, "TH"],
    [18, "FF"],
    [19, "DD"],
    [20, "kk"],
    [21, "PP"],
]);

/* Voices lists
fr-FR-DeniseNeural (Female)
fr-FR-HenriNeural (Male)
fr-FR-VivienneMultilingualNeural4 (Female)
fr-FR-RemyMultilingualNeural4 (Male)
fr-FR-LucienMultilingualNeural4 (Male)
fr-FR-AlainNeural (Male)
fr-FR-BrigitteNeural (Female)
fr-FR-CelesteNeural (Female)
fr-FR-ClaudeNeural (Male)
fr-FR-CoralieNeural (Female)
fr-FR-EloiseNeural (Female, Child)
fr-FR-JacquelineNeural (Female)
fr-FR-JeromeNeural (Male)
fr-FR-JosephineNeural (Female)
fr-FR-MauriceNeural (Male)
fr-FR-YvesNeural (Male)
fr-FR-YvetteNeural (Female)
fr-FR-Remy:DragonHDLatestNeural (Male)
fr-FR-Vivienne:DragonHDLatestNeural (Female)
*/

const init = async () => {

    await setupScene();

    await setupCharacter();

    setupLight();

    setupAzureSpeech();

    animate();
};

const setupScene = async () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    let rgbeLoader = new RGBELoader();
    let texture = await rgbeLoader.loadAsync("./hdr.hdr");
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.environmentIntensity = 0.5; // Légèrement réduit pour plus de contraste

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.7, 3);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        precision: 'highp',
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 1.5;
    orbitControls.maxDistance = 5;
    orbitControls.target.set(0, 1.7, 0);
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 1.5;
    orbitControls.minPolarAngle = Math.PI / 4;
    orbitControls.minAzimuthAngle = -Math.PI / 3;
    orbitControls.maxAzimuthAngle = Math.PI / 3;
    document.body.appendChild(renderer.domElement);
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

const setupAzureSpeech = () => {
    const speechKey = "YOUR_SUBSCRIPTION_KEY"; // Replace with your Azure subscription key
    const serviceRegion = "francecentral"; // e.g., "eastus"

    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, serviceRegion);
    speechConfig.speechSynthesisVoiceName = "fr-FR-DeniseNeural"; // Optional: Choose a specific voice
    speechConfig.setProperty(
        // @ts-ignore
        sdk.PropertyId.SpeechServiceResponse_RequestViseme,
        'true'
    );
    // 1. Create a push stream to receive audio data
    const pushStream = sdk.AudioOutputStream.createPullStream();

    // 2. Create audio config from the push stream
    const audioConfig = sdk.AudioConfig.fromStreamOutput(pushStream);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);


    let lipSyncManager = character.characterStore.getState().lipSyncManager;

    let audioChunks = [];

    // 5. Collect audio data chunks as they come in
    // @ts-ignore 
    pushStream.write = (arrayBuffer) => {
        audioChunks.push(arrayBuffer);
    };

    let source: AudioBufferSourceNode | null = null;

    const closeStream = () => {
        // Called when synthesis is done — now we have full audio
        const totalLength = audioChunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
        const audioData = new Uint8Array(totalLength);
        let offset = 0;

        for (const chunk of audioChunks) {
            audioData.set(new Uint8Array(chunk), offset);
            offset += chunk.byteLength;
        }

        // @ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(audioData.buffer.slice(0)).then(decoded => {
            source = audioContext.createBufferSource();
            source.buffer = decoded;
            source.connect(audioContext.destination);

            const startTime = audioContext.currentTime;
            console.log(`🟢 Audio playback started at ${startTime}`);
            lipSyncManager.start();

            for (let v of visemeArray) {
                lipSyncManager.PlayVisemeAsync(v.name, v.time);
            }

            source.onended = () => {
                const endTime = audioContext.currentTime;
                console.log(`🔴 Audio playback ended at ${endTime}`);
                console.log(`⏱️ Duration: ${(endTime - startTime) * 1000} ms`);
                visemeArray = [];
                audioChunks = [];
                lipSyncManager.stop();
            };

            source.start();
        });
    };

    synthesizer.visemeReceived = (s, e) => {
        visemeArray.push({ name: visemeCodes.get(e.visemeId), time: (e.audioOffset) / 10000 })
    };


    document.getElementById('submit')?.addEventListener('click', () => {
        if (source) {
            source.stop();
            source.disconnect();
            visemeArray = [];
            audioChunks = [];
            lipSyncManager.stop();
            console.log("🔴 Audio Deleted");
        }
        const text = (document.getElementById('input') as HTMLInputElement).value;
        text && synthesizer.speakTextAsync(
            text,
            result => {
                closeStream();
            });
        (document.getElementById('input') as HTMLInputElement).value = "";
    })


    synthesizer.speakTextAsync(
        "Bonjour, tapez du texte dans le champ en bas de page puis cliquez sur le bouton 'Envoyer' pour m'entendre parler.",
        () => {
            closeStream();
        });
}

const setupLight = () => {
    // Configuration d'éclairage trois points améliorée
    // 1. Lumière principale (Key Light)
    const keyLight = new THREE.DirectionalLight(0xfff5e8, 1); // Plus chaude
    keyLight.position.set(3, 4, 2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 512;
    keyLight.shadow.mapSize.height = 512;
    keyLight.shadow.camera.near = 3;
    keyLight.shadow.camera.far = 7.5;
    keyLight.shadow.camera.left = -1;
    keyLight.shadow.camera.right = 1;
    keyLight.shadow.camera.top = 1;
    keyLight.shadow.camera.bottom = -1;
    keyLight.shadow.bias = -0.0005;
    // Cible pour diriger la lumière précisément
    keyLight.target.position.set(0, 1, 0);
    scene.add(keyLight.target);
    scene.add(keyLight);

    // 2. Lumière d'appoint (Fill Light)
    const fillLight = new THREE.DirectionalLight(0xe6f0ff, 0.4);
    fillLight.position.set(-4, 2, 1);
    scene.add(fillLight);

    // 3. Contre-jour (Back Light)
    const backLight = new THREE.DirectionalLight(0xfff0e8, 0.6);
    backLight.position.set(1, 3, -3);
    backLight.shadow.mapSize.width = 1024;
    backLight.shadow.mapSize.height = 1024;
    backLight.shadow.camera.near = 0.1;
    backLight.shadow.camera.far = 20;
    backLight.shadow.bias = -0.0005;
    scene.add(backLight);
    // 4. Lumière d'accent subtile
    const accentLight = new THREE.PointLight(0xffebcd, 0.4);
    accentLight.position.set(-2, 0.5, 3);
    accentLight.distance = 5;
    accentLight.decay = 2;
    scene.add(accentLight);
}

const animate = () => {
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(scene, camera);
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize, false);

init();