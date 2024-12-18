import React, { useState } from 'react';
import classes from './ToolTip.module.css';
import arrowIcon from '../img/right-arrow-in-circular-button-svgrepo-com.svg';

const Tooltip = ({ text, buttonText }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={classes['tooltip-container']} 
      
    >
      <div onClick={() => setIsVisible(!isVisible)} className={classes['TooltipLink-container']} style={{background: isVisible? '#FFBC39': '#fff', border: isVisible ? '1px solid #FFBC39' : '1px solid #a4a3a0', borderRadius: isVisible ? '15px 15px 0 0' : '15px 15px 15px 15px'}}>
        <a className={classes['TooltipLink']}>
          {buttonText}
        </a>
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 963 963"
          style={{
            transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease',
          }}
          fill={isVisible ? '#fff' : '#FFBC39'} // Изменение цвета fill
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(90, 481.5, 481.5)">
            <path d="M0,481.5C0,747.4,215.6,963,481.5,963C747.4,963,963,747.4,963,481.5C963,215.6,747.4,0,481.5,0C215.5,0,0,215.6,0,481.5z M691.601,543.3L478.2,776.601C460.4,796,436.101,805.8,411.8,805.8c-21.699,0-43.5-7.8-60.699-23.6c-36.7-33.6-39.2-90.5-5.601-127.2l157.8-172.399L340.601,305.3c-33.601-36.6-31.101-93.6,5.5-127.2c36.6-33.6,93.6-31.1,127.199,5.5l218.2,238.1C723,456.101,723.101,508.9,691.601,543.3z"/>
          </g>
        </svg>
      </div>

      {/* Добавляем класс "visible", если isVisible === true */}
      <div className={`${classes['tooltip-text']} ${isVisible ? classes['visible'] : ''}`}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
