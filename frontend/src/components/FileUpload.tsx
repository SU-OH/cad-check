import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'
import { CloudUpload, InsertDriveFile } from '@mui/icons-material'
import axios from 'axios'

interface FileUploadProps {
  onUpload: (fileInfo: { filename: string; size: number; content_type: string }) => void
  onError: (error: string) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, onError }) => {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    
    if (!file) return

    // 파일 형식 검증
    const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
    if (!supportedTypes.includes(file.type)) {
      onError('지원하지 않는 파일 형식입니다. PNG, JPG, PDF 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      onError('파일 크기가 50MB를 초과합니다.')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      onUpload({
        filename: response.data.filename,
        size: response.data.file_size,
        content_type: response.data.content_type
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        onError(error.response.data.detail || '파일 업로드 중 오류가 발생했습니다.')
      } else {
        onError('서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해 주세요.')
      }
    } finally {
      setUploading(false)
    }
  }, [onUpload, onError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    }
  })

  return (
    <Paper
      {...getRootProps()}
      elevation={3}
      sx={{
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'primary.50' : 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.50',
        }
      }}
    >
      <input {...getInputProps()} />
      
      {uploading ? (
        <Box sx={{ py: 4 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="primary">
            파일을 업로드하는 중...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ py: 2 }}>
          <CloudUpload sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          
          {isDragActive ? (
            <Typography variant="h6" color="primary">
              파일을 여기에 드롭하세요
            </Typography>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                도면 파일을 업로드하세요
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                파일을 드래그하거나 클릭하여 선택하세요
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
                <InsertDriveFile sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  지원 형식: PNG, JPG, PDF (최대 50MB)
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
    </Paper>
  )
}

export default FileUpload