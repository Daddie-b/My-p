// SectionWrapper.js
import React from 'react';


const SectionWrapper = ({ title, children }) => (
  <div className="section-wrapper">
    <h2 className="section-title">{title}</h2>
    <div className="section-content">{children}</div>
  </div>
);

export default SectionWrapper;
