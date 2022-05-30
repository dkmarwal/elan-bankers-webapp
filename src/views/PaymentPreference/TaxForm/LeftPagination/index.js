import React from 'react';
import PaginationStep from './PaginationStep';

const LeftPagination =(props) => {
    const {selectedPage, handleFormPageChange} = props;
    const pages = [1,2,3,4,5,6];
    const list = pages.map((item, index) => (
            <PaginationStep key={item} pageNo={item} currentPage={selectedPage} handlePageChange={(pageNo)=>handleFormPageChange(pageNo)} />
        ));

    return(
        <div
          style={{
            width: "140px",
            background: "#fafafa",
            overflowY: "auto",
            padding: "1rem",
            boxSizing: "border-box",
             zIndex: 2,
            top:"4.6rem"
          }}
        >
        {list}
        </div>
    )
}

export default LeftPagination;