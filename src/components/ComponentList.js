import React from 'react'

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody } from 'carbon-components-react'

export const ComponentList = (props) => {
    const {elements} = props

    return (
      <StructuredListWrapper
        ariaLabel="Structured list section"
        border={false}
        selection={false}
      >
        <StructuredListHead>
        <StructuredListRow
          head
          label={false}
          onKeyDown={function noRefCheck(){}}
          tabIndex={0}
        >
          <StructuredListCell
            head
            noWrap={false}
          >
            Componente
          </StructuredListCell>
          <StructuredListCell
            head
            noWrap={false}
          >
            Breve explicación
          </StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody onKeyDown={function noRefCheck(){}}>
      { elements.map((element, index) =>
        <StructuredListRow key={index}
          head={false}
          label={false}
          onKeyDown={function noRefCheck(){}}
          tabIndex={0}>
            <StructuredListCell
              head={false}
              noWrap>
              <a href={`#${element.url}`}>{element.name}</a>
            </StructuredListCell>
            <StructuredListCell
              head={false}
              noWrap={false}
            >
              {element.explanation}
            </StructuredListCell>
        </StructuredListRow>
      )
      }
    </StructuredListBody>
</StructuredListWrapper>
    )
}
