import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 123, 255, 0.4),
    rgba(0, 255, 128, 0.2)
  );
  z-index: -1;
`;

export default Overlay;
