export const particleVertexShader = /* glsl */ `
  attribute float aRandom;
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
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // Subtle ambient drift
    float drift = uReducedMotion > 0.5 ? 0.0 : 1.0;
    pos += aNormal * sin(uTime * 0.4 + aRandom * 6.28) * 0.008 * drift;
    pos.x += sin(uTime * 0.25 + aRandom * 10.0) * 0.004 * drift;
    pos.y += cos(uTime * 0.3 + aRandom * 8.0) * 0.004 * drift;

    // Hover illumination wave
    float wave = sin(uTime * 3.0 - length(position) * 2.0) * 0.5 + 0.5;
    float hoverBoost = uHover * wave * 0.15;

    // Proximity brighten
    float proxDist = length(pos.xy - uMouse.xy);
    float proximity = uEnableProximity > 0.5
      ? smoothstep(uProximityRadius, 0.0, proxDist) * 0.25
      : 0.0;

    float baseIntensity = uIntensity + hoverBoost + proximity;
    vAlpha = clamp(baseIntensity, 0.05, 1.0);
    vGlow = uHover * 0.6 + proximity * 0.4;

    // Depth push when another asset is hovered
    pos.z -= uPushBack * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeBase = 1.8 + aRandom * 1.2;
    float sizeBoost = 1.0 + uHover * 1.5 + proximity * 0.5;
    gl_PointSize = sizeBase * sizeBoost * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);

    vColor = mix(vec3(0.098, 0.310, 0.565), vec3(0.357, 0.608, 0.878), aRandom);
    vColor = mix(vColor, vec3(0.145, 0.388, 0.922), uHover * 0.5);
  }
`

export const particleFragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorAccent;
  uniform float uHalo;

  varying float vAlpha;
  varying float vGlow;
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.15, dist);

    vec3 color = mix(uColorPrimary, uColorAccent, core);
    color = mix(color, vColor, 0.4);
    color += uHalo * vec3(0.145, 0.388, 0.922) * vGlow;

    float alpha = soft * vAlpha;
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
    float anim = uReducedMotion > 0.5 ? aProgress : fract(aProgress + uTime * uSpeed * 0.15);
    vec3 pos = position;

    // Slight curve offset for organic flow
    pos.y += sin(aProgress * 6.28 + uTime * 0.5) * 0.05 * (1.0 - anim);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float pulseBoost = uPulse * 2.0;
    gl_PointSize = (1.2 + aRandom * 0.8 + pulseBoost) * (120.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.3, 4.0);

    vAlpha = uOpacity * (0.4 + anim * 0.6) * (1.0 + uPulse * 0.8);
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
