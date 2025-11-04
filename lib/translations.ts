export const translations = {
  zh: {
    title: 'DBF 转 CSV 转换器',
    subtitle: '即刻将您的 DBF 文件转换为 CSV 格式',
    selectFile: '选择 DBF 文件',
    uploadFile: '上传文件',
    orDragDrop: '或拖放文件',
    dbfOnly: '仅支持 DBF 文件',
    selected: '已选择',
    encoding: '字符编码',
    encodings: {
      'utf-8': 'UTF-8',
      'gbk': 'GBK（简体中文）',
      'big5': 'Big5（繁体中文）',
      'iso-8859-1': 'ISO-8859-1 (Latin-1)',
      'windows-1252': 'Windows-1252',
      'cp437': 'CP437 (DOS)',
    },
    convertBtn: '转换为 CSV',
    converting: '转换中...',
    error: {
      noFile: '请选择文件',
      notDbf: '请选择 .dbf 文件',
      conversionFailed: '转换失败',
    },
    security: '您的文件将被安全处理，不会存储在我们的服务器上。',
  },
  en: {
    title: 'DBF to CSV Converter',
    subtitle: 'Convert your DBF files to CSV format instantly',
    selectFile: 'Select DBF File',
    uploadFile: 'Upload a file',
    orDragDrop: 'or drag and drop',
    dbfOnly: 'DBF files only',
    selected: 'Selected',
    encoding: 'Character Encoding',
    encodings: {
      'utf-8': 'UTF-8',
      'gbk': 'GBK (Chinese)',
      'big5': 'Big5 (Traditional Chinese)',
      'iso-8859-1': 'ISO-8859-1 (Latin-1)',
      'windows-1252': 'Windows-1252',
      'cp437': 'CP437 (DOS)',
    },
    convertBtn: 'Convert to CSV',
    converting: 'Converting...',
    error: {
      noFile: 'Please select a file',
      notDbf: 'Please select a .dbf file',
      conversionFailed: 'Conversion failed',
    },
    security: 'Your files are processed securely and never stored on our servers.',
  },
};

export type Language = keyof typeof translations;
export type Translation = typeof translations.zh;
