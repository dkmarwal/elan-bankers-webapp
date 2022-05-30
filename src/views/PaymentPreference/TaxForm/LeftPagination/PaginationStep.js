import React from 'react';
import './styles.scss';

const PaginationStep =(props)=>{
    const {pageNo, currentPage, handlePageChange} = props;

    return(
        <div
            style={{
              background: "#fff",
              border: "1px solid #e2e2e2",
              marginBottom: "1.2rem",
              height: "128px",
              width: "99px",
              position: "relative"
            }}
          >
            <div
              className={currentPage===pageNo?"page-color-active":"page-color"}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "20px",
                height: "20px",
                zIndex: "1",
                textAlign: "center",
                verticalAlign: "middle",
                fontSize:'9pt',
              }}
            >
            <p style={{paddingTop:"3px", margin:"0"}}> {pageNo} </p>
            </div>
            <img alt={`Page ${pageNo}`} onClick={()=> handlePageChange(pageNo)} src={require(`~/assets/images/pic-${pageNo}.jpg`)} />
        </div>
    )
}

export default PaginationStep;