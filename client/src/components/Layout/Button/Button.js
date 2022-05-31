import styled from 'styled-components'

export const Button = styled.button`
  border:0.05rem solid;
  text-transform:capitalize;
  font-size:1.4rem;
  background:transparent;
  border-radius:0.5rem;
  margin:0.2rem 0.5rem 0.2rem 0;
  transition:all 0.5s ease-in-out;
  padding:0.2rem 0.5rem;
  cursor:pointer;
  &:hover
  {
    background: lightblue;
    color: blue
  }
`