# DBF to CSV Converter (Python CLI)

A simple Python command-line tool to convert DBF (dBase) files to CSV format with support for multiple character encodings.

## Features

- Convert DBF files to CSV format
- Support for multiple character encodings (UTF-8, GBK, Big5, ISO-8859-1, etc.)
- Simple command-line interface
- Lightweight and fast

## Requirements

- Python 3.x
- dbfread library

## Installation

1. Navigate to the python directory:
```bash
cd python
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Basic usage:
```bash
python dbf2csv.py input.dbf output.csv
```

Specify character encoding (recommended for Chinese files):
```bash
python dbf2csv.py --encoding gbk input.dbf output.csv
```

### Command-line Arguments

```
positional arguments:
  input_file           Path to the input DBF file
  output_file          Path to the output CSV file

options:
  -h, --help           Show help message and exit
  --encoding ENCODING  Character encoding of the DBF file (default: utf-8)
```

### Common Encodings

- `utf-8` - UTF-8 (default)
- `gbk` - GBK (Simplified Chinese)
- `big5` - Big5 (Traditional Chinese)
- `iso-8859-1` - ISO-8859-1 (Latin-1)
- `windows-1252` - Windows-1252
- `cp437` - CP437 (DOS)

## Examples

Convert a Chinese DBF file:
```bash
python dbf2csv.py --encoding gbk data.dbf data.csv
```

Convert a file with default UTF-8 encoding:
```bash
python dbf2csv.py input.dbf output.csv
```

## Error Handling

If you encounter encoding errors, try different encodings:
- For Chinese files: `gbk` or `big5`
- For Western European files: `iso-8859-1` or `windows-1252`
- For DOS files: `cp437`

## License

ISC

## Web Application

For a web-based version with a graphical interface, check out the parent directory which contains a Next.js web application for converting DBF to CSV online.
