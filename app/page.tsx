'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/languageContext';

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [encoding, setEncoding] = useState('gbk');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError(t.error.noFile);
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('encoding', encoding);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      // Get the CSV content
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.dbf', '.csv');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset form
      setFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.dbf')) {
        setError(t.error.notDbf);
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (!droppedFile.name.toLowerCase().endsWith('.dbf')) {
        setError(t.error.notDbf);
        setFile(null);
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Language Switcher */}
          <div className="flex justify-end mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 flex gap-1">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'zh'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.selectFile}
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${
                    isDragging
                      ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 scale-105 shadow-lg'
                      : isHovering
                      ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 scale-[1.02] shadow-md'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-sm'
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="space-y-3 text-center">
                    <div className={`transition-transform duration-300 ${isDragging ? 'scale-110 animate-pulse' : isHovering ? 'scale-105' : ''}`}>
                      <svg
                        className={`mx-auto h-16 w-16 transition-colors duration-300 ${
                          isDragging
                            ? 'text-indigo-500 dark:text-indigo-400'
                            : isHovering
                            ? 'text-indigo-400 dark:text-indigo-500'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col text-sm">
                      <div className="flex items-center justify-center gap-1">
                        <label
                          htmlFor="file-input"
                          className={`relative cursor-pointer rounded-md font-semibold transition-all duration-200 ${
                            isDragging
                              ? 'text-indigo-600 dark:text-indigo-400 underline'
                              : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300'
                          } focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2`}
                        >
                          <span>{t.uploadFile}</span>
                          <input
                            id="file-input"
                            name="file-input"
                            type="file"
                            accept=".dbf"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="text-gray-600 dark:text-gray-400">{t.orDragDrop}</p>
                      </div>
                      {isDragging && (
                        <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 animate-bounce">
                          Drop your file here!
                        </p>
                      )}
                      {isHovering && !isDragging && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                          Click to browse or drag and drop your file
                        </p>
                      )}
                    </div>
                    <p className={`text-xs transition-colors duration-200 ${
                      isDragging || isHovering
                        ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {t.dbfOnly}
                    </p>
                  </div>
                </div>
                {file && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="encoding"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t.encoding}
                </label>
                <select
                  id="encoding"
                  value={encoding}
                  onChange={(e) => setEncoding(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="gbk">{t.encodings['gbk']}</option>
                  <option value="big5">{t.encodings['big5']}</option>
                  <option value="utf-8">{t.encodings['utf-8']}</option>
                  <option value="iso-8859-1">{t.encodings['iso-8859-1']}</option>
                  <option value="windows-1252">{t.encodings['windows-1252']}</option>
                  <option value="cp437">{t.encodings['cp437']}</option>
                </select>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || isConverting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isConverting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.converting}
                  </span>
                ) : (
                  t.convertBtn
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{t.security}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
