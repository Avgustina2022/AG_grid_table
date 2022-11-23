import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../components/styles.css'

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'cat',},
    { field: 'name', minWidth: 150 },
    { field: 'breed'},
    { field: 'food', minWidth: 150 },
    { field: 'character'}
    
    
   
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const defaultExcelExportParams = useMemo(() => {
    return {
      headerRowHeight: 30,
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: 'header',
        alignment: {
          vertical: 'Center',
        },
        interior: {
          color: '#f8f8f8',
          pattern: 'Solid',
          patternColor: undefined,
        },
        borders: {
          borderBottom: {
            color: '#ffab00',
            lineStyle: 'Continuous',
            weight: 1,
          },
        },
      },
      {
        id: 'headerGroup',
        font: {
          bold: true,
        },
      },
      {
        id: 'gold-header',
        interior: {
          color: '#E4AB11',
          pattern: 'Solid',
        },
      },
      {
        id: 'silver-header',
        interior: {
          color: '#bbb4bb',
          pattern: 'Solid',
        },
      },
      {
        id: 'bronze-header',
        interior: {
          color: '#be9088',
          pattern: 'Solid',
        },
      },
    ];
  }, []);

  const onGridReady = useCallback((params) => {
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));

    setRowData([
    {
      cat: 'black',
      name:'Murka',
      character: 'nord',
      breed: 'none', 
      food: 'kitekat'
    
    },
    {
      cat: 'white',
      name: 'Burka',
      character: 'mild',
      breed: 'siam',
      food: 'Whiskas'

    }
    ])
  }, []);

  const onBtnExportDataAsExcel = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="page-wrapper">
        <div>
          <button
            onClick={onBtnExportDataAsExcel}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>

        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              defaultExcelExportParams={defaultExcelExportParams}
              excelStyles={excelStyles}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridExample;