import React from 'react';
import MySVG from './svg2.svg'

const NoDataSVG = () => (
    <div style={{ textAlign: 'center', padding: '50px', color: 'black' }}>
        <h8>No Data Available</h8>
    <img src={MySVG} alt="No Data" />
  </div>
);

export default NoDataSVG;
