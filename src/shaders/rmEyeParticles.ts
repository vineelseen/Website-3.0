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

export const rmEyeParticleShaderVertex = rmEyeParticleBasicVertexShader

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

/** Refined point-cloud typography with breathing */
export const rmEyeParticleShaderFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReceivePulse;

  varying float vRandom;

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

    vec3 color = colorPrimary;
    if (vRandom > 0.72) {
      color = mix(colorPrimary, colorHighlight, smoothstep(0.72, 0.9, vRandom));
    }
    if (vRandom > 0.93) {
      color = mix(color, colorAccent, smoothstep(0.93, 1.0, vRandom));
    }

    float breath = sin(uTime * 1.5) * 0.5 + 0.5;
    float intensity = mix(0.55, 0.85, breath) + uReceivePulse * 0.12;
    intensity = clamp(intensity, 0.5, 0.92);

    float alpha = alphaShape * intensity * 0.68;
    gl_FragColor = vec4(color * (0.76 + core * 0.24), alpha);
  }
`
