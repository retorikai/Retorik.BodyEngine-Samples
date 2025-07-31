import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three';
import {
    Character,
    CreationTool,
} from '@davi-ai/vanilla-bodyengine-three';
import { CharacterState } from "@davi-ai/bodyengine-three";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { Environment } from '@react-three/drei';

const speechKey = "28b43016779a47d7bbd6959b9516f1ef"; // Replace with your Azure subscription key
const serviceRegion = "francecentral"; // e.g., "eastus"

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


function Agent(props: { message?: string }) {
    const { camera } = useThree();
    const [character3D, setCharacter3D] = useState<THREE.Object3D>();
    const [character, setCharacter] = useState<Character>();
    const [lastMessage, setMessage] = useState<string>();
    const [synthesizer, setSynthesizer] = useState<sdk.SpeechSynthesizer>();
    const audioChunks = useRef<Uint8Array[]>([]);
    const source = useRef<AudioBufferSourceNode | null>(null);
    const lipSyncManager = useRef(null);
    const visemeArray = useRef<{ name: string, time: number }[]>([]);

    useEffect(() => {

        const initRetorikAgent = async () => {
            let newAgent = new Character({
                camera: camera,
                url: 'https://cdn.retorik.ai/bodyengine-three/characters/avaturn/emma/emma.glb',
                gender: "female" as "female" | "male",
                type: CreationTool.avaturn,
                animationsUrl: "https://cdn.retorik.ai/bodyengine-three/animations/cc4/female/standingglb/",
                autoLookAt: true,
                license: "1c4416bf44696314",
            });
            await newAgent.init();
            newAgent.character.traverse((object) => {
                object.castShadow = true;
                object.receiveShadow = true;
            });

            setCharacter3D(newAgent.character)
            setCharacter(newAgent)
        }

        initRetorikAgent();
    }, [])

    const closeStream = () => {
        // Called when synthesis is done — now we have full audio
        const totalLength = audioChunks.current.reduce((sum, chunk) => sum + chunk.byteLength, 0);
        const audioData = new Uint8Array(totalLength);
        let offset = 0;

        for (const chunk of audioChunks.current) {
            audioData.set(new Uint8Array(chunk), offset);
            offset += chunk.byteLength;
        }

        // @ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(audioData.buffer.slice(0)).then(decoded => {
            source.current = audioContext.createBufferSource();
            source.current.buffer = decoded;
            source.current.connect(audioContext.destination);

            const startTime = audioContext.currentTime;
            console.log(`🟢 Audio playback started at ${startTime}`);
            character.characterStore.getState().setCharacterState(CharacterState.speaking)
            lipSyncManager.current.start();

            for (let v of visemeArray.current) {
                lipSyncManager.current.PlayVisemeAsync(v.name, v.time);
            }

            source.current.onended = () => {
                const endTime = audioContext.currentTime;
                console.log(`🔴 Audio playback ended at ${endTime}`);
                console.log(`⏱️ Duration: ${(endTime - startTime) * 1000} ms`);
                visemeArray.current = [];
                audioChunks.current = [];
                lipSyncManager.current.stop();
                character.characterStore.getState().setCharacterState(CharacterState.idle)
            };

            source.current.start();
        });
    };

    const stopSpeaking = () => {
        if (source.current) {
            source.current.stop();
            source.current.disconnect();
            visemeArray.current = [];
            audioChunks.current = [];
            lipSyncManager.current.stop();
            console.log("🔴 Audio Deleted");
        }
    }

    useEffect(() => {
        if (character) {
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
            setSynthesizer(synthesizer);
            lipSyncManager.current = character.characterStore.getState().lipSyncManager;

            audioChunks.current = [];

            // 5. Collect audio data chunks as they come in
            // @ts-ignore 
            pushStream.write = (arrayBuffer) => {
                audioChunks.current.push(arrayBuffer);
            };

            source.current = null;

            synthesizer.visemeReceived = (s, e) => {
                visemeArray.current.push({ name: visemeCodes.get(e.visemeId), time: (e.audioOffset) / 10000 })
            };

            document.getElementById('submit')?.addEventListener('click', () => {
                if (source.current) {
                    stopSpeaking();
                }
                const text = (document.getElementById('input') as HTMLInputElement).value;
                text && synthesizer.speakTextAsync(
                    text,
                    result => {
                        closeStream();
                    });
                (document.getElementById('input') as HTMLInputElement).value = "";
            })

            setMessage("Bonjour, tapez du texte dans le champ en bas de page puis cliquez sur le bouton 'Envoyer' pour m'entendre parler.");
        }

    }, [character]);

    useEffect(() => {
        if (synthesizer) {
            synthesizer.speakTextAsync(
                "Bonjour, tapez du texte dans le champ en bas de page puis cliquez sur le bouton 'Envoyer' pour m'entendre parler.",
                () => {
                    closeStream();
                });
        }
    }, [lastMessage]);

    useEffect(() => {
        stopSpeaking();
        setMessage(props.message);
    }, [props.message]);

    useFrame(() => {
        if (character) {
            character.update();
        }
    })


    if (!character) return null;
    return (
        <mesh>
            <primitive object={character3D} />
            <Environment preset={"city"} environmentIntensity={0.75} />
        </mesh>
    )
}

createRoot(document.getElementById('root')).render(
    <Canvas
        gl={{
            toneMapping: THREE.NeutralToneMapping // or other tone mapping
        }}
        camera={{ position: [0, 1.35, 4.8], rotation: [-0.1, 0, 0], fov: 25 }} >
        <Agent></Agent>
        <directionalLight position={[-15, 2.45, 25]} intensity={1.5} castShadow>
            <orthographicCamera attach="shadow-camera" args={[-1.5, 1.5, 2, -2]} />
        </directionalLight>
    </Canvas>

)