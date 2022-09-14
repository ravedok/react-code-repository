import styled from "styled-components";

type IconProps = {
  color: string;
};

export const MagnifyngGlassIcon = styled.span<IconProps>`
  position: relative;
  display: inline-block;
  height: 24px;
  width: 24px;

  &:before {
    content: "";
    position: absolute;
    top: 4px;
    left: 3px;
    border-radius: 100%;
    height: 9px;
    width: 9px;
    border: 2px solid ${({ color }) => color};
  }

  &:after {
    content: "";
    height: 2px;
    width: 9px;
    background: ${({ color }) => color};
    position: absolute;
    top: 17px;
    left: 12px;
    transform: rotate(45deg);
  }
`;
