// // import React, { useState, useRef } from 'react';

// // const DrawingApp = () => {
// //   const containerRef = useRef(null);
// //   const [color, setColor] = useState('#000000'); // Initial color is black
// //   const [brushSize, setBrushSize] = useState(5); // Initial brush size is 5
// //   const [selectedBrush, setSelectedBrush] = useState('pencil');
// //   const [isPainting, setIsPainting] = useState(false);
// //   const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
// //   const [brushSizeInCm, setBrushSizeInCm] = useState(0);

// //   const calculateBrushSizeInCm = (brushSize) => {
// //     // Assuming 1 pixel on the div represents 0.02645833 cm (adjust as needed)
// //     const cmPerPixel = 0.02645833;
// //     const brushSizeCm = brushSize * cmPerPixel;
// //     setBrushSizeInCm(brushSizeCm.toFixed(2)); // Limit to two decimal places
// //   };

// //   const startPaint = ({ nativeEvent }) => {
// //     const { offsetX, offsetY } = nativeEvent;
// //     setIsPainting(true);
// //     setPrevPosition({ x: offsetX, y: offsetY });
// //   };

// //   const endPaint = () => {
// //     setIsPainting(false);
// //   };

// //   // const paint = ({ nativeEvent }) => {
// //   //   if (!isPainting) return;
  
// //   //   const { offsetX, offsetY } = nativeEvent;
// //   //   const brushTypeStyles = getBrushTypeStyles(selectedBrush);
  
// //   //   const brushSegment = createBrushSegment(brushTypeStyles, prevPosition, { x: offsetX, y: offsetY });
// //   //   containerRef.current.appendChild(brushSegment);
  
// //   //   setPrevPosition({ x: offsetX, y: offsetY });
// //   //   calculateBrushSizeInCm(brushSize); // Update brush size in centimeters
// //   // };
  
// //   const paint = ({ nativeEvent }) => {
// //     if (!isPainting) return;
  
// //     const { offsetX, offsetY } = nativeEvent;
// //     const brushTypeStyles = getBrushTypeStyles(selectedBrush);
  
// //     const brushSegment = createBrushSegment(brushTypeStyles, prevPosition, { x: offsetX, y: offsetY });
// //     containerRef.current.appendChild(brushSegment);
  
// //     // Connect the brush segments to create a smoother line
// //     connectBrushSegments(prevPosition, { x: offsetX, y: offsetY });
  
// //     setPrevPosition({ x: offsetX, y: offsetY });
// //     calculateBrushSizeInCm(brushSize); // Update brush size in centimeters
// //   };
  
// //   const connectBrushSegments = (startPosition, endPosition) => {
// //     const distance = Math.hypot(endPosition.x - startPosition.x, endPosition.y - startPosition.y);
// //     const angle = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x);
  
// //     const stepSize = 2; // Adjust for smoother or coarser lines
  
// //     for (let i = 0; i < distance; i += stepSize) {
// //       const x = startPosition.x + Math.cos(angle) * i;
// //       const y = startPosition.y + Math.sin(angle) * i;
  
// //       const brushSegment = createBrushSegment({}, { x, y }, { x: x + 1, y: y + 1 });
// //       containerRef.current.appendChild(brushSegment);
// //     }
// //   };
  


// //   const createBrushSegment = (styles, startPosition, endPosition) => {
// //     const brushSegment = document.createElement('div');
// //     brushSegment.style.position = 'absolute';
// //     brushSegment.style.left = startPosition.x + 'px';
// //     brushSegment.style.top = startPosition.y + 'px';
// //     brushSegment.style.width = '2px'; // Adjust the width for a finer brush stroke
// //     brushSegment.style.height = '2px'; // Adjust the height for a finer brush stroke
// //     brushSegment.style.backgroundColor = color;
// //     brushSegment.style.borderRadius = '50%'; // Adjust as needed
// //     brushSegment.style.border = styles.border;
// //     brushSegment.style.transform = styles.transform;
  
// //     return brushSegment;
// //   };
  
  

// //   const createBrushStroke = (styles, startPosition, endPosition) => {
// //     const brushStroke = document.createElement('div');
// //     brushStroke.style.position = 'absolute';
// //     brushStroke.style.left = startPosition.x + 'px';
// //     brushStroke.style.top = startPosition.y + 'px';
// //     brushStroke.style.width = endPosition.x - startPosition.x + 'px';
// //     brushStroke.style.height = endPosition.y - startPosition.y + 'px';
// //     brushStroke.style.borderRadius = '50%'; // Adjust as needed
// //     brushStroke.style.backgroundColor = color;
// //     brushStroke.style.border = styles.border;
// //     brushStroke.style.transform = styles.transform;

// //     return brushStroke;
// //   };

// //   const getBrushTypeStyles = (brushType) => {
// //     switch (brushType) {
// //       case 'calligraphyBrush':
// //         return {
// //           border: '2px solid #000', // Example border style for calligraphy brush
// //           transform: 'rotate(45deg)', // Example transformation for calligraphy brush
// //         };
// //       // Add styles for other brush types

// //       default:
// //         return {
// //           border: '2px solid #000', // Default border style
// //           transform: 'none', // Default transformation
// //         };
// //     }
// //   };

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'center', margin: '2px' }}>
// //         <div>
// //           <label>Color:</label>
// //           <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
// //         </div>
// //         <div style={{ marginLeft: '10px' }}>
// //           <label>Brush Size (cm):</label>
// //           <input type="number" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
// //         </div>
// //         <div style={{ marginLeft: '10px' }}>
// //           <label>Brush:</label>
// //           <select style={{ color: 'black' }} value={selectedBrush} onChange={(e) => setSelectedBrush(e.target.value)}>
// //             <option style={{ color: 'black' }} value="pencil">
// //               Pencil
// //             </option>
// //             <option style={{ color: 'black' }} value="calligraphyBrush">
// //               Calligraphy Brush
// //             </option>
// //             {/* Add options for other brushes */}
// //           </select>
// //         </div>
// //       </div>
// //       <div
// //         ref={containerRef}
// //         onMouseDown={startPaint}
// //         onMouseUp={endPaint}
// //         onMouseMove={paint}
// //         onMouseLeave={endPaint}
// //         style={{ border: '1px solid #000', position: 'relative', width: '800px', height: '600px', marginLeft: '250px', marginTop: '30px' }}
// //       />
// //     </div>
// //   );
// // };

// // export default DrawingApp;


// // import React, { useState, useRef } from 'react';

// // const DrawingApp = () => {
// //   const containerRef = useRef(null);
// //   const [color, setColor] = useState('#000000');
// //   const [brushSize, setBrushSize] = useState(5);
// //   const [selectedBrush, setSelectedBrush] = useState('pencil');
// //   const [isPainting, setIsPainting] = useState(false);
// //   const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

// //   const startPaint = ({ nativeEvent }) => {
// //     const { offsetX, offsetY } = nativeEvent;
// //     setIsPainting(true);
// //     setPrevPosition({ x: offsetX, y: offsetY });
// //   };

// //   const endPaint = () => {
// //     setIsPainting(false);
// //   };

// //   const paint = ({ nativeEvent }) => {
// //     if (!isPainting) return;

// //     const { offsetX, offsetY } = nativeEvent;
// //     const brushSegment = createBrushSegment(prevPosition, { x: offsetX, y: offsetY });
// //     containerRef.current.appendChild(brushSegment);

// //     setPrevPosition({ x: offsetX, y: offsetY });
// //   };

// //   const createBrushSegment = (startPosition, endPosition) => {
// //     const distance = Math.hypot(endPosition.x - startPosition.x, endPosition.y - startPosition.y);
// //     const angle = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x);

// //     const stepSize = 2;

// //     const brushSegment = document.createElement('div');
// //     brushSegment.style.position = 'absolute';
// //     brushSegment.style.left = startPosition.x + 'px';
// //     brushSegment.style.top = startPosition.y + 'px';
// //     brushSegment.style.width = distance + 'px';
// //     brushSegment.style.height = brushSize + 'px';
// //     brushSegment.style.backgroundColor = color;
// //     brushSegment.style.borderRadius = '50%'; // Adjust as needed
// //     brushSegment.style.transform = `rotate(${angle}rad)`;

// //     return brushSegment;
// //   };

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'center', margin: '2px' }}>
// //         <div>
// //           <label>Color:</label>
// //           <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
// //         </div>
// //         <div style={{ marginLeft: '10px' }}>
// //           <label>Brush Size:</label>
// //           <input type="number" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
// //         </div>
// //         <div style={{ marginLeft: '10px' }}>
// //           <label>Brush:</label>
// //           <select value={selectedBrush} onChange={(e) => setSelectedBrush(e.target.value)}>
// //             <option value="pencil">Pencil</option>
// //             {/* Add other brush types as needed */}
// //           </select>
// //         </div>
// //       </div>
// //       <div
// //         ref={containerRef}
// //         onMouseDown={startPaint}
// //         onMouseUp={endPaint}
// //         onMouseMove={paint}
// //         onMouseLeave={endPaint}
// //         style={{ border: '1px solid #000', position: 'relative', width: '800px', height: '600px', marginLeft: '250px', marginTop: '30px' }}
// //       />
// //     </div>
// //   );
// // };

// // export default DrawingApp;


// import React, { useState, useRef } from 'react';

// const DrawingApp = () => {
//   const containerRef = useRef(null);
//   const [color, setColor] = useState('#000000');
//   const [brushSize, setBrushSize] = useState(5);
//   const [selectedBrush, setSelectedBrush] = useState('pencil');
//   const [isPainting, setIsPainting] = useState(false);
//   const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

//   const startPaint = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     setIsPainting(true);
//     setPrevPosition({ x: offsetX, y: offsetY });
//   };

//   const endPaint = () => {
//     setIsPainting(false);
//     setPrevPosition({ x: 0, y: 0 });
//   };

//   const paint = ({ nativeEvent }) => {
//     if (!isPainting) return;

//     const { offsetX, offsetY } = nativeEvent;
//     const distance = Math.hypot(offsetX - prevPosition.x, offsetY - prevPosition.y);
//     const angle = Math.atan2(offsetY - prevPosition.y, offsetX - prevPosition.x);

//     const brushStroke = createBrushStroke(prevPosition, distance, angle);
//     containerRef.current.appendChild(brushStroke);

//     setPrevPosition({ x: offsetX, y: offsetY });
//   };

//   const createBrushStroke = (startPosition, distance, angle) => {
//     const brushStroke = document.createElement('div');
//     brushStroke.style.position = 'absolute';
//     brushStroke.style.left = startPosition.x + 'px';
//     brushStroke.style.top = startPosition.y + 'px';
//     brushStroke.style.width = distance + 'px';
//     brushStroke.style.height = brushSize + 'px';
//     brushStroke.style.backgroundColor = color;
//     brushStroke.style.borderRadius = '50%'; // Adjust as needed
//     brushStroke.style.transform = `rotate(${angle}rad)`;

//     return brushStroke;
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center', margin: '2px' }}>
//         <div>
//           <label>Color:</label>
//           <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
//         </div>
//         <div style={{ marginLeft: '10px' }}>
//           <label>Brush Size:</label>
//           <input type="number" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
//         </div>
//         <div style={{ marginLeft: '10px' }}>
//           <label>Brush:</label>
//           <select value={selectedBrush} onChange={(e) => setSelectedBrush(e.target.value)}>
//             <option value="pencil">Pencil</option>
//             {/* Add other brush types as needed */}
//           </select>
//         </div>
//       </div>
//       <div
//         ref={containerRef}
//         onMouseDown={startPaint}
//         onMouseUp={endPaint}
//         onMouseMove={paint}
//         onMouseLeave={endPaint}
//         style={{ border: '1px solid #000', position: 'relative', width: '800px', height: '600px', marginLeft: '250px', marginTop: '30px' }}
//       />
//     </div>
//   );
// };

// export default DrawingApp;


import React, { useState, useRef } from 'react';

const DrawingApp = () => {
  const containerRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [selectedBrush, setSelectedBrush] = useState('pencil');
  const [isPainting, setIsPainting] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  const startPaint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsPainting(true);
    setPrevPosition({ x: offsetX, y: offsetY });
  };

  const endPaint = () => {
    setIsPainting(false);
    setPrevPosition({ x: 0, y: 0 });
  };

  const paint = ({ nativeEvent }) => {
    if (!isPainting) return;

    const { offsetX, offsetY } = nativeEvent;

    const brushStroke = createBrushStroke(prevPosition, { x: offsetX, y: offsetY });
    containerRef.current.appendChild(brushStroke);

    setPrevPosition({ x: offsetX, y: offsetY });
  };

  const createBrushStroke = (startPosition, endPosition) => {
    const distance = Math.hypot(endPosition.x - startPosition.x, endPosition.y - startPosition.y);
    const angle = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x);

    const stepSize = 2;
    const brushStroke = document.createElement('div');

    for (let i = 0; i < distance; i += stepSize) {
      const x = startPosition.x + Math.cos(angle) * i;
      const y = startPosition.y + Math.sin(angle) * i;

      const brushSegment = createBrushSegment({ x, y });
      brushStroke.appendChild(brushSegment);
    }

    brushStroke.style.position = 'absolute';
    brushStroke.style.left = startPosition.x + 'px';
    brushStroke.style.top = startPosition.y + 'px';

    return brushStroke;
  };

  const createBrushSegment = ({ x, y }) => {
    const brushSegment = document.createElement('div');
    brushSegment.style.width = '2px';
    brushSegment.style.height = '2px';
    brushSegment.style.backgroundColor = color;
    brushSegment.style.borderRadius = '50%';

    brushSegment.style.position = 'absolute';
    brushSegment.style.left = x + 'px';
    brushSegment.style.top = y + 'px';

    return brushSegment;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2px' }}>
        <div>
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <label>Brush Size:</label>
          <input type="number" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <label>Brush:</label>
          <select value={selectedBrush} onChange={(e) => setSelectedBrush(e.target.value)}>
            <option value="pencil">Pencil</option>
            {/* Add other brush types as needed */}
          </select>
        </div>
      </div>
      <div
        ref={containerRef}
        onMouseDown={startPaint}
        onMouseUp={endPaint}
        onMouseMove={paint}
        onMouseLeave={endPaint}
        style={{ border: '1px solid #000', position: 'relative', width: '800px', height: '600px', marginLeft: '250px', marginTop: '30px' }}
      />
    </div>
  );
};

export default DrawingApp;
