import React from 'react'
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Chip
} from '@mui/material'
import { InsertDriveFile, PictureAsPdf, Image } from '@mui/icons-material'

interface FileInfo {
  filename: string
  size: number
  content_type: string
}

interface FileListProps {
  files: FileInfo[]
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (contentType: string) => {
    if (contentType.includes('pdf')) {
      return <PictureAsPdf sx={{ color: 'error.main' }} />
    } else if (contentType.includes('image')) {
      return <Image sx={{ color: 'success.main' }} />
    }
    return <InsertDriveFile sx={{ color: 'primary.main' }} />
  }

  const getFileTypeChip = (contentType: string) => {
    if (contentType.includes('pdf')) {
      return <Chip label="PDF" size="small" color="error" variant="outlined" />
    } else if (contentType.includes('png')) {
      return <Chip label="PNG" size="small" color="success" variant="outlined" />
    } else if (contentType.includes('jpeg') || contentType.includes('jpg')) {
      return <Chip label="JPG" size="small" color="info" variant="outlined" />
    }
    return <Chip label="기타" size="small" variant="outlined" />
  }

  return (
    <Paper elevation={2}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        업로드된 파일 ({files.length}개)
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>파일</TableCell>
              <TableCell>파일명</TableCell>
              <TableCell>형식</TableCell>
              <TableCell align="right">크기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  {getFileIcon(file.content_type)}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {file.filename}
                  </Typography>
                </TableCell>
                <TableCell>
                  {getFileTypeChip(file.content_type)}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default FileList