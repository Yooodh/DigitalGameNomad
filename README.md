# 🕹️ 온라인 게임 박람회 

</br>

🛠️ 현재 `digital_game_nomad` 폴더 내에서 프로젝트 **리팩토링** 진행 중입니다. 🛠️

</br>

## 📌 Purpose

코로나19 팬데믹 이후 사회적 거리두기로 인해 대면 활동에 많은 제약이 생기면서, </br>
게임 전시회 및 박람회 또한 오프라인 진행에 큰 차질을 겪고 있습니다.</br>
이러한 상황 속에서 비대면 전시의 필요성은 더욱 커지고 있습니다. </br>

</br>

현재 진행되고 있는 대부분의 온라인 전시회는 방송 형식으로 진행되며, </br>
참여자가 직접 전시관을 체험하고 관람하기보다는 화면에 보이는 정보에 의존하게 됩니다.</br>
이로 인해 참여자들의 만족도가 현저히 낮은 상황입니다.</br>

</br>

`Digital Game Nomad` 프로젝트는 이러한 문제점을 보완하고, 대면 행사의 한계를 해결하기 위해 기획되었습니다. </br>
**온라인 게임 전시관**을 주제로, 사용자가 **직접 체험**하는 듯한 몰입감 있는 경험을 제공하는 **3D 맵 형태**로 구현됩니다. </br>
우리는 다양한 부분에서 참여자와의 **상호작용을 극대화**하는 것을 목표로 합니다.</br>

<details>
<summary><h3>Description File 📂</h3></summary>
  [DigitalGameNomad File.pdf](https://github.com/Yooodh/DigitalGameNomad/files/8460632/DigitalGameNomad.File.pdf)
</details>


## ✏️ Main Skill

<p align="left">
  <img src="https://skillicons.dev/icons?i=js" />
  <img src="https://skillicons.dev/icons?i=react" />
  <img src="https://skillicons.dev/icons?i=threejs" />
  <img src="https://skillicons.dev/icons?i=java" />
  <img src="https://skillicons.dev/icons?i=spring" />
</p>

### 🌐 3D 환경

* **THREE.js**: 3D 환경 렌더링에 사용되었습니다.
    * 카메라 움직임을 구현하고 캐릭터가 카메라 위치를 따라가도록 만들었습니다.
    * 어두운 환경에서 광원의 위치를 변경했습니다.
    * 색상, 재질, 표면, 빛 굴절률, 두께, 투명도 등 다양한 디자인 요소를 구현했습니다.
     
* **FBX**: 애니메이션 3D 모델을 통합하는 데 사용되었습니다.
    * `FBXLoader`를 사용하여 움직이는 캐릭터 파일을 Scene에 추가했습니다.
    * `AnimationMixer`를 사용하여 시간의 흐름에 따른 애니메이션을 추가했습니다.
     
* **CANNON.js**: 현실적인 물리 시뮬레이션을 위해 통합되었습니다.
    * 캐릭터와 벽을 서로 다른 물질로 선언하여 충돌 감지를 구현했습니다.
    * 물체에 질량을 부여하여 물리적 충돌로 인해 밀려나도록 설정, 캐릭터가 벽을 뚫지 못하도록 했습니다.

### ⚛️ 프론트엔드

* **REACT**: 사용자 인터페이스를 구축하는 주요 프레임워크입니다.
* **React-Redux**: React의 복잡한 props 전달 문제를 해결하고, 컴포넌트 간 공유 상태를 중앙 집중식으로 효율적으로 관리하기 위해 사용되었습니다.

### 🔒 인증 및 보안

* **소셜 로그인**: **네이버**, **카카오**, **구글** 계정에 대한 소셜 로그인 기능을 구현했습니다.
* **Spring Security**: 백엔드 보안을 위해 사용되었습니다.
* **BCryptPasswordEncoder**: 비밀번호 암호화에 활용되었으며, 보안 강화를 위해 무작위 salt 값을 사용합니다.

### ☁️ Cloud Server

* **Naver ObjectStorage**: 이미지 서버로 사용되었습니다.
* **NaverCloud MicroServer**: 애플리케이션 배포 서버로 활용되었습니다.

</br>

## 🌟 제공 서비스

* **비대면 전시 서비스**: 언제 어디서든 가상 전시관을 탐험할 수 있습니다.
* **오브젝트 상호작용**: 3D 환경 내에서 오브젝트와 직접 상호작용할 수 있습니다.
* **웹페이지 내비게이션**: 전시관 부스 제목을 클릭하여 관련 웹페이지로 이동할 수 있습니다.
* **동적 미디어 재생**: 캐릭터와 카메라 위치에 따라 영상 재생 및 볼륨 조절이 가능합니다.
* **인터랙티브 게임**: 충돌 시스템을 구현하여 미궁 게임과 같은 인터랙티브 게임에 참여할 수 있습니다.

</br> 

## 🖼️ Page

### 🏠 Main
![image](https://github.com/user-attachments/assets/2289d90f-7d96-4ea3-bab6-5cdde06250ed)
</br>
</br>

### 🕹️ Exhibition
![image](https://user-images.githubusercontent.com/93702328/162623318-e5c16c80-2da4-43a8-b23d-aa0c0c953b60.png)

</br>

### 📸 Gallery
<table>
  <tr>
    <td align="center">로그인 / 소셜 간편 로그인</td>
    <td align="center">회원가입</td>
    <td align="center">회원정보 조회</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7509de3b-195b-4d24-958e-e2cbdb6bbc66" alt="이미지1" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/9ef1bd27-083b-40fd-aeb7-f5e81b2f6e35" alt="이미지2" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/7db6273a-3aa9-4664-8f84-825b0a54d917" alt="이미지2" width="800" height='170'></td>
  </tr>
  
  <tr>
    <td align="center">비밀번호 찾기</td>
    <td align="center">휴대폰 번호 변경</td>
    <td align="center">소개페이지 - 스크롤 페이드인 효과</td>
  </tr>
  
  <tr>    
    <td><img src="https://github.com/user-attachments/assets/4521a72f-354d-4989-8f43-be7349d9792a" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/f60a3764-437c-4171-8cd5-12a4963bad49" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/33f7f5a7-9912-47a2-a221-c0cd9b88dc89" alt="이미지3" width="800" height='170'></td>
  </tr>
  
  <tr>
    <td align="center">전체 게시판</td>
    <td align="center">자유 게시판</td>
    <td align="center">상세 게시글 조회</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d117a91c-3201-4b0b-94fb-1a9928156dfa" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/00fdda7d-87aa-4f2e-8eb0-b9f6ad18ebfa" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/6fca6b41-a071-4eec-acf8-4518257d1aca" alt="이미지3" width="800" height='170'></td>
   </tr>
   
   <tr>
    <td align="center">기업참여 신청</td>
    <td align="center">기업참여 신청서 작성</td>
    <td align="center">[관리자] 신청기업 리스트</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4bf3b6c9-8caa-46f7-88e4-196aab0f3d71" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/a70a97ee-7312-4fc8-9303-9c7a687dd477" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/5ead60b9-6223-4fa5-8fd4-b7e85e2ba288" alt="이미지3" width="800" height='170'></td>
  </tr>
  
  <tr>
    <td align="center">고객센터</td>
    <td align="center">[관리자] 1 대 1 문의 대기 리스트</td>
    <td align="center">3D 전시관 캐릭터 선택</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1d6e4eaa-e5a6-42c4-a7b1-fe24f51e99fc" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/bc48c2f5-a12c-4c55-898b-b445c47cf7b7" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/5dacd42b-59b7-46dd-aebc-19bd9ad24b2d" alt="이미지3" width="800" height='170'></td>
  </tr>
  
   <tr>
    <td align="center">3D 전시관 오브젝트</td>
    <td align="center">3D 전시관 미궁입구</td>
    <td align="center">미궁 체험관 클리어</td>
  </tr>
  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d48e6a69-13cf-47e3-8451-c865eb24cc15" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/ed5c4771-1a4b-45db-a369-1fb8ca66e706" alt="이미지3" width="800" height='170'></td>
    <td><img src="https://github.com/user-attachments/assets/fcb398fc-0969-4615-b639-7cb6ea23ee52" alt="이미지3" width="800" height='170'></td>
  </tr>
</table>

</br>

## 💡 향후 개선 사항

* **CI/CD 환경**: 클라우드 서버로의 지속적인 배포를 위한 자동화된 CI/CD 파이프라인을 구축할 예정입니다.
* **백엔드 인가 시스템**: 브라우저 종료 또는 프론트엔드 서버 재시작 시 로그인 정보 손실을 방지하기 위해 백엔드 인가 시스템을 구현할 예정입니다.

</br>

## 💻 설치 및 실행 방법

* **Exhibition**: VS LiveServer를 사용하여 `5500`번 포트에서 실행합니다.
* **ExhibitionGame**: VS LiveServer를 사용하여 `5501`번 포트에서 실행합니다.
* **React**: `npm start` 명령어를 사용하여 `3000`번 포트에서 React 애플리케이션을 시작합니다.
* **Spring**: Spring Boot 애플리케이션은 내장 Tomcat 서버를 사용하며 `8088`번 포트에서 실행됩니다. 데이터베이스 연결이 필요한 경우 `application.yml`에 데이터베이스 연결 정보를 추가하세요.

</br>

## ✂️ Except 
- React google, kakao, naver key 제외

- Spring amazon s3 key 제외

- Exhibition Resources 제외
