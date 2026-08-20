export const rmEyeParticleBasicVertexShader = /* glsl */ `
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 3.5 * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.8, 4.2);
  }
`

export const rmEyeParticleShaderVertex = rmEyeParticleBasicVertexShader

/** Step 8 — obvious test color, circular points */
export const rmEyeParticleBasicFragmentShader = /* glsl */ `
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(uv);

    if (distanceToCenter > 0.5) {
      discard;
    }

    gl_FragColor = vec4(0.145, 0.388, 0.922, 1.0);
  }
`

/** Step 9 — same circular points with breathing brightness */
export const rmEyeParticleShaderFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReceivePulse;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(uv);

    if (distanceToCenter > 0.5) {
      discard;
    }

    float breath = sin(uTime * 1.5) * 0.5 + 0.5;
    float intensity = mix(0.55, 0.85, breath) + uReceivePulse * 0.15;
    intensity = clamp(intensity, 0.5, 1.0);

    vec3 color = vec3(0.145, 0.388, 0.922) * intensity;
    gl_FragColor = vec4(color, 0.95);
  }
`
