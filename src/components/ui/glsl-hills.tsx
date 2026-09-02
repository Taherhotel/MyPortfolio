'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GLSLHills = ({ width = '100vw', height = '100vh', cameraZ = 125, planeSize = 256, speed = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Plane class
    class Plane {
      uniforms: { time: { type: string; value: number } };
      mesh: THREE.Mesh;
      time: number;

      constructor() {
        this.uniforms = {
          time: { type: 'f', value: 0 },
        };
        this.mesh = this.createMesh();
        this.time = speed;
      }

      createMesh() {
        return new THREE.Mesh(
          new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
          new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
              #define GLSLIFY 1
              attribute vec3 position;
              uniform mat4 projectionMatrix;
              uniform mat4 modelViewMatrix;
              uniform float time;
              varying vec3 vPosition;

              mat4 rotateMatrixX(float radian) {
                return mat4(
                  1.0, 0.0, 0.0, 0.0,
                  0.0, cos(radian), -sin(radian), 0.0,
                  0.0, sin(radian), cos(radian), 0.0,
                  0.0, 0.0, 0.0, 1.0
                );
              }

              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
              vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

              float cnoise(vec3 P) {
                vec3 Pi0 = floor(P);
                vec3 Pi1 = Pi0 + vec3(1.0);
                Pi0 = mod289(Pi0);
                Pi1 = mod289(Pi1);
                vec3 Pf0 = fract(P);
                vec3 Pf1 = Pf0 - vec3(1.0);
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;

                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);

                vec4 gx0 = ixy0 * (1.0 / 7.0);
                vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                vec4 gx1 = ixy1 * (1.0 / 7.0);
                vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;

                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);

                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                return 2.2 * n_xyz;
              }

              void main(void) {
                vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
                float noise1 = cnoise(noisePosition * 0.08);
                float noise2 = cnoise(noisePosition * 0.06);
                float noise3 = cnoise(noisePosition * 0.4);
                vec3 lastPosition = updatePosition + vec3(0.0,
                  noise1 * sin1 * 8.0
                  + noise2 * sin1 * 8.0
                  + noise3 * (abs(sin1) * 2.0 + 0.5)
                  + pow(sin1, 2.0) * 40.0, 0.0);

                vPosition = lastPosition;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              #define GLSLIFY 1
              varying vec3 vPosition;

              void main(void) {
                float opacity = (96.0 - length(vPosition)) / 256.0 * 0.8;
                float heightFactor = smoothstep(0.0, 40.0, vPosition.y);
                vec3 color = mix(vec3(0.5, 0.35, 0.05), vec3(1.0, 0.8, 0.2), heightFactor);
                gl_FragColor = vec4(color, opacity);
              }
            `,
            transparent: true
          })
        );
      }

      render(time: number) {
        this.uniforms.time.value += time * this.time;
      }
    }

    // Three.js setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    const clock = new THREE.Clock();
    const plane = new Plane();

    // Starfield setup
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 400; // Lessen number of stars
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 2000;      // x
      starPositions[i * 3 + 1] = Math.random() * 1000 + 50;     // y (strictly above hills)
      starPositions[i * 3 + 2] = Math.random() * -2000;         // z (push them to the background)
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.4, // Lessen intensity
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);

    // Stone Monoliths setup
    const noise3D = (typeof window !== 'undefined') ? require('simplex-noise').createNoise3D() : () => 0;

    function getTerrainHeight(x: number, z: number, time: number) {
      const sin1 = Math.sin((x / 128.0 * 90.0) * (Math.PI / 180.0));

      const nx = x;
      const ny = 0;
      const nz = z + time * -30.0;

      const noise1 = noise3D(nx * 0.08, ny * 0.08, nz * 0.08);
      const noise2 = noise3D(nx * 0.06, ny * 0.06, nz * 0.06);
      const noise3 = noise3D(nx * 0.4, ny * 0.4, nz * 0.4);

      return noise1 * sin1 * 8.0
        + noise2 * sin1 * 8.0
        + noise3 * (Math.abs(sin1) * 2.0 + 0.5)
        + Math.pow(sin1, 2.0) * 40.0;
    }

    // You can add more filenames to this array as you upload them to public/logos/
    const logos = [
      'flutter.png',
      'linux.png',
      'python.png',
      'typescript.png',
      'Go.png',
      'JS.png',
      'github.png',
      'mongodb.png'
    ];
    const textureLoader = new THREE.TextureLoader();
    const stoneGroup = new THREE.Group();
    const stones: THREE.Mesh[] = [];

    // 2D Planes instead of 3D boxes
    const stoneGeo = new THREE.PlaneGeometry(6, 6);

    const logoMaterials = logos.map(filename => {
      const tex = textureLoader.load(`/logos/${filename}`);
      return new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 1.0, // Set to 1.0 so it doesn't blend opaquely
        color: 0xffffff,
        side: THREE.DoubleSide,
        depthWrite: false // Prevents transparency sorting bugs with the hills
      });
    });

    // We only create exactly ONE instance per logo to guarantee no duplicates on screen
    const numLogos = logos.length;

    // Distribute them evenly along the Z axis so they never overlap in depth!
    // Since depth is 260 (-130 to 130), spacing them evenly guarantees they never collide.
    const zSpacing = 260 / numLogos;

    for (let i = 0; i < numLogos; i++) {
      const logoMat = logoMaterials[i];
      const mesh = new THREE.Mesh(stoneGeo, logoMat);

      // Keep the middle clean: x is either between -80 and -40, or 40 and 80
      const side = Math.random() > 0.5 ? 1 : -1;
      mesh.position.x = side * (Math.random() * 40 + 40);
      mesh.position.z = -130 + (i * zSpacing);

      // Keep them perfectly upright to act as 2D billboards
      mesh.rotation.x = -0.1;
      mesh.rotation.y = 0;
      mesh.rotation.z = 0;

      stoneGroup.add(mesh);
      stones.push(mesh);
    }

    let animationFrameId: number;

    const resize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
      const delta = clock.getDelta();
      plane.render(delta);

      // Update stones to ride the terrain waves
      stones.forEach(stone => {
        // Move forward at the exact speed of the terrain noise (30.0)
        stone.position.z += delta * speed * 30.0;

        // Loop back to the distance once it passes the camera
        if (stone.position.z > 130) {
          stone.position.z -= 260; // loop back to -130
          // We keep the exact same X position so the sequence acts as a single fixed moving group
        }

        // Update Y position to sit just slightly above the terrain so it doesn't clip into slopes
        const terrainY = getTerrainHeight(stone.position.x, stone.position.z, plane.uniforms.time.value);
        stone.position.y = terrainY + 5.0; // Elevated significantly so the camera (which is low) can clearly see them over peaks
      });

      renderer.render(scene, camera);
    };

    const renderLoop = () => {
      render();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const init = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      camera.position.set(0, 16, cameraZ);
      camera.lookAt(new THREE.Vector3(0, 28, 0));
      scene.add(plane.mesh);
      scene.add(stars);
      scene.add(stoneGroup);
      window.addEventListener('resize', resize);
      resize();
      renderLoop();
    };

    init();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      plane.mesh.geometry.dispose();
      (plane.mesh.material as THREE.Material).dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [cameraZ, planeSize, speed]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1
        }}
      />
    </div>
  );
};

export { GLSLHills };
