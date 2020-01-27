import styled from 'styled-components'
import { textFont } from '../constants/typography'

export const Button = styled.button`
  border-radius: 8px;
  font-family: ${textFont};
  font-size: 14px;
  padding: 10px 40px;
  color: #2a3031;
  cursor: pointer;
  &:active {
    background-color: #adb5bd;
  }
  ${({ primary }) =>
    primary &&
    `
    border: 1px solid #add9dc;
    background-color: #add9dc;
    color: #2a5d60;
    &:hover {
    background-color: #48a1a6;
    }
    &:active {
    background-color: #2a5d60;
    }
`}
  ${({ secondary }) =>
    secondary &&
    `
    border: 1px solid #99a6a8;
    background-color: white;
`}
`
