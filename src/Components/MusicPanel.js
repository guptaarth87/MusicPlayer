import React, { useState, useRef } from 'react';
import chillMusic from '../Assets/music/chill_music.mp3';
import studyMusic from '../Assets/music/study_music.mp3';
import '../Styles/MusicPanel.css';
function MusicPanel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songName, setSongName] = useState('Chill Music');
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Index of the currently playing song
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [logged80Percent, setLogged80Percent] = useState(false);

  const playlist = [
    { name: 'Chill Music', src: chillMusic },
    { name: 'Study Music', src: studyMusic },
    // Add more songs to the playlist as needed
  ];

  const playSong = (index) => {
    setSongName(playlist[index].name);
    audioRef.current.src = playlist[index].src;
    audioRef.current.load();
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error("Error playing song:", error);
    });
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    const progressBar = progressBarRef.current;
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    progressBar.style.width = `${percent}%`;

    // Log a message when the playback touches or exceeds 80%
    if (percent >= 80 && !logged80Percent) {
      console.log('80% completed');
      setLogged80Percent(true);
    }
  };

  const handleSeek = (e) => {
    if (isDraggingRef.current) {
      const progressBar = progressBarRef.current;
      const seekTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
    audioRef.current.pause();
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    audioRef.current.play();
  };


  const playPreviousSong = () => {
    const previousSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setSongName(playlist[previousSongIndex].name);
    
    // Pause the audio
    audioRef.current.pause();
    
    // Load the new source
    audioRef.current.src = playlist[previousSongIndex].src;
    audioRef.current.load();
  
    // Set a timeout to play the new song after a brief delay
    setTimeout(() => {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Error playing song:", error);
      });
    }, 100); // Adjust the delay as needed (e.g., 100 milliseconds)
    
    setCurrentSongIndex(previousSongIndex);
  };
  
  const playNextSong = () => {
    const nextSongIndex = (currentSongIndex + 1) % playlist.length;
    setSongName(playlist[nextSongIndex].name);
    
    // Pause the audio
    audioRef.current.pause();
    
    // Load the new source
    audioRef.current.src = playlist[nextSongIndex].src;
    audioRef.current.load();
  
    // Set a timeout to play the new song after a brief delay
    setTimeout(() => {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Error playing song:", error);
      });
    }, 100); // Adjust the delay as needed (e.g., 100 milliseconds)
    
    setCurrentSongIndex(nextSongIndex);
  };
  
  

  const handleAudioEnd = () => {
    setIsPlaying(false);
    // You can add logic here to play the next song in the playlist.
    playNextSong();
  };

  return (
    <>
     <button onClick={() => playSong(0)}>Chill Music</button>
        <button onClick={() => playSong(1)}>Study Music</button>
    <div className="music-panel">
      <div className="song-info">
        <h3>{songName}</h3>
      </div>
      <div className="controls p-2">
        <button className="m-2" onClick={playPreviousSong}>Previous</button>
        <button className="m-2" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button className="m-2" onClick={playNextSong}>Next</button>
      </div>
      <div
        className="progress-bar"
        onMouseDown={handleSeek}
        onMouseMove={handleSeek}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onMouseEnter={handleDragStart}
      >
        <div className="progress" ref={progressBarRef}></div>
      </div>
      <audio
        ref={audioRef}
        src={playlist[currentSongIndex].src}
        onTimeUpdate={updateTime}
        onEnded={handleAudioEnd}
      />
    </div>
    </>
  );
}

export default MusicPanel;
