# CAD 도면 기반 자재 수량 산출 및 견적 작성 프로그램

CAD 2D 도면 이미지 또는 PDF에서 자재 수량을 자동으로 추출하고 견적을 생성하는 시스템입니다.

## 🚀 프로젝트 개요

- **목적**: CAD 도면에서 AI 기반 객체 인식을 통해 자재 수량을 자동 추출
- **기술 스택**: 
  - Frontend: React.js + TypeScript + Material-UI
  - Backend: Python FastAPI + OpenCV + OCR
  - AI/ML: YOLO, Tesseract OCR, PyMuPDF

## 📁 프로젝트 구조

```
cad-check/
├── frontend/          # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.tsx    # 파일 업로드 컴포넌트
│   │   │   └── FileList.tsx      # 업로드 파일 목록
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/           # Python FastAPI 백엔드  
│   ├── app/
│   │   ├── main.py    # FastAPI 메인 애플리케이션
│   │   └── __init__.py
│   ├── uploads/       # 업로드된 파일 저장소
│   └── requirements.txt
├── rules.md           # 프로젝트 상세 계획서 (한국어)
├── CLAUDE.md         # Claude Code 가이드
└── README.md         # 이 파일
```

## 🛠️ 설치 및 실행

### 사전 요구사항

- Node.js 18+ 
- Git
- Vercel CLI (선택사항)

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd cad-check
```

### 2. 통합 개발 환경 (권장)

```bash
cd frontend

# 의존성 설치
npm install

# Vercel CLI 설치 (Serverless Functions 테스트용)
npm i -g vercel

# 통합 개발서버 실행 (프론트엔드 + API)
vercel dev
```

**통합 개발서버**: `http://localhost:3000`
- 프론트엔드: `http://localhost:3000`
- API: `http://localhost:3000/api/*`

### 3. 프론트엔드만 개발 (선택사항)

```bash
cd frontend

# 프론트엔드 개발서버만 실행
npm run dev
```

**프론트엔드**: `http://localhost:5173` (API 기능 제한)

## 📋 현재 기능

### ✅ Phase 1 (완료)
- [x] 프로젝트 기본 구조 설정
- [x] React + TypeScript 프론트엔드 
- [x] FastAPI 백엔드
- [x] 파일 업로드 기능 (PNG, JPG, PDF 지원)
- [x] 드래그 앤 드롭 인터페이스
- [x] 파일 목록 표시

### 🔄 Phase 2 (계획)
- [ ] OpenCV 이미지 전처리 엔진
- [ ] 기본 객체 검출 알고리즘
- [ ] OCR 텍스트 인식 (Tesseract)
- [ ] PDF 파싱 기능

### 📋 Phase 3 (계획)
- [ ] 형상 분류 알고리즘
- [ ] 치수 자동 추출
- [ ] 객체-치수 매칭 로직
- [ ] AI 모델 훈련

### 🖥️ Phase 4 (계획)
- [ ] 인터랙티브 도면 뷰어
- [ ] 자재 입력 폼
- [ ] 실시간 수량 계산
- [ ] 견적서 생성

## 🔧 개발 명령어

### 통합 개발
```bash
cd frontend

# 통합 개발서버 (프론트엔드 + API)
vercel dev

# 빌드
npm run build

# 미리보기
npm run preview
```

### 배포
```bash
# Vercel에 배포
vercel --prod
```

자세한 배포 방법은 [DEPLOYMENT.md](DEPLOYMENT.md) 참고

## 🌐 API 엔드포인트

### Serverless API
- `GET /api/` - API 정보
- `GET /api/health` - 헬스체크  
- `POST /api/upload` - 파일 업로드

**로컬**: `http://localhost:3000/api/*`  
**배포**: `https://your-app.vercel.app/api/*`

## 📝 지원 파일 형식

- **이미지**: PNG, JPG/JPEG  
- **문서**: PDF
- **최대 크기**: 50MB

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새 브랜치를 만듭니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.