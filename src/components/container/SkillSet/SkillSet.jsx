import styled from 'styled-components';
import { useEffect, Fragment } from 'react';
// import PropTypes from 'prop-types';
import html5Logo from '@images/skill-set/html5.svg';
import css4Logo from '@images/skill-set/css4Logo.png';
import jsLogo from '@images/skill-set/js.svg';
import reactLogo from '@images/skill-set/reactLogo.svg';
// import reduxLogo from '@images/skill-set/redux.svg';
import vueLogo from '@images/skill-set/vue-js.svg';
import nodejsLogo from '@images/skill-set/nodejs.svg';
import meLogo from '@images/skill-set/me.svg';

const containerDimensions = {
  width: 400,
  height: 400
};

const logoDimensions = {
  size: 40
};

const Container = styled.svg`
  width: ${containerDimensions.width}px;
  height: ${containerDimensions.height}px;
  shape-rendering: geometricPrecision;
  text-rendering: optimizeLegibility;
  image-rendering: optimizeQuality;
`;

const TechnologyName = styled.text`
  fill: white;
  letter-spacing: 1px;
`;

const extraRadius = 15;

const IconBg = styled.circle`
  cx: ${logoDimensions.size / 2}px;
  cy: ${logoDimensions.size / 2}px;
  r: ${logoDimensions.size / 2 + extraRadius}px;
`;

const ColorStop = styled.stop`
  stop-color: ${({ $color }) => $color};
  stop-opacity: 1;
`;

const avatarWidth = 90;
const avatarHeight = (239.36 / 225) * avatarWidth;

const origin = {
  x: containerDimensions.width / 2,
  y: containerDimensions.height / 2
};

const Avatar = styled.image`
  width: ${avatarWidth}px;
  height: ${avatarHeight}px;
  transform: translate3d(
    ${origin.x - avatarWidth / 2}px,
    ${origin.y - avatarHeight / 2}px,
    0px
  );
`;

const LogoConnector = styled.path`
  stroke-width: 4;
  stroke: black;
  stroke-dasharray: ${({ $connectorLength }) =>
    `${$connectorLength} ${$connectorLength}`};
  stroke-dashoffset: ${({ $strokeDashOffset }) => $strokeDashOffset};
`;

const getPositionAndStyle = (index, length) => {
  const angleAdjustment = -30;
  const angle = (360 * index) / length + angleAdjustment;
  const buffer = 20;
  const [x1, y1, r] = [
    origin.x,
    origin.y,
    containerDimensions.height / 2 - logoDimensions.size / 2 - buffer
  ];
  const x =
    x1 + r * Math.cos((angle * Math.PI) / 180) - logoDimensions.size / 2;
  const y =
    y1 + r * Math.sin((angle * Math.PI) / 180) - logoDimensions.size / 2;
  return [
    {
      transform: `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0px)`
    },
    { x: x + logoDimensions.size / 2, y: y + logoDimensions.size / 2 }
  ];
};

const technologies = [
  { name: 'Node', icon: nodejsLogo },
  { name: 'Css 4', icon: css4Logo },
  { name: 'Vue', icon: vueLogo },
  { name: 'JS', icon: jsLogo },
  // { name: 'redux', icon: reduxLogo },
  { name: 'Html 5', icon: html5Logo },
  { name: 'React', icon: reactLogo }
].map((technology, index, list) => {
  const [style, logoOrigin] = getPositionAndStyle(index, list.length);
  return {
    ...technology,
    style,
    origin: logoOrigin
  };
});

const SkillSet = () => {
  useEffect(() => {}, []);
  return (
    <Container
      viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
    >
      <defs>
        <linearGradient id="icon-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <ColorStop offset="0%" $color="#12c2e9" />
          <ColorStop offset="50%" $color="#c471ed" />
          <ColorStop offset="100%" $color="#f64f59" />
        </linearGradient>
      </defs>
      {technologies.map((technology, index, list) => {
        const {
          origin: { x, y }
        } = technology;
        const { x: nextX, y: nextY } = list[(index + 1) % list.length].origin;
        const connector1Length = Math.sqrt(
          (x - origin.x) ** 2 + (y - origin.y) ** 2
        );
        const connector2Length = Math.sqrt((x - nextX) ** 2 + (y - nextY) ** 2);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <LogoConnector
              d={`M${origin.x},${origin.y} L${x},${y}`}
              $strokeDashOffset="0"
              $connectorLength={connector1Length}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`0;-${connector1Length}`}
                dur="3s"
                repeatCount="1"
                fill="freeze"
              />
            </LogoConnector>
            <LogoConnector
              d={`M${x},${y} L${nextX},${nextY}`}
              $strokeDashOffset={connector2Length}
              $connectorLength={connector2Length}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`${connector2Length};0`}
                dur="3s"
                repeatCount="1"
                fill="freeze"
              />
            </LogoConnector>
          </Fragment>
        );
      })}
      {technologies.map((technology, index) => {
        const { style, name } = technology;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <g style={style}>
              <IconBg fill="url(#icon-bg)" />
              <TechnologyName
                x={logoDimensions.size / 2}
                y={logoDimensions.size / 2 + 4}
                textAnchor="middle"
              >
                {name}
              </TechnologyName>
            </g>
          </Fragment>
        );
      })}
      <Avatar href={meLogo} />
    </Container>
  );
};

export default SkillSet;
