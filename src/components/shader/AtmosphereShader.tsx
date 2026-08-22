"use client";

import React, { useEffect, useRef } from "react";

// WebGL2 Simplex Fluid Warp Shader
const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Simplex 2D noise helper
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouseNorm = u_mouse.xy / u_resolution.xy;

  // Aspect ratio correction
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = st;
  uv.x *= aspect;
  mouseNorm.x *= aspect;

  float distToMouse = length(uv - mouseNorm);
  float mouseInfluence = smoothstep(0.4, 0.0, distToMouse) * 0.15;

  float t = u_time * 0.06;

  // Domain warping with simplex noise
  float n1 = snoise(uv * 1.5 + vec2(t * 0.5, t * 0.3));
  float n2 = snoise(uv * 2.5 - vec2(t * 0.3, t * 0.7) + vec2(n1 * 0.5) + mouseInfluence);

  float intensity = smoothstep(-0.2, 0.9, n2) * 0.045;

  // Base Obsidian background with subtle amber/gold tint in the highlights
  vec3 baseColor = vec3(0.031, 0.031, 0.031); // #080808
  vec3 accentColor = vec3(0.898, 0.663, 0.235); // #E5A93C

  vec3 finalColor = mix(baseColor, accentColor, intensity);

  // Subtle radial vignette
  float vignette = smoothstep(1.2, 0.2, length(st - vec2(0.5)));
  finalColor *= mix(0.7, 1.0, vignette);

  fragColor = vec4(finalColor, 1.0);
}
`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const AtmosphereShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gl = canvas.getContext("webgl2", { powerPreference: "low-power" });
    if (!gl) return;

    const vShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrLoc);
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let startTime = performance.now();
    let lastRender = 0;
    const FPS_INTERVAL = 1000 / 30; // 30 FPS cap for energy efficiency

    const resize = () => {
      const scale = 0.5; // Downscale buffer to save GPU cycles
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = currentTime - lastRender;
      if (elapsed < FPS_INTERVAL) return;
      lastRender = currentTime - (elapsed % FPS_INTERVAL);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX * 0.5, mouseY * 0.5);
      gl.uniform1f(timeLoc, (currentTime - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};
