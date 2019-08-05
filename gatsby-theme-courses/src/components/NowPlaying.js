import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AutoplaySwitch from './AutoplaySwitch';

const Header = styled.div`
  margin-bottom: 0.5rem;
  > h3 {
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
        <AutoplaySwitch />
      </SwitchWrapper>
      <small>
        Now playing {index + 1}/{totalLength}
      </small>
      <h3>{title}</h3>
    </Header>
  );
}
NowPlaying.propTypes = {
  index: PropTypes.number.isRequired,
  totalLength: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
export default NowPlaying;
