"use client";

import React, {useState, useEffect, useRef, useMemo} from "react";
import { AgGridReact } from "ag-grid-react"; // Import AgGridReact 類型
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


export type Product = {
  id: number;
  name: string;
  price: number;
};

export default function NewProductsPage() {
const gridRef = useRef<AgGridReact<Product>>(null); // 指定 AgGridReact<Product> 類型
  const [rowData, setRowData] = useState<Product[]>([]);

  // 列定義
    const columnDefs: ColDef<Product>[] = [
      { field: "id", headerName: "商品 ID", sortable: true, filter: true, width: 100 },
      { field: "name", headerName: "商品名稱", sortable: true, filter: true, flex: 1 },
      { field: "price", headerName: "價格", sortable: true, filter: true, width: 100 },
    ];

  // 流式加載數據模擬
const fetchStreamedData = async () => {
    try {
      const response = await fetch("/api/proxy/stream-data");
      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Reader not available');

      const decoder = new TextDecoder();
      let buffer = '';
      let currentProducts: Product[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // 處理最後剩餘的數據
          if (buffer.trim()) {
            try {
              const product = JSON.parse(buffer);
              currentProducts.push(product);
            } catch (error) {
              console.error('Parse error:', error);
            }
          }
          if (currentProducts.length > 0) {
            setRowData(prev => [...prev, ...currentProducts]);
          }
          break;
        }

        // 解碼新的數據塊
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');
        // 保留最後一行，但不移除它
        const processingLines = lines.slice(0, -1);
        buffer = lines[lines.length - 1];

        for (const line of processingLines) {
          if (line.trim()) {
            try {
              const product = JSON.parse(line);
              currentProducts.push(product);

              if (currentProducts.length >= 20) {
                setRowData(prev => [...prev, ...currentProducts]);
                currentProducts = [];
                await new Promise(resolve => setTimeout(resolve, 50));
              }
            } catch (error) {
              console.error('Parse error:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
};

const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);
// 添加一個新的 useEffect 來監聽 rowData 的變化
useEffect(() => {
    console.log('Current rowData:', rowData);
}, [rowData]);

// 原來的 useEffect 保持不變
useEffect(() => {
    fetchStreamedData();
}, []);

  return (
    <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
      <h2 className="text-2xl font-bold mb-4">最新商品</h2>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          loadingCellRendererParams={loadingCellRendererParams}
          domLayout="normal"  // 添加這行
          animateRows={true}  // 添加這行
          defaultColDef={{    // 添加默認列配置
            sortable: true,
            filter: true,
            resizable: true,
          }}
          onGridReady={(params) => {
            console.log('Grid Ready', { rowData, params });
            params.api.sizeColumnsToFit();
          }}
          onFirstDataRendered={(params) => {
            console.log('First Data Rendered', rowData);
            params.api.sizeColumnsToFit();
          }}
        />
    </div>
  );
}
