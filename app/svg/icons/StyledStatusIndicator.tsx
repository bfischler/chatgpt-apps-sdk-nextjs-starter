import styled, { css, keyframes } from 'styled-components';

import { FC } from '@/domain/FC';

type StatusIndicatorStatus = 'on' | 'off';

export type StatusIndicatorProps = {
  size?: number;
  status: StatusIndicatorStatus;
};

const StatusIndicator: FC<StatusIndicatorProps> = ({ size = 8, status = 'on' }) => {
  return <StyledStatusIndicator size={size} status={status} />;
};

const StyledStatusIndicator = styled.div<StatusIndicatorProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  animation: ${(props) =>
    props.status === 'on'
      ? css`
          ${blink} 500ms ease-in-out infinite alternate
        `
      : 'none'};
`;

const blink = keyframes`
  from {
    background: #0A9E5C;
  }

  to {
    background: #71DC95;
  }
`;

export default StatusIndicator;
