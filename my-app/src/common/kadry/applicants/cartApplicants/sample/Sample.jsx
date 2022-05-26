// import React from 'react'

// import PDFViewer from 'pdf-viewer-reactjs'

// const Sample = () => {
//     return (
//         <PDFViewer
//             document={{
//                 url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
//             }}
//         />
//     )
// }

// export default Sample
import React, { useState } from 'react';
import { Document, Page} from 'react-pdf';
import 'antd/dist/antd.min.css'


function Sample() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1)
  }

  function onFileChange(event) {
    setFile(event.target.files[0]);
     console.log(event.target.files[0].mozFullPath)
    }

  return (
    <div>
      <Document file='./52179.pdf' onLoadSuccess={onDocumentLoadSuccess}
      
      onSourceError={console.log('error1')}
      onLoadError ={console.log('erro2')}
      onLoadProgress ={console.log('error3')}>
        <Page height='600' pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <input onChange={onFileChange} type="file" />
        {  <object data={'http://localhost:5000/tmp/1.pdf'} type="application/pdf" width="50%" height="300px"></object>}
       {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
      
    </div>
  );
}
export default Sample


// import React, { Component } from 'react';
// import { Document, Page, pdfjs} from 'react-pdf';
// fjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// class Sample extends Component {
//   state = {
//     numPages: null,
//     pageNumber: 1,
//   }
 
//   onDocumentLoadSuccess = ({ numPages }) => {
//     this.setState({ numPages });
//   }
 
//   render() {
//     const { pageNumber, numPages } = this.state;
 
//     return (
//       <div>
//         <Document
//          file='./52179.pdf'
//           onLoadSuccess={this.onDocumentLoadSuccess}
//         >
//           <Page pageNumber={pageNumber} />
//         </Document>
//         <p>Page {pageNumber} of {numPages}</p>
//       </div>
//     );
//   }
// }
// export default Sample

// import React from "react";
// import ReactDOM from "react-dom";
// import { Document, pdfjs, Page } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// class Sample extends React.Component {
//   state = {};

//   onDocumentComplete = (pages) => {
//     this.setState({ page: 1, pages });
//   };

//   handlePrevious = () => {
//     this.setState({ page: this.state.page - 1 });
//   };

//   handleNext = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   renderPagination = (page, pages) => {
//     let previousButton = (
//       <li className="previous" onClick={this.handlePrevious}>
//         <a href="#">
//           <i className="fa fa-arrow-left" /> Previous
//         </a>
//       </li>
//     );
//     if (page === 1) {
//       previousButton = (
//         <li className="previous disabled">
//           <a href="#">
//             <i className="fa fa-arrow-left" /> Previous
//           </a>
//         </li>
//       );
//     }
//     let nextButton = (
//       <li className="next" onClick={this.handleNext}>
//         <a href="#">
//           Next <i className="fa fa-arrow-right" />
//         </a>
//       </li>
//     );
//     if (page === pages) {
//       nextButton = (
//         <li className="next disabled">
//           <a href="#">
//             Next <i className="fa fa-arrow-right" />
//           </a>
//         </li>
//       );
//     }
//     return (
//       <nav>
//         <ul className="pager">
//           {previousButton}
//           {nextButton}
//         </ul>
//       </nav>
//     );
//   };

//   render() {
//     let pagination = null;
//     if (this.state.pages) {
//       pagination = this.renderPagination(this.state.page, this.state.pages);
//     }

//     function onFileChange(event) {
//      // setFile(event.target.files[0]);
//      console.log(event.target.files[0])
//     }
//     return (
//       <div>
//         <Document
//           file="52179.pdf"
//           onDocumentComplete={this.onDocumentComplete}
//           onSourceError = {(err)=>{console.log('err')}}
//           onLoadError={() => {
//             console.log("CALLED");
//           }}

//           onLoadProgress={() => {
//             console.log("PRGREOSS");
//           }} 
        
//           page={this.state.page}
//         >
//           {/* This is what fixes the issue. Try removing the Page component and it would not display PDF */}

//           <Page pageNumber={1} />
//         </Document>
//         {pagination}
//         <input onChange={onFileChange} type="file" />
//         <object data={event.target.files[0]} type="application/pdf" width="50%" height="300px">
//       {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
//      </object>
       
//       </div>
//     );
//   }
// }

// export default Sample;