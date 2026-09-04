/** Stage 3 — RM EYE particle typography shaders */

export const rmEyeTypographyVertexShader = /* glsl */ `
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
      sin(uTime * 0.25 + aRandom * 6.28) * 0.003,
      cos(uTime * 0.3 + aRandom * 5.0) * 0.003,
      0.0
    ) * drift;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float breath = sin(uTime * 1.4) * 0.5 + 0.5;
    float breathingIntensity = mix(0.45, 0.75, breath);
    float variation = sin(uTime * 1.4 + aRandom * 1.5) * 0.04;
    float pulse = uReceivePulse * 0.2;
    float finalIntensity = clamp(breathingIntensity + variation + pulse, 0.38, 0.82);

    vAlpha = finalIntensity;
    vGlow = breathingIntensity + pulse;

    float size = (1.2 + aRandom * 0.35) * (1.0 + uReceivePulse * 0.08 + breath * 0.03);
    gl_PointSize = size * (185.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.55, 2.1);
  }
`

export const rmEyeTypographyFragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorAccent;

  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;

    float soft = 1.0 - smoothstep(0.0, 0.5, d);
    float core = 1.0 - smoothstep(0.0, 0.14, d);

    vec3 color = mix(uColorPrimary, uColorHighlight, core * 0.45 + vGlow * 0.08);
    color = mix(color, uColorAccent, core * 0.14 * vGlow);
    float alpha = soft * vAlpha * 0.55;
    gl_FragColor = vec4(color, alpha);
  }
`
