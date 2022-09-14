import styled from "styled-components";

type IconProps = {
  color: string;
};

export const TimesIcon = styled.span<IconProps>`
  position: relative;
  display: inline-block;
  height: 24px;
  width: 24px;

  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0px;
    border-top: 2px solid ${({ color }) => color};
    width: 24px;
  }

  &:after {
    transform: rotate(45deg);
  }

  &:before {
    transform: rotate(-45deg);
  }
`;
