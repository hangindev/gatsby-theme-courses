import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { durationInLongText } from '../utils';

const LoadableLike = loadable(() => import('./Like'));

const BORDER_RADIUS = '5px';
const CardWrapper = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  flex-grow: 0;
  ${({ theme }) => `
    ${theme.media.tablet} {
      flex-basis: 50%;
      max-width: 50%;
    }
    ${theme.media.desktop} {
      flex-basis: 33.33%;
      max-width: 33.33%;
    }
  `}
`;
const Card = styled.div`
  position: relative;
  background: white;
  margin: 0.75rem;
  border-radius: ${BORDER_RADIUS};
  min-width: 0;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;
const CardContent = styled.div`
  padding: 1rem;
  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    line-height: 1.2;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey700};
  }
`;
const ImgWrapper = styled.div`
  border-top-left-radius: ${BORDER_RADIUS};
  border-top-right-radius: ${BORDER_RADIUS};
  padding-bottom: 56.25%;
  position: relative;
`;
const StyledImg = styled(Img)`
  border-top-left-radius: ${BORDER_RADIUS};
  border-top-right-radius: ${BORDER_RADIUS};
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const LikeWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

const CoursePreview = ({
  id,
  title,
  slug,
  lastUpdated,
  coverImage,
  lessons,
  className,
}) => {
  const totalDuration = durationInLongText(
    lessons.reduce((pv, cv) => pv + cv.duration, 0)
  );
  return (
    <CardWrapper className={className}>
      <Card>
        <Link to={slug}>
          <ImgWrapper>
            <StyledImg fluid={coverImage.childImageSharp.fluid} alt={title} />
          </ImgWrapper>
          <CardContent>
            <small>Last updated: {lastUpdated}</small>
            <h3>{title}</h3>
            <p>
              {lessons.length} Lessons | Total: {totalDuration}
            </p>
          </CardContent>
        </Link>
        <LikeWrapper>
          <LoadableLike id={id} />
        </LikeWrapper>
      </Card>
    </CardWrapper>
  );
};

export default CoursePreview;
