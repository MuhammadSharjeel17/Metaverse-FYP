import React, { useRef, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const Card = ({ image, width, height }) => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const zoom = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );

    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const texture = new TextureLoader().load(image);
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ map: texture });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);

      // Move the camera towards the target position
      camera.position.x += (target.current.x - camera.position.x) * 0.05;
      camera.position.y += (target.current.y - camera.position.y) * 0.05;

      // Zoom the camera in and out
      camera.zoom = zoom.current;
      camera.updateProjectionMatrix();

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const onMouseMove = event => {
      mouse.current.x = (event.clientX / width) * 2 - 1;
      mouse.current.y = -(event.clientY / height) * 2 + 1;
    };

    const onWheel = event => {
      zoom.current += event.deltaY * -0.001;
      zoom.current = Math.max(0.1, Math.min(zoom.current, 10));
    };

    const onTouchStart = event => {
      onMouseMove(event.touches[0]);
    };

    const onTouchMove = event => {
      onMouseMove(event.touches[0]);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('wheel', onWheel);
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    return () => {
      container.removeChild(renderer.domElement);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [image, width, height]);

  return <div ref={containerRef} style={{ width, height }} />;
};

export default Card;
