export const particleVertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aWeight;
  attribute vec3 aNormal;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uHover;
  uniform float uPushBack;
  uniform vec3 uMouse;
  uniform float uProximityRadius;
  uniform float uEnableProximity;
  uniform float uReducedMotion;

  varying float vAlpha;
  varying float vGlow;
  varying float vWeight;

  void main() {
    vec3 pos = position;

    float drift = uReducedMotion > 0.5 ? 0.0 : 1.0;
    float noise = sin(uTime * 0.35 + aRandom * 6.283) * 0.003;
    pos += aNormal * noise * drift;
    pos.x += sin(uTime * 0.2 + aRandom * 10.0) * 0.002 * drift;
    pos.y += cos(uTime * 0.25 + aRandom * 8.0) * 0.002 * drift;

    float wave = sin(uTime * 2.5 - length(position) * 1.8) * 0.5 + 0.5;
    float hoverBoost = uHover * wave * 0.12;

    float proxDist = length(pos.xy - uMouse.xy);
    float proximity = uEnableProximity > 0.5
      ? smoothstep(uProximityRadius, 0.0, proxDist) * 0.2
      : 0.0;

    float weightBoost = aWeight * 0.05;
    float baseIntensity = uIntensity + hoverBoost + proximity + weightBoost;
    vAlpha = clamp(baseIntensity, 0.04, 1.0);
    vGlow = uHover * 0.55 + proximity * 0.35;
    vWeight = aWeight;

    pos.z -= uPushBack * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeBase = 1.6 + aRandom * 1.0 + aWeight * 0.15;
    float sizeBoost = 1.0 + uHover * 1.3 + proximity * 0.4;
    gl_PointSize = sizeBase * sizeBoost * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.4, 5.5);
  }
`

export const particleFragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorAccent;
  uniform vec3 uColorBright;
  uniform float uHalo;

  varying float vAlpha;
  varying float vGlow;
  varying float vWeight;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.12, dist);

    vec3 color = mix(uColorPrimary, uColorHighlight, core * 0.5);
    color = mix(color, uColorAccent, core * 0.4);
    color = mix(color, uColorBright, core * vGlow * 0.6);
    color += uHalo * uColorHighlight * vGlow * 0.3;

    float alpha = soft * vAlpha * (0.85 + core * 0.15);
    gl_FragColor = vec4(color, alpha);
  }
`

export const streamVertexShader = /* glsl */ `
  attribute float aProgress;
  attribute float aRandom;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uPulse;
  uniform float uReducedMotion;

  varying float vAlpha;

  void main() {
    float anim = uReducedMotion > 0.5 ? aProgress : fract(aProgress + uTime * uSpeed * 0.12);
    vec3 pos = position;

    pos.y += sin(aProgress * 6.28 + uTime * 0.4) * 0.04 * (1.0 - anim);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float pulseBoost = uPulse * 1.8;
    gl_PointSize = (1.0 + aRandom * 0.7 + pulseBoost) * (120.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.3, 3.5);

    vAlpha = uOpacity * (0.35 + anim * 0.65) * (1.0 + uPulse * 0.7);
  }
`

export const streamFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(uColor, soft * vAlpha);
  }
`
