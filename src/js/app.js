import CameraController from './clock/CameraController';
import SceneController from './clock/SceneController';
import DegitalClock from './clock/DegitalClock';
import AnalogClock from './clock/AnalogClock';

const RENDERER_PARAMETER = {
  clearColor: 0xEEEEEE,
  width: window.innerWidth,
  height: window.innerHeight
};

class MainController {
  constructor(target, param){
    this.targetDOM = document.getElementById(target);
    this.param = Object.assign({}, RENDERER_PARAMETER, param);
    this.scene = new SceneController();
    this.camera = new CameraController();
    this.renderer = new THREE.WebGLRenderer();
    this.degitalClock = new DegitalClock();
    this.analogClock = new AnalogClock();
    this.update = () => this._update();
    this.isPlay = false;
    this.currentTime = performance.now();
    this.init();
  }
  init(){
    this.renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
    this.renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
    this.targetDOM.appendChild(this.renderer.domElement);
    window.scene = this.scene.core;
    this.scene.add(this.degitalClock.core);
    this.scene.add(this.analogClock.core)
  }
  play(){
    this.update();
  }
  pause(){
  }
  _update(){
    requestAnimationFrame(this.update);
    let hour = new Date().getHours() + '';
    let minute = new Date().getMinutes() + '';
    let second = new Date().getSeconds() + '';
    this.degitalClock.setTimeCount(hour, minute, second);
    this.degitalClock.update();
    this.analogClock.setTimeCount(hour, minute, second);
    this.analogClock.update();
    this.renderer.render(this.scene.core, this.camera.core);
  }
}

let mainController = new MainController('webgl');
mainController.play();