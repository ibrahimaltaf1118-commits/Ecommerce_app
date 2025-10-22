// src/components/HTMLContent.jsx (or add to your existing component file)
import React from "react";

const HTMLContent = ({ html, className = "" }) => {
  // Add safety check to prevent errors if html is undefined
  if (!html) return null;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default HTMLContent;
