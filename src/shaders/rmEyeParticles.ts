export const rmEyeParticleBasicVertexShader = /* glsl */ `
  attribute float aRandom;

  varying float vRandom;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vRandom = aRandom;

    float sizeVar = mix(0.85, 1.15, aRandom);
    gl_PointSize = 1.65 * sizeVar * (285.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.85, 2.0);
  }
`

export const rmEyeParticleShaderVertex = /* glsl */ `
  attribute float aRandom;

  uniform float uTime;

  varying float vRandom;
  varying float vBreath;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vRandom = aRandom;

    vBreath = sin(uTime * 1.45) * 0.5 + 0.5;

    float sizeVar = mix(0.85, 1.15, aRandom);
    float breathSize = mix(0.95, 1.08, vBreath);
    gl_PointSize = 1.65 * sizeVar * breathSize * (285.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.85, 2.0);
  }
`

/** Step 8 — obvious test color, circular points */
export const rmEyeParticleBasicFragmentShader = /* glsl */ `
  varying float vRandom;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);

    if (dist > 0.5) {
      discard;
    }

    gl_FragColor = vec4(0.145, 0.388, 0.922, 1.0);
  }
`

/** Refined point-cloud typography with visible breathing */
export const rmEyeParticleShaderFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReceivePulse;

  varying float vRandom;
  varying float vBreath;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);

    if (dist > 0.5) {
      discard;
    }

    float core = 1.0 - smoothstep(0.0, 0.2, dist);
    float edge = 1.0 - smoothstep(0.36, 0.5, dist);
    float alphaShape = core * 0.6 + edge * 0.4;

    vec3 colorPrimary = vec3(0.098, 0.310, 0.565);
    vec3 colorHighlight = vec3(0.145, 0.388, 0.922);
    vec3 colorAccent = vec3(0.357, 0.608, 0.878);

    vec3 baseColor = mix(colorHighlight, colorAccent, vBreath * 0.55);
    if (vRandom > 0.68) {
      baseColor = mix(baseColor, colorAccent, smoothstep(0.68, 0.92, vRandom) * (0.35 + vBreath * 0.45));
    }
    if (vRandom < 0.32) {
      baseColor = mix(colorPrimary, baseColor, 0.72);
    }

    float particleLift = smoothstep(0.88, 1.0, vRandom) * vBreath * 0.14;
    float intensity = mix(0.6, 1.05, vBreath) + particleLift + uReceivePulse * 0.1;
    intensity = clamp(intensity, 0.58, 1.1);

    float opacity = mix(0.72, 1.0, vBreath);
    float alpha = alphaShape * opacity;

    vec3 finalColor = baseColor * intensity * (0.95 + core * 0.08);
    gl_FragColor = vec4(finalColor, alpha);
  }
`
