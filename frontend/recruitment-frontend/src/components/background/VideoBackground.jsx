import styled from 'styled-components';

const DarkOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); 
    z-index: -1; 
`;

const VideoBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  background: black; 
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 56.25vw; 
  min-height: 100vh;
  min-width: 177.78vh; 
  pointer-events: none;
  border: none;

`;

const VideoBackground = () => {
  const videoUrl =
    "https://www.youtube.com/embed/j1s221CcwUU?autoplay=1&mute=1&loop=1&playlist=j1s221CcwUU&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&fs=0";

  return (
    <>
      <DarkOverlay/>
    <VideoBackgroundContainer>
      <VideoIframe
        src={videoUrl}
        allow="autoplay; encrypted-media"
        title="Background Video"
      />
    </VideoBackgroundContainer>
    </>
    
  );
};

export default VideoBackground;
