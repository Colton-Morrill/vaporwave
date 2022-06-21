
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import * as jQuery from 'jquery';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import { sRGBEncoding } from "three";

const TEXTURE_PATH = "assets/textures/grid.png";
const DISPLACEMENT_PATH = "assets/textures/displacement.png";
const METALNESS_PATH = "assets/textures/metalness.png";
var screenWidth = window.innerWidth;
// Textures
const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load(TEXTURE_PATH);
const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
const metalnessTexture = textureLoader.load(METALNESS_PATH);

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
// Scene
const scene = new THREE.Scene();

//Load background texture
const loader = new THREE.TextureLoader();
loader.load('assets/images/newpic.jpg', function (texture) {
    texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;
    var repeatX, repeatY;
    var clothWidth = window.innerWidth;
    var clothHeight = window.innerHeight;
    console.log(clothWidth, clothHeight);
    var textureSettingh = 4500;
    var textureSettingw = 9992;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    repeatX = clothWidth * textureSettingh / (clothHeight * textureSettingw);
    console.log(repeatX);
    repeatY = 1;
    texture.repeat.set(repeatX, repeatY);
    texture.offset.x = (repeatX - 1) / 2 * -1;
});

window.addEventListener("resize", () => {
    const loader = new THREE.TextureLoader();
    loader.load('assets/images/newpic.jpg', function (texture) {
        texture.encoding = THREE.sRGBEncoding;
        scene.background = texture;
        var repeatX, repeatY;
        var clothWidth = window.innerWidth;
        var clothHeight = window.innerHeight;
        console.log(clothWidth, clothHeight);
        var textureSettingh = 4500;
        var textureSettingw = 9992;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        repeatX = clothWidth * textureSettingh / (clothHeight * textureSettingw);
        console.log(repeatX);
        repeatY = 1;
        texture.repeat.set(repeatX, repeatY);
        texture.offset.x = (repeatX - 1) / 2 * -1;
    });
});



// Fog
const fog = new THREE.Fog("#000000", 1, 2.5);
scene.fog = fog;

// Objects
var geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
if (screenWidth <= 950) {
    geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
}
else {
    geometry = new THREE.PlaneGeometry(4, 2, 24, 24);
}

const material = new THREE.MeshStandardMaterial({
    map: gridTexture,
    displacementMap: terrainTexture,
    displacementScale: 0.75,
    /**
     * Add a metalnessMap to our material that will tell the renderer
     * where the "rough" parts of our terrains are
     */
    metalnessMap: metalnessTexture,
    /**
     * Make the terrain very very metallic so it will reflect the light
     * and not diffuse it: it will stay black
     */
    metalness: 0.96,
    /**
     * Make the terrain a bit rough so the rough parts will diffuse the light
     * well
     */
    roughness: 0.5,
});


var workBox = textureLoader.load('front-box.png');
workBox.encoding = sRGBEncoding;
var sideBox = textureLoader.load('assets/images/side-box.png');
sideBox.encoding = sRGBEncoding;
var frontAbout = textureLoader.load('assets/images/front-about.png');
frontAbout.encoding = sRGBEncoding;

var frontWork = textureLoader.load('assets/images/front-work.png');
frontWork.encoding = sRGBEncoding;

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: sideBox}), //right side
    new THREE.MeshBasicMaterial({ map: sideBox}), //left side
    new THREE.MeshBasicMaterial({color: 0x000000}), //top side
    new THREE.MeshBasicMaterial({color: 0x000000}), //bottom side
    new THREE.MeshBasicMaterial({map: workBox}), //front side
    new THREE.MeshBasicMaterial({ map: sideBox}), //back side
];
const cubeMaterialsAbout = [
    new THREE.MeshBasicMaterial({ map: sideBox}), //right side
    new THREE.MeshBasicMaterial({ map: sideBox}), //left side
    new THREE.MeshBasicMaterial({color: 0x000000}), //top side
    new THREE.MeshBasicMaterial({color: 0x000000}), //bottom side
    new THREE.MeshBasicMaterial({map: frontAbout}), //front side
    new THREE.MeshBasicMaterial({ map: sideBox}), 
];

const cubeMaterialsWork = [
    new THREE.MeshBasicMaterial({ map: sideBox}), //right side
    new THREE.MeshBasicMaterial({ map: sideBox}), //left side
    new THREE.MeshBasicMaterial({color: 0x000000}), //top side
    new THREE.MeshBasicMaterial({color: 0x000000}), //bottom side
    new THREE.MeshBasicMaterial({map: frontWork}), //front side
    new THREE.MeshBasicMaterial({ map: sideBox}), 
];
 
const cube = new THREE.Mesh(geometry2, cubeMaterialsWork);
const cube2 = new THREE.Mesh(geometry2, cubeMaterialsAbout);
const cube3 = new THREE.Mesh(geometry2, cubeMaterials);

var width = 0.125,
    height = 0.16,
    length = 0.025;



cube.scale.x = width;
cube.scale.y = height;
cube.scale.z = length;
cube.position.y = 0.1;
cube.position.z = 0.5;
cube.rotation.y = 0.35;
cube.rotation.x = 0.15;
cube.name = 'middle';

cube2.scale.x = width;
cube2.scale.y = height;
cube2.scale.z = length;
cube2.position.y = 0.1;
cube2.position.z = 0.5;
cube2.position.x = 0.25;
cube2.rotation.y = 0.15;
cube2.rotation.x = -0.05;
cube2.name = "right";

cube3.scale.x = width;
cube3.scale.y = height;
cube3.scale.z = length;
cube3.position.y = 0.1;
cube3.position.z = 0.5;
cube3.position.x = -0.25;
cube3.rotation.y = 0.75;
cube3.rotation.x = 0.15;
cube3.rotation.z = -0.05;
cube3.name = 'left';


if (screenWidth <= 950) {
    scene.remove(cube);
    scene.remove(cube2);
}
else {
    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3);
}

// const fbxLoader = new FBXLoader();
// fbxLoader.load(
//     'assets/models/nes.fbx',
    
//     (nes) => {  nes.traverse(function (child) {
//             if ((child as THREE.Mesh).isMesh) {
//                 (child as THREE.Mesh).material = nesMaterial
//                 if ((child as THREE.Mesh).material) {
//                     ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
//                 }
//             }
//         })
//         var width = 0.125,
//         height = 0.15,
//         length = 0.025;

//         nes.scale.x = width;
//         nes.scale.y = height;
//         nes.scale.z = length;
//         nes.position.y = 0.1;
//         nes.position.z = 0.5;
//         nes.rotation.y = 0.35;
//         nes.rotation.x = 0.25;
//         nes.name = 'middle';
//         nes.scale.set(.01, .01, .01)
//         scene.add(nes)}
// )

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.0;
plane.position.z = 0.15;


const plane2 = new THREE.Mesh(geometry, material);
plane2.rotation.x = -Math.PI * 0.5;
plane2.position.y = 0.0;
plane2.position.z = -1.85; // 0.15 - 2 (the length of the first plane)

scene.add(plane);
scene.add(plane2);

// Light
// Ambient Light
const ambientLight = new THREE.AmbientLight("#800fff", 10);
scene.add(ambientLight);


// Right Spotlight aiming to the left
const spotlight = new THREE.SpotLight("#8000ff", 20, 25, Math.PI * 0.1, 0.25);
spotlight.position.set(0.5, 0.75, 2.2);
// Target the spotlight to a specific point to the left of the scene
spotlight.target.position.x = -0.25;
spotlight.target.position.y = 0.25;
spotlight.target.position.z = 0.25;
scene.add(spotlight);
scene.add(spotlight.target);

// Left Spotlight aiming to the right
const spotlight2 = new THREE.SpotLight("#8000ff", 20, 25, Math.PI * 0.1, 0.25);
spotlight2.position.set(-0.5, 0.75, 2.2);
// Target the spotlight to a specific point to the right side of the scene
spotlight2.target.position.x = 0.25;
spotlight2.target.position.y = 0.25;
spotlight2.target.position.z = 0.25;
scene.add(spotlight2);
scene.add(spotlight2.target);


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.01,
    20
);
camera.position.x = 0;
camera.position.y = 0.06;
camera.position.z = 1.1;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = false;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
// Post Processing
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(sizes.width, sizes.height);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);


const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionPass);

// Event listener to handle screen resize
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();

// Animate
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls
    controls.update();

    plane.position.z = (elapsedTime * 0.15) % 2;
    plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

    // Render
    // renderer.render(scene, camera);
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

const pickableObjects: THREE.Mesh[] = []
let intersectedObject: THREE.Object3D | null

const raycaster = new THREE.Raycaster()
let intersects: THREE.Intersection[]
pickableObjects.push(cube, cube2, cube3)

const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } =
    {}
const highlightedMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00
})

if (screenWidth >= 950) {
    document.addEventListener('mousedown', onDocumentMouseMove, false)
    document.addEventListener('mousemove', onDocumentMouseGrow, false)
}
else {

}

function onDocumentMouseGrow(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    )
    intersects = raycaster.intersectObjects(pickableObjects, false)
    if (intersects.length > 0) {
        var width = 0.15,
            height = 0.2,
            length = 0.03;
        intersectedObject = intersects[0].object
        intersectedObject.scale.x = width;
        intersectedObject.scale.y = height;
        intersectedObject.scale.z = length;
        jQuery('html').css('cursor', 'pointer');
    } else {
        var width = 0.125,
            height = 0.16,
            length = 0.025;
        intersectedObject = null
        pickableObjects[0].scale.x = width;
        pickableObjects[0].scale.y = height;
        pickableObjects[0].scale.z = length;
        pickableObjects[1].scale.x = width;
        pickableObjects[1].scale.y = height;
        pickableObjects[1].scale.z = length;
        pickableObjects[2].scale.x = width;
        pickableObjects[2].scale.y = height;
        pickableObjects[2].scale.z = length;
        jQuery('html').css('cursor', 'auto');
    }
}
function onDocumentMouseMove(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    )
    intersects = raycaster.intersectObjects(pickableObjects, false)
    if (screenWidth >= 950) {
        document.addEventListener('mousedown', onDocumentMouseMove, false)
        document.addEventListener('mousemove', onDocumentMouseGrow, false)
    
    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
        var selectedBox = intersectedObject.name;
        switch (selectedBox) {
            case 'left':
                document.body.className += ' default-cursor';
                var element = document.getElementsByClassName('popup3')[0];
                element.classList.remove('d-none');
                break;
            case 'middle':
                document.body.className += ' default-cursor';
                var element = document.getElementsByClassName('popup')[0];
                element.classList.remove('d-none');
                break;
            case 'right':
                document.body.className += ' default-cursor';
                var element = document.getElementsByClassName('popup2')[0];
                element.classList.remove('d-none');
                break;
        }
        document.removeEventListener('mousedown', onDocumentMouseMove, false)
        document.removeEventListener('mousemove', onDocumentMouseGrow, false)

    }} else {
        intersectedObject = null
    }
}

jQuery( ".close-button" ).click(function() {
    jQuery('.window-cont').addClass('d-none');
    jQuery('body').removeClass('default-cursor');
    document.addEventListener('mousedown', onDocumentMouseMove, false)
    document.addEventListener('mousemove', onDocumentMouseGrow, false)
  });



