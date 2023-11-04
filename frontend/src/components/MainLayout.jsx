import React from 'react';
import ParticleBg from './TsParticle';
import '../styles/MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
       <ParticleBg style={{ position: 'absolute', zIndex: 0, top: 0, left: 0, width: '100%', height: '100%' }} />
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
