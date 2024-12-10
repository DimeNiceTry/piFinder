// PiSeries.js
import React from 'react';
import FindPiButton from '../../UI/FingPiButton/FindPiButton';
import classes from './PiSeries.module.css'

function PiSeries({ title, massOfExpNum, onFindSeries, results, trueValue }) {
  return (
    <div className={classes['pisDiv']}>
      <h2>{title}</h2>
      <FindPiButton onClick={onFindSeries}>Find {title}</FindPiButton>

      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%'}}>
        <thead>
          <tr>Результат</tr>
          <tr>
            {massOfExpNum.map((exp, i) => (
              <th key={i} style={{ border: '1px solid black' }}>{`10^${Math.log10(exp)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {results.map((elem, idx) => (
              <td key={idx} style={{ border: '1px solid black' }}>
                {elem.toFixed(5)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table style={{  border: '1px solid black', borderCollapse: 'collapse', width: '100%'}}>
        <thead>
        <tr>Отклонение</tr>
          <tr>
            {massOfExpNum.map((exp, i) => (
              <th key={i} style={{ border: '1px solid black' }}>{`10^${Math.log10(exp)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {results.map((elem, idx) => (
              <td key={idx} style={{ border: '1px solid black' }}>
                {Math.abs(((elem - trueValue) / trueValue).toFixed(5))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PiSeries;
