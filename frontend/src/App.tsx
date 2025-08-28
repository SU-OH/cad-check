import { useState } from 'react'
import { Container, Typography, Box, Alert } from '@mui/material'
import FileUpload from './components/FileUpload'
import FileList from './components/FileList'

interface UploadedFile {
  filename: string;
  size: number;
  content_type: string;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''})

  const handleFileUpload = (fileInfo: UploadedFile) => {
    setUploadedFiles(prev => [...prev, fileInfo])
    setUploadStatus({type: 'success', message: `파일 "${fileInfo.filename}"이 성공적으로 업로드되었습니다.`})
    
    // 성공 메시지 자동 삭제
    setTimeout(() => {
      setUploadStatus({type: null, message: ''})
    }, 3000)
  }

  const handleUploadError = (error: string) => {
    setUploadStatus({type: 'error', message: error})
    
    // 에러 메시지 자동 삭제
    setTimeout(() => {
      setUploadStatus({type: null, message: ''})
    }, 5000)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          CAD 도면 분석 시스템
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          CAD 도면에서 자재 수량을 자동으로 추출하고 견적을 생성합니다
        </Typography>
      </Box>

      {uploadStatus.type && (
        <Box sx={{ mb: 3 }}>
          <Alert severity={uploadStatus.type}>
            {uploadStatus.message}
          </Alert>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <FileUpload 
          onUpload={handleFileUpload} 
          onError={handleUploadError} 
        />
      </Box>

      {uploadedFiles.length > 0 && (
        <FileList files={uploadedFiles} />
      )}
    </Container>
  )
}

export default App
