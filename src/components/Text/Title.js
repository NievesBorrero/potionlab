import styled from 'styled-components'

import { titleFont } from '../../constants/typography'

export const Title = styled.p`
  height: 36px;
  font-family: ${titleFont};
  font-size: 24.1px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${props => props.color};
`
