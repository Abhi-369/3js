// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
// import * as dat from 'dat.gui';
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
// import * as Stats from 'three/examples/jsm/helpers/Stats'

let camera, scene, renderer, control, loader, mixer, mixer2, mixer3, audio;

// const gui = new dat.GUI();

// const first = new THREE.FirstPerson

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2300)
renderer = new THREE.WebGL1Renderer({ antialias: true, powerPreference: 'high-performance' })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
document.body.appendChild(renderer.domElement)

camera.position.set(0, 300, 500)

control = new THREE.OrbitControls(camera, renderer.domElement)
control.maxPolarAngle = Math.PI / 2
control.minDistance = 100
control.maxDistance = 310
control.autoRotate = true
control.enableDamping = true
control.dampingFactor = 0.5
control.autoRotateSpeed = 1

control.addEventListener("change", () => renderer.render(scene, camera));

// const box = new THREE.BoxBufferGeometry(10, 10, 0.1)
// const material = new THREE.MeshBasicMaterial({ color: 0x001913, side: THREE.DoubleSide })
// const mesh = new THREE.Mesh(box, material)
// mesh.rotation.x = Math.PI / 2

// const box2 = new THREE.BoxBufferGeometry(100, 5, 0.1)
// const material2 = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
// const mesh2 = new THREE.Mesh(box2, material2)
// mesh2.rotation.x = Math.PI / 2
// mesh2.position.set(0, 0, 8)

const txt = new THREE.TextureLoader()
const txtload = txt.load('/img/texture.jpg')

const plane_2 = new THREE.BoxBufferGeometry(670, 670, 5)
const material_2 = new THREE.MeshBasicMaterial({ color: 0xD5CEE4, map: txtload })
const box_2 = new THREE.Mesh(plane_2, material_2)
box_2.position.set(0, -3, -20)
box_2.rotateX(-Math.PI / 2)

scene.add(box_2)

const ambient = new THREE.AmbientLight(0xEFA0AA, 1)

const point = new THREE.PointLight(0xC6C6A7, 1)
scene.add(ambient, point)

// rgbeloader for scene background
const loader2 = new THREE.RGBELoader()
loader2.load('/hdr/city.hdr', function (texture) {
  scene.background = texture
  texture.mapping = THREE.EquirectangularRefractionMapping
})

const progressBar = document.getElementById('progress-bar')

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {

  // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {

  progressBar.value = (itemsLoaded / itemsTotal) * 100
  // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

const progressbarContainer = document.querySelector('.progress-bar-container')


manager.onLoad = function () {

  progressbarContainer.style.display = 'none'
  // console.log('Loading complete!');
  audio.play()
};

manager.onError = function (url) {

  console.log('There was an error loading ' + url);

};

loader = new THREE.GLTFLoader(manager)

function loadModel(path, px, py, pz, sx, sy, sz, rotate) {
  loader.load(path, function (gltf) {
    const model = gltf.scene
    scene.add(model)

    if (px || py || pz || sx || sy || sz) {
      model.position.set(px, py, pz)
      model.scale.set(sx, sy, sz)
    }
    if (rotate) {
      model.rotation.y = rotate
    }

  }, function xhr() {
    // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  }, function (error) {
    console.log("err", error)
  })
}


// animated girl model
loader.load('/model/talk/scene.gltf', function (gltf) {

  const model = gltf.scene
  scene.add(model)
  model.scale.set(0.5, 0.5, 0.5)
  // model.scale.set(30, 30, 30)

  model.position.set(20, 0, 50)

  mixer = new THREE.AnimationMixer(model)

  const clips = gltf.animations
  const clip = THREE.AnimationClip.findByName(clips, "mixamo.com")

  const action = mixer.clipAction(clip)

  action.play()

}, function xhr() {
  // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
}, function (error) {
  console.log("err", error)
})

// animated boy model
loader.load('/model/rida/scene.gltf', function (gltf) {

  const model = gltf.scene
  scene.add(model)
  model.rotation.y = Math.PI
  // model.scale.set(0.5, 0.5, 0.5)
  model.scale.set(22, 22, 22)

  model.position.set(10, 0, 100)

  mixer2 = new THREE.AnimationMixer(model)

  const clips = gltf.animations
  // console.log("clips", clips)

  const clip = THREE.AnimationClip.findByName(clips, "mixamo.com")

  const action = mixer2.clipAction(clip)

  action.play()

}, function xhr() {
  // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
}, function (error) {
  console.log("err", error)
})

// animated boy model
loader.load('/model/business_2/scene.gltf', function (gltf) {

  const model = gltf.scene
  scene.add(model)
  model.rotation.y = Math.PI
  // model.scale.set(0.5, 0.5, 0.5)
  model.scale.set(70, 70, 70)

  model.position.set(0, -20, -700)
  model.rotateY(Math.PI)

  mixer3 = new THREE.AnimationMixer(model)

  const clips = gltf.animations
  // console.log("clips_2", clips)

  // const clip = THREE.AnimationClip.findByName(clips, "Rig|cycle_talking")
  const clip = clips[0]

  // Play all animations
  // clips.forEach(function (clip) {
  //   mixer3.clipAction(clip).play();
  // });

  const action = mixer3.clipAction(clip)

  action.play()

}, function xhr() {
  // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
}, function (error) {
  console.log("err", error)
})

// lights for cars model
const customPoint = new THREE.PointLight(0x534E6F, 10, 1000)
customPoint.position.set(115, 320, 2030)
scene.add(customPoint)

const customPoint2 = new THREE.PointLight(0xA05835, 10, 1500)
customPoint2.position.set(-100, 320, 2030)
scene.add(customPoint2)

const customPoint3 = new THREE.PointLight(0xA05835, 5, 1500)
customPoint3.position.set(1010, 300, 2000)
scene.add(customPoint3)

const custom = new THREE.RectAreaLight(0x534E6F, 10, 1500, 1000)
custom.position.set(-70, -130, 2030)
scene.add(custom)
custom.rotateX(-Math.PI / 2)

const helper = new THREE.PointLightHelper(customPoint3, 100)
// scene.add(helper)

// gui.add(customPoint3.position, 'x')
// gui.add(customPoint3.position, 'y').step(10)
// gui.add(customPoint3.position, 'z')
// gui.add(customPoint3, 'intensity')

loadModel('/model/office/scene.glb', 0, 0, 0, 1, 1, 1, 0)
loadModel('/model/car_roof/scene.glb', 10, -200, 1500, 200, 200, 150, -Math.PI)
loadModel('/model/car/scene.gltf', 50, -300, 1900, 100, 100, 100, Math.PI)
loadModel('/model/building/scene.gltf', 1000, -300, -100, 0.4, 0.4, 0.1, Math.PI / 2)
loadModel('/model/store/scene.gltf', 0, -60, -1500, 0.7, 0.7, 0.7, - Math.PI)
loadModel('/model/chen/scene.gltf', 50, 40, 20, 40, 40, 40, -Math.PI / 14)
loadModel('/model/guard/scene.gltf', -250, 54, 10, 60, 60, 60, Math.PI / 2)
loadModel('/model/guard/scene.gltf', 250, 55, 10, 60, 60, 60, -Math.PI / 2)
loadModel('/model/sky/scene.gltf', -700, 20, -900, 80, 80, 80, - Math.PI / 2)
loadModel('/model/businessman/scene.glb', -80, 0, 110, 0.45, 0.45, 0.45, -Math.PI * 1.25)
loadModel('/model/chair/scene.gltf', -6, 2, 150, 50, 50, 50, Math.PI)
loadModel('/model/jim/scene.gltf', -270, 0, -250, 0.5, 0.5, 0.5, Math.PI / 4)
loadModel('/model/jim/scene.gltf', 270, 0, -250, 0.5, 0.5, 0.5, - Math.PI / 4)
loadModel('/model/jim/scene.gltf', 270, 0, 250, 0.5, 0.5, 0.5, - Math.PI / 1.3)
loadModel('/model/jim/scene.gltf', -270, 0, 250, 0.5, 0.5, 0.5, Math.PI / 1.3)
loadModel('/model/men_in_black/scene.gltf', -80, 0, 20, 4500, 4500, 4500, - Math.PI / 2)
loadModel('/model/boss/scene.gltf', 0, 0, 0, 40, 40, 40)
loadModel('/model/screen/scene.gltf', 56, 50, 52, 0.7, 0.7, 0.7, Math.PI)
loadModel('/model/lady/scene.gltf', 70, 0, 40, 40, 40, 40)

const video__1 = document.getElementById('vid')
const video__2 = document.getElementById('vid__2')
const video__3 = document.getElementById('vid__3')
const video__4 = document.getElementById('vid__4')
const video__5 = document.getElementById('vid__5')
video__1.playbackRate = 0.5

const texture__1 = new THREE.VideoTexture(video__1)
const texture__2 = new THREE.VideoTexture(video__2)
const texture__3 = new THREE.VideoTexture(video__3)
const texture__4 = new THREE.VideoTexture(video__4)
const texture__5 = new THREE.VideoTexture(video__5)

function videoPlane(width, height, depth, texture, px, py, pz) {
  const box = new THREE.BoxBufferGeometry(width, height, depth)
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const mesh = new THREE.Mesh(box, material)
  mesh.position.set(px, py, pz)
  scene.add(mesh)
}

videoPlane(59, 31, 1.6, texture__1, -70, 70, -29)
videoPlane(21, 14, 0.1, texture__2, 56, 57, 52)
videoPlane(52, 31, 1.6, texture__3, 69, 70, -29)
videoPlane(18.5, 12, 0.1, texture__4, 82, 41.5, 68.1)
videoPlane(18.5, 12, 0.1, texture__5, -82, 41.5, 68.1)

const listener = new THREE.AudioListener();

audio = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader()
audioLoader.load('/music/hero.mp3', function (buffer) {
  audio.setBuffer(buffer)
  audio.setLoop(true);
})

const clock = new THREE.Clock()
const clock2 = new THREE.Clock()
const clock3 = new THREE.Clock()

window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

};

function animate() {
  requestAnimationFrame(animate)

  mixer2?.update(clock2.getDelta())
  mixer3?.update(clock3.getDelta())
  mixer?.update(clock.getDelta())
  control.update()

  // renderer.render(scene, camera)
}

animate()