# IoTMakers OPEN API를 이용한 웹 애플리케이션

## 1. 앱 등록
- IoT 서비스 앱은 IoTMakers 플랫폼에 등록되어야 사용될 수 있습니다.
- 등록 절차
	1. 포탈 메뉴 상단의 IoT 개발 탭 내 앱 등록 메뉴에서 아래와 같이 [**App 등록**] 버튼을 클릭하여 앱을 등록 합니다.

		![](https://iotmakers.kt.com/openp/assets/images/guide_app_reg_and1.png)
	
	2. 기본정보 입력
		- + 첨부 : 앱 아이콘 이미지 파일 등록
		- **App ID**: 플랫폼 연동 시 앱 인증을 위한 앱 구분 ID (자동 생성이며 앱 개발 시 필요)
		- **Secret**: 플랫폼 연동 시 앱 인증을 위한 앱 인증 키 (자동 생성이며 앱 개발 시 필요)
		- **App name**: 등록 할 앱 이름입력 (필수)
		- OAuth 설정: 3rd Party 개발사가 플랫폼 사용자 인증 시 OAuth 인증 사용 유무 선택
		- OAuth redirect url: Oauth 인증 시 Access token 전송을 위한 URL 입력

		![](https://iotmakers.kt.com/openp/assets/images/guide_app_reg_and2.png)

	3. 상세정보 입력

		- 플랫폼: 앱 플랫폼 (Android, iOS, Web) 선택
		- 플랫폼 버전: 앱 OS 최소 요구 버전을 입력
		- 앱 버전:  앱 버전 입력
		- Link URL: 등록 앱을 다운 받을 수 있는 URL을 입력 (Google play, App store 등)
		- 제작자: 앱 개발 제작사 및 개발자 명 입력
		- 공개여부: 포털 공개 앱 화면에서 사용자에게 등록 한 앱을 노출 할 것인지 설정
		- **카테고리**: 앱의 카테고리 유형을 선택
		- 상세설명: 앱에 대한 상세 설명을 입력
		- App 이미지: 앱의 대표 화면 이미지 파일 등록
		- FCM 인증키: Push notification을 받기 위한 FCM에서 발급 받은 인증키 등록 (Push notification 등록 참고)

		![](https://iotmakers.kt.com/openp/assets/images/guide_app_reg_and3.png)

## 2. 인증 정보 등록
- **request_token.js** 파일을 열어, appId, secret, uName, pw 변수를 앞서 등록한 앱정보와 자신의 계정 정보를 바탕으로 수정해야 합니다. 

```javascript
function requestTokenAwareApi(callback, args){
		var appId = "IoTMakers 플랫폼에 등록된 App ID";     // 변경해야 함
		var secret = "IoTMakers 플랫폼에 등록된 App의 Secret";    // 변경해야 함
		var uName = "YourUserName";              // 변경해야 함
		var pw = "YourPassword";               // 변경해야 함
```

## 3. 실행하기		
- 디바이스 목록 조회
	- list_devices.html을 웹브라우저에서 실행
- 디바이스 태그스트림 목록 조회
	- 출력된 디바이스 목록 중에 디바이스 ID를 클릭하여 해당 디바이스의 태그스트림 목록 출력 
- 디바이스 태그스트림 마지막 로그 조회
	- 출력된 태그스트림 목록 중에 태그스트림 ID를 클릭하여 마지막 로그 조회	