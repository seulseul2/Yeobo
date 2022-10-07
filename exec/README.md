# 자기 팀 : 여보(여행보따리)

## 기획 의도

[기획의도](https://www.notion.so/91a039f41ef943968b077a148b81dd8b)

### 프로젝트 기간 : 2022.08.22 ~ 2022.10.07



## 여보 서비스 구현 화면

### 메인 화면(홈)



### 가장 최근에 높은 평점을 매긴 여행지



### 인기 여행지



### 가장 자주 방문한 지역의 여행지



### 로그인



### 회원가입



### 소셜로그인



### 검색(보따리, 여행지, 사용자)



### 여행지 상세 페이지



### 보따리 만들기



### 카테고리 선택



### 제시된 추천 여행지에서 담기



### 다음을 눌러 보따리 이름, 메모 설정하기



### 보따리 상세 페이지에서 좋아요 누르기



### 보따리 합치기 화면



### 나의 보따리 & 좋아요한 보따리 담기 



### 다음을 눌러 보따리 이름, 메모 설정하기



### 마이페이지



## 주요 기능

- 서비스 설명 : 나와 너의 취향을 담은 여행 보따리, 소중한 추억을 더 가치있게

  빅데이터 기반 사용자 맞춤형 여행지 추천 서비스

- 주요 기능

  - 한국관광공사의 API를 통한 37,334개의 여행지를 정제한 4,286개 여행지
  
  - 보따리를 활용한 맞춤형 여행지 추천
  
  - 보따리 합치기 기능을 이용한 동반 여행 시 공통 취향 기반 여행지 추천
  
    


## 개발 환경



**Frontend**

- 

**BackEnd**

- JAVA 11
- Spring Boot
- JPA
- Maria DB

**Data**

- 



**CI/CD**

- AWS EC2

- docker

- nginx

- jenkins

  

### Jenkins를 이용한 CD 구축 및 SSL 인증서 적용

---

서비스 아키텍처와 같이, Jenkins의 pipeline을 이용하여 자동 배포를 구축하였음.
Gitlab webhook을 설정하여 Jenkins에 빌드 트리거를 설정했고, 이에 따라 Gitlab에서 main 브랜치에 push하면 자동으로 배포될 수 있도록 구축하여 개발하는 과정에서 배포로 인한 시간 낭비를 줄였습니다.
또한 프론트엔드인 Reace는 Nginx와 함께 docker image로 빌드하여 배포하였고, 백엔드 및 Django 또한 docker container로 배포하였습니다. 그리고 Nginx와 letsencrypt를 이용하여 ssl 인증서를 적용하였고, 프론트엔드는 443(https)로 프록시로 분기시켰고 백엔드는 /api 경로로, 데이터는 /django로 프록시를 걸어줬습니다.



### 기술 특이점

---



- **프론트 / 백 / 데이터 모두 작성 요망**
- 백엔드 : JPA 성능을 향상시키기 위해 for문으로 여러번 select문이 도는 경우에 최대한 JOIN문으로 돌게한다거나, 
      select문으로 조회할 때 엔티티 전체를 조회하는 것을 지양하고 필요한 컬럼만 조회하도록 작은 규칙을 만들었습니다.
      코드를 최대한 재사용하는 것을 추구했습니다.

  


- 배포
  docker, Nginx, jenkins를 이용하여 자동 무중단 배포를 구현 하였습니다.
  백엔드를 docker 컨테이너로 배포하였고, 프론트는 Nginx와 함께 docker 컨테이너로 배포하였습니다.
  
  

## 협업툴

- [Figma](https://www.figma.com/file/73DvPv5QBgrfGDQr7cU46N/Yeobo?node-id=0%3A1)

- [Git](https://lab.ssafy.com/s07-bigdata-recom-sub2/S07P22C103)

- [Jira](https://jira.ssafy.com/projects/S07P22C103/summary)

- [Notion](https://www.notion.so/0c174c0e035f4504baef1e07cf68d028)

- [MatterMost](https://meeting.ssafy.com/s07p21c1/channels/c103-official)

- [GatherTown](https://app.gather.town/app/DgBeInXZ2Rf9o5aX/yeobo)

- [Webex](https://ssafyclass.webex.com/meet/qorgkssk132)

  

## 화면설계(Figma)

[Figma](https://www.figma.com/file/73DvPv5QBgrfGDQr7cU46N/Yeobo?node-id=0%3A1)



## git branch 전략

**main**

배포 및 최종본, 출시 버전 브랜치 (배포 가능한 상태만 관리)

**develop (from main)**

다음 출시 버전을 개발/종합하는 브랜치 

**front_dev/back_dev/data_dev (from develop)**

프론트엔드, 백엔드, 데이터 각각 나눠진 폴더를 구분하기 위한 브런치

**feature (from front_dev/back_dev/data_dev)**

기능을 개발하는 브랜치



## git convention

```bash
git commit -m '[F/B/D/ETC] 타입_제목  ### 제목은 최대 50 글자까지만 입력 ###

#이슈번호
본문내용입니다. 한 줄에 72글자까지 작성 제한'
### 본문은 제목에서 한 줄 띄고, 한 줄에 72자까지만 입력 ###

# <타입> 리스트
#   ADD : 추가(새로운 기능)
#   UPDATE : 수정(기능 수정중임)
#   FIX     : 버그 (버그 수정)
#   REFACTOR: 리팩토링
#   STYLE   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   DOCS    : 문서 (문서 추가, 수정, 삭제)
#   TEST    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   CH   : 기타 변경사항 (빌드 스크립트 수정 등)
#   COMPLETE : 완료
# ------------------
#     타입은 대문자로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
# ------------------

#예시
[F] : ADD_main.html 메인페이지 작성함.
[B] : ADD_main.html
[B] : ADD_dao, dto, service 수정 
[ETC] : DOCS_20220510.md 5월 10일 회의록 작성
```



### Jira

---

협업 및 일정, 업무 관리를 위해 Jira를 사용하였습니다.
스프린트 기간동안 진행되어야 할 주 단위 계획을 짜고, 진행할 이슈들을 스프린트로 만들어 등록했습니다.
스프린트는 일주일 단위로 진행하였습니다.
6주간 5번의 스프린트를 진행하였습니다.

- Epic : Back, Front, Data로 나누어 구성하였습니다.

- story : '추천 알고리즘 정리', '보따리 검색 페이지네이션' 등 명확하고 간단히 기록하였습니다.

- subtask : 'redux toolkit을 이용한 로그인 토큰 구현' 등 story를 세세하게 나누어 업무를 관리 하였습니다.

  

### Notion

---

API 명세, git 전략, project 관련 페이지 등을 모아 관리하였습니다. 
그리고 매일 스크럼을 진행한 내용을 기록하려고 노력하였습니다.
기획과 프로토타입에 시간을 많이 할애하여 기획단계에서 명확하게 정의하고 시작하였습니다.



### Scrum

---

주마다 약  3회 저녁 종례시간에 오늘 진행한 일, 발생한 이슈, 앞으로 해야할 일에 대해 공유하고 정리하는 시간을 가졌습니다.
스크럼을 통해 현재 상황을 공유하고, 프로젝트 일정을 조율하였습니다.
