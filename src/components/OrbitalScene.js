import React, { useEffect, useId, useRef, useState } from "react";

const vertexSource = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// An orthographic sphere keeps the horizon curved while geographic textures
// rotate through a continuous longitude coordinate. Day and night share UVs.
const fragmentSource = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_day;
uniform sampler2D u_night;
const float PI = 3.14159265;

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 center = vec2(aspect * 0.10, -3.38);
  float radius = 3.10;
  vec2 delta = p - center;
  float distanceToCenter = length(delta);
  float altitude = distanceToCenter - radius;

  if (altitude > 0.0) {
    float atmosphere = exp(-altitude * 66.0) * 0.75;
    vec3 color = vec3(0.16, 0.48, 0.9) * atmosphere;
    // Northern lights appear for a short interval, with independent drifting curtains.
    float cycle = mod(u_time + 7.0, 53.0);
    float activity = smoothstep(12.0, 18.0, cycle) * (1.0 - smoothstep(26.0, 33.0, cycle));
    float wave = 0.105 + sin(p.x * 5.0 + u_time * 0.15) * 0.033 + sin(p.x * 11.0 - u_time * 0.09) * 0.012;
    float ribbon = exp(-abs(altitude - wave) * 27.0);
    float curtains = 0.5 + 0.5 * pow(abs(sin(p.x * 43.0 + sin(p.x * 13.0) + u_time * 0.12)), 3.0);
    float aurora = ribbon * curtains * activity * smoothstep(-0.3, 0.5, p.x) * 0.32;
    vec3 auroraColor = mix(vec3(0.08, 0.9, 0.64), vec3(0.44, 0.27, 0.92), smoothstep(0.08, 0.21, altitude));
    color += auroraColor * aurora;
    float alpha = clamp(atmosphere + aurora, 0.0, 0.9);
    gl_FragColor = vec4(color / max(alpha, 0.001), alpha);
    return;
  }

  vec2 xy = delta / radius;
  vec3 normal = vec3(xy, sqrt(max(0.0, 1.0 - dot(xy, xy))));
  float tilt = 0.65;
  vec3 geography = vec3(normal.x, normal.y * cos(tilt) - normal.z * sin(tilt), normal.y * sin(tilt) + normal.z * cos(tilt));
  vec2 uv = vec2(fract(atan(geography.z, geography.x) / (2.0 * PI) + 0.34 + u_time / 210.0), acos(clamp(geography.y, -1.0, 1.0)) / PI);
  vec3 day = texture2D(u_day, uv).rgb;
  vec3 night = texture2D(u_night, uv).rgb;
  vec3 sunDirection = normalize(vec3(0.9, -0.04, -0.38 + sin(u_time * 0.022) * 0.15));
  float sunlight = dot(normal, sunDirection);
  float dayAmount = smoothstep(-0.1, 0.32, sunlight);
  vec3 surface = day * (0.11 + max(sunlight, 0.0) * 0.8) * vec3(0.64, 0.8, 1.0);
  float cityBrightness = max(night.r, max(night.g, night.b));
  surface += night * vec3(1.2, 0.96, 0.65) * (1.0 - dayAmount) * smoothstep(0.06, 0.45, cityBrightness) * 1.7;
  float rim = pow(1.0 - normal.z, 8.0);
  surface += vec3(0.15, 0.42, 0.8) * rim * 0.7;
  gl_FragColor = vec4(surface, 1.0);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("The orbital shader could not be compiled.");
  }
  return shader;
}

export default function OrbitalScene({ reduced, active }) {
  const shipMaskId = useId().replace(/:/g, "") + "-engine-fade";
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const activeRef = useRef(active);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    activeRef.current = active;
    controlsRef.current?.setActive(active);
  }, [active]);

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power", premultipliedAlpha: false });
    if (!gl) return undefined;
    let disposed = false;
    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let loaded = false;
    let failed = false;
    let program;
    let buffer;
    const shaders = [];
    const textures = [];
    const images = [];
    let resizeObserver;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; };

    const cleanup = () => {
      disposed = true;
      stop();
      resizeObserver?.disconnect();
      images.forEach((image) => { image.onload = null; image.onerror = null; });
      textures.forEach((texture) => gl.deleteTexture(texture));
      shaders.forEach((shader) => gl.deleteShader(shader));
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      controlsRef.current = null;
    };

    try {
      shaders.push(createShader(gl, gl.VERTEX_SHADER, vertexSource));
      shaders.push(createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
      program = gl.createProgram();
      shaders.forEach((shader) => gl.attachShader(program, shader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Orbital shader link failed.");
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const resolution = gl.getUniformLocation(program, "u_resolution");
      const time = gl.getUniformLocation(program, "u_time");

      const paint = () => {
        if (!loaded || disposed || failed) return;
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform1f(time, elapsed);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      const tick = (now) => {
        if (disposed || failed || !activeRef.current) { stop(); return; }
        if (!lastFrame || now - lastFrame >= 1000 / 30) {
          if (lastFrame) elapsed += Math.min(now - lastFrame, 100) / 1000;
          lastFrame = now;
          paint();
        }
        frame = requestAnimationFrame(tick);
      };
      const start = () => {
        if (!frame && loaded && !disposed && !failed && activeRef.current) frame = requestAnimationFrame(tick);
      };
      controlsRef.current = { setActive: (value) => value ? start() : stop() };
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5, 1800 / Math.max(rect.width, 1));
        canvas.width = Math.max(1, Math.round(rect.width * ratio));
        canvas.height = Math.max(1, Math.round(rect.height * ratio));
        gl.viewport(0, 0, canvas.width, canvas.height);
        paint();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();
      let loadedCount = 0;
      ["/images/space/earth-day.jpg", "/images/space/earth-night.png"].forEach((src, unit) => {
        const image = new Image();
        images.push(image);
        image.onload = () => {
          if (disposed || failed) return;
          const texture = gl.createTexture();
          textures.push(texture);
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.uniform1i(gl.getUniformLocation(program, unit === 0 ? "u_day" : "u_night"), unit);
          loadedCount += 1;
          if (loadedCount === 2) {
            loaded = true;
            paint();
            setReady(true);
            start();
          }
        };
        image.onerror = () => { failed = true; stop(); setReady(false); };
        image.src = src;
      });
    } catch {
      cleanup();
      return undefined;
    }
    const onContextLost = (event) => {
      event.preventDefault();
      failed = true;
      stop();
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      cleanup();
    };
  }, [reduced]);

  return (
    <div className="hero-space-scene" aria-hidden="true" data-running={active && !reduced} data-earth-ready={ready && !reduced}>
      <div className="hero-starfield" style={{ backgroundImage: "url('/images/orbital-background.jpg')" }} />
      <div className="hero-earth-fallback" style={{ backgroundImage: "url('/images/orbital-background.jpg')" }} />
      <canvas ref={canvasRef} className="hero-earth-canvas" />
      <div className="hero-sunrise" />
      <div className="hero-meteors"><i /><i /><i /></div>
      <div className="hero-spacecraft">
        <svg viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={shipMaskId + "-gradient"} x1="880" x2="1010" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.45" stopColor="white" stopOpacity="0.15" />
              <stop offset="0.75" stopColor="white" stopOpacity="0.6" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <mask id={shipMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
              <rect width="1672" height="941" fill={"url(#" + shipMaskId + "-gradient)"} />
            </mask>
          </defs>
          <image href="/images/orbital-ship-branded.png" x="380" y="100" width="1237.28" height="696.34" mask={"url(#" + shipMaskId + ")"} />
        </svg>
      </div>
    </div>
  );
}
