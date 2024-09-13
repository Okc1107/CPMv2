import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 20);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 40;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// Gradient Background
const backgroundGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Color(0xf1c40f) }, // Top color
    color2: { value: new THREE.Color(0xf39c12) }, // Bottom color
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(mix(color2, color1, vUv.y), 1.0);
    }
  `,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
backgroundMesh.position.z = -1; // Position the background behind the scene
scene.add(backgroundMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 5);
spotLight.position.set(20, 60, 20);
spotLight.castShadow = true;
scene.add(spotLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 7); // Add a directional light
directionalLight.position.set(-10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Variable to track the loaded model
let loadedModel;

// GLTF Model Loading
const loader = new GLTFLoader().setPath('models/dino/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Adjust material properties for contrast
      if (child.material) {
        child.material.roughness = 0.5; // Reduce roughness for more sharp reflections
        child.material.metalness = 0.8; // Increase metalness for more shine
      }
    }
  });

  mesh.position.set(0, 1.05, -1);

  scene.add(mesh);
  loadedModel = mesh; // Save reference to the loaded model
}, undefined, (error) => {
  console.error(error);
});

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the model continuously
  if (loadedModel) {
    loadedModel.rotation.y += 0.001; // Adjust rotation speed as needed
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
