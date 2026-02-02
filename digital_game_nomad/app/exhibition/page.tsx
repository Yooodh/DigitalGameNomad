'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './exhibition.module.scss';

// Character 타입: 사용할 수 있는 캐릭터 이름을 문자열 리터럴 유니온으로 정의
type Character = 'aj' | 'stefani' | 'default';

// Exhibit 타입: 전시물 정보를 담는 객체 타입 정의
type Exhibit = {
  id: number;
  position: [number, number, number];
  title: string;
  description: string;
};

// 벽 설정 타입 정의: pos는 3차원 좌표(튜플), rotY는 Y축 회전 각도(라디안)
type WallConfig = {
  pos: [number, number, number];
  rotY: number;
};

function getCharacterColor(character: Character): number {
  if (character === 'aj') return 0x0095dd;
  if (character === 'stefani') return 0xff9500;
  return 0x888888;
}

function getCharacterFromUrl(): Character {
  if (typeof window === 'undefined') return 'default';
  const params = new URLSearchParams(window.location.search);
  const char = params.get('character');
  return char === 'aj' || char === 'stefani' ? char : 'default';
}

// 방 중심 좌표 (3x2, 넓은 맵)
function getRoomCenters(mapW: number, mapD: number): [number, number][] {
  const cols = 3,
    rows = 2;
  const xGap = mapW / cols;
  const zGap = mapD / rows;
  const x0 = -mapW / 2 + xGap / 2;
  const z0 = -mapD / 2 + zGap / 2;
  const centers: [number, number][] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      centers.push([x0 + col * xGap, z0 + row * zGap]);
    }
  }
  return centers;
}

function createExhibits(mapW: number, mapD: number): Exhibit[] {
  const centers = getRoomCenters(mapW, mapD);
  return centers.map(([x, z], idx) => ({
    id: idx,
    position: [x, 1.5, z],
    title: `작품 ${idx + 1}`,
    description: `공간 ${idx + 1}의 전시작품입니다.`,
  }));
}

export default function Exhibition() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [character, setCharacter] = useState<Character>('default');

  useEffect(() => {
    if (!mountRef.current) {
      console.error('mountRef is not attached!');
      return;
    }
    setCharacter(getCharacterFromUrl());

    // 맵/방 설정 (매우 넓게)
    const mapW = 200; // 가로
    const mapD = 200; // 세로(깊이)
    const wallH = 40;
    const wallT = 0.3;
    const partitionLenShort = mapD / 5; // 파티션 길이(짧게)

    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xf5f5f5);
    const loader = new THREE.TextureLoader();
    loader.load('https://example.com/your-background.jpg', function (texture) {
      scene.background = texture;
    });

    // 카메라
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 100, 120);

    // 렌더러
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 컨트롤
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    // 조명
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(60, 120, 60);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 바닥
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(mapW, mapD),
      new THREE.MeshPhongMaterial({ color: 0xf6e3c5, side: THREE.DoubleSide })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // 벽 설정 배열: 각각의 벽의 위치와 회전값을 정의
    const wallConfigs: WallConfig[] = [
      { pos: [0, wallH / 2, -mapD / 2 + wallT / 2], rotY: 0 },
      { pos: [0, wallH / 2, mapD / 2 - wallT / 2], rotY: Math.PI },
      { pos: [-mapW / 2 + wallT / 2, wallH / 2, 0], rotY: Math.PI / 2 },
      { pos: [mapW / 2 - wallT / 2, wallH / 2, 0], rotY: -Math.PI / 2 },
    ];

    // 외벽 (네 면)
    const wallMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    wallConfigs.forEach(({ pos, rotY }) => {
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(
          rotY === 0 || rotY === Math.PI ? mapW : mapD,
          wallH
        ),
        wallMat
      );
      wall.position.set(...pos);
      wall.rotation.y = rotY;
      wall.receiveShadow = true;
      scene.add(wall);
    });

    // 파티션 (첨부 이미지 구조 반영)
    // 세로 파티션 2개 (왼쪽 벽에서 시작, 길이 짧게)
    for (let i = 1; i <= 2; i++) {
      const x = -mapW / 2 + i * (mapW / 3);
      const partition = new THREE.Mesh(
        new THREE.PlaneGeometry(partitionLenShort, wallH),
        wallMat
      );
      partition.position.set(x, wallH / 2, -mapD / 2 + partitionLenShort / 2);
      partition.rotation.y = Math.PI / 2;
      scene.add(partition);
    }

    for (let i = 1; i <= 2; i++) {
      const x = -mapW / 2 + i * (mapW / 3);
      const partition = new THREE.Mesh(
        new THREE.PlaneGeometry(partitionLenShort, wallH),
        wallMat
      );
      // z 위치만 반대쪽으로 이동
      partition.position.set(x, wallH / 2, mapD / 2 - partitionLenShort / 2);
      partition.rotation.y = Math.PI / 2;
      scene.add(partition);
    }

    // 전시 오브젝트
    const exhibits = createExhibits(mapW, mapD);
    const exhibitMeshes: THREE.Mesh[] = [];
    exhibits.forEach((ex, idx) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(3, 4, 0.5),
        new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL((idx * 0.12) % 1, 0.7, 0.6),
        })
      );
      mesh.position.set(...ex.position);
      mesh.userData = { exhibit: ex };
      mesh.castShadow = true;
      scene.add(mesh);
      exhibitMeshes.push(mesh);
    });

    // 캐릭터
    const charColor = getCharacterColor(character);
    const charMat = new THREE.MeshPhongMaterial({ color: charColor });
    const charMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      charMat
    );
    charMesh.position.set(0, 2, 0);
    charMesh.castShadow = true;
    scene.add(charMesh);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(exhibitMeshes);
      if (intersects.length > 0) {
        const ex = intersects[0].object.userData.exhibit as Exhibit;
        setSelectedExhibit(ex);
      } else {
        setSelectedExhibit(null);
      }
    }
    window.addEventListener('click', onMouseClick);

    // 리사이즈
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // 애니메이션
    let frameId: number;
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    // cleanup
    return () => {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
    };
  }, [character]);

  return (
    <div className={styles.pageRoot}>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      {/* 캐릭터 선택 UI */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: 10,
          zIndex: 2,
        }}
      >
        <button
          style={{
            padding: '8px 18px',
            background: character === 'aj' ? '#0095dd' : '#fff',
            color: character === 'aj' ? '#fff' : '#222',
            border: '1px solid #0095dd',
            borderRadius: 5,
            fontWeight: 700,
          }}
          onClick={() => (window.location.search = '?character=aj')}
        >
          AJ
        </button>
        <button
          style={{
            padding: '8px 18px',
            background: character === 'stefani' ? '#ff9500' : '#fff',
            color: character === 'stefani' ? '#fff' : '#222',
            border: '1px solid #ff9500',
            borderRadius: 5,
            fontWeight: 700,
          }}
          onClick={() => (window.location.search = '?character=stefani')}
        >
          Stefani
        </button>
        <button
          style={{
            padding: '8px 18px',
            background: character === 'default' ? '#888' : '#fff',
            color: character === 'default' ? '#fff' : '#222',
            border: '1px solid #888',
            borderRadius: 5,
            fontWeight: 700,
          }}
          onClick={() => (window.location.search = '')}
        >
          Default
        </button>
      </div>
      {/* 전시물 정보 */}
      {selectedExhibit && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: '#fff',
            padding: '24px 32px',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            zIndex: 10,
            minWidth: 260,
          }}
        >
          <button
            style={{
              position: 'absolute',
              top: 10,
              right: 16,
              border: 'none',
              background: 'none',
              fontSize: 24,
              color: '#888',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedExhibit(null)}
          >
            ×
          </button>
          <h3 style={{ margin: '0 0 10px 0', color: '#222' }}>
            {selectedExhibit.title}
          </h3>
          <div style={{ color: '#444', marginBottom: 8 }}>
            {selectedExhibit.description}
          </div>
          <div style={{ fontSize: 12, color: '#aaa' }}>
            전시물 ID: {selectedExhibit.id}
          </div>
        </div>
      )}
      {/* 조작법 안내 */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          bottom: 80,
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: 8,
          fontSize: 14,
          zIndex: 2,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>조작법</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>마우스 드래그: 시점 회전</li>
          <li>휠: 줌 인/아웃</li>
          <li>우클릭 드래그: 이동</li>
          <li>전시물 클릭: 정보 보기</li>
        </ul>
      </div>
    </div>
  );
}
