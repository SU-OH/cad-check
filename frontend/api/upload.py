from http.server import BaseHTTPRequestHandler
import json
import base64
import os
import tempfile
from urllib.parse import parse_qs
import cgi
import io

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """CORS preflight 요청 처리"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        """파일 업로드 처리"""
        try:
            # CORS 헤더 설정
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            # Content-Type 확인
            content_type = self.headers.get('Content-Type', '')
            
            if not content_type.startswith('multipart/form-data'):
                response = {
                    "error": "Content-Type must be multipart/form-data"
                }
                self.wfile.write(json.dumps(response).encode())
                return

            # multipart/form-data 파싱
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            # 임시 파일로 파싱
            env = os.environ.copy()
            env['REQUEST_METHOD'] = 'POST'
            env['CONTENT_TYPE'] = content_type
            env['CONTENT_LENGTH'] = str(content_length)
            
            fp = io.BytesIO(post_data)
            form = cgi.FieldStorage(fp=fp, environ=env)
            
            if 'file' not in form:
                response = {
                    "error": "No file provided"
                }
                self.wfile.write(json.dumps(response).encode())
                return
            
            file_item = form['file']
            
            if not file_item.filename:
                response = {
                    "error": "No file selected"
                }
                self.wfile.write(json.dumps(response).encode())
                return
            
            filename = file_item.filename
            file_content = file_item.file.read()
            content_type_file = file_item.type or 'application/octet-stream'
            
            # 파일 형식 검증
            supported_types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
            if content_type_file not in supported_types:
                response = {
                    "error": f"지원하지 않는 파일 형식입니다. 지원 형식: {supported_types}"
                }
                self.wfile.write(json.dumps(response).encode())
                return
            
            # 파일 크기 검증 (50MB)
            max_size = 50 * 1024 * 1024  # 50MB
            if len(file_content) > max_size:
                response = {
                    "error": "파일 크기가 50MB를 초과합니다."
                }
                self.wfile.write(json.dumps(response).encode())
                return
            
            # 성공 응답
            response = {
                "message": "파일 업로드 성공",
                "filename": filename,
                "file_size": len(file_content),
                "content_type": content_type_file,
                "status": "uploaded"
            }
            
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            
        except Exception as e:
            # 에러 응답
            self.send_response(500)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = {
                "error": f"파일 업로드 중 오류가 발생했습니다: {str(e)}"
            }
            self.wfile.write(json.dumps(response).encode())

    def do_GET(self):
        """GET 요청 처리 (옵션)"""
        self.send_response(405)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            "error": "Method not allowed. Use POST for file upload."
        }
        self.wfile.write(json.dumps(response).encode())