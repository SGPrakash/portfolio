import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
let scene, camera, renderer;
let currentTheme = 'cyber';

function initScene() {
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(10, -10, -10);
    scene.add(pointLight2);
}

// Theme configurations
const themes = {
    cyber: {
        colors: {
            primary: 0x64ffda,
            secondary: 0x0a192f
        },
        particleCount: 150,
        particleSize: 0.15,
        particleSpeed: 0.05,
        particleType: 'cube',
        rotationSpeed: 0.01,
        particleOpacity: 0.8
    },
    galaxy: {
        colors: {
            primary: 0xbd93f9,
            secondary: 0x282a36
        },
        particleCount: 200,
        particleSize: 0.1,
        particleSpeed: 0.03,
        particleType: 'sphere',
        rotationSpeed: 0.005,
        particleOpacity: 0.9
    },
    matrix: {
        colors: {
            primary: 0x50fa7b,
            secondary: 0x282a36
        },
        particleCount: 300,
        particleSize: 0.12,
        particleSpeed: 0.08,
        particleType: 'text',
        rotationSpeed: 0.002,
        particleOpacity: 0.7
    }
};

class ParticleSystem {
    constructor(theme) {
        this.particles = [];
        this.theme = theme;
        this.init();
    }

    init() {
        // Clear existing particles
        this.particles.forEach(p => scene.remove(p));
        this.particles = [];

        // Create new particles
        for (let i = 0; i < this.theme.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        let geometry;
        const size = this.theme.particleSize * (0.5 + Math.random() * 0.5);

        switch (this.theme.particleType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(size, size, size);
                break;
            case 'text':
                geometry = new THREE.PlaneGeometry(size * 2, size * 2);
                break;
            default:
                geometry = new THREE.SphereGeometry(size, 8, 8);
        }

        const material = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? this.theme.colors.primary : this.theme.colors.secondary,
            emissive: this.theme.colors.primary,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: this.theme.particleOpacity,
            shininess: 50
        });

        const particle = new THREE.Mesh(geometry, material);
        
        // Set initial position based on theme
        if (this.theme.particleType === 'text') {
            particle.position.set(
                THREE.MathUtils.randFloatSpread(100),
                THREE.MathUtils.randFloat(0, 100),
                THREE.MathUtils.randFloatSpread(50)
            );
            particle.velocity = new THREE.Vector3(0, -this.theme.particleSpeed, 0);
        } else if (this.theme.particleType === 'sphere') {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 20 + Math.random() * 30;
            
            particle.position.x = radius * Math.sin(theta) * Math.cos(phi);
            particle.position.y = radius * Math.sin(theta) * Math.sin(phi);
            particle.position.z = radius * Math.cos(theta);
            
            particle.velocity = new THREE.Vector3(
                Math.cos(phi) * this.theme.particleSpeed * 0.05,
                Math.sin(phi) * this.theme.particleSpeed * 0.05,
                Math.sin(theta) * this.theme.particleSpeed * 0.05
            );
        } else {
            particle.position.set(
                THREE.MathUtils.randFloatSpread(80),
                THREE.MathUtils.randFloatSpread(80),
                THREE.MathUtils.randFloatSpread(80)
            );
            particle.velocity = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(this.theme.particleSpeed),
                THREE.MathUtils.randFloatSpread(this.theme.particleSpeed),
                THREE.MathUtils.randFloatSpread(this.theme.particleSpeed)
            );
        }

        particle.originalY = particle.position.y;
        particle.rotationSpeed = {
            x: THREE.MathUtils.randFloatSpread(this.theme.rotationSpeed),
            y: THREE.MathUtils.randFloatSpread(this.theme.rotationSpeed),
            z: THREE.MathUtils.randFloatSpread(this.theme.rotationSpeed)
        };

        scene.add(particle);
        this.particles.push(particle);
    }

    update() {
        this.particles.forEach(particle => {
            if (currentTheme === 'matrix') {
                particle.position.y -= this.theme.particleSpeed;
                if (particle.position.y < -100) {
                    particle.position.y = 100;
                    particle.position.x = THREE.MathUtils.randFloatSpread(100);
                }
            } else if (currentTheme === 'galaxy') {
                const radius = Math.sqrt(
                    particle.position.x ** 2 + 
                    particle.position.z ** 2
                );
                
                const angle = Math.atan2(particle.position.z, particle.position.x) + 
                             this.theme.particleSpeed * 0.01;
                
                particle.position.x = Math.cos(angle) * radius;
                particle.position.z = Math.sin(angle) * radius;
                
                particle.position.y += particle.velocity.y;
                if (Math.abs(particle.position.y - particle.originalY) > 10) {
                    particle.velocity.y *= -1;
                }
            } else {
                particle.position.add(particle.velocity);
                
                ['x', 'y', 'z'].forEach(axis => {
                    if (particle.position[axis] > 50) particle.position[axis] = -50;
                    if (particle.position[axis] < -50) particle.position[axis] = 50;
                });
            }

            particle.rotation.x += particle.rotationSpeed.x;
            particle.rotation.y += particle.rotationSpeed.y;
            particle.rotation.z += particle.rotationSpeed.z;
        });
    }
}

let particleSystem;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    if (particleSystem) {
        particleSystem.update();
    }

    // Camera movement
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize everything
initScene();
particleSystem = new ParticleSystem(themes[currentTheme]);
animate();

// Theme switching
function updateTheme(themeName) {
    if (themeName === currentTheme) return;
    currentTheme = themeName;
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });

    particleSystem = new ParticleSystem(themes[themeName]);
}

// Add event listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        updateTheme(btn.dataset.theme);
    });
});
