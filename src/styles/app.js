import styled from "styled-components";

const StyledApp = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#000000e3, #000000e3), url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #ffffffe0;

  .search {
    max-width: 1224px;
    margin: 0 auto;
    padding: 40px 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 25px;
    row-gap: 25px;

    input {
      min-width: 240px;
      padding: 8px 12px;
      flex: 1;
      background: #ffffff2e;
      border: 0;
      border-radius: 4px;
      color: #ffffffb3;
      font-size: 1.6rem;

      &::placeholder {
        color: #ffffffb3;
      }
    }
    button {
      display: flex;
      align-items: center;
      column-gap: 5px;
      padding: 10px;
      background: #4b0082;
      border: 0;
      border-radius: 4px;
      color: #ffffffe0;
      font-size: 1.6rem;
      cursor: pointer;
    }
  }
  .home {
    max-width: 1224px;
    margin: 0 auto;
    padding: 0 15px;
    padding: 40px;
    text-align: center;

    .home__city {
      font-size: 3rem;
    }
    .home__inner-deg,
    .home__temp {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 20px;

      h1,
      i {
        font-size: 7.5rem;
        color: white;
      }
    }
    .home__temp {
      h2 {
        font-size: 2rem;
      }
    }
    .home__description {
      font-size: 2.4rem;
      text-transform: capitalize;
    }
    .home__info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      column-gap: 20px;
      row-gap: 20px;
      margin-top: 15px;

      p {
        font-size: 1.6rem;
      }
    }
  }
`;

export default StyledApp;
