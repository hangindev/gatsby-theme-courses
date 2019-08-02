import 'typeface-oswald';
import 'typeface-pt-sans';
import Typography from 'typography';
import elkGlen from 'typography-theme-elk-glen';

elkGlen.overrideThemeStyles = () => ({
  a: {
    textShadow: `none`,
    backgroundImage: `none`,
  },
});

const typography = new Typography(elkGlen);

export default typography;
