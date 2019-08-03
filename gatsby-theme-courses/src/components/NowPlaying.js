import React from 'react';
import styled from 'styled-components';
import AutoplaySwitch from './AutoplaySwitch';

const Header = styled.div`
  margin-bottom: 0.5rem;
  .title {
    margin: 0;
  }
`;
const StyledAutoplaySwitch = styled(AutoplaySwitch)`
  position: absolute;
  top: 0;
  right: 1rem;
`;
function NowPlaying({ index, totalLength, title }) {
  return (
    <Header>
      <StyledAutoplaySwitch />
      <small>
        Now playing {index + 1}/{totalLength}
      </small>
      <h3 className="title">{title}</h3>
    </Header>
  );
}
export default NowPlaying;
