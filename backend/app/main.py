from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os
import shutil
from pathlib import Path

app = FastAPI(
    title="CAD 도면 분석 시스템",
    description="CAD 도면에서 자재 수량을 자동으로 추출하는 API",
    version="1.0.0"
)

# CORS 설정 - 프론트엔드와 통신을 위해
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite, React 개발 서버
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 업로드 파일 저장 디렉토리 설정
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# 지원하는 파일 형식
SUPPORTED_FORMATS = {
    "image/png": ".png",
    "image/jpeg": ".jpg", 
    "image/jpg": ".jpg",
    "application/pdf": ".pdf"
}

@app.get("/")
async def read_root():
    return {"message": "CAD 도면 분석 시스템 API v1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "cad-analysis-api"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    도면 파일 업로드 엔드포인트
    지원 형식: PNG, JPG, PDF
    """
    # 파일 형식 검증
    if file.content_type not in SUPPORTED_FORMATS:
        raise HTTPException(
            status_code=400, 
            detail=f"지원하지 않는 파일 형식입니다. 지원 형식: {list(SUPPORTED_FORMATS.keys())}"
        )
    
    # 파일 크기 검증 (50MB 제한)
    max_size = 50 * 1024 * 1024  # 50MB
    file_content = await file.read()
    if len(file_content) > max_size:
        raise HTTPException(status_code=400, detail="파일 크기가 50MB를 초과합니다.")
    
    # 파일 저장
    file_extension = SUPPORTED_FORMATS[file.content_type]
    file_path = UPLOAD_DIR / f"{file.filename}"
    
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)
        
        return JSONResponse(content={
            "message": "파일 업로드 성공",
            "filename": file.filename,
            "file_path": str(file_path),
            "file_size": len(file_content),
            "content_type": file.content_type
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"파일 저장 중 오류가 발생했습니다: {str(e)}")

@app.get("/files")
async def list_uploaded_files():
    """업로드된 파일 목록 조회"""
    files = []
    for file_path in UPLOAD_DIR.iterdir():
        if file_path.is_file():
            files.append({
                "filename": file_path.name,
                "size": file_path.stat().st_size,
                "modified": file_path.stat().st_mtime
            })
    
    return {"files": files, "count": len(files)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)