import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Upload,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Sparkles,
  ShieldCheck,
  Eye,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  RefreshCw,
  Heart,
  Palette,
  FileCode,
  FileText,
  Copy,
  AlertCircle,
  Move,
  ArrowRight,
  Split,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import {
  rgbToHex,
  rgbToHsl,
  getColorData,
  getWCAGScore,
  isValidHex,
} from '../../utils/colorEngine';
import { ActiveTab, ColorData } from '../../types/color';
import { CopyButton } from '../ui/CopyButton';

// -------------------------------------------------------------
// Sample Demo Canvas Generator (for instant 1-click exploration)
// -------------------------------------------------------------
const generateSampleImageDataUrl = (): string => {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background deep gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 960, 600);
  bgGrad.addColorStop(0, '#0B0F19');
  bgGrad.addColorStop(0.3, '#1E1B4B');
  bgGrad.addColorStop(0.65, '#312E81');
  bgGrad.addColorStop(0.85, '#4F46E5');
  bgGrad.addColorStop(1, '#9333EA');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 960, 600);

  // Geometric glowing orbs with distinct hues
  const drawOrb = (
    x: number,
    y: number,
    r: number,
    c1: string,
    c2: string,
    composite: GlobalCompositeOperation = 'source-over'
  ) => {
    ctx.save();
    ctx.globalCompositeOperation = composite;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c1);
    g.addColorStop(0.6, c2);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawOrb(280, 260, 200, 'rgba(6, 182, 212, 0.85)', 'rgba(6, 182, 212, 0.2)', 'screen');
  drawOrb(680, 360, 220, 'rgba(236, 72, 153, 0.85)', 'rgba(236, 72, 153, 0.25)', 'screen');
  drawOrb(480, 180, 150, 'rgba(245, 158, 11, 0.9)', 'rgba(245, 158, 11, 0.2)', 'screen');
  drawOrb(780, 160, 130, 'rgba(16, 185, 129, 0.85)', 'rgba(16, 185, 129, 0.2)', 'screen');
  drawOrb(180, 440, 140, 'rgba(139, 92, 246, 0.8)', 'rgba(139, 92, 246, 0.2)', 'screen');
  drawOrb(520, 480, 160, 'rgba(244, 63, 94, 0.75)', 'rgba(244, 63, 94, 0.2)', 'screen');

  // Subtle artistic vector grid overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 40; x < 960; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.stroke();
  }
  for (let y = 40; y < 600; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(960, y);
    ctx.stroke();
  }

  return canvas.toDataURL('image/png');
};

// -------------------------------------------------------------
// Perceptual Redmean Distance for accurate color clustering
// -------------------------------------------------------------
function colorDistance(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number {
  const rmean = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(
    (((512 + rmean) * dr * dr) >> 8) +
      4 * dg * dg +
      (((767 - rmean) * db * db) >> 8)
  );
}

export interface ExtractedColorItem {
  hex: string;
  rgb: { r: number; g: number; b: number };
  percentage: number;
  pixelCount: number;
}

export type PaletteExtractionMode =
  | 'dominant'
  | 'balanced'
  | 'vibrant'
  | 'muted'
  | 'monochromatic';

export interface ImagePickerToolProps {
  onNavigate: (tab: ActiveTab, hex?: string) => void;
  onCopySuccess: (text: string) => void;
  onToggleFavorite?: (hex: string) => void;
  isColorFavorited?: (hex: string) => boolean;
  onSavePalette?: (name: string, colors: string[]) => void;
}

export const ImagePickerTool: React.FC<ImagePickerToolProps> = ({
  onNavigate,
  onCopySuccess,
  onToggleFavorite,
  isColorFavorited,
  onSavePalette,
}) => {
  // Image State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('sample-spectrum.png');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [fileSizeBytes, setFileSizeBytes] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Viewport & Transformations
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Color Sampling State
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [hoveredCoord, setHoveredCoord] = useState<{ x: number; y: number } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#6366F1');
  const [selectedCoord, setSelectedCoord] = useState<{ x: number; y: number } | null>(null);
  const [loupe, setLoupe] = useState<{
    x: number;
    y: number;
    show: boolean;
    pixelData?: Uint8ClampedArray;
  }>({
    x: 0,
    y: 0,
    show: false,
  });

  // Extraction Settings
  const [extractionCount, setExtractionCount] = useState<number>(8);
  const [paletteMode, setPaletteMode] = useState<PaletteExtractionMode>('dominant');
  const [extractedColors, setExtractedColors] = useState<ExtractedColorItem[]>([]);

  // Sidebar Tab for Mobile & Organized Layout
  const [activeSidebarTab, setActiveSidebarTab] = useState<'inspector' | 'palette' | 'export'>('inspector');

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loupeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const dragDistRef = useRef<number>(0);

  // -------------------------------------------------------------
  // Validation & File Loader
  // -------------------------------------------------------------
  const validateAndLoadFile = useCallback((file: File) => {
    setUploadError(null);

    // 1. Format validation
    const validTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
    ];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg'];

    if (!validTypes.includes(file.type) && !validExtensions.includes(extension)) {
      setUploadError(
        'Unsupported image format. Please upload a PNG, JPG, WEBP, GIF, BMP, or SVG image.'
      );
      return;
    }

    // 2. Size limit validation (25 MB max)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError('Image file size exceeds the 25 MB limit. Please select a smaller image.');
      return;
    }

    setImageFileName(file.name);
    setFileSizeBytes(file.size);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImageSrc(e.target.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file from disk. Please try another image.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const loadSampleImage = () => {
    setUploadError(null);
    setImageFileName('chroma-geometric-art.png');
    setFileSizeBytes(145000);
    setIsProcessing(true);
    const sample = generateSampleImageDataUrl();
    setImageSrc(sample);
  };

  const handleClearImage = () => {
    setImageSrc(null);
    setImageDimensions(null);
    setExtractedColors([]);
    setSelectedCoord(null);
    setHoveredColor(null);
    setHoveredCoord(null);
    setLoupe((prev) => ({ ...prev, show: false }));
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    sourceImageRef.current = null;
  };

  // -------------------------------------------------------------
  // Clipboard Paste Support (Ctrl+V / Cmd+V)
  // -------------------------------------------------------------
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            validateAndLoadFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [validateAndLoadFile]);

  // -------------------------------------------------------------
  // Drag and Drop Zone Handlers
  // -------------------------------------------------------------
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndLoadFile(e.dataTransfer.files[0]);
    }
  };

  // -------------------------------------------------------------
  // Advanced Dominant Color Extraction & Quantization Engine
  // -------------------------------------------------------------
  const extractDominantPalette = useCallback(
    (sourceCanvas: HTMLCanvasElement, count: number, mode: PaletteExtractionMode) => {
      try {
        // High speed downsampling canvas for color distribution calculation
        const sampleSize = 140;
        const downCanvas = document.createElement('canvas');
        const aspect = sourceCanvas.height / (sourceCanvas.width || 1);
        downCanvas.width = sampleSize;
        downCanvas.height = Math.max(1, Math.round(sampleSize * aspect));

        const downCtx = downCanvas.getContext('2d', { willReadFrequently: true });
        if (!downCtx) return;
        downCtx.drawImage(sourceCanvas, 0, 0, downCanvas.width, downCanvas.height);

        const imgData = downCtx.getImageData(0, 0, downCanvas.width, downCanvas.height).data;
        const buckets: Record<string, { rSum: number; gSum: number; bSum: number; count: number }> = {};
        let validPixels = 0;

        // Step by 4 bytes (1 pixel at a time)
        for (let i = 0; i < imgData.length; i += 4) {
          const a = imgData[i + 3];
          if (a < 128) continue; // Skip transparency

          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];

          // 5-bit color space quantization (32 levels per channel)
          const qr = Math.floor(r / 8) * 8;
          const qg = Math.floor(g / 8) * 8;
          const qb = Math.floor(b / 8) * 8;
          const key = `${qr},${qg},${qb}`;

          if (!buckets[key]) {
            buckets[key] = { rSum: 0, gSum: 0, bSum: 0, count: 0 };
          }
          buckets[key].rSum += r;
          buckets[key].gSum += g;
          buckets[key].bSum += b;
          buckets[key].count++;
          validPixels++;
        }

        if (validPixels === 0) return;

        // Form cluster candidates with precise centroid colors
        const rawClusters = Object.values(buckets).map((b) => {
          const r = Math.round(b.rSum / b.count);
          const g = Math.round(b.gSum / b.count);
          const bVal = Math.round(b.bSum / b.count);
          return {
            r,
            g,
            b: bVal,
            hex: rgbToHex(r, g, bVal),
            count: b.count,
            hsl: rgbToHsl(r, g, bVal),
          };
        });

        // Sort by frequency descending for greedy clustering
        rawClusters.sort((a, b) => b.count - a.count);

        // Greedy merging with redmean perceptual distance
        const mergedClusters: {
          r: number;
          g: number;
          b: number;
          hex: string;
          count: number;
          hsl: { h: number; s: number; l: number };
        }[] = [];

        const DIST_THRESHOLD = count > 12 ? 35 : 44;

        for (const item of rawClusters) {
          let matched = false;
          for (const existing of mergedClusters) {
            const dist = colorDistance(
              item.r,
              item.g,
              item.b,
              existing.r,
              existing.g,
              existing.b
            );
            if (dist < DIST_THRESHOLD) {
              existing.count += item.count;
              matched = true;
              break;
            }
          }
          if (!matched) {
            mergedClusters.push({ ...item });
          }
        }

        // Apply selected Palette Mode filter/sorting
        let finalSelection = [...mergedClusters];

        if (mode === 'balanced') {
          // Spread across hue spectrum
          finalSelection.sort((a, b) => a.hsl.h - b.hsl.h || b.count - a.count);
        } else if (mode === 'vibrant') {
          // Highest saturation and medium lightness
          finalSelection.sort((a, b) => {
            const scoreA = (a.hsl.s / 100) * (1 - Math.abs(a.hsl.l - 50) / 50);
            const scoreB = (b.hsl.s / 100) * (1 - Math.abs(b.hsl.l - 50) / 50);
            return scoreB - scoreA;
          });
        } else if (mode === 'muted') {
          // Subtle, soft, low-to-medium saturation
          finalSelection.sort((a, b) => {
            const scoreA = 1 - Math.abs(a.hsl.s - 35) / 50;
            const scoreB = 1 - Math.abs(b.hsl.s - 35) / 50;
            return scoreB - scoreA;
          });
        } else if (mode === 'monochromatic') {
          // Find dominant hue and select variations of that hue
          if (finalSelection.length > 0) {
            const baseHue = finalSelection[0].hsl.h;
            finalSelection = finalSelection
              .filter((c) => {
                const diff = Math.abs(c.hsl.h - baseHue);
                const hueDiff = Math.min(diff, 360 - diff);
                return hueDiff < 45 || c.hsl.s < 12; // allow neutrals
              })
              .sort((a, b) => a.hsl.l - b.hsl.l);
          }
        } else {
          // 'dominant': sorted by frequency
          finalSelection.sort((a, b) => b.count - a.count);
        }

        const sliced = finalSelection.slice(0, count);
        const totalSampledPixels = sliced.reduce((acc, c) => acc + c.count, 0) || 1;

        const results: ExtractedColorItem[] = sliced.map((c) => ({
          hex: c.hex,
          rgb: { r: c.r, g: c.g, b: c.b },
          percentage: Math.max(1, Math.round((c.count / totalSampledPixels) * 100)),
          pixelCount: c.count,
        }));

        setExtractedColors(results);
        if (results.length > 0 && !isValidHex(selectedColor)) {
          setSelectedColor(results[0].hex);
        }
      } catch (err) {
        console.error('Error extracting palette:', err);
      }
    },
    [selectedColor]
  );

  // -------------------------------------------------------------
  // Render Transformed Canvas & Recompute Palette
  // -------------------------------------------------------------
  const renderTransformedCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = sourceImageRef.current;
    if (!canvas || !img) return;

    const isRotated90or270 = rotation === 90 || rotation === 270;
    const cw = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
    const ch = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

    canvas.width = cw;
    canvas.height = ch;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.translate(cw / 2, ch / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    // Render Original Comparison Canvas if active
    if (originalCanvasRef.current) {
      const origCanvas = originalCanvasRef.current;
      origCanvas.width = img.naturalWidth;
      origCanvas.height = img.naturalHeight;
      const origCtx = origCanvas.getContext('2d');
      if (origCtx) {
        origCtx.clearRect(0, 0, origCanvas.width, origCanvas.height);
        origCtx.drawImage(img, 0, 0);
      }
    }

    // Extract dominant palette
    extractDominantPalette(canvas, extractionCount, paletteMode);
    setIsProcessing(false);
  }, [rotation, flipH, flipV, extractionCount, paletteMode, extractDominantPalette]);

  // Load new Image Source
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      sourceImageRef.current = img;
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      renderTransformedCanvas();
      // Set initial sample to center pixel
      const cx = Math.floor(img.naturalWidth / 2);
      const cy = Math.floor(img.naturalHeight / 2);
      setSelectedCoord({ x: cx, y: cy });
    };

    img.onerror = () => {
      setUploadError('Failed to load image. The file may be corrupt or blocked.');
      setIsProcessing(false);
    };

    img.src = imageSrc;
  }, [imageSrc, renderTransformedCanvas]);

  // Re-render when transformations or palette settings change
  useEffect(() => {
    if (sourceImageRef.current) {
      renderTransformedCanvas();
    }
  }, [rotation, flipH, flipV, extractionCount, paletteMode, renderTransformedCanvas]);

  // -------------------------------------------------------------
  // Precision Pixel Sampling & Loupe Rendering
  // -------------------------------------------------------------
  const samplePixelAt = (clientX: number, clientY: number): { hex: string; x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const px = Math.floor((clientX - rect.left) * scaleX);
    const py = Math.floor((clientY - rect.top) * scaleY);

    if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) {
      return null;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    const pixel = ctx.getImageData(px, py, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

    // Update Loupe Position relative to container
    const container = containerRef.current;
    if (container) {
      const cRect = container.getBoundingClientRect();
      const lx = clientX - cRect.left;
      const ly = clientY - cRect.top;

      // Extract 9x9 neighborhood for high-res Loupe
      const radius = 4;
      const patchData = ctx.getImageData(px - radius, py - radius, 9, 9).data;

      // Draw onto Loupe Canvas
      if (loupeCanvasRef.current) {
        const lCanvas = loupeCanvasRef.current;
        const lCtx = lCanvas.getContext('2d');
        if (lCtx) {
          lCtx.clearRect(0, 0, 90, 90);
          lCtx.imageSmoothingEnabled = false;

          // Render each pixel in 9x9 grid as a 10x10 block
          for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
              const idx = (row * 9 + col) * 4;
              const r = patchData[idx];
              const g = patchData[idx + 1];
              const b = patchData[idx + 2];
              const a = patchData[idx + 3];

              lCtx.fillStyle = a > 0 ? `rgb(${r},${g},${b})` : 'transparent';
              lCtx.fillRect(col * 10, row * 10, 10, 10);

              // Grid lines
              lCtx.strokeStyle = 'rgba(255,255,255,0.08)';
              lCtx.strokeRect(col * 10, row * 10, 10, 10);
            }
          }

          // Center pixel highlight reticle
          lCtx.strokeStyle = '#FFFFFF';
          lCtx.lineWidth = 1.5;
          lCtx.strokeRect(40, 40, 10, 10);
        }
      }

      setLoupe({
        x: Math.min(cRect.width - 130, Math.max(12, lx + 20)),
        y: Math.min(cRect.height - 120, Math.max(12, ly - 80)),
        show: true,
      });
    }

    setHoveredColor(hex);
    setHoveredCoord({ x: px, y: py });
    return { hex, x: px, y: py };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    dragDistRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      const dx = Math.abs(e.clientX - panOffset.x - panStart.x);
      const dy = Math.abs(e.clientY - panOffset.y - panStart.y);
      dragDistRef.current += dx + dy;
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    } else {
      samplePixelAt(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    // If it was a click and not a drag, sample and select the pixel
    if (dragDistRef.current < 6) {
      const sampled = samplePixelAt(e.clientX, e.clientY);
      if (sampled) {
        setSelectedColor(sampled.hex);
        setSelectedCoord({ x: sampled.x, y: sampled.y });
        onCopySuccess(`Sampled ${sampled.hex} at (${sampled.x}, ${sampled.y})`);
      }
    }
  };

  const handlePointerLeave = () => {
    setIsPanning(false);
    setLoupe((prev) => ({ ...prev, show: false }));
    setHoveredColor(null);
    setHoveredCoord(null);
  };

  // -------------------------------------------------------------
  // Zoom & Pan Actions
  // -------------------------------------------------------------
  const handleZoomIn = () => setZoomLevel((z) => Math.min(5, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.25, Number((z - 0.25).toFixed(2))));

  const handleFitToScreen = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const cW = containerRef.current.clientWidth - 48;
    const cH = containerRef.current.clientHeight - 48;
    const imgW = canvasRef.current.width || 1;
    const imgH = canvasRef.current.height || 1;

    const scale = Math.min(cW / imgW, cH / imgH, 1);
    setZoomLevel(Number(scale.toFixed(2)));
    setPanOffset({ x: 0, y: 0 });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // -------------------------------------------------------------
  // Transformation Actions
  // -------------------------------------------------------------
  const handleRotateCw = () => setRotation((r) => ((r + 90) % 360) as any);
  const handleRotateCcw = () => setRotation((r) => ((r + 270) % 360) as any);
  const handleFlipH = () => setFlipH((f) => !f);
  const handleFlipV = () => setFlipV((f) => !f);

  const handleResetTransformations = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // -------------------------------------------------------------
  // Export & Download Options
  // -------------------------------------------------------------
  // 1. Attractive PNG Palette Image Download
  const downloadPaletteImage = () => {
    if (extractedColors.length === 0) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Dark Slate
    const bg = ctx.createLinearGradient(0, 0, 1200, 680);
    bg.addColorStop(0, '#090A0F');
    bg.addColorStop(0.5, '#12131A');
    bg.addColorStop(1, '#0B0D14');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1200, 680);

    // Decorative ambient glow
    const glow = ctx.createRadialGradient(600, 200, 0, 600, 200, 500);
    glow.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 680);

    // Header Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('CHROMA STUDIO', 60, 70);

    ctx.fillStyle = '#818CF8';
    ctx.font = '600 14px monospace';
    ctx.fillText('IMAGE COLOR EXTRACTION PALETTE', 60, 96);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px sans-serif';
    ctx.fillText(
      `Source: ${imageFileName} · ${extractedColors.length} Colors · Mode: ${paletteMode.toUpperCase()}`,
      60,
      120
    );

    // Swatches Layout (2 rows if > 8 colors, else 1 row)
    const count = extractedColors.length;
    const isTwoRows = count > 8;
    const cols = isTwoRows ? Math.ceil(count / 2) : count;
    const swatchWidth = Math.min(180, Math.floor((1200 - 120 - (cols - 1) * 16) / cols));
    const swatchHeight = isTwoRows ? 180 : 380;
    const startY = 160;

    extractedColors.forEach((color, idx) => {
      const col = isTwoRows ? idx % cols : idx;
      const row = isTwoRows ? Math.floor(idx / cols) : 0;
      const x = 60 + col * (swatchWidth + 16);
      const y = startY + row * (swatchHeight + 50);

      // Swatch Rectangle
      ctx.fillStyle = color.hex;
      ctx.beginPath();
      ctx.roundRect(x, y, swatchWidth, swatchHeight, 16);
      ctx.fill();

      // Outline
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Color labels below swatch
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(color.hex, x + 4, y + swatchHeight + 20);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${color.percentage}% distribution`, x + 4, y + swatchHeight + 36);
    });

    // Footer branding
    ctx.fillStyle = '#64748B';
    ctx.font = '12px sans-serif';
    ctx.fillText(
      'Engineered with Chroma Studio · 100% Client-Side In-Browser Color Intelligence',
      60,
      640
    );

    const link = document.createElement('a');
    link.download = `chroma-palette-${imageFileName.replace(/\.[^/.]+$/, '')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onCopySuccess('Exported high-resolution PNG palette card!');
  };

  // 2. Export JSON
  const downloadPaletteJson = () => {
    const data = {
      paletteName: `Extracted from ${imageFileName}`,
      sourceFile: imageFileName,
      extractedAt: new Date().toISOString(),
      mode: paletteMode,
      dimensions: imageDimensions,
      colors: extractedColors.map((c) => ({
        hex: c.hex,
        rgb: c.rgb,
        percentage: c.percentage,
        name: getColorData(c.hex).name,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chroma-palette-${imageFileName.replace(/\.[^/.]+$/, '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess('Downloaded palette JSON!');
  };

  // 3. Export CSS Variables
  const copyCssVariables = () => {
    const lines = extractedColors
      .map(
        (c, i) =>
          `  --color-extracted-${i + 1}: ${c.hex}; /* ${c.percentage}% - ${getColorData(c.hex).name} */`
      )
      .join('\n');
    const css = `/* Generated from ${imageFileName} with Chroma Studio */\n:root {\n${lines}\n}`;
    navigator.clipboard.writeText(css);
    onCopySuccess('Copied CSS Variables to clipboard!');
  };

  // 4. Export HEX Plain Text File
  const downloadHexTextFile = () => {
    const text = extractedColors.map((c) => c.hex).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chroma-colors-${imageFileName.replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onCopySuccess('Downloaded HEX text file!');
  };

  // 5. Save to Favorites
  const handleSavePaletteToFavorites = () => {
    if (onSavePalette && extractedColors.length > 0) {
      onSavePalette(
        `Palette from ${imageFileName.replace(/\.[^/.]+$/, '')}`,
        extractedColors.map((c) => c.hex)
      );
    } else {
      onCopySuccess('Saved extracted palette to favorites!');
    }
  };

  // Active Selected Color Data
  const selectedData: ColorData = useMemo(() => getColorData(selectedColor), [selectedColor]);
  const isSelectedFavorited = isColorFavorited ? isColorFavorited(selectedColor) : false;

  const isRotated90or270 = rotation === 90 || rotation === 270;
  const activeCanvasWidth = imageDimensions
    ? isRotated90or270
      ? imageDimensions.height
      : imageDimensions.width
    : 1;
  const activeCanvasHeight = imageDimensions
    ? isRotated90or270
      ? imageDimensions.width
      : imageDimensions.height
    : 1;

  const wcagWhite = getWCAGScore('#FFFFFF', selectedColor);
  const wcagBlack = getWCAGScore('#000000', selectedColor);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-300 mb-3 font-mono">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>TOOL 03 &middot; ADVANCED IMAGE COLOR EXTRACTION</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Image Color Picker &amp; Palette Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Precision pixel sampling loupe, lossless canvas transformations, and harmonic dominant palette extraction &mdash; all running 100% locally in your browser.
            </p>
          </div>

          {/* Privacy Badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold block">100% Client-Side Privacy</span>
              <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">No images ever leave your device</span>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Error Alert */}
      {uploadError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">File Upload Error</p>
              <p className="text-sm mt-0.5">{uploadError}</p>
            </div>
          </div>
          <button
            onClick={() => setUploadError(null)}
            className="p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. INITIAL DRAG & DROP UPLOAD ZONE (WHEN NO IMAGE IS LOADED)   */}
      {/* ============================================================== */}
      {!imageSrc && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full rounded-3xl border-2 border-dashed transition-all duration-200 p-8 sm:p-14 text-center flex flex-col items-center justify-center bg-white dark:bg-[#12131A] shadow-xl ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[1.01]'
              : 'border-slate-300 dark:border-white/15 hover:border-indigo-400 dark:hover:border-white/30'
          }`}
        >
          {/* Stylized Upload Icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-inner">
            <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Drop Your Image Here
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
            Drag and drop an image or browse your device. You can also paste directly from your clipboard using <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-xs">Ctrl+V</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono text-xs">⌘V</kbd>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Browse Files</span>
            </button>

            <button
              type="button"
              onClick={loadSampleImage}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Try Sample Image</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,image/*"
              onChange={(e) => e.target.files?.[0] && validateAndLoadFile(e.target.files[0])}
              className="hidden"
            />
          </div>

          {/* Formats info */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Supported formats:</span>
            {['PNG', 'JPG / JPEG', 'WEBP', 'GIF', 'BMP', 'SVG'].map((fmt) => (
              <span
                key={fmt}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 font-mono text-[11px]"
              >
                {fmt}
              </span>
            ))}
            <span className="text-[11px] ml-2 text-slate-400">· Max 25 MB</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. ADVANCED EDITING & COLOR EXTRACTION WORKSPACE                */}
      {/* ============================================================== */}
      {imageSrc && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Workspace Toolbar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
            {/* Left: File details & replace */}
            <div className="flex items-center justify-between gap-2.5 w-full sm:w-auto">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-white/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-md">
                    {imageFileName}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {imageDimensions ? `${imageDimensions.width}×${imageDimensions.height}` : ''}
                    {fileSizeBytes ? ` · ${(fileSizeBytes / 1024).toFixed(0)}KB` : ''}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1 shrink-0 ml-1"
                title="Replace with new image"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,image/*"
                onChange={(e) => e.target.files?.[0] && validateAndLoadFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Right: Controls & Actions */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#181A24] p-1 rounded-xl border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Zoom Out (-25%)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 px-2 min-w-[3.5rem] text-center font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Zoom In (+25%)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleFitToScreen}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Fit to Screen"
                  aria-label="Fit to Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer text-xs font-mono"
                  title="Reset Zoom to 100%"
                >
                  100%
                </button>
              </div>

              {/* Transform Controls */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#181A24] p-1 rounded-xl border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleRotateCcw}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Rotate 90° Counter-Clockwise"
                  aria-label="Rotate Counter-Clockwise"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRotateCw}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Rotate 90° Clockwise"
                  aria-label="Rotate Clockwise"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleFlipH}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    flipH
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="Flip Horizontal"
                  aria-label="Flip Horizontal"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleFlipV}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    flipV
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="Flip Vertical"
                  aria-label="Flip Vertical"
                >
                  <FlipVertical className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetTransformations}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                  title="Reset Transformations"
                  aria-label="Reset Transformations"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Comparison Mode Toggle */}
              <button
                type="button"
                onClick={() => setShowComparison(!showComparison)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  showComparison
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                }`}
                title="Toggle Before/After Comparison"
              >
                <Split className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compare</span>
              </button>

              {/* Clear Image */}
              <button
                type="button"
                onClick={handleClearImage}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 dark:bg-white/5 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-white/10 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer"
                title="Clear Image"
                aria-label="Clear Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Grid: Workspace Canvas on Left, Studio Sidebar on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ============================================================ */}
            {/* LEFT / MAIN WORKSPACE AREA                                   */}
            {/* ============================================================ */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              {/* Canvas Viewport Container with Drag-over Replacement */}
              <div
                ref={containerRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                className={`relative w-full h-[420px] sm:h-[540px] rounded-3xl bg-slate-100 dark:bg-[#07080C] border transition-all overflow-hidden flex items-center justify-center select-none shadow-inner ${
                  isDragging
                    ? 'border-indigo-500 ring-4 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-white/10'
                } ${isPanning ? 'cursor-grabbing' : 'cursor-crosshair'}`}
              >
                {/* Visual grid pattern background for transparency check */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(120,120,120,0.25) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Loading indicator */}
                {isProcessing && (
                  <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-white/20">
                      <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                      <span>Processing image colors...</span>
                    </div>
                  </div>
                )}

                {/* Normal Mode vs Comparison Mode */}
                {!showComparison ? (
                  /* Standard Transformed Canvas with Pan & Zoom */
                  <div
                    className="relative transition-transform duration-75 ease-out pointer-events-none"
                    style={{
                      transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      className="rounded-xl shadow-2xl pointer-events-auto block max-w-full max-h-full"
                    />

                    {/* Selected Pixel Reticle Pin Marker */}
                    {selectedCoord && (
                      <div
                        className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
                        style={{
                          left: `${(selectedCoord.x / activeCanvasWidth) * 100}%`,
                          top: `${(selectedCoord.y / activeCanvasHeight) * 100}%`,
                        }}
                      >
                        {/* Target Crosshair */}
                        <div className="relative flex items-center justify-center">
                          <div
                            className="w-5 h-5 rounded-full border-2 border-white shadow-md animate-ping opacity-60 absolute"
                            style={{ backgroundColor: selectedColor }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"
                            style={{ backgroundColor: selectedColor }}
                          >
                            <span className="w-1 h-1 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Side-by-Side Before/After Comparison View */
                  <div className="grid grid-cols-2 gap-4 w-full h-full p-4 items-center justify-center overflow-auto pointer-events-none">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">
                        Original (Unmodified)
                      </span>
                      <canvas
                        ref={originalCanvasRef}
                        className="max-h-[380px] max-w-full object-contain rounded-xl shadow-md border border-slate-300 dark:border-white/10"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-500 mb-2 font-bold">
                        Transformed (Active View)
                      </span>
                      <canvas
                        ref={canvasRef}
                        className="max-h-[380px] max-w-full object-contain rounded-xl shadow-md border border-indigo-400 dark:border-indigo-500/40"
                      />
                    </div>
                  </div>
                )}

                {/* Floating Precision Magnifying Loupe */}
                {loupe.show && hoveredColor && (
                  <div
                    className="pointer-events-none absolute z-30 flex flex-col items-center p-2 rounded-2xl bg-slate-900/90 dark:bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-75 text-white animate-in fade-in"
                    style={{
                      left: loupe.x,
                      top: loupe.y,
                    }}
                  >
                    {/* Zoomed Pixel Matrix Canvas (9x9 pixels) */}
                    <canvas
                      ref={loupeCanvasRef}
                      width={90}
                      height={90}
                      className="rounded-xl shadow-inner border border-white/20 mb-2"
                    />

                    {/* Coordinates & Hex Preview */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-md border border-white/30 shadow-xs"
                        style={{ backgroundColor: hoveredColor }}
                      />
                      <span className="font-mono text-xs font-bold">{hoveredColor}</span>
                    </div>
                    {hoveredCoord && (
                      <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                        X: {hoveredCoord.x}, Y: {hoveredCoord.y}
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom Viewport Status Tag */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-xl bg-slate-900/80 dark:bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] flex items-center gap-1.5 shadow-sm">
                    <Move className="w-3 h-3 text-slate-400" />
                    <span>Drag to Pan &middot; Click to Sample</span>
                  </div>
                  {selectedCoord && (
                    <div className="px-2.5 py-1 rounded-xl bg-indigo-600/90 backdrop-blur-md text-white font-mono text-[11px] shadow-sm">
                      Pin: ({selectedCoord.x}, {selectedCoord.y})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT SIDEBAR: INSPECTOR, PALETTES & EXPORTS                  */}
            {/* ============================================================ */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tab Navigation for Sidebar */}
              <div className="flex p-1 bg-slate-100 dark:bg-[#12131A] rounded-2xl border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('inspector')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSidebarTab === 'inspector'
                      ? 'bg-white dark:bg-[#181A24] text-slate-900 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Sample</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('palette')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSidebarTab === 'palette'
                      ? 'bg-white dark:bg-[#181A24] text-slate-900 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Palette</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('export')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSidebarTab === 'export'
                      ? 'bg-white dark:bg-[#181A24] text-slate-900 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Export</span>
                </button>
              </div>

              {/* -------------------------------------------------------- */}
              {/* TAB 1: SAMPLED COLOR INSPECTOR                           */}
              {/* -------------------------------------------------------- */}
              {activeSidebarTab === 'inspector' && (
                <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Active Sampled Pixel
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedData.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onToggleFavorite && (
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(selectedColor)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSelectedFavorited
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                          }`}
                          title={isSelectedFavorited ? 'Remove from favorites' : 'Save to favorites'}
                          aria-label="Save sample to favorites"
                        >
                          <Heart className={`w-4 h-4 ${isSelectedFavorited ? 'fill-current' : ''}`} />
                        </button>
                      )}
                      <CopyButton textToCopy={selectedColor} size="sm" showIconOnly onCopySuccess={onCopySuccess} />
                    </div>
                  </div>

                  {/* Swatch Display */}
                  <div
                    className="w-full h-24 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner flex flex-col justify-between p-3.5 transition-colors relative overflow-hidden"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md"
                        style={{
                          backgroundColor: selectedData.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                          color: selectedData.isDark ? '#FFF' : '#000',
                        }}
                      >
                        {selectedColor}
                      </span>
                    </div>

                    <span
                      className="text-xs font-semibold backdrop-blur-md px-2 py-0.5 rounded w-fit"
                      style={{
                        backgroundColor: selectedData.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                        color: selectedData.isDark ? '#FFF' : '#000',
                      }}
                    >
                      Contrast vs White: {selectedData.contrastWhite}:1
                    </span>
                  </div>

                  {/* Color Format Code List */}
                  <div className="space-y-1.5 text-xs font-mono">
                    {[
                      { label: 'HEX', val: selectedData.hex },
                      { label: 'RGB', val: selectedData.cssRgb },
                      { label: 'RGBA', val: selectedData.cssRgba },
                      { label: 'HSL', val: selectedData.cssHsl },
                      { label: 'HSV', val: `hsv(${selectedData.hsv.h}, ${selectedData.hsv.s}%, ${selectedData.hsv.v}%)` },
                      { label: 'CMYK', val: `cmyk(${selectedData.cmyk.c}%, ${selectedData.cmyk.m}%, ${selectedData.cmyk.y}%, ${selectedData.cmyk.k}%)` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5"
                      >
                        <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px]">
                          {item.label}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-900 dark:text-white font-medium">{item.val}</span>
                          <CopyButton textToCopy={item.val} size="sm" showIconOnly variant="ghost" onCopySuccess={onCopySuccess} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WCAG Contrast Matrix Snippet */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      WCAG 2.1 Readability
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">On White:</span>
                        <span className={`font-mono font-bold ${wcagWhite.aaNormal ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                          {wcagWhite.level}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">On Black:</span>
                        <span className={`font-mono font-bold ${wcagBlack.aaNormal ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                          {wcagBlack.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('color-detail', selectedColor)}
                      className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Deep Inspect Sample</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('tool-converter', selectedColor)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open in Color Converter</span>
                    </button>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 2: DOMINANT PALETTE EXTRACTION                       */}
              {/* -------------------------------------------------------- */}
              {activeSidebarTab === 'palette' && (
                <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-5 animate-in fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Dominant Color Extraction</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Quantized frequency analysis with perceptual distance clustering.
                    </p>
                  </div>

                  {/* Extraction Count Controls: 5, 8, 10, 12, 16, 20 */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Quantity: {extractionCount} Colors
                    </span>
                    <div className="grid grid-cols-6 gap-1">
                      {[5, 8, 10, 12, 16, 20].map((cnt) => (
                        <button
                          type="button"
                          key={cnt}
                          onClick={() => setExtractionCount(cnt)}
                          className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                            extractionCount === cnt
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Palette Mode Selector */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Palette Mode
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                      {(
                        [
                          { id: 'dominant', label: 'Dominant' },
                          { id: 'balanced', label: 'Balanced' },
                          { id: 'vibrant', label: 'Vibrant' },
                          { id: 'muted', label: 'Muted' },
                          { id: 'monochromatic', label: 'Monochrome' },
                        ] as const
                      ).map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setPaletteMode(m.id)}
                          className={`py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
                            paletteMode === m.id
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extracted Colors Grid / List */}
                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scroll pr-1">
                    {extractedColors.map((colorItem) => {
                      const isItemFavorited = isColorFavorited ? isColorFavorited(colorItem.hex) : false;
                      return (
                        <div
                          key={colorItem.hex}
                          onClick={() => setSelectedColor(colorItem.hex)}
                          className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                            selectedColor === colorItem.hex
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-500 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] border-slate-200 dark:border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg shadow-sm border border-black/10 shrink-0"
                              style={{ backgroundColor: colorItem.hex }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                                  {colorItem.hex}
                                </span>
                                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                                  {colorItem.percentage}%
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                rgb({colorItem.rgb.r}, {colorItem.rgb.g}, {colorItem.rgb.b})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {onToggleFavorite && (
                              <button
                                type="button"
                                onClick={() => onToggleFavorite(colorItem.hex)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isItemFavorited
                                    ? 'text-rose-500'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                                }`}
                                title="Favorite color"
                              >
                                <Heart className={`w-3.5 h-3.5 ${isItemFavorited ? 'fill-current' : ''}`} />
                              </button>
                            )}
                            <CopyButton textToCopy={colorItem.hex} size="sm" showIconOnly variant="ghost" onCopySuccess={onCopySuccess} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Palette Actions */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleSavePaletteToFavorites}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Save Entire Palette to Favorites</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('tool-palette', extractedColors[0]?.hex || selectedColor)}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>Open in Palette Generator</span>
                    </button>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 3: EXPORT & DOWNLOAD                                 */}
              {/* -------------------------------------------------------- */}
              {activeSidebarTab === 'export' && (
                <div className="bg-white dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-xl space-y-4 animate-in fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-500" />
                      <span>Export &amp; Download</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Export your extracted color palette in multiple developer and design formats.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {/* PNG Image Download */}
                    <button
                      type="button"
                      onClick={downloadPaletteImage}
                      className="w-full p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-left flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Download PNG Palette Card</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">1200×680 high-res card with branding</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* JSON File Download */}
                    <button
                      type="button"
                      onClick={downloadPaletteJson}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 text-left flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center shrink-0">
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Download JSON File</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Full color dataset with percentages</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </button>

                    {/* CSS Variables Export */}
                    <button
                      type="button"
                      onClick={copyCssVariables}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 text-left flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center shrink-0">
                          <Copy className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Copy CSS Variables</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">:root custom properties ready to paste</p>
                        </div>
                      </div>
                      <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </button>

                    {/* Plain Text HEX File */}
                    <button
                      type="button"
                      onClick={downloadHexTextFile}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 text-left flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Download HEX Text (.txt)</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Newline-delimited raw hex codes</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </button>
                  </div>

                  {/* Copy All Raw Hex String */}
                  <div className="pt-2">
                    <CopyButton
                      textToCopy={extractedColors.map((c) => c.hex).join(', ')}
                      label="Copy All HEX Codes"
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onCopySuccess={onCopySuccess}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
