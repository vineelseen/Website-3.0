/** Stage 4 — static power transformer point cloud (separate from RM EYE) */

export const transformerParticleVertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aWeight;
  attribute vec3 aNormal;

  uniform float uIntensity;

  varying float vAlpha;
  varying float vDepth;
  varying float vRandom;

  void main() {
    vec3 pos = position;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vDepth = -mvPosition.z;
    vRandom = aRandom;

    float weightBoost = aWeight * 0.025;
    vAlpha = clamp(uIntensity + weightBoost, 0.38, 0.72);

    float depthScale = clamp(6.8 / vDepth, 0.75, 1.4);
    float sizeVar = mix(0.9, 1.14, aRandom);
    float sizeBase = (1.35 + aWeight * 0.08) * sizeVar * depthScale;
    gl_PointSize = sizeBase * (210.0 / vDepth);
    gl_PointSize = clamp(gl_PointSize, 0.75, 2.6);
  }
`

export const transformerParticleFragmentShader = /* glsl */ `
  uniform vec3 uColorDark;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorAccent;

  varying float vAlpha;
  varying float vDepth;
  varying float vRandom;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);
    if (dist > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.2, dist);
    float edge = 1.0 - smoothstep(0.36, 0.5, dist);
    float alphaShape = core * 0.55 + edge * 0.45;

    vec3 color = mix(uColorDark, uColorPrimary, core * 0.65);
    if (vRandom > 0.78) {
      color = mix(color, uColorHighlight, smoothstep(0.78, 0.94, vRandom) * core);
    }
    if (vRandom > 0.96) {
      color = mix(color, uColorAccent, smoothstep(0.96, 1.0, vRandom) * core * 0.5);
    }

    float depthFade = clamp(1.0 - (vDepth - 5.5) * 0.05, 0.68, 1.0);
    float alpha = alphaShape * vAlpha * depthFade * 0.82;
    gl_FragColor = vec4(color * (0.88 + core * 0.22), alpha);
  }
`
