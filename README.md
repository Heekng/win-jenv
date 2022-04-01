# win-jenv

windows os에서 JDK 환경변수를 관리할 수 있는 node.js 기반의 스크립트입니다.

**환경변수 편집을 위해 cmd 또는 powershell 관리자 권한으로 실행이 필요합니다.**

> @jojoldu 님의 markdown-tistory 오픈소스를 보고 영감을 받아 만들게 되었습니다.  
> 처음으로 만든 node.js 프로젝트이며, 오픈소스입니다.  
> ~~사용자가 있을지 모르겠지만..~~ PR과 조언은 언제나 환영합니다.

## 1. Install

`win-jenv`는 node.js 환경에서 사용할 수 있으며 아래 명령어로 설치할 수 있습니다. 

```
npm install -g win-jenv
```

## 2. windows setting

시스템 속성 - 환경 변수의 시스템 변수 설정이 필요합니다.

### 2-1. JAVA_HOME 등록

(예시) JAVA_HOME = `C:\Program Files\Java\jdk1.8.0_74` 과 같이 jdk 디렉토리까지의 JAVA_HOME 시스템 변수가 등록되어 있어야 합니다.

### 2-2. path에 등록

path 시스템 변수에 `%JAVA_HOME%\bin` 환경변수가 등록되어 있어야 합니다.

## 3. 사용방법

**환경변수 편집을 위해 cmd 또는 powershell 관리자 권한으로 실행이 필요합니다.**

`win-jenv`는 `init`, `show`, `set`, `add`, `delete` 명령어를 통해 사용할 수 있습니다.

### 3-1. init

최초 1회 실행

```
win-jenv init
```

- 사용자의 home 경로에 `jenvSet.json` 파일을 생성합니다.
- 최초 1번 실행하여야 합니다.
- `jenvSet.`json
  - `json` 형식으로 이루어져 있습니다.
  - [사용자 설정 이름]:[등록할 jdk path] 형식으로 작성합니다.
  - 최초 `init`시에 예시로 `"ex)jdkName":"ex)jdk bin Path"`가 등록되어 있으나 삭제 후 사용해도 무관합니다.

### 3-2. 등록된 jdk 리스트 확인

```
win-jenv show
```

- `jenvSet.json`에 등록된 환경변수 리스트를 출력합니다.

### 3-3. win-jenv에 jdk 등록

```
win-jenv add [사용자 설정 이름] [등록할 jdk path]
```

- jdk path를 등록합니다.
- `[사용자 설정 이름]`은 사용자가 식별할 수 있게만 작성해도 무관합니다.
- `[등록할 jdk path]`는 `C:\Program Files\Java\jdk1.8.0_74`와 같이 등록할 jdk 디렉토리까지 작성합니다.
- jdk는 별도로 설치되어 있어야 합니다.

### 3-4. win-jenv에 등록된 jdk 삭제

```
win-jenv delete [사용자 설정 이름]
```

- `[사용자 설정 이름]`으로 등록된 jdk path을 삭제합니다.
- 로컬의 jdk는 삭제되지 않습니다.

### 3-5. jdk 환경변수 설정

```
win-jenv set [사용자 설정 이름]
```

- 현재 jdk path를 `[사용자 설정 이름]`으로 등록된 jdk path으로 설정합니다.
- set 명령어 실행 이후에는 `cmd` 또는 `powershell`을 재실행하여야 합니다.

## 4. Release Note

- 1.0.0
  - 최초 개시