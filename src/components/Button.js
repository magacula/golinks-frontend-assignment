import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-color: #21262d;
  color: #c9d1d9;
  transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-property: color, background-color, border-color;
  user-select: none;
  border: 1px #f0f6fc1a solid;
  border-radius: 6px;

  &:hover {
    background-color: #30363d;
    border: 1px #8b949e solid;
    transition-duration: 0.1s;
  }
`;

export const Button = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
