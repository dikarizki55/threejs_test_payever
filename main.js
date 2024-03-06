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

const earthgeo = new THREE.SphereGeometry(1, 100, 100);
const textureLoader = new THREE.TextureLoader();
const earthmat = new THREE.MeshStandardMaterial({
  map: textureLoader.load("earthmap1k.jpg"),
});
const earth = new THREE.Mesh(earthgeo, earthmat);

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

const object = new THREE.Object3D();
object.add(earth);

function pinscountry(lat, lon) {
  const pin = new THREE.Mesh(pinsgeo, pinsmat);
  placeObjectOnPlanet(pin, lat, lon, 1);
  return pin;
}

const country = [
  {
    country: "netherlands",
    lat: 52.370216,
    lon: 4.895168,
  },
  {
    country: "belgium",
    lat: 51.260197,
    lon: 4.402771,
  },
  {
    country: "germany",
    lat: 52.520008,
    lon: 13.404954,
  },
  {
    country: "austria",
    lat: 48.210033,
    lon: 16.363449,
  },
  {
    country: "sweden",
    lat: 59.334591,
    lon: 18.06324,
  },
  {
    country: "finland",
    lat: 60.192059,
    lon: 24.945831,
  },
  {
    country: "norway",
    lat: 62,
    lon: 10,
  },
  {
    country: "denmark",
    lat: 55.676098,
    lon: 12.568337,
  },
  {
    country: "uk",
    lat: 51.509865,
    lon: -0.118092,
  },
];

const pin = [];

country.forEach((cou) => {
  pinscountry(cou.lat, cou.lon);
  pin.push(pinscountry(cou.lat, cou.lon));
});

pin.forEach((pintag) => {
  object.add(pintag);
});

console.log(pin);

// object.rotation.y = 1.0;
scene.add(object);

camera.position.set(0, 1.1, 1.1);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  object.rotation.y -= 0.005;

  renderer.render(scene, camera);
}

animate();
