import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

//Setting Up Scene and Camera
const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Loading Custom Mesh and Adding to Scene
const loader = new GLTFLoader();
loader.load( 'public/monk_character/scene.gltf', function ( gltf ) {
    
    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

//Setting Up Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x4a3a59);
document.body.appendChild( renderer.domElement );

//Creating and Adding Cube Mesh to Scene
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometry2 = new THREE.BoxGeometry( 5, 1, 5 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xc7c7c7 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.y =-1;
scene.add( cube2 );

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
scene.add( directionalLight );

camera.position.z = 5;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new PointerLockControls( camera, renderer.domElement);

// add event listener to show/hide a UI (e.g. the game's menu)
controls.addEventListener( 'lock', function () {

	menu.style.display = 'none';

} );

controls.addEventListener( 'unlock', function () {

	menu.style.display = 'block';

} );

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

// Check if WebGL is available in browser
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}