import styled, { keyframes, css } from 'styled-components';
import { useEffect, Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import html5Logo from '@images/skill-set/html.svg';
// import css4Logo from '@images/skill-set/css.svg';
// import jsLogo from '@images/skill-set/js.svg';
// import reactLogo from '@images/skill-set/react.svg';
// import reduxLogo from '@images/skill-set/redux.svg';
// import vueLogo from '@images/skill-set/vue-js.svg';
// import nodejsLogo from '@images/skill-set/node-js.svg';
import meLogo from '@images/skill-set/me.svg';
import HtmlLogo from './TechNames/Html';
import CssLogo from './TechNames/Css';
import JsLogo from './TechNames/Js';
import NodeLogo from './TechNames/Node';
import ReactLogo from './TechNames/React';
import VueLogo from './TechNames/Vue';

const containerDimensions = {
  width: 400,
  height: 600
};

const logoDimensions = {
  size: 40
};

const flicker = keyframes`
  0%    { opacity: 1; }
  3%    { opacity: 0.4; }
  6%    { opacity: 1; }
  7%    { opacity: 0.4; }
  8%    { opacity: 1; }
  9%    { opacity: 0.4; }
  10%   { opacity: 1; }
  89%   { opacity: 1; }
  90%   { opacity: 0.4; }
  100%  { opacity: 0.4; }
`;

const Container = styled.svg`
  width: ${containerDimensions.width}px;
  height: ${containerDimensions.height}px;
  /* shape-rendering: geometricPrecision;
  text-rendering: optimizeLegibility;
  image-rendering: optimizeQuality; */
`;

const TechnologyName = styled.svg`
  animation: ${({ $animation }) => $animation};
  opacity: ${({ $opacity }) => $opacity};
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
  stroke-width: 2;
  stroke: #ccc;
  stroke-dasharray: ${({ $connectorLength }) =>
    `${$connectorLength} ${$connectorLength}`};
  stroke-dashoffset: ${({ $strokeDashOffset }) => $strokeDashOffset};
  fill: none;
`;

const getPositionAndStyle = (index, length) => {
  const angleAdjustment = -360 / (length * 2);
  const angle = (360 * index) / length + angleAdjustment;
  const buffer = 20;
  const [x1, y1, r] = [
    origin.x,
    origin.y,
    Math.min(containerDimensions.width, containerDimensions.height) / 2 -
      logoDimensions.size / 2 -
      buffer
  ];
  const x =
    x1 + r * Math.cos((angle * Math.PI) / 180) - logoDimensions.size / 2;
  const y =
    y1 + r * Math.sin((angle * Math.PI) / 180) - logoDimensions.size / 2;
  return [
    {
      x: `${x.toFixed(3)}px`,
      y: `${y.toFixed(3)}px`
    },
    { x: x + logoDimensions.size / 2, y: y + logoDimensions.size / 2 }
  ];
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const logoConnectorAnimDur = 3;

const technologies = [
  { name: 'Node', icon: NodeLogo },
  { name: 'Css 4', icon: CssLogo },
  { name: 'Vue', icon: VueLogo },
  { name: 'JS', icon: JsLogo },
  // { name: 'redux', icon: reduxLogo },
  { name: 'Html 5', icon: HtmlLogo },
  { name: 'React', icon: ReactLogo }
].map((technology, index, list) => {
  const [style, logoOrigin] = getPositionAndStyle(index, list.length);
  const isDefective = Math.round(Math.random()) === 1;
  const animationDuration = getRandom(4, 9);
  let animationDelay = getRandom(4, 8);
  animationDelay =
    animationDelay <= logoConnectorAnimDur
      ? animationDelay + logoConnectorAnimDur
      : animationDelay;
  return {
    ...technology,
    style,
    origin: logoOrigin,
    isDefective,
    animation: css`${flicker} ${animationDuration}s infinite ${animationDelay}s step-end`
  };
});

const connectorHalfLength = (() => {
  const { x, y } = technologies[0].origin;
  const { x: nextX, y: nextY } = technologies[1].origin;
  return (
    (
      Math.sqrt((x - origin.x) ** 2 + (y - origin.y) ** 2) +
      Math.sqrt((x - nextX) ** 2 + (y - nextY) ** 2)
    ).toFixed(2) / 2
  );
})();

const Logo = ({ technology }) => {
  const nameSize = 16;
  const nameRef = useRef();
  const [nameWidth, setNameWidth] = useState(0);
  useEffect(() => {
    const { width } = nameRef.current.getBoundingClientRect();
    setNameWidth(width);
  }, []);
  const {
    style: { x, y },
    icon,
    animation,
    isDefective
  } = technology;
  return (
    <g style={{ transform: `translate(${x}, ${y})` }}>
      <IconBg stroke="url(#icon-bg)" />
      <TechnologyName
        filter="url(#glow)"
        $opacity="0.4"
        as={icon}
        fill="white"
        height={`${nameSize}px`}
        y={`calc(${y} + ${nameSize / 2}px)`}
        x={`calc(-50% + ${nameWidth / 2}px + ${x})`}
        style={{ visibility: nameWidth ? 'visible' : 'hidden' }}
      />
      <TechnologyName
        ref={nameRef}
        $opacity={!isDefective ? 1 : 0}
        $animation={isDefective ? animation : ''}
        as={icon}
        fill="white"
        height={`${nameSize}px`}
        y={`calc(${y} + ${nameSize / 2}px)`}
        x={`calc(-50% + ${nameWidth / 2}px + ${x})`}
        style={{ visibility: nameWidth ? 'visible' : 'hidden' }}
      />
    </g>
  );
};

Logo.propTypes = {
  technology: PropTypes.objectOf(PropTypes.any).isRequired
};

const SkillSet = () => {
  useEffect(() => {}, []);
  if (typeof window === 'undefined') return null;
  return (
    <Container
      viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="icon-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <ColorStop offset="0%" $color="#12c2e9" />
          <ColorStop offset="50%" $color="#c471ed" />
          <ColorStop offset="100%" $color="#f64f59" />
        </linearGradient>
        <filter
          id="glow"
          width="200%"
          height="300%"
          x="-50%"
          y="-100%"
          filterUnits="objectBoundingBox"
        >
          <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter2" />
          <feGaussianBlur
            in="shadowOffsetOuter2"
            result="shadowBlurOuter2"
            stdDeviation="7"
          />
          <feColorMatrix
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"
          />
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter3" />
          <feGaussianBlur
            in="shadowOffsetOuter3"
            result="shadowBlurOuter3"
            stdDeviation="10"
          />
          <feColorMatrix
            in="shadowBlurOuter3"
            result="shadowMatrixOuter3"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
          />
          <feOffset
            dx="2"
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter4"
          />
          <feGaussianBlur
            in="shadowOffsetOuter4"
            result="shadowBlurOuter4"
            stdDeviation="1"
          />
          <feColorMatrix
            in="shadowBlurOuter4"
            result="shadowMatrixOuter4"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.69678442 0"
          />
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter5" />
          <feGaussianBlur
            in="shadowOffsetOuter5"
            result="shadowBlurOuter5"
            stdDeviation="8"
          />
          <feColorMatrix
            in="shadowBlurOuter5"
            result="shadowMatrixOuter5"
            values="0 0 0 0 0.314369351 0 0 0 0 0.8883757 0 0 0 0 0.759899616 0 0 0 0.649371603 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="shadowMatrixOuter2" />
            <feMergeNode in="shadowMatrixOuter3" />
            <feMergeNode in="shadowMatrixOuter4" />
            <feMergeNode in="shadowMatrixOuter5" />
          </feMerge>
        </filter>
      </defs>
      {technologies.map((technology, index, list) => {
        const {
          origin: { x, y }
        } = technology;
        const { x: nextX, y: nextY } = list[(index + 1) % list.length].origin;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <LogoConnector
              d={`m${origin.x},${origin.y} l${x - origin.x},${y - origin.y} l${
                nextX - x
              },${nextY - y}`}
              $strokeDashOffset="0"
              $connectorLength={connectorHalfLength}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`0;-${connectorHalfLength}`}
                dur={`${logoConnectorAnimDur}s`}
                repeatCount="1"
                fill="freeze"
              />
            </LogoConnector>
          </Fragment>
        );
      })}
      {technologies.map((technology, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Logo technology={technology} key={index} />;
      })}
      <Avatar href={meLogo} />
    </Container>
  );
};

export default SkillSet;
