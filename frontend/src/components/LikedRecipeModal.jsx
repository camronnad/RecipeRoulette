import React, { useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import LikedRecipe from './LikedRecipe';

function LikedRecipeModal({ likedModalOpen, children, onClose }) {
  const modalRef = useRef(null);
  const springStyles = useSpring({
    opacity: likedModalOpen ? 1 : 0,
    transform: likedModalOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 220, friction: 120 }
  });

  const downloadPDF = async () => {
    const canvas = await html2canvas(modalRef.current, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save("download.pdf");
  };

  if (!likedModalOpen) return null;

  return (
    <div onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.7)', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
      {/* <animated.div style={springStyles}> */}
      <animated.div style={{ ...springStyles, 
        maxHeight: '80vh', overflowY: 'auto', 
        boxSizing: 'border-box', padding: '20px', 
        background: '#f0ead6', borderRadius: '8px' }}>
    
        <div ref={modalRef}>  {/* Attach ref to this inner div */}
          {children}
        </div>
        <button
  onClick={downloadPDF}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  

  }}
>
  Download as PDF
</button>
      </animated.div>
    </div>
  );
}

export default LikedRecipeModal;
