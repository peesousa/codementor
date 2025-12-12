import React, { useRef, useState, useEffect } from 'react';

export const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#94a3b8');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
    }
    
    const handleResize = () => {
       // Idealmente verificar conteúdo antes de limpar
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      const canvas = canvasRef.current;
      if(canvas) {
          const ctx = canvas.getContext('2d');
          if(ctx) {
              ctx.strokeStyle = color;
              ctx.lineWidth = lineWidth;
          }
      }
  }, [color, lineWidth]);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="h-full w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative cursor-crosshair">
      <div className="absolute top-2 left-2 pointer-events-none bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400 z-10">
        Quadro Branco (Desenhe Aqui)
      </div>
      
      {/* Toolbar */}
      <div className="absolute top-2 right-2 flex gap-2 bg-slate-800 p-1 rounded-lg z-10 border border-slate-700">
          <button onClick={() => setColor('#ef4444')} className={`w-4 h-4 rounded-full bg-red-500 ${color === '#ef4444' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setColor('#22c55e')} className={`w-4 h-4 rounded-full bg-green-500 ${color === '#22c55e' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setColor('#3b82f6')} className={`w-4 h-4 rounded-full bg-blue-500 ${color === '#3b82f6' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setColor('#eab308')} className={`w-4 h-4 rounded-full bg-yellow-500 ${color === '#eab308' ? 'ring-2 ring-white' : ''}`} />
          <button onClick={() => setColor('#94a3b8')} className={`w-4 h-4 rounded-full bg-slate-400 ${color === '#94a3b8' ? 'ring-2 ring-white' : ''}`} />
          <div className="w-px h-4 bg-slate-600 mx-1" />
          <button onClick={() => setLineWidth(2)} className={`w-4 h-4 flex items-center justify-center rounded ${lineWidth === 2 ? 'bg-slate-600' : ''}`}><div className="w-1 h-1 bg-white rounded-full" /></button>
          <button onClick={() => setLineWidth(6)} className={`w-4 h-4 flex items-center justify-center rounded ${lineWidth === 6 ? 'bg-slate-600' : ''}`}><div className="w-2 h-2 bg-white rounded-full" /></button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full h-full block"
      />
    </div>
  );
};