import * as THREE from "three";
import { TextureLoader } from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = 0.5;
// scene.add(cube);

const earthgeo = new THREE.SphereGeometry(1, 100, 100);
const textureLoader = new THREE.TextureLoader();
const earthmat = new THREE.MeshStandardMaterial({
  map: textureLoader.load("earthmap1k.jpg"),
});
const earth = new THREE.Mesh(earthgeo, earthmat);
// scene.add(earth);

const light = new THREE.PointLight(0xffffff, 3, 1000);
light.position.set(2, 0, 3);
scene.add(light);

const light2 = new THREE.AmbientLight(0xffffff, 0.02);
scene.add(light2);

function placeObjectOnPlanet(object, lat, lon, radius) {
  var latRad = lat * (Math.PI / 180);
  var lonRad = -lon * (Math.PI / 180);
  object.position.set(
    Math.cos(latRad) * Math.cos(lonRad) * radius,
    Math.sin(latRad) * radius,
    Math.cos(latRad) * Math.sin(lonRad) * radius
  );
  object.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
}

const pinsgeo = new THREE.SphereGeometry(0.005, 10, 10);
const pinsmat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const pinsneth = new THREE.Mesh(pinsgeo, pinsmat);
placeObjectOnPlanet(pinsneth, 52.370216, 4.895168, 1);

const pinsbel = new THREE.Mesh(pinsgeo, pinsmat);
placeObjectOnPlanet(pinsbel, 51.260197, 4.402771, 1);

const object = new THREE.Object3D();
object.add(earth);
object.add(pinsneth);
object.add(pinsbel);
// object.rotation.y = 1.0;
scene.add(object);

camera.position.set(0, 1.1, 1.1);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  object.rotation.y -= 0.005;
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
