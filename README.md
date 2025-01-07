# dbf2csv

Convert a DBF file to a CSV file.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
positional arguments:
  input_file           Path to the input DBF file.
  output_file          Path to the output CSV file.

options:
  -h, --help           show this help message and exit
  --encoding ENCODING  Encoding of the DBF file (default: utf-8).
```

Example:

```bash
python dbf2csv.py --encoding gbk input.dbf output.csv
```
