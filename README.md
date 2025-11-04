# DBF to CSV Converter

A modern web application built with Next.js that converts DBF (dBase) files to CSV format. Upload your DBF files and instantly download them as CSV with support for multiple character encodings.

## Features

- **Bilingual Interface** - Default Chinese (简体中文) with English toggle
- Drag-and-drop file upload interface
- Multiple encoding support (UTF-8, GBK, Big5, ISO-8859-1, Windows-1252, CP437)
- Instant CSV download
- Dark mode support
- Fully responsive design
- Secure client-side processing
- No file storage - everything happens in your browser session

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Styling
- **dbffile** - DBF parsing library
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18.x or higher (20.x recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dbf2csv
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Visit [Vercel](https://vercel.com) and sign up/login

3. Click "New Project" and import your repository

4. Vercel will automatically detect Next.js and configure the build settings

5. Click "Deploy"

Your app will be live with a URL like `https://your-project.vercel.app`

### Manual Deployment

```bash
npm run build
npm start
```

## Environment Variables

No environment variables are required for basic functionality.

## Usage

1. Visit the web application
2. Use the language toggle (中文/English) in the top-right corner to switch languages
3. Click or drag-and-drop a .dbf file
4. Select the appropriate character encoding (default: GBK for Chinese files)
5. Click "Convert to CSV" / "转换为 CSV"
6. Your CSV file will download automatically

## Python CLI Tool

A standalone Python command-line version is also available in the [`python/`](./python) directory. See the [Python CLI README](./python/README.md) for installation and usage instructions.

Quick start:
```bash
cd python
pip install -r requirements.txt
python dbf2csv.py --encoding gbk input.dbf output.csv
```

## License

ISC
