import React, { useState } from 'react';
import { Button, Select, MenuItem } from '@mui/material'; 
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { WidthFull } from '@mui/icons-material';


const CustomPagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: '1px', marginRight: '100px' }}>
      
      <Button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - currentPage + 1)}
      >
        <FaAngleDoubleLeft />
      </Button>
      
      <Button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaAngleLeft />
      </Button>
      
      <span style={{ margin: '0 10px' }}>
        Página {currentPage} de {totalPages}
      </span>

      <Button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FaAngleRight />
      </Button>
      <Button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <FaAngleDoubleRight />
      </Button>

      <span style={{ fontWeight: 'inherit', marginLeft: '15px' }} >
        Datos por página:
      </span>
      <Select 
        variant="standard"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        style={{ marginLeft: '20px' }}
      > 
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </div>
  );
};

export default CustomPagination;
