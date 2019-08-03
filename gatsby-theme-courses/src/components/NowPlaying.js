import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';

const LoadableAutoplaySwitch = loadable(() => import('./AutoplaySwitch'));

const Header = styled.div`
  margin-bottom: 0.5rem;
  .title {
    margin: 0;
  }
`;

const SwitchWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
`;

function NowPlaying({ index, totalLength, title }) {
  return (
    <Header>
      <SwitchWrapper>
        <LoadableAutoplaySwitch />
      </SwitchWrapper>
      <small>
        Now playing {index + 1}/{totalLength}
      </small>
      <h3 className="title">{title}</h3>
    </Header>
  );
}
export default NowPlaying;
