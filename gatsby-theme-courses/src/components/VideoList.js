import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import durationInText from '../utils/durationInText';
import { useAppValue } from '../context/AppContext';
import { usePageValue } from '../context/PageContext';

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 340px;
  overflow-y: auto;
  li {
    margin: 0;
    border: 1px solid #e7e7e7;
    border-bottom: none;
    &:last-child {
      border-bottom: 1px solid #e7e7e7;
    }
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  p.lessonTitle {
    transition: all 200ms;
    border-left: 4px solid #e7e7e7;
    &[data-watched='true'] {
      border-left: 4px solid ${({ theme }) => theme.colors.primary500};
    }
  }
`;
const Duration = styled.small`
  margin-left: 0.5em;
  border-radius: 1px;
  padding: 0.2em 0.4em;
  background: #efefef;
  color: ${({ theme }) => theme.colors.grey500};
`;
function VideoList({ className }) {
  const [{ watched }] = useAppValue();
  const { currentCourse } = usePageValue();
  const { lessons } = currentCourse;
  return (
    <List className={className}>
      {/* TODO: creating skeleton */}
      {lessons &&
        lessons.map((lesson, index) => {
          const lessonWatched = !!watched[lesson.id];
          return (
            <li key={lesson.slug}>
              <Link to={lesson.slug}>
                <ListItem>
                  <p>{index + 1}</p>
                  <p className="lessonTitle" data-watched={lessonWatched}>
                    {lessonWatched ? '✓ ' : ''}
                    {lesson.title}
                    <Duration>{durationInText(lesson.duration)}</Duration>{' '}
                  </p>
                </ListItem>
              </Link>
            </li>
          );
        })}
    </List>
  );
}

export default VideoList;
