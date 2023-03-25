## 🏖 프로젝트 소개
`'야, 너도 갈래?'`는 인상 깊었던 여행코스, 일상에서 추천하고 싶었던 장소를 공유하는 서비스입니다.<br/>

➡ ['야, 너도 갈래? 바로가기](http://www.yaneogal.site)  
<br/>

### 📆 프로젝트 기간
2022/06/27 ~ 2022/08/05

![](https://user-images.githubusercontent.com/105188620/181587809-cb324016-bc39-4ae0-ba8b-5f3aa99072fc.jpeg)
<br/>

## 🔧 주요 기능
<details>
<summary>키워드로 게시글 검색하기</summary>
<div markdown="1">
<br/>
🔎 원하는 게시글을 키워드 검색으로 찾을 수 있어요!
</div>
</details>
<details>
<summary>필터로 게시글 찾기</summary>
<div markdown="1">
<br/>
🔎 필터로 지역/비용/테마 별 게시글을 찾을 수 있어요!
</div>
</details>
<details>
<summary>원하는 여러 장소를 카카오맵 핀으로 보여주기</summary>
<div markdown="1">
<br/>
🔎 키워드로 장소를 검색하고, 선택한 장소를 카카오맵에 핀으로 꽂아요! <br/>
🗺 핀을 클릭하면 장소 상세 내역을 확인할 수 있고, 카카오맵으로 연동되어 길찾기 및 카카오맵 유저들의 생생한 후기를 확인할 수 있어요
</div>
</details>
<details>
<summary>서비스를 이용할 때마다 회원등급 레벨업!</summary>
<div markdown="1">
<br/>
📈 댓글을 달거나 게시글을 작성하면 나만의 회원등급이 레벨업돼요! <br/>
마이페이지에서 게이지바로 실시간 나의 레벨 상황을 확인할 수 있어요
</div>
</details>
<details>
<summary>좋아요 북마크 공유하기</summary>
<div markdown="1">
<br/>
➡ 저장하고 싶은 게시글은 북마크해두면 마이페이지에서 언제든 다시 볼 수 있어요!
</div>
</details>

<br/>

## 🕹 프론트엔드 기술 스택
<div display=flex>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Sass" src ="https://img.shields.io/badge/Sass-CC6699.svg?&style=for-the-badge&logo=Sass&logoColor=white"/>
</div>
<div display=flex>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
<img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=black"/>
<img alt="Axios" src ="https://img.shields.io/badge/Axios-6F02B5.svg?&style=for-the-badge&logo=Axios&logoColor=white"/>
</div>
<div display=flex>
<img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white"/>
<img alt="GitHub Actions" src ="https://img.shields.io/badge/GitHub Actions-2088FF.svg?&style=for-the-badge&logo=GitHub Actions&logoColor=white"/>
</div>
<br/>

## 📚 기술스택 및 선정이유
| Name	| Appliance | Version | 선정이유 |
| --- | --- | --- | --- |
| Redux | 상태 관리 | 4.2.0 |	예측 가능한 데이터 플로우를 그릴 수 있다는 장점이 있고 전역으로 상태관리를 할 수 있는 라이브러리로 리덕스를 선택했습니다.|
| Redux-actions | 액션 관리	| 2.6.5 | 리덕스 사용 시 createAction과 handleActions 함수를 이용하기 위해 선택했습니다. |
| Redux-thunk | 리덕스 미들웨어 | 2.4.1 | 리액트에서 비동기 작업을 처리할 때 사용하기 위해 선택했습니다.|
| React-router-dom | 라우터 | 6.3.0 | 리액트에서 페이지 이동을 위해 선택했습니다.|
| Axios | API 통신 | 0.27.2 |	비동기로 HTTP통신을 하기 위해 브라우저 호환성이 높은 AXIOS를 사용했습니다. |
| Immer | 불변성 유지 | 9.0.15 | 구조가 복잡한 객체라도 간결한 코드로 불변성을 유지하며 상태를 업데이트하기 위해 사용했습니다. |
| swiper | 슬라이드 | 8.3.0 | 슬라이드가 부드러우며 다양한 UI를 지원하고 있기에 선택했습니다.|
| Sweetalert | Alert창 | 2.1.2 | 기본 알럿 창을 커스텀하여 사용하기 위해 선택했습니다.|
| browser-image-compression | 이미지 압축 | 2.0.0 | 이미지 용량에 따른 랜더링이 지연되어 이미지를 압축 하기 위해 선택했습니다. |
| lodash | 데이터 구조 |  4.17.21 | 동일 이벤트가 반복적으로 시행되는 경우 이벤트의 실제 반복 주기와 상관없이 임의로 설정한 일정 시간 간격으로 콜백 함수의 실행을 하는 throttle 기능을 사용하기 위해 선택했습니다. |
| SCSS | CSS pre-processor | 1.53.0 | CSS는 규모가 커질수록 코드가 복잡해지고, 유지보수가 불편해 지는 단점을 보완하기 위해 선택했습니다. |

<br/>

## 👭 프론트엔드 팀원 소개
|이름|깃허브 주소|담당|
|---|---|---|
|김수정|https://github.com/soojeongkimkr|카카오맵 / 게시글CRUD / 회원정보CRUD / 회원등급 |
|홍수민|https://github.com/hongsoom|회원가입,로그인 / 게시글검색 / 필터링검색 / 좋아요,북마크,공유하기,댓글|

<br/>

## ⚓️ Links
**Project homepage** : https://www.yaneogal.site/

**Repository** : https://github.com/hanghae99-final-6

**프론트엔드 깃허브 주소** : https://github.com/hanghae99-final-6/FE

**백엔드 깃허브 주소** : https://github.com/hanghae99-final-6/BE

<br/>

## 📖 서비스 아키텍쳐
![](https://velog.velcdn.com/images/hongsoom/post/92befbec-cc10-48c3-ba34-fb6411a312c2/image.png)


## 🔥 트러블 슈팅
<details>
<summary>이미지 용량에 따른 랜더링 시간 지연</summary>

<br/>

- browser-image-compression 라이브러리로 이미지를 압축한 후 서버로 전달
- 669KB 이미지가 154KB로 압축되어 전달됨
<img src="https://velog.velcdn.com/images/hongsoom/post/eb1ff74f-65e1-4510-a8a3-20436b3df7eb/image.png"/>
</details>

<details>
<summary>카카오맵 : 키워드로 장소 검색을 할 때마다 기본 위치의 맵이 계속해서 렌더링되는 문제</summary>

<br/>

- 기본 위치 맵은 게시글 작성하기 페이지에 들어갔을 때 처음 한번만 뜨도록 useEffect 빈 의존성 배열로 넣어줌
<img src="https://velog.velcdn.com/images/hongsoom/post/b58b59f9-3881-48c0-affb-95708eef2c34/image.png"/>
</details>

<details>
<summary>무한스크롤 : 이벤트가 반복 실행(여러번 요청) 되는 문제</summary>

<br/>

- lodash 라이브러리를 사용해 동일 이벤트가 반복적으로 시행되는 경우 이벤트의 실제 반복 주기와 상관없이 임의로 설정한 일정 시간 간격(밀리세컨드)으로 콜백 함수의 실행을 하는 throttle 기능을 사용
- 불필요한 서버 리퀘스트를 막을 수 있고, 동시에 필요 없는 렌더링 또한 막을 수 있어 컴포넌트의 성능 개선에 도움을 줌
<img src="https://velog.velcdn.com/images/hongsoom/post/8ae4ef94-1557-4def-8c7a-1cfcfe767dc1/image.png"/>
</details>


<br/>

## 🎥사이트 데모
  
|회원가입|로그인|마이페이지| 
|:---:|:---:|:---:| 
|<img src="https://velog.velcdn.com/images/hongsoom/post/5e6f40b1-d660-4cc6-a073-216da2ec276a/image.gif" alt='회원가입' />|<img src="https://velog.velcdn.com/images/hongsoom/post/3738e3d4-26c7-4d43-9c36-10c89bfc5c99/image.gif" alt='로그인'>|<img src="https://velog.velcdn.com/images/hongsoom/post/96baf7ad-1a81-41e4-ad4f-363b8bce81b4/image.gif" alt='마이페이지'/>|
|메인페이지|상세페이지|
|<img src="https://velog.velcdn.com/images/hongsoom/post/4cd61f5b-b3bf-4c87-8b68-88c7aac36432/image.gif" alt='메인페이지' />|<img src="https://velog.velcdn.com/images/hongsoom/post/cbbefcaf-8a21-4417-b47a-d776e97c74bd/image.gif" alt='상세페이지' />|
|게시글작성|게시글 수정,삭제|댓글|
|<img src="./src/assets/add.gif" alt='게시글 작성'/>|<img src="./src/assets/edit.gif" alt='게시글 수정' />|<img src="https://velog.velcdn.com/images/hongsoom/post/ad61090d-e2a8-4805-9682-9f6ba3ccd317/image.gif" alt='댓글 수정,삭제' />|
|검색|필터|좋아요,북마크,공유|
|<img src="./src/assets/search.gif" alt='검색' />|<img src="./src/assets/filter.gif" alt='필터' />|<img src="./src/assets/share.gif" alt='좋아요,북마크,공유'/>|

<br />




