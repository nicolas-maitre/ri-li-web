import { Camera, drawLine, drawRect, rect, vec2 } from "./camera";
import { css, e } from "./utils";

export class RiLiElement extends HTMLDivElement {
  private canvas;
  private canvasCtx;
  private speedScale = 1;
  private cam;

  constructor() {
    super();

    //build
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(
      e("style", {
        innerHTML: css`
          canvas {
            position: absolute;
          }
        `,
      })
    );
    this.canvas = shadow.appendChild(
      e("canvas", { className: "ri-li-canvas" })
    );
    this.canvasCtx = this.canvas.getContext("2d")!;
    this.cam = new Camera(this.canvasCtx, { x: 0, y: 0 });

    //loop
    let oldWidth: number;
    let oldHeight: number;
    let lastStamp: number;
    const mainLoop: FrameRequestCallback = (timestamp) => {
      requestAnimationFrame(mainLoop);

      //canvas size
      const { width, height } = this.getBoundingClientRect();
      if (width !== oldWidth || height !== oldHeight) {
        this.canvas.height = oldHeight = height;
        this.canvas.width = oldWidth = width;
        [this.cam.position.x, this.cam.position.y] = [width / 2, height / 2];
      }

      //timestamp
      if (!lastStamp) {
        this.init();
        lastStamp = timestamp;
        return;
      }
      const dt = timestamp - lastStamp;
      lastStamp = timestamp;

      //sub steps
      this.update((dt / 1000) * this.speedScale);
      this.draw();
    };

    requestAnimationFrame(mainLoop);
  }

  private init() {}

  private update(dt: number) {}

  private draw() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawRect(this.cam, rect(0, 0, 20, 20), "white");
    drawLine(this.cam, vec2(-1000, 0), vec2(1000, 0), "white");
    drawLine(this.cam, vec2(0, -1000), vec2(0, 1000), "white");
  }
}

customElements.define("ri-li", RiLiElement, { extends: "div" });
