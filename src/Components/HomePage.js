import React, { useState } from 'react';
import MusicPanel from './MusicPanel';

function HomePage() {
  const [showMusicPanel, setShowMusicPanel] = useState(false);

  const handleCardClick = () => {
    setShowMusicPanel(true);
  };

  return (
    <div>
      <button className="card" onClick={handleCardClick}>
        Chill Music
      </button>
      <button className="card" onClick={handleCardClick}>
        Study Music
      </button>
      {showMusicPanel && <MusicPanel />}
    </div>
  );
}

export default HomePage;
