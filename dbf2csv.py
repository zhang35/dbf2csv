#!/usr/bin/env python3

import argparse
import csv
from dbfread import DBF

def convert_dbf_to_csv(input_file: str, output_file: str, encoding: str = 'utf-8'):
    """
    Convert a DBF file to a CSV file.
    
    Args:
        input_file (str): Path to the DBF file.
        output_file (str): Path to save the output CSV file.
        encoding (str): Encoding of the DBF file. Default is 'utf-8'.
    """
    try:
        print(f"Converting {input_file} to {output_file} with encoding {encoding}...")
        table = DBF(input_file, encoding=encoding)

        with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(table.field_names)  # Write header row
            for record in table:
                writer.writerow(record.values())  # Write data rows

        print(f"Conversion completed: {output_file}")

    except Exception as e:
        print(f"Error during conversion: {e}")

def main():
    parser = argparse.ArgumentParser(
        description="Convert a DBF file to a CSV file."
    )
    parser.add_argument(
        "input_file",
        help="Path to the input DBF file.",
    )
    parser.add_argument(
        "output_file",
        help="Path to the output CSV file.",
    )
    parser.add_argument(
        "--encoding",
        default="utf-8",
        help="Encoding of the DBF file (default: utf-8).",
    )

    args = parser.parse_args()

    convert_dbf_to_csv(args.input_file, args.output_file, args.encoding)

if __name__ == "__main__":
    main()