type Ctx = CanvasRenderingContext2D;

export class Camera {
  constructor(public ctx: Ctx, public position: Vector2 = { x: 0, y: 0 }) {}
  public project({ x, y }: Vector2) {
    return this.projectXY(x, y);
  }
  public projectXY(x: number, y: number): Vector2 {
    return { x: this.position.x - x, y: this.position.y - y };
  }
  public unproject({ x, y }: Vector2) {
    return this.unprojectXY(x, y);
  }
  public unprojectXY(x: number, y: number): Vector2 {
    return { x: this.position.x - x, y: this.position.y - y };
  }
}

export interface Vector2 {
  x: number;
  y: number;
}
export function vec2(x: number, y: number): Vector2 {
  return { x, y };
}
export function vec2Len(vector: Vector2): number {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}
export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
export function rect(
  x: number,
  y: number,
  width: number,
  height: number
): Rectangle {
  return { x, y, width, height };
}

export function drawLine(
  cam: Camera,
  pFrom: Vector2,
  pTo: Vector2,
  stroke: string,
  width = 1
) {
  const { x: xFrom, y: yFrom } = cam.project(pFrom);
  const { x: xTo, y: yTo } = cam.project(pTo);

  cam.ctx.beginPath();
  cam.ctx.moveTo(xFrom, yFrom);
  cam.ctx.lineTo(xTo, yTo);
  cam.ctx.strokeStyle = stroke;
  cam.ctx.lineWidth = width;
  cam.ctx.stroke();
}
export function drawCircle(
  cam: Camera,
  position: Vector2,
  radius: number,
  fill: string,
  strokeColor?: string,
  strokeWidth?: number
) {
  const { x, y } = cam.project(position);
  cam.ctx.beginPath();
  cam.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  cam.ctx.fillStyle = fill;
  cam.ctx.fill();
  if (strokeWidth) {
    cam.ctx.strokeStyle = strokeColor!;
    cam.ctx.lineWidth = strokeWidth;
    cam.ctx.stroke();
  }
}
export function drawRect(
  cam: Camera,
  rect: Rectangle,
  fill: string,
  strokeColor?: string,
  strokeWidth?: number
) {
  const { x, y } = cam.projectXY(rect.x, rect.y);
  cam.ctx.rect(x, y, rect.width, rect.width);
  cam.ctx.fillStyle = fill;
  cam.ctx.fill();
  if (strokeWidth) {
    cam.ctx.strokeStyle = strokeColor!;
    cam.ctx.lineWidth = strokeWidth;
    cam.ctx.stroke();
  }
}
