import * as XLSX from 'xlsx';
import * as fs from 'fs';


const filePath = "/languages/RoomX_languages.xlsx";

function readExcelFile(): void {

    // Đọc file Excel
  const fileBuffer = fs.readFileSync(filePath);
  
  // Đọc dữ liệu từ file
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

  // Chọn sheet đầu tiên trong workbook
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Chuyển sheet thành dạng JSON
  const data = XLSX.utils.sheet_to_json(sheet);

   // In dữ liệu ra console
   console.log(data);
}

readExcelFile();