
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import * as jQuery from 'jquery';

const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
const DISPLACEMENT_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png";
const METALNESS_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png";

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
loader.load('assets/images/newpic.jpg' , function(texture)
            {
             scene.background = texture;  
             var repeatX, repeatY;
             var clothWidth = window.innerWidth;
             var clothHeight = window.innerHeight;
             var textureSettingh = 406;
             var textureSettingw = 423;
             texture.wrapS = THREE.ClampToEdgeWrapping;
             texture.wrapT = THREE.RepeatWrapping;
            repeatX = clothWidth * textureSettingh / (clothHeight * textureSettingw);
            repeatY = 1;
            texture.repeat.set(repeatX, repeatY);
            texture.offset.x = (repeatX - 1) / 2 * -1;
            });

            

// Fog
const fog = new THREE.Fog("#000000", 1, 2.5);
scene.fog = fog;

// Objects
const geometry = new THREE.PlaneGeometry(4, 2, 24, 24);
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
const boxArt = new THREE.TextureLoader().load('boxart.png')
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( {map: boxArt,} );
const cube = new THREE.Mesh( geometry2, material2 );
const cube2 = new THREE.Mesh( geometry2, material2 );

var width = 0.125,
        height = 0.15,
        length = 0.025;

    cube.scale.x = width;
    cube.scale.y = height;
    cube.scale.z = length;
    cube.position.y = 0.2;
    cube.position.z = 0.5;
    cube.rotation.y = 0.35;
    cube.rotation.x = 0.25;
    cube.name = 'middle';

    cube2.scale.x = width;
    cube2.scale.y = height;
    cube2.scale.z = length;
    cube2.position.y = 0.2;
    cube2.position.z = 0.5;
    cube2.position.x = 0.25;
    cube2.rotation.y = 0.15;
    cube2.rotation.x = -0.05;
    cube2.name = "right";
scene.add( cube );
scene.add( cube2 );



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
const ambientLight = new THREE.AmbientLight("#ffffff", 10);
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
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enabled = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
pickableObjects.push(cube, cube2)

const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } =
    {}
const highlightedMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00
})

document.addEventListener('mousedown', onDocumentMouseMove, false)
document.addEventListener('mousemove', onDocumentMouseGrow, false)
function onDocumentMouseGrow(event: MouseEvent) {
  raycaster.setFromCamera(
      {
          x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
          y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      },
      camera
  )
  intersects = raycaster.intersectObjects(pickableObjects, false)
  var frame = 0.5;
  if (intersects.length > 0) {
      var width = 0.25,
          height = 0.3,
          length = 0.05;
      intersectedObject = intersects[0].object
      intersectedObject.scale.x = width;
      intersectedObject.scale.y = height;
      intersectedObject.scale.z =length;
      jQuery('html').css('cursor', 'pointer');
  } else  {
    var width = 0.125,
        height = 0.15,
        length = 0.025;
        intersectedObject = null
        pickableObjects[0].scale.x = width;
        pickableObjects[0].scale.y = height;
        pickableObjects[0].scale.z = length;
        pickableObjects[1].scale.x = width;
        pickableObjects[1].scale.y = height;
        pickableObjects[1].scale.z = length;
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

    if (intersects.length > 0) {
        console.log('working')
        var element = document.getElementsByClassName('popup')[0];
        element.classList.remove('d-none');

    } else {
        intersectedObject = null
    }
}



           