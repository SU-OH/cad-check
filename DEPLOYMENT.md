# 🚀 Vercel 배포 가이드

CAD 도면 분석 시스템의 프론트엔드와 백엔드를 모두 Vercel에 배포하는 방법입니다.

## 📋 배포 전 체크리스트

- [x] 프론트엔드 + 백엔드 통합 구조
- [x] Vercel Serverless Functions (Python) 설정
- [x] CORS 설정 완료
- [x] 환경변수 설정

## 🏗️ 프로젝트 구조

```
frontend/
├── src/                    # React 소스코드
├── api/                    # Vercel Serverless Functions
│   ├── index.py           # API 루트 (GET /)
│   ├── health.py          # 헬스체크 (GET /api/health)  
│   └── upload.py          # 파일 업로드 (POST /api/upload)
├── dist/                  # 빌드 결과물
├── vercel.json           # Vercel 설정
├── requirements.txt      # Python 의존성 (serverless용)
└── package.json         # Node.js 의존성
```

## 🚀 Vercel 배포 설정

### 1. Repository 연결

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 레포지토리 선택 및 Import

### 2. 프로젝트 설정

**Build & Development Settings:**
```
Framework Preset: Vite
Root Directory: frontend/
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Functions:**
- Python 3.9 runtime이 `api/` 폴더에 자동 적용됨
- `vercel.json`에서 설정 완료

### 3. 환경변수 설정

Vercel Dashboard → Settings → Environment Variables:

```bash
# 선택사항: 외부 API URL이 있다면
VITE_API_URL = ""   # 기본값은 빈 문자열 (상대 경로 사용)
```

## 🔧 로컬 개발

### 프론트엔드 + 백엔드 통합 개발

```bash
cd frontend

# 의존성 설치
npm install

# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 로컬 개발서버 실행 (Vercel Functions 포함)
vercel dev

# 또는 프론트엔드만 개발
npm run dev
```

**로컬 서버:**
- 프론트엔드: `http://localhost:3000`
- API: `http://localhost:3000/api/*`

## 📡 API 엔드포인트

배포 후 사용 가능한 API:

```bash
# API 정보
GET https://your-app.vercel.app/api/

# 헬스체크  
GET https://your-app.vercel.app/api/health

# 파일 업로드
POST https://your-app.vercel.app/api/upload
Content-Type: multipart/form-data
Body: file (PNG, JPG, PDF, 최대 50MB)
```

## ✅ 배포 확인 사항

### 1. 빌드 로그 확인
- [ ] React 빌드 성공
- [ ] Python Functions 배포 성공  
- [ ] CORS 헤더 설정 확인

### 2. 기능 테스트
- [ ] 프론트엔드 로딩
- [ ] API 헬스체크 (`/api/health`)
- [ ] 파일 업로드 기능
- [ ] 에러 처리 확인

### 3. 성능 확인
- [ ] 초기 로딩 시간 < 3초
- [ ] API 응답 시간 < 5초
- [ ] 파일 업로드 성공률

## 🔧 문제 해결

### 일반적인 문제들

**1. CORS 오류**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
→ `api/*.py` 파일들의 CORS 헤더 확인

**2. 파일 업로드 실패**
```
500 Internal Server Error
```
→ Vercel Functions 로그 확인 (Dashboard → Functions 탭)

**3. API 경로 오류**
```
404 Not Found for /api/upload
```
→ `vercel.json`의 Functions 설정 확인

### 디버깅 방법

```bash
# Vercel 로그 실시간 확인
vercel logs --follow

# 특정 함수 로그 확인  
vercel logs --function=api/upload
```

## 🔄 업데이트 배포

### 자동 배포 (권장)
- GitHub에 push하면 자동으로 배포됨
- `main` 브랜치는 Production 환경
- 기타 브랜치는 Preview 환경

### 수동 배포
```bash
# Vercel CLI로 배포
vercel --prod
```

## 📈 성능 최적화

### 프론트엔드 최적화
- [ ] 이미지 최적화 (WebP 형식)
- [ ] JavaScript 번들 크기 최소화
- [ ] CDN 캐싱 활용

### 백엔드 최적화  
- [ ] Serverless Functions 콜드 스타트 최소화
- [ ] 파일 처리 로직 최적화
- [ ] 에러 핸들링 강화

## 🚀 다음 단계

Phase 2 개발을 위한 준비:
- [ ] OpenCV 라이브러리 추가 (용량 제한 고려)
- [ ] 이미지 처리 Functions 개발
- [ ] 데이터베이스 연동 (Vercel KV/PostgreSQL)
- [ ] 인증 시스템 추가

---

**배포 완료!** 🎉  
프론트엔드와 백엔드가 모두 Vercel에서 실행되며, 단일 도메인으로 서비스됩니다.