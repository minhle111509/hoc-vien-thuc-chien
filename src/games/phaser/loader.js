import {mountPhaserScene,supportsScene} from './scene.js';
import {mountCanvasLab} from './fallback.js';
// Resolved relative to this module so the site also works when hosted under a sub-path.
const PHASER_URL=new URL('../../../vendor/phaser.min.js',import.meta.url).href;
let pending;
// Shared by every Phaser room so the library is requested at most once per page.
export function loadPhaser(){if(globalThis.Phaser)return Promise.resolve();if(!pending)pending=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=PHASER_URL;s.onload=()=>globalThis.Phaser?resolve():reject(Error('Phaser không khả dụng'));s.onerror=()=>{s.remove();reject(Error('Phaser chưa được cài'))};document.head.append(s)}).catch(e=>{pending=null;throw e});return pending}
export async function tryMount2D(container,options){if(!supportsScene(options.type))return null;try{await loadPhaser();return mountPhaserScene(container,options)}catch{return mountCanvasLab(container,options)}}
