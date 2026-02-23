import * as XLSX from "xlsx";

export interface ParsedChartData {
    time: string;
    price: number;
}

export async function parseMarketFile(file: File): Promise<ParsedChartData[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                // Map common column names to standard format
                const parsed = json.map((row) => ({
                    time: String(row.Date || row.time || row.timestamp || "").split(' ')[0],
                    price: Number(row.Close || row.price || row.value || 0)
                })).filter(item => item.time && !isNaN(item.price));

                resolve(parsed);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
}
