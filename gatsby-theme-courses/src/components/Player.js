import React from 'react';
import ResponsiveEmbed from 'react-responsive-embed';

function Player({ id, ...props }) {
  return (
    <ResponsiveEmbed
      allowFullScreen
      ratio="16:9"
      src={`https://www.youtube.com/embed/${id}`}
      {...props}
    />
  );
}

export default Player;
