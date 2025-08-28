# CAD 도면 기반 자재 수량 산출 및 견적 작성 프로그램 개발 계획서

## 📋 프로젝트 개요

### 목적
- CAD 2D 도면 이미지 또는 PDF에서 자재 수량을 자동으로 추출
- 사용자 설명을 바탕으로 정확한 자재 명세서 작성
- 실시간 견적 계산 및 보고서 생성

### 주요 기능
- 도면 파일 업로드 및 분석
- AI 기반 객체 인식 및 치수 추출
- 사용자 정의 자재 설명 입력
- 자동 수량 계산
- 견적서 생성 및 출력

## 🏗️ 시스템 아키텍처

### Frontend (웹 기반 UI)
- **프레임워크**: React.js + TypeScript
- **UI 라이브러리**: Material-UI 또는 Ant Design
- **파일 업로드**: React Dropzone
- **PDF 뷰어**: React-PDF
- **도면 뷰어**: Fabric.js 또는 Konva.js

### Backend (서버)
- **언어**: Python (Django/FastAPI) 또는 Node.js (Express)
- **데이터베이스**: PostgreSQL (자재 정보, 프로젝트 데이터)
- **파일 저장**: AWS S3 또는 로컬 스토리지
- **API 설계**: RESTful API

### AI/ML 엔진
- **이미지 처리**: OpenCV, PIL
- **객체 인식**: YOLO, OpenCV 컨투어 검출
- **OCR**: Tesseract, EasyOCR
- **PDF 파싱**: PyMuPDF, pdf2image

## 🔧 핵심 기술 스택

### 이미지/PDF 처리
```python
# 주요 라이브러리
- OpenCV: 이미지 전처리, 객체 검출
- Tesseract OCR: 텍스트 인식
- PyMuPDF: PDF 파싱
- Pillow: 이미지 조작
- pdf2image: PDF를 이미지로 변환
```

### 데이터베이스 설계
```sql
-- 자재 마스터 테이블
Materials (
    id, name, unit, unit_price, category, description
)

-- 프로젝트 테이블
Projects (
    id, name, created_date, drawing_file_path, description
)

-- 자재 수량 테이블
Material_Quantities (
    id, project_id, material_id, quantity, custom_description
)
```

## 📱 사용자 인터페이스 설계

### 1. 메인 대시보드
- 프로젝트 목록
- 새 프로젝트 생성
- 최근 작업한 프로젝트

### 2. 도면 업로드 페이지
- 드래그 앤 드롭 파일 업로드
- 지원 형식: PDF, PNG, JPG, DWG
- 파일 미리보기

### 3. 도면 분석 페이지
- 도면 뷰어 (확대/축소, 팬)
- 객체 하이라이트 표시
- 치수 정보 표시

### 4. 자재 입력 페이지
```
┌─────────────────┬─────────────────────────────────────┐
│ 도면 뷰어       │ 자재 입력 패널                      │
│                 │                                     │
│ [도면 이미지]   │ 검출된 객체: [드롭다운]             │
│                 │ 자재명: [입력 필드]                 │
│                 │ 수량: [자동 계산] [수동 수정]       │
│                 │ 단위: [선택]                        │
│                 │ 설명: [텍스트 영역]                 │
│                 │ [추가] [삭제] [저장]                │
└─────────────────┴─────────────────────────────────────┘
```

### 5. 견적서 생성 페이지
- 자재 목록 테이블
- 단가 정보
- 총 비용 계산
- PDF 출력 기능

## 🤖 AI 기반 도면 분석 알고리즘

### 1. 전처리 단계
```python
def preprocess_drawing(image):
    # 그레이스케일 변환
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 노이즈 제거
    denoised = cv2.medianBlur(gray, 5)
    
    # 대비 향상
    enhanced = cv2.equalizeHist(denoised)
    
    # 이진화
    binary = cv2.adaptiveThreshold(enhanced, 255, 
                                   cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                   cv2.THRESH_BINARY, 11, 2)
    return binary
```

### 2. 객체 검출
```python
def detect_objects(binary_image):
    # 컨투어 검출
    contours, _ = cv2.findContours(binary_image, 
                                   cv2.RETR_EXTERNAL, 
                                   cv2.CHAIN_APPROX_SIMPLE)
    
    objects = []
    for contour in contours:
        # 면적 필터링
        area = cv2.contourArea(contour)
        if area > MIN_AREA:
            # 객체 분류 (직사각형, 원, 선 등)
            shape = classify_shape(contour)
            bbox = cv2.boundingRect(contour)
            objects.append({
                'shape': shape,
                'bbox': bbox,
                'area': area,
                'contour': contour
            })
    
    return objects
```

### 3. 치수 추출
```python
def extract_dimensions(image, objects):
    # OCR로 치수 텍스트 추출
    ocr_results = pytesseract.image_to_data(image, output_type=Output.DICT)
    
    dimensions = []
    for i, text in enumerate(ocr_results['text']):
        if is_dimension_text(text):  # 숫자 + 단위 패턴 매칭
            x, y, w, h = (ocr_results['left'][i], ocr_results['top'][i], 
                         ocr_results['width'][i], ocr_results['height'][i])
            dimensions.append({
                'text': text,
                'bbox': (x, y, w, h),
                'confidence': ocr_results['conf'][i]
            })
    
    return dimensions
```

## 🎯 개발 단계별 계획

### Phase 1: 기본 인프라 구축 (2-3주)
- [ ] 프로젝트 설정 및 환경 구성
- [ ] 데이터베이스 스키마 설계
- [ ] 기본 웹 인터페이스 구축
- [ ] 파일 업로드 기능 구현

### Phase 2: 이미지 처리 엔진 개발 (3-4주)
- [ ] OpenCV 기반 이미지 전처리
- [ ] 기본 객체 검출 알고리즘
- [ ] OCR 텍스트 인식
- [ ] PDF 파싱 기능

### Phase 3: AI 분석 고도화 (4-5주)
- [ ] 형상 분류 알고리즘 개선
- [ ] 치수 자동 추출
- [ ] 객체-치수 매칭 로직
- [ ] 학습 데이터 수집 및 모델 훈련

### Phase 4: 사용자 인터페이스 완성 (2-3주)
- [ ] 인터랙티브 도면 뷰어
- [ ] 자재 입력 폼
- [ ] 실시간 수량 계산
- [ ] 견적서 생성 기능

### Phase 5: 테스트 및 최적화 (2주)
- [ ] 다양한 도면 형식 테스트
- [ ] 성능 최적화
- [ ] 버그 수정
- [ ] 사용자 피드백 반영

## 📊 예상 기술적 도전과제

### 1. 도면 품질 편차
**문제**: 스캔 품질, 해상도, 노이즈 차이
**해결**: 다단계 전처리 파이프라인, 적응형 임계값

### 2. 객체 분류 정확도
**문제**: 다양한 도면 스타일과 기호
**해결**: 기계학습 모델 훈련, 사용자 피드백 학습

### 3. 치수 추출의 복잡성
**문제**: 다양한 치수 표기법, OCR 오인식
**해결**: 정규표현식 패턴 매칭, 문맥 기반 검증

### 4. 확장성
**문제**: 대용량 파일 처리, 동시 사용자 지원
**해결**: 비동기 처리, 캐싱, 클라우드 스케일링

## 💡 추가 고려사항

### 보안
- 파일 업로드 검증
- 사용자 인증 및 권한 관리
- 데이터 암호화

### 성능
- 이미지 처리 최적화
- 결과 캐싱
- 점진적 로딩

### 확장성
- 플러그인 아키텍처
- API 개방
- 다국어 지원

## 🚀 배포 및 운영

### 개발 환경
- Docker 컨테이너화
- CI/CD 파이프라인
- 자동화된 테스트

### 프로덕션 환경
- 클라우드 배포 (AWS/Azure/GCP)
- 로드 밸런싱
- 모니터링 및 로깅

---

이 계획서를 바탕으로 단계별로 개발을 진행하시면 효율적인 CAD 도면 분석 프로그램을 구축하실 수 있습니다. 각 단계별로 프로토타입을 만들어 검증하면서 진행하시는 것을 권장합니다.