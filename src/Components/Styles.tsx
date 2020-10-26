import styled from 'styled-components'

type ButtonProps = {
  focus?: boolean;
};


export const Button = styled.button<ButtonProps>`
margin:3px;
border:${(props) => (props.focus ? "2px solid grey" : "2px solid black")};
font-size:16px;
min-width:40px;
border-radius:3px;
background: ${(props) => (props.focus ? "grey" : "white")};
&:active{
outline: none;
background: grey;
}
&:focus{
outline:none;
}
`

type SelectProps = {
  background?: string;
};


export const Select = styled.select<SelectProps>`
background: ${(props) => (props.background ? props.background : "white")};
border: 1px solid black;
border-radius:5px;
margin-right:10px;
font-size:16px;
padding:3px;
min-width:500px;
`
