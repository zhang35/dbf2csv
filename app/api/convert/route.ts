import { NextRequest, NextResponse } from 'next/server';
import { DBFFile } from 'dbffile';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const encoding = (formData.get('encoding') as string) || 'utf-8';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read the file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write to a temporary file
    tempFilePath = join(tmpdir(), `upload-${Date.now()}-${Math.random().toString(36).substring(7)}.dbf`);
    await writeFile(tempFilePath, buffer);

    // Parse the DBF file
    const dbf = await DBFFile.open(tempFilePath, { encoding });

    // Convert to CSV format
    const records = await dbf.readRecords();

    // Create CSV header
    const headers = dbf.fields.map(field => field.name).join(',');

    // Create CSV rows
    const rows = records.map(record => {
      return dbf.fields.map(field => {
        const value = record[field.name];
        // Handle values that might contain commas or quotes
        if (value === null || value === undefined) {
          return '';
        }
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',');
    });

    // Combine header and rows
    const csv = [headers, ...rows].join('\n');

    // Return the CSV as a downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${file.name.replace('.dbf', '.csv')}"`,
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert file: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  } finally {
    // Clean up temp file
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }
}
