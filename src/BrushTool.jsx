

import React, { useState, useRef, useEffect } from 'react';

const BrushTool = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('#000000'); // Initial color is black
  const [brushSize, setBrushSize] = useState(5); // Initial brush size is 5
  const [selectedBrush, setSelectedBrush] = useState('pencil');

  const [isPainting, setIsPainting] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });


  const [brushSizeInCm, setBrushSizeInCm] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);



  const calculateBrushSizeInCm = (brushSize) => {
    // Assuming 1 pixel on the canvas represents 0.02645833 cm (adjust as needed)
    const cmPerPixel = 0.02645833;
    const brushSizeCm = brushSize * cmPerPixel;
    setBrushSizeInCm(brushSizeCm.toFixed(2)); // Limit to two decimal places
  };



  const startPaint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsPainting(true);
  };

  const endPaint = () => {
    context.closePath();
    setIsPainting(false);
  };

  // const paint = ({ nativeEvent }) => {
  //   if (!isPainting) return;

  //   const { offsetX, offsetY } = nativeEvent;
  //   context.strokeStyle = color;
  //   context.lineWidth = brushSize;

  //   context.lineTo(offsetX, offsetY);
  //   context.stroke();

  //   setPrevPosition({ x: offsetX, y: offsetY });
  // };

  const paint = ({ nativeEvent }) => {
    if (!isPainting) return;

    const { offsetX, offsetY } = nativeEvent;
    context.strokeStyle = color;
    context.lineWidth = brushSize;
          

   
    calculateBrushSizeInCm(brushSize); // Update brush size in centimeters


    // Modify drawing logic based on the selected brush
    switch (selectedBrush) {
      case 'calligraphyBrush':
        // Calligraphy brush logic
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = brushSize * 2;
        context.lineTo(offsetX, offsetY);
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });
        break;

      case 'calligraphyPen':
        // Calligraphy pen logic
        context.lineCap = 'square';
        context.lineJoin = 'miter';
        context.lineWidth = brushSize * 1.5;
        context.lineTo(offsetX, offsetY);
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });
        break;

      case 'airBrush':
        // Airbrush logic
        context.lineCap = 'round';
        context.lineJoin = 'round';
        const radius = brushSize / 2;
        const angle = Math.random() * 2 * Math.PI;
        const offsetXRandom = radius * Math.cos(angle);
        const offsetYRandom = radius * Math.sin(angle);
        context.lineTo(offsetX + offsetXRandom, offsetY + offsetYRandom);
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });
        break;

      // Add cases for other brushes

      default:
        // Default to pencil brush
        context.lineTo(offsetX, offsetY);
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });
    }
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"center",margin:"2px",}}  >
      <div >
        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          
        />
      </div>
      <div style={{marginLeft:"10px"}} >
        <label>Brush Size (cm) :</label>
        <input
          type="number"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
        />
      </div>
      <div  style={{marginLeft:"10px"}} >
        <label>Brush:</label>
        <select  style={{color:"black"}}  value={selectedBrush} onChange={(e) => setSelectedBrush(e.target.value)}>
          <option  style={{color:"black"}}   value="pencil">Pencil</option>
          <option  style={{color:"black"}}  value="calligraphyBrush">Calligraphy Brush</option>
          <option   style={{color:"black"}}  value="calligraphyPen">Calligraphy Pen</option>
          <option  style={{color:"black"}}  value="airBrush">Air Brush</option>
          {/* Add options for other brushes */}
        </select>
      </div>
  
    </div>
    <canvas
        ref={canvasRef}
        onMouseDown={startPaint}
        onMouseUp={endPaint}
        onMouseMove={paint}
        onMouseLeave={endPaint}
        width={800}
        height={600}
        style={{ border: '1px solid #000',marginLeft:"250px",marginTop:"30px" }}
      />
    </div>
  );
};

export default BrushTool;
