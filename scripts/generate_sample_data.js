const XLSX = require('xlsx');
const path = require('path');

const teachers = [
    { name: 'Pradeep Kumar', phone: '9876543210', email: 'pradeep.kumar@gmail.com', school: 'Delhi Public School', city: 'Delhi', books: 'Mathematics Class 10, Science Class 10' },
    { name: 'Anita Sharma', phone: '9123456789', email: 'anita.sharma@yahoo.co.in', school: 'Kendriya Vidyalaya', city: 'Mumbai', books: 'English Class 8, Hindi Class 8' },
    { name: 'Rajesh Gupta', phone: '9988776655', email: 'rajesh.gupta@rediffmail.com', school: 'Ryan International', city: 'Bangalore', books: 'Social Studies Class 7' },
    { name: 'Meera Nair', phone: '9445566778', email: 'meera.nair@outlook.com', school: 'Cambridge School', city: 'Chennai', books: 'Physics Class 12, Chemistry Class 12' },
    { name: 'Suresh Patel', phone: '9223344556', email: 'suresh.patel@hotmail.com', school: 'St. Xavier\'s School', city: 'Ahmedabad', books: 'Computer Science Class 11' }
];

const ws = XLSX.utils.json_to_sheet(teachers);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Teachers');

const outputPath = path.join(process.cwd(), 'sample_teachers.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`Successfully generated ${outputPath}`);
