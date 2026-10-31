import React, { useEffect, useState, useRef, createElement } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const TeethModel = ({ anomalies, selectedAnomaly, viewMode = 'all' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);
  const teethModelsRef = useRef({
    model: null
  });
  const anomalyMarkersRef = useRef([]);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0
  });
  // Create a basic 3D scene
  useEffect(() => {
    if (!mountRef.current) return;
    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333); // Dark background to match reference image
    sceneRef.current = scene;
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15); // Position further back to see the model
    cameraRef.current = camera;
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 1.5;
    controlsRef.current = controls;
    // Add lights - increased intensity for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    // Add a point light to enhance details
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    // Remove grid helper to match the reference image
    // const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444)
    // scene.add(gridHelper)
    // Load teeth model
    loadTeethModel();
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    // Handle window resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };
    window.addEventListener('resize', handleResize);
    // Handle mouse move for tooltip positioning
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setTooltipPosition({
        x,
        y
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose of geometries and materials
      anomalyMarkersRef.current.forEach((marker) => {
        if (marker) {
          if (marker.geometry) marker.geometry.dispose();
          if (marker.material) marker.material.dispose();
        }
      });
      // Dispose of teeth model
      if (teethModelsRef.current.model) {
        disposeModel(teethModelsRef.current.model);
      }
    };
  }, []);
  const disposeModel = (model) => {
    if (!model) return;
    model.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  };
  // Update based on selected anomaly
  useEffect(() => {
    if (!sceneRef.current || !selectedAnomaly) return;
    // Create anomaly markers if they don't exist yet
    if (
    anomalyMarkersRef.current.length === 0 &&
    teethModelsRef.current.model)
    {
      createAnomalyMarkers();
    }
    // Highlight the selected anomaly
    anomalyMarkersRef.current.forEach((marker) => {
      if (marker.userData.anomalyId === selectedAnomaly) {
        marker.material.color.set(0xffffff); // White for selected
        marker.material.opacity = 1.0;
        marker.scale.set(1.2, 1.2, 1.2); // Make it slightly larger
        // Show tooltip for selected anomaly
        const anomaly = anomalies.find((a) => a.id === selectedAnomaly);
        if (anomaly) {
          setTooltipInfo({
            title: anomaly.toothType || anomaly.type,
            description: anomaly.toothDescription || anomaly.description
          });
        }
      } else {
        // Color based on severity
        const anomaly = anomalies.find(
          (a) => a.id === marker.userData.anomalyId
        );
        if (anomaly) {
          marker.material.color.set(0x888888); // Gray for non-selected
        }
        marker.material.opacity = 0.7;
        marker.scale.set(1.0, 1.0, 1.0);
      }
    });
    // Focus camera on the selected anomaly
    const selectedMarker = anomalyMarkersRef.current.find(
      (marker) => marker.userData.anomalyId === selectedAnomaly
    );
    if (selectedMarker && controlsRef.current) {
      // Get the anomaly position
      const targetPosition = selectedMarker.position.clone();
      // Smoothly transition the camera
      const startPosition = cameraRef.current.position.clone();
      const endPosition = new THREE.Vector3(
        targetPosition.x + 2,
        targetPosition.y + 2,
        targetPosition.z + 5
      );
      // Simple animation for camera movement
      let startTime = null;
      const duration = 1000; // 1 second
      const animateCamera = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Interpolate camera position
        cameraRef.current.position.lerpVectors(
          startPosition,
          endPosition,
          progress
        );
        // Update controls target
        controlsRef.current.target.copy(targetPosition);
        controlsRef.current.update();
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
      requestAnimationFrame(animateCamera);
    }
  }, [selectedAnomaly, anomalies]);
  // Update based on view mode
  useEffect(() => {
    if (!teethModelsRef.current.model) return;
    // For the specific model, we'll handle view mode differently
    if (viewMode === 'all') {
      teethModelsRef.current.model.visible = true;
    } else if (viewMode === 'upper') {
      teethModelsRef.current.model.visible = true;
      // You might need to hide specific parts of the model for upper/lower view
    } else if (viewMode === 'lower') {
      teethModelsRef.current.model.visible = true;
      // You might need to hide specific parts of the model for upper/lower view
    }
    // Update anomaly markers visibility
    anomalyMarkersRef.current.forEach((marker) => {
      const anomaly = anomalies.find((a) => a.id === marker.userData.anomalyId);
      if (anomaly) {
        if (viewMode === 'all') {
          marker.visible = true;
        } else if (viewMode === 'upper' && anomaly.position.y >= 0) {
          marker.visible = true;
        } else if (viewMode === 'lower' && anomaly.position.y < 0) {
          marker.visible = true;
        } else {
          marker.visible = false;
        }
      }
    });
  }, [viewMode, anomalies]);
  // Load teeth model using GLTFLoader
  const loadTeethModel = () => {
    if (!sceneRef.current) return;
    // Add a placeholder sphere to show something is happening
    const placeholderGeometry = new THREE.SphereGeometry(1, 32, 32);
    const placeholderMaterial = new THREE.MeshBasicMaterial({
      color: 0x3366ff,
      wireframe: true
    });
    const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
    sceneRef.current.add(placeholder);
    const loader = new GLTFLoader();
    console.log('Starting to load teeth model...');
    // Use the raw GitHub URL for the new model from the dentteath repository
    const modelUrl =
    'https://raw.githubusercontent.com/ellrmed9-beep/dentteath/main/scene.gltf';
    loader.load(
      modelUrl,
      (gltf) => {
        console.log('Model loaded successfully!', gltf);
        // Remove placeholder
        sceneRef.current.remove(placeholder);
        const model = gltf.scene;
        // Adjust position, rotation and scale for the model
        model.position.set(0, 0, 0); // Center the model
        model.rotation.set(0, Math.PI, 0); // Rotate to face forward
        model.scale.set(3, 3, 3); // Scale up to be more visible
        // Apply materials to match the reference image
        model.traverse((child) => {
          if (child.isMesh) {
            console.log('Found mesh in model:', child.name);
            if (child.material) {
              child.material.needsUpdate = true;
              child.castShadow = true;
              child.receiveShadow = true;
              // Apply pink/reddish color to gums
              if (
              child.name.toLowerCase().includes('gum') ||
              child.name.toLowerCase().includes('gingiva') ||
              child.material.name && (
              child.material.name.toLowerCase().includes('gum') ||
              child.material.name.toLowerCase().includes('gingiva')))
              {
                child.material.color.set(0xc27c88); // Pink color for gums
              }
              // Apply white color to teeth
              if (
              child.name.toLowerCase().includes('tooth') ||
              child.name.toLowerCase().includes('teeth') ||
              child.material.name && (
              child.material.name.toLowerCase().includes('tooth') ||
              child.material.name.toLowerCase().includes('teeth')))
              {
                child.material.color.set(0xffffff); // White color for teeth
                child.material.roughness = 0.3;
                child.material.metalness = 0.2;
              }
              // If we can't identify by name, try to identify by color
              if (
              !child.name.toLowerCase().includes('gum') &&
              !child.name.toLowerCase().includes('tooth') &&
              !child.name.toLowerCase().includes('teeth'))
              {
                // Detect pink/reddish colors for gums
                if (
                child.material.color &&
                child.material.color.r > 0.6 &&
                child.material.color.g < 0.5 &&
                child.material.color.b < 0.5)
                {
                  child.material.color.set(0xc27c88); // Pink color for gums
                }
                // Detect white/light colors for teeth
                if (
                child.material.color &&
                child.material.color.r > 0.8 &&
                child.material.color.g > 0.8 &&
                child.material.color.b > 0.8)
                {
                  child.material.color.set(0xffffff); // White color for teeth
                  child.material.roughness = 0.3;
                  child.material.metalness = 0.2;
                }
              }
            }
          }
        });
        sceneRef.current.add(model);
        teethModelsRef.current.model = model;
        // Create anomaly markers after model is loaded
        createAnomalyMarkers();
        // Position camera to get a good initial view
        cameraRef.current.position.set(0, 0, 10); // Position camera to see the model
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      },
      (xhr) => {
        console.log(xhr.loaded / xhr.total * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened while loading the model:', error);
        // Remove placeholder
        sceneRef.current.remove(placeholder);
        // Show error message in the scene
        const errorGeometry = new THREE.BoxGeometry(5, 1, 0.1);
        const errorMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000
        });
        const errorMesh = new THREE.Mesh(errorGeometry, errorMaterial);
        errorMesh.position.set(-2.5, 0, 0);
        sceneRef.current.add(errorMesh);
        // Add text to show the error
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Error loading model', 128, 32);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(0, 0, 0);
        sprite.scale.set(5, 1.25, 1);
        sceneRef.current.add(sprite);
        // Fallback to creating simple geometry if model fails to load
        createSimpleTeethModels();
      }
    );
  };
  // Fallback to create simple models if GLTF loading fails
  const createSimpleTeethModels = () => {
    if (!sceneRef.current) return;
    // Create a simple teeth model as fallback
    const teethGroup = new THREE.Group();
    // Create a simple arch shape for upper and lower teeth
    const upperArchGeometry = new THREE.TorusGeometry(3, 0.5, 16, 32, Math.PI);
    const teethMaterial = new THREE.MeshPhongMaterial({
      color: 0xf5f5f5,
      specular: 0xaaaaaa,
      shininess: 50
    });
    const upperArch = new THREE.Mesh(upperArchGeometry, teethMaterial);
    upperArch.rotation.x = Math.PI;
    upperArch.position.y = 1.5;
    teethGroup.add(upperArch);
    // Create a simple arch shape for lower teeth
    const lowerArchGeometry = new THREE.TorusGeometry(2.8, 0.5, 16, 32, Math.PI);
    const lowerArch = new THREE.Mesh(lowerArchGeometry, teethMaterial);
    lowerArch.position.y = -1.5;
    teethGroup.add(lowerArch);
    // Add gums
    const gumMaterial = new THREE.MeshPhongMaterial({
      color: 0xc27c88,
      specular: 0x555555,
      shininess: 30
    });
    // Upper gums
    const upperGumGeometry = new THREE.TorusGeometry(3.3, 0.7, 16, 32, Math.PI);
    const upperGum = new THREE.Mesh(upperGumGeometry, gumMaterial);
    upperGum.rotation.x = Math.PI;
    upperGum.position.y = 1.5;
    upperGum.position.z = -0.2;
    teethGroup.add(upperGum);
    // Lower gums
    const lowerGumGeometry = new THREE.TorusGeometry(3.1, 0.7, 16, 32, Math.PI);
    const lowerGum = new THREE.Mesh(lowerGumGeometry, gumMaterial);
    lowerGum.position.y = -1.5;
    lowerGum.position.z = -0.2;
    teethGroup.add(lowerGum);
    sceneRef.current.add(teethGroup);
    teethModelsRef.current.model = teethGroup;
    // Create anomaly markers
    createAnomalyMarkers();
  };
  // Create markers for each anomaly
  const createAnomalyMarkers = () => {
    if (!sceneRef.current || !teethModelsRef.current.model) return;
    // Clear existing markers
    anomalyMarkersRef.current.forEach((marker) => {
      if (marker && marker.parent) {
        marker.parent.remove(marker);
      }
    });
    anomalyMarkersRef.current = [];
    // Map anomalies to specific positions on the dental model to match the reference image
    const anomalyPositions = {
      1: {
        x: 0.5,
        y: -3,
        z: 2
      },
      2: {
        x: 3,
        y: 1.5,
        z: 1.5
      },
      3: {
        x: -3,
        y: 1.5,
        z: 1.5
      },
      4: {
        x: -3,
        y: -2,
        z: 0.5
      } // Lower left (visible in image)
    };
    // Tooth type information
    const toothTypeInfo = {
      1: {
        type: 'Incisors',
        description:
        'Incisors (8 total): The middlemost four teeth on the upper and lower jaws.'
      },
      2: {
        type: 'Canines',
        description:
        'Canines (4 total): The pointed teeth located at the corners of the mouth.'
      },
      3: {
        type: 'Premolars',
        description:
        'Premolars (8 total): The teeth between canines and molars used for crushing food.'
      },
      4: {
        type: 'Molars',
        description:
        'Molars (8-12 total): The large flat teeth at the back of the mouth used for grinding food.'
      }
    };
    // Create a circular sprite for each anomaly marker
    anomalies.forEach((anomaly) => {
      // Get position from mapping or use default
      const position = anomalyPositions[anomaly.id] || {
        x: (anomaly.position?.x || 0) * 0.5,
        y: (anomaly.position?.y || 0) * 0.5,
        z: (anomaly.position?.z || 0) * 0.5
      };
      // Add tooth type information to the anomaly
      anomaly.toothType = toothTypeInfo[anomaly.id]?.type || anomaly.type;
      anomaly.toothDescription =
      toothTypeInfo[anomaly.id]?.description || anomaly.description;
      // Create a circular marker with number
      const markerGeometry = new THREE.CircleGeometry(0.3, 32);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      // Position the marker
      marker.position.set(position.x, position.y, position.z);
      marker.lookAt(cameraRef.current.position);
      // Create text for the marker number
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.font = 'bold 40px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(anomaly.id.toString(), 32, 32);
      const numberTexture = new THREE.CanvasTexture(canvas);
      const numberMaterial = new THREE.SpriteMaterial({
        map: numberTexture
      });
      const numberSprite = new THREE.Sprite(numberMaterial);
      numberSprite.scale.set(0.3, 0.3, 0.3);
      marker.add(numberSprite);
      // Add user data for interaction
      marker.userData = {
        anomalyId: anomaly.id,
        isMarker: true,
        toothType: anomaly.toothType,
        description: anomaly.toothDescription
      };
      // Add to scene and store reference
      sceneRef.current.add(marker);
      anomalyMarkersRef.current.push(marker);
      // Make marker always face the camera
      const updateMarkerRotation = () => {
        if (marker && cameraRef.current) {
          marker.lookAt(cameraRef.current.position);
        }
        requestAnimationFrame(updateMarkerRotation);
      };
      updateMarkerRotation();
    });
  };
  // Handle click on markers
  const handleModelClick = (event) => {
    if (!mountRef.current || !sceneRef.current || !cameraRef.current) return;
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const rect = mountRef.current.getBoundingClientRect();
    const x =
    (event.clientX - rect.left) / mountRef.current.clientWidth * 2 - 1;
    const y =
    -((event.clientY - rect.top) / mountRef.current.clientHeight) * 2 + 1;
    // Create raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    // Check for intersections with anomaly markers
    const intersects = raycaster.intersectObjects(
      anomalyMarkersRef.current,
      true
    );
    if (intersects.length > 0) {
      // Get the clicked marker
      let marker = intersects[0].object;
      // If we hit a child of the marker (like the number sprite), get the parent
      while (marker && !marker.userData.isMarker) {
        marker = marker.parent;
      }
      if (marker && marker.userData.anomalyId) {
        // Set selected anomaly
        const anomalyId = marker.userData.anomalyId;
        const anomaly = anomalies.find((a) => a.id === anomalyId);
        if (anomaly) {
          // Call any callback function that might have been passed to this component
          if (typeof onAnomalySelect === 'function') {
            onAnomalySelect(anomalyId);
          } else {
            // If no callback, handle selection internally
            setTooltipInfo({
              title: anomaly.toothType || anomaly.type,
              description: anomaly.toothDescription || anomaly.description
            });
          }
        }
      }
    } else {
      // Clicked elsewhere, clear selection
      setTooltipInfo(null);
    }
  };
  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%'
        }}
        onClick={handleModelClick} />

      {/* Tooltip/Information Panel - Styled to match the reference image */}
      {tooltipInfo &&
      <div
        className="absolute bg-black bg-opacity-80 text-white p-4 rounded-md shadow-lg max-w-xs z-10"
        style={{
          left: tooltipPosition.x + 20,
          top: tooltipPosition.y + 20,
          transform: 'translateY(-50%)',
          pointerEvents: 'none' // Allow clicking through the tooltip
        }}>

          <h3 className="text-lg font-semibold mb-2">{tooltipInfo.title}</h3>
          <p className="text-sm">{tooltipInfo.description}</p>
        </div>
      }
    </div>);

};
export default TeethModel;