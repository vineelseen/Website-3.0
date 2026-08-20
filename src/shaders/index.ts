export const assetVertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aWeight;
  attribute vec3 aNormal;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uHover;
  uniform float uPushBack;
  uniform vec2 uCursor;
  uniform float uEnableProximity;
  uniform float uReducedMotion;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec3 pos = position;

    float drift = uReducedMotion > 0.5 ? 0.0 : 1.0;
    float n = sin(uTime * 0.3 + aRandom * 6.283) * 0.004;
    pos += aNormal * n * drift;
    pos.x += sin(uTime * 0.18 + aRandom * 9.0) * 0.002 * drift;
    pos.y += cos(uTime * 0.22 + aRandom * 7.0) * 0.002 * drift;

    float hoverBoost = uHover * 0.22;
    float weightBoost = aWeight * 0.04;

    float proxDist = length(pos.xy - uCursor * 3.5);
    float proximity = uEnableProximity > 0.5
      ? smoothstep(1.2, 0.0, proxDist) * 0.08
      : 0.0;

    float intensity = uIntensity + hoverBoost + weightBoost + proximity;
    vAlpha = clamp(intensity, 0.06, 0.55);

    pos.z -= uPushBack * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vDepth = -mvPosition.z;

    float depthScale = clamp(6.5 / vDepth, 0.5, 1.4);
    float sizeBase = (1.2 + aRandom * 0.6 + aWeight * 0.1) * depthScale;
    float sizeBoost = 1.0 + uHover * 0.5 + proximity * 0.2;
    gl_PointSize = sizeBase * sizeBoost * (180.0 / vDepth);
    gl_PointSize = clamp(gl_PointSize, 0.35, 3.2);
  }
`

export const assetFragmentShader = /* glsl */ `
  uniform vec3 uColorDark;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;

    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.1, dist);

    float depthFade = clamp(1.0 - (vDepth - 4.0) * 0.08, 0.4, 1.0);
    vec3 color = mix(uColorDark, uColorPrimary, core * 0.6);
    color = mix(color, uColorHighlight, core * 0.25);

    float alpha = soft * vAlpha * depthFade;
    gl_FragColor = vec4(color, alpha);
  }
`

export const rmEyeVertexShader = /* glsl */ `
  attribute float aRandom;

  uniform float uTime;
  uniform float uReceivePulse;
  uniform float uReducedMotion;

  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec3 pos = position;

    float drift = uReducedMotion > 0.5 ? 0.0 : 1.0;
    pos += vec3(
      sin(uTime * 0.25 + aRandom * 6.28) * 0.001,
      cos(uTime * 0.3 + aRandom * 5.0) * 0.001,
      0.0
    ) * drift;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float breath = sin(uTime * 1.5) * 0.5 + 0.5;
    float breathingIntensity = mix(0.48, 0.78, breath);
    float variation = sin(uTime * 1.5 + aRandom * 2.0) * 0.04;
    float pulse = uReceivePulse * 0.2;
    float finalIntensity = clamp(breathingIntensity + variation + pulse, 0.35, 0.95);

    vAlpha = finalIntensity;
    vGlow = breathingIntensity + pulse;

    float size = (2.0 + aRandom * 0.8) * (1.0 + uReceivePulse * 0.15 + breath * 0.08);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.8, 4.5);
  }
`

export const rmEyeFragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;

  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;

    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.12, dist);

    vec3 color = mix(uColorPrimary, uColorHighlight, core * 0.5 + vGlow * 0.15);
    float alpha = soft * vAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`

export const circuitVertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aAlong;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uActive;
  uniform float uReducedMotion;

  varying float vAlpha;

  void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float base = uIntensity + uActive * 0.12;
    float flicker = uReducedMotion > 0.5 ? 0.0 : sin(uTime * 0.5 + aRandom * 10.0) * 0.02;
    vAlpha = clamp(base + flicker, 0.04, 0.25);

    gl_PointSize = (0.6 + aRandom * 0.3) * (100.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.25, 1.8);
  }
`

export const circuitFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;
    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(uColor, soft * vAlpha);
  }
`

export const dataFlowVertexShader = /* glsl */ `
  attribute float aProgress;
  attribute float aRandom;
  attribute float aPhase;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uActive;
  uniform float uOpacity;
  uniform float uReducedMotion;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float travel = uReducedMotion > 0.5
      ? 0.0
      : fract(uTime * uSpeed * 0.06 + aPhase);

    float dist = abs(aProgress - travel);
    float pulse = smoothstep(0.14, 0.0, min(dist, 1.0 - dist));

    float idlePulse = uReducedMotion > 0.5 ? 0.0 : smoothstep(0.1, 0.0, abs(aProgress - fract(uTime * 0.03 + aRandom))) * 0.3;

    float activeBoost = uActive * 0.7;
    vAlpha = uOpacity * (0.08 + pulse * (0.4 + activeBoost) + idlePulse * 0.15);
    vAlpha *= 0.6 + aRandom * 0.4;

    float size = (0.7 + aRandom * 0.4 + pulse * 0.5 + activeBoost * 0.3) * (90.0 / -mvPosition.z);
    gl_PointSize = clamp(size, 0.25, 2.2);
  }
`

export const dataFlowFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;
    float soft = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(uColor, soft * vAlpha);
  }
`
