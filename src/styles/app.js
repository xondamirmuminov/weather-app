import styled from "styled-components";

const StyledApp = styled.section`
  height: 100vh;
  background: linear-gradient(#000000a8, #000000a8), url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
`;

export default StyledApp;
