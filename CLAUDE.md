# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CAD 도면 기반 자재 수량 산출 및 견적 작성 프로그램** - A comprehensive CAD drawing analysis system that automatically extracts material quantities from 2D CAD drawings (images/PDFs) and generates accurate cost estimates.

## Core Functionality

- Upload and analyze CAD drawing files (PDF, PNG, JPG, DWG)
- AI-based object recognition and dimension extraction
- User-defined material descriptions and quantity calculations
- Automatic quotation generation and reporting

## Architecture Overview

### Frontend Stack
- **Framework**: React.js + TypeScript
- **UI Library**: Material-UI or Ant Design
- **File Upload**: React Dropzone
- **PDF Viewer**: React-PDF
- **Drawing Viewer**: Fabric.js or Konva.js

### Backend Stack  
- **Language**: Python (Django/FastAPI) or Node.js (Express)
- **Database**: PostgreSQL (material data, project data)
- **File Storage**: AWS S3 or local storage
- **API**: RESTful API design

### AI/ML Engine
- **Image Processing**: OpenCV, PIL
- **Object Recognition**: YOLO, OpenCV contour detection
- **OCR**: Tesseract, EasyOCR
- **PDF Parsing**: PyMuPDF, pdf2image

## Database Schema

Key tables as defined in the project plan:
- `Materials` - Master material catalog (id, name, unit, unit_price, category, description)
- `Projects` - Project management (id, name, created_date, drawing_file_path, description)
- `Material_Quantities` - Extracted quantities (id, project_id, material_id, quantity, custom_description)

## Development Phases

The project follows a 5-phase development approach:
1. **Phase 1** (2-3 weeks): Basic infrastructure and web interface
2. **Phase 2** (3-4 weeks): Image processing engine with OpenCV
3. **Phase 3** (4-5 weeks): AI analysis enhancement and training
4. **Phase 4** (2-3 weeks): Complete user interface with interactive viewer
5. **Phase 5** (2 weeks): Testing, optimization, and bug fixes

## Key Technical Challenges

- **Drawing Quality Variance**: Multi-stage preprocessing pipeline with adaptive thresholds
- **Object Classification**: Machine learning models with user feedback
- **Dimension Extraction**: Pattern matching with contextual validation
- **Scalability**: Asynchronous processing with cloud scaling

## File Structure

```
cad-check/
├── rules.md          # Complete Korean project specification and development plan
└── CLAUDE.md         # This file
```

## Development Notes

- The project specification is written in Korean and contains detailed technical requirements
- Focus on image processing algorithms using OpenCV for drawing analysis
- Emphasizes user-friendly interface with drag-and-drop functionality
- Includes comprehensive AI pipeline for automated quantity extraction