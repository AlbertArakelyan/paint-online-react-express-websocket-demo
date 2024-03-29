import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import '../styles/toolbar.scss';

const Toolbar = () => {
  const handleChangeColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  const handleDownload = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = dataUrl;
    a.download = 'image.png';
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}></button>
      <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}></button>
      <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
      <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
      <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
      <input type="color" onChange={handleChangeColor} />
      {/*When I put without callback gives an error where "canvas" is undefined*/}
      <button className="toolbar__btn undo" onClick={() => canvasState.undo()}></button>
      <button className="toolbar__btn redo" onClick={() => canvasState.redo()}></button>
      <button className="toolbar__btn save" onClick={() => handleDownload()}></button>
    </div>
  );
};

export default Toolbar;