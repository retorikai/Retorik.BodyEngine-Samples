# bodyengine-vanilla_microsoft-cognitiveservices

## Introduction

This sample demonstrates how to use Retorik.BodyEngine-three with Microsoft Azure Cognitive Services.

## Installation of required packages

```shell
npm install
```

## Configuration

```typescript
declare interface CharacterProps_2 extends SpeechSynthesisOptions {
    url: string;
    gender?: "male" | "female";
    animationsUrl?: string;
    type: CreationTool;
    camera: THREE.Camera;
    autoLookAt?: boolean;
    license?: string;
}
```

```typescript
declare enum CreationTool {
    cc3 = 1,
    rpm = 2,
    avatarsdk = 3,
    avaturn = 4
}
```

- camera: [THREE.PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) (Scene camera)

- url: Path to the 3D model corresponding to the character

- gender: Character's gender

- animationsUrl: Path to the folder containing the animations

- type: Character model type

- autoLookAt: Whether the character should look at the camera

- license: License key

Here is how to instantiate the character:

```javascript
let character = new Character({
        camera: camera,
        url: "https://cdn.retorik.ai/bodyengine-three/characters/avaturn/emma/emma.glb",
        gender: "female" ,
        type: CreationTool.avaturn,
        animationsUrl: "https://cdn.retorik.ai/bodyengine-three/animations/cc4/female/standingglb/",
        autoLookAt: true,
        license: "1c4416bf44696314"
    });
await character.init();
```

## 3D Model

The 3D model must be in glTF/glb format for Avaturn, ReadyPlayerMe and AvatarSDK.

The 3D model must be in FBX format for CC3.

## Animation

```typescript
enum AnimationProvider {
  none = "none",
  mixamo = "mixamo",
  actorcore = "actorcore",
  cc4 = "cc4",
}
```

Animations must be contained in a folder with a file named list.json.

This list.json file must declare all the animations the character will use.

- The first value of the array is the URL of the animation file. This value must have idle or explain as a prefix. This allows you to determine which animations are played when the character is idle or when the character is speaking.

- The second value is a value of type AnimationProvider.

```json
[
    ["./idle1.glb", "mixamo"],
    ["./idle2.glb", "mixamo"],
    ["./idle3.glb", "mixamo"],
    ["./idle4.glb", "mixamo"],
    ["./idle5.glb", "mixamo"],
    ["./idle6.glb", "mixamo"],
    ["./idle7.glb", "mixamo"],
    ["./idle8.glb", "mixamo"],
    ["./idle9.glb", "mixamo"],
    ["./explain1.glb", "mixamo"],
    ["./explain2.glb", "mixamo"],
    ["./explain3.glb", "mixamo"],
    ["./explain4.glb", "mixamo"],
    ["./explain5.glb", "mixamo"],
    ["./explain6.glb", "mixamo"]
]
```

## Microsoft Azure Cognitive Services

To use Microsoft Azure Cognitive Services, you need to create an account and obtain a subscription key.

You must also enable the Visemes API to generate the visemes to use with character when generating audio.

Finally replace the subscription key in the code:

```javascript
const subscriptionKey = "YOUR_SUBSCRIPTION_KEY";
```
