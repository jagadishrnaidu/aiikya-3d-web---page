// Unit Data
const unitsData = [
  // Ground Floor - Studios
  {
    id: 'G-01', floor: 0, type: 'Studio', bedrooms: 1, bathrooms: 1,
    surface: 45, orientation: 'N', availability: 'AVAILABLE',
    position: { x: -4, y: 0.5, z: 4 },
    amenities: ['Modular Kitchen', 'Built-in Wardrobes', 'Balcony', 'Premium Flooring', 'Smart Lighting'],
    images: ['studio-1.jpg', 'studio-2.jpg']
  },
  {
    id: 'G-02', floor: 0, type: 'Studio', bedrooms: 1, bathrooms: 1,
    surface: 48, orientation: 'E', availability: 'AVAILABLE',
    position: { x: 0, y: 0.5, z: 4 },
    amenities: ['Modular Kitchen', 'Built-in Wardrobes', 'Balcony', 'Premium Flooring', 'Smart Lighting'],
    images: ['studio-1.jpg', 'studio-2.jpg']
  },
  {
    id: 'G-03', floor: 0, type: 'Studio', bedrooms: 1, bathrooms: 1,
    surface: 45, orientation: 'S', availability: 'SOLD',
    position: { x: 4, y: 0.5, z: 4 },
    amenities: ['Modular Kitchen', 'Built-in Wardrobes', 'Balcony', 'Premium Flooring'],
    images: ['studio-1.jpg', 'studio-2.jpg']
  },
  {
    id: 'G-04', floor: 0, type: 'Studio', bedrooms: 1, bathrooms: 1,
    surface: 50, orientation: 'W', availability: 'AVAILABLE',
    position: { x: -4, y: 0.5, z: -4 },
    amenities: ['Modular Kitchen', 'Built-in Wardrobes', 'Balcony', 'Premium Flooring', 'Garden View'],
    images: ['studio-1.jpg', 'studio-2.jpg']
  },

  // 1st Floor - Flats
  {
    id: 'F1-01', floor: 1, type: 'Flat', bedrooms: 2, bathrooms: 2,
    surface: 85, orientation: 'N', availability: 'AVAILABLE',
    position: { x: -4, y: 3.5, z: 4 },
    amenities: ['Modern Kitchen', 'Spacious Living', 'Master Bedroom', 'Balcony', 'Premium Fixtures', 'Built-in Storage'],
    images: ['duplex-1.jpg', 'duplex-2.jpg', 'duplex-3.jpg']
  },
  {
    id: 'F1-02', floor: 1, type: 'Flat', bedrooms: 2, bathrooms: 2,
    surface: 88, orientation: 'E', availability: 'AVAILABLE',
    position: { x: 0, y: 3.5, z: 4 },
    amenities: ['Modern Kitchen', 'Spacious Living', 'Master Bedroom', 'Balcony', 'Premium Fixtures', 'Built-in Storage'],
    images: ['duplex-1.jpg', 'duplex-2.jpg', 'duplex-3.jpg']
  },
  {
    id: 'F1-03', floor: 1, type: 'Flat', bedrooms: 2, bathrooms: 2,
    surface: 85, orientation: 'S', availability: 'SOLD',
    position: { x: 4, y: 3.5, z: 4 },
    amenities: ['Modern Kitchen', 'Spacious Living', 'Master Bedroom', 'Balcony', 'Premium Fixtures'],
    images: ['duplex-1.jpg', 'duplex-2.jpg', 'duplex-3.jpg']
  },

  // 2nd Floor - Duplex Units
  {
    id: 'D2-01', floor: 2, type: 'Duplex', bedrooms: 3, bathrooms: 2,
    surface: 120, orientation: 'N', availability: 'AVAILABLE',
    position: { x: -4, y: 6.5, z: 4 },
    amenities: ['Double Height Living', 'Premium Kitchen', 'Master Suite', 'Private Terrace', 'Smart Home System'],
    images: ['duplex-1.jpg', 'duplex-2.jpg', 'duplex-3.jpg']
  },
  {
    id: 'D2-02', floor: 2, type: 'Duplex', bedrooms: 3, bathrooms: 2,
    surface: 125, orientation: 'W', availability: 'AVAILABLE',
    position: { x: 0, y: 6.5, z: -4 },
    amenities: ['Double Height Living', 'Premium Kitchen', 'Master Suite', 'Private Terrace', 'Smart Home System'],
    images: ['duplex-1.jpg', 'duplex-2.jpg', 'duplex-3.jpg']
  },

  // 3rd Floor - Penthouse
  {
    id: 'P1-01', floor: 3, type: 'Penthouse', bedrooms: 3, bathrooms: 3,
    surface: 145, orientation: 'N', availability: 'AVAILABLE',
    position: { x: -4, y: 9.5, z: 4 },
    amenities: ['Panoramic Views', 'Luxury Kitchen', 'Master Suite with Spa Bath', 'Private Terrace', 'Smart Home', 'Sky Garden'],
    images: ['penthouse-1.jpg', 'penthouse-2.jpg', 'penthouse-3.jpg']
  },
  {
    id: 'P1-02', floor: 3, type: 'Penthouse', bedrooms: 3, bathrooms: 3,
    surface: 150, orientation: 'E', availability: 'AVAILABLE',
    position: { x: 0, y: 9.5, z: 4 },
    amenities: ['Panoramic Views', 'Luxury Kitchen', 'Master Suite with Spa Bath', 'Private Terrace', 'Smart Home', 'Sky Garden'],
    images: ['penthouse-1.jpg', 'penthouse-2.jpg', 'penthouse-3.jpg']
  },
  {
    id: 'P1-03', floor: 3, type: 'Penthouse', bedrooms: 3, bathrooms: 3,
    surface: 145, orientation: 'W', availability: 'AVAILABLE',
    position: { x: 4, y: 9.5, z: 4 },
    amenities: ['Panoramic Views', 'Luxury Kitchen', 'Master Suite with Spa Bath', 'Private Terrace', 'Sky Garden'],
    images: ['penthouse-1.jpg', 'penthouse-2.jpg', 'penthouse-3.jpg']
  },
];

// Scene Setup
let scene, camera, renderer, raycaster, mouse;
let buildingGroup, unitMeshes = [];
let selectedUnit = null;
let autoRotateEnabled = false;
let filteredUnits = [...unitsData];

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0fdf4);
  scene.fog = new THREE.Fog(0xdcfce7, 30, 60);

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(15, 12, 15);
  camera.lookAt(0, 5, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Accent lights - Green theme
  const accentLight1 = new THREE.PointLight(0x10b981, 0.8, 20);
  accentLight1.position.set(-10, 8, 10);
  scene.add(accentLight1);

  const accentLight2 = new THREE.PointLight(0x2dd4bf, 0.8, 20);
  accentLight2.position.set(10, 8, -10);
  scene.add(accentLight2);

  // Raycaster for interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Build 3D Model
  buildBuilding();

  // Ground
  const groundGeometry = new THREE.PlaneGeometry(40, 40);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1d28,
    roughness: 0.8,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper
  const gridHelper = new THREE.GridHelper(40, 40, 0x86efac, 0xd1fae5);
  scene.add(gridHelper);

  // Event Listeners
  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onMouseClick);

  // Hide loading screen
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 500);

  // Animation Loop
  animate();
}

function buildBuilding() {
  buildingGroup = new THREE.Group();

  // Load the actual elevation image as texture
  const textureLoader = new THREE.TextureLoader();
  const elevationTexture = textureLoader.load('elevation.jpg');

  // Create a plane to display the elevation image
  const buildingWidth = 14;
  const buildingHeight = 12;
  const buildingGeometry = new THREE.PlaneGeometry(buildingWidth, buildingHeight);

  const buildingMaterial = new THREE.MeshStandardMaterial({
    map: elevationTexture,
    side: THREE.FrontSide,
    transparent: false,
  });

  const buildingPlane = new THREE.Mesh(buildingGeometry, buildingMaterial);
  buildingPlane.position.set(0, buildingHeight / 2, 0.1);
  buildingPlane.castShadow = true;
  buildingPlane.receiveShadow = true;
  buildingGroup.add(buildingPlane);

  // Add slight depth behind the image
  const depthGeometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, 0.3);
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f1e8,
    roughness: 0.7,
  });
  const buildingDepth = new THREE.Mesh(depthGeometry, depthMaterial);
  buildingDepth.position.set(0, buildingHeight / 2, -0.15);
  buildingDepth.castShadow = true;
  buildingGroup.add(buildingDepth);

  // Create invisible interactive units for clicking
  // These are positioned to match the unit locations in the elevation image
  unitsData.forEach((unit) => {
    createUnit(unit);
  });

  scene.add(buildingGroup);
}


function createUnit(unitData) {
  const height = unitData.type === 'Studio' ? 2.5 : unitData.type === 'Flat' ? 2.7 : unitData.type === 'Duplex' ? 2.8 : 3;
  const geometry = new THREE.BoxGeometry(3.5, height, 3.5);

  // Color based on unit type - Green theme
  let unitColor;
  switch (unitData.type) {
    case 'Studio':
      unitColor = 0x22c55e; // Bright green
      break;
    case 'Flat':
      unitColor = 0x84cc16; // Lime green
      break;
    case 'Duplex':
      unitColor = 0x14b8a6; // Teal
      break;
    case 'Penthouse':
      unitColor = 0x10b981; // Emerald
      break;
    default:
      unitColor = 0x10b981;
  }

  const material = new THREE.MeshStandardMaterial({
    color: unitData.availability === 'AVAILABLE' ? unitColor : 0x9ca3af,
    roughness: 0.4,
    metalness: 0.2,
    transparent: true,
    opacity: 0.8,
  });

  const unit = new THREE.Mesh(geometry, material);
  unit.position.set(unitData.position.x, unitData.position.y, unitData.position.z);
  unit.castShadow = true;
  unit.userData = unitData;

  // Add edges for definition - white edges
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  unit.add(wireframe);

  buildingGroup.add(unit);
  unitMeshes.push(unit);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const visibleUnits = unitMeshes.filter(mesh =>
    filteredUnits.some(unit => unit.id === mesh.userData.id)
  );
  const intersects = raycaster.intersectObjects(visibleUnits);

  // Reset all units
  unitMeshes.forEach((unit) => {
    if (unit.userData.availability === 'AVAILABLE') {
      unit.material.emissive = new THREE.Color(0x000000);
      unit.material.opacity = 0.7;
      unit.scale.set(1, 1, 1);
    }
  });

  // Highlight hovered unit with green glow
  if (intersects.length > 0) {
    const hoveredUnit = intersects[0].object;
    if (hoveredUnit.userData.availability === 'AVAILABLE') {
      hoveredUnit.material.emissive = new THREE.Color(0x10b981);
      hoveredUnit.material.opacity = 1.0;
      hoveredUnit.scale.set(1.05, 1.05, 1.05);
      document.body.style.cursor = 'pointer';
    }
  } else {
    document.body.style.cursor = 'default';
  }
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const visibleUnits = unitMeshes.filter(mesh =>
    filteredUnits.some(unit => unit.id === mesh.userData.id)
  );
  const intersects = raycaster.intersectObjects(visibleUnits);

  if (intersects.length > 0) {
    const clickedUnit = intersects[0].object;
    if (clickedUnit.userData.availability === 'AVAILABLE') {
      selectedUnit = clickedUnit.userData;
      openUnitModal(selectedUnit);

      // Animate camera to unit
      animateCameraToUnit(clickedUnit.position);
    }
  }
}

function animateCameraToUnit(position) {
  const targetPosition = new THREE.Vector3(
    position.x + 8,
    position.y + 3,
    position.z + 8
  );

  const startPosition = camera.position.clone();
  const duration = 1000;
  const startTime = Date.now();

  function updateCamera() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
    camera.lookAt(position);

    if (progress < 1) {
      requestAnimationFrame(updateCamera);
    }
  }

  updateCamera();
}

function animate() {
  requestAnimationFrame(animate);

  if (autoRotateEnabled && buildingGroup) {
    buildingGroup.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
}

// Modal Functions
function openUnitModal(unit) {
  document.getElementById('modalUnitId').textContent = unit.id;
  document.getElementById('modalUnitType').textContent = unit.type;
  document.getElementById('modalStatus').textContent = unit.availability;
  document.getElementById('modalStatus').className =
    `status-badge ${unit.availability.toLowerCase()}`;

  document.getElementById('specBedrooms').textContent = unit.bedrooms;
  document.getElementById('specBathrooms').textContent = unit.bathrooms;
  document.getElementById('specSurface').textContent = `${unit.surface} m²`;
  document.getElementById('specOrientation').textContent = unit.orientation;

  // Load images
  const carouselImages = document.getElementById('carouselImages');
  carouselImages.innerHTML = unit.images.map(img =>
    `<img src="${img}" class="carousel-image" alt="Unit interior">`
  ).join('');

  const carouselIndicators = document.getElementById('carouselIndicators');
  carouselIndicators.innerHTML = unit.images.map((_, i) =>
    `<div class="carousel-indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
  ).join('');

  // Load amenities
  const amenitiesGrid = document.getElementById('amenitiesGrid');
  amenitiesGrid.innerHTML = unit.amenities.map(amenity =>
    `<div class="amenity-item">${amenity}</div>`
  ).join('');

  document.getElementById('unitModal').classList.add('active');
}

function closeModal() {
  document.getElementById('unitModal').classList.remove('active');
}

// Carousel Functions
let currentImageIndex = 0;

function showImage(index) {
  const images = document.getElementById('carouselImages');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const totalImages = images.children.length;

  currentImageIndex = (index + totalImages) % totalImages;
  images.style.transform = `translateX(-${currentImageIndex * 100}%)`;

  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentImageIndex);
  });
}

// Filter Functions
function applyFilters() {
  const typeFilter = document.querySelector('#typeFilter .chip.active').dataset.type;
  const availabilityFilter = document.querySelector('#availabilityFilter .chip.active').dataset.availability;

  filteredUnits = unitsData.filter(unit => {
    const typeMatch = typeFilter === 'all' || unit.type === typeFilter;
    const availabilityMatch = availabilityFilter === 'all' || unit.availability === availabilityFilter;

    return typeMatch && availabilityMatch;
  });

  // Update visibility
  unitMeshes.forEach(mesh => {
    const isVisible = filteredUnits.some(unit => unit.id === mesh.userData.id);
    mesh.visible = isVisible;
  });
}

function resetFilters() {
  // Reset all filter controls
  document.querySelectorAll('#typeFilter .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.type === 'all');
  });
  document.querySelectorAll('#availabilityFilter .chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.availability === 'all');
  });

  applyFilters();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  init();

  // Filter panel toggle
  document.getElementById('filterToggle').addEventListener('click', () => {
    document.getElementById('filterPanel').classList.remove('collapsed');
  });

  document.getElementById('closeFilters').addEventListener('click', () => {
    document.getElementById('filterPanel').classList.add('collapsed');
  });

  // Filter chips
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
      parent.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Filter actions
  document.getElementById('applyFilters').addEventListener('click', applyFilters);
  document.getElementById('resetFilters').addEventListener('click', resetFilters);

  // Modal controls
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('unitModal').addEventListener('click', (e) => {
    if (e.target.id === 'unitModal') closeModal();
  });

  // Carousel controls
  document.getElementById('prevImage').addEventListener('click', () => {
    showImage(currentImageIndex - 1);
  });

  document.getElementById('nextImage').addEventListener('click', () => {
    showImage(currentImageIndex + 1);
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-indicator')) {
      showImage(parseInt(e.target.dataset.index));
    }
  });

  // Camera controls
  document.getElementById('resetCamera').addEventListener('click', () => {
    camera.position.set(15, 12, 15);
    camera.lookAt(0, 5, 0);
  });

  document.getElementById('autoRotate').addEventListener('click', () => {
    autoRotateEnabled = !autoRotateEnabled;
  });

  // Modal action buttons
  document.getElementById('viewInterior').addEventListener('click', () => {
    alert('Interior view feature coming soon!');
  });

  document.getElementById('requestInfo').addEventListener('click', () => {
    alert(`Request information form for ${selectedUnit.id} will be displayed here.`);
  });
});
