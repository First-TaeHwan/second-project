const saveBtn = document.querySelector("#save");
const textInput = document.querySelector("#text");
const inputFile = document.querySelector("#file");
const eraserBtn = document.querySelector("#eraser-btn");
const resetBtn = document.querySelector("#reset-btn");
const modeBtn = document.querySelector("#mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#color");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
}

function startPainting() {
  isPainting = true;
}
function cancelPainting(event) {
  isPainting = false;
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onLWChange(event) {
  ctx.lineWidth = event.target.value;
}

function onLCChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "채우기";
  } else {
    isFilling = true;
    modeBtn.innerText = "그리기";
  }
}
function onMouseClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserBtn() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "채우기";
}

function onFileChanger(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    inputFile.value = null;
  };
}

function onDoubleClick(event) {
  ctx.save();
  const text = textInput.value;
  ctx.lineWidth = 1;
  ctx.font = "68px serif";
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

function onSaveBtn() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "내 그림.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mousedown", onMouseClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLWChange);
lineColor.addEventListener("change", onLCChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("mousedown", onMouseClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserBtn);
inputFile.addEventListener("change", onFileChanger);
saveBtn.addEventListener("click", onSaveBtn);
