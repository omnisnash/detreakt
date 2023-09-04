import Grid from "./components/Grid";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Aspect = styled.div`
  aspect-ratio: 1/1;
  margin: auto;
  max-height: 95vh;
  min-height: 0;
  container-type: size;
  padding: 0.75rem;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
`
const Footer = styled.footer`
  font-size: 0.8rem;
  padding: 4px 0;
  text-align: right;
  color: #dedede;

  a {

    color: grey;
    text-decoration: none;

    &:hover {
      color: var(--primary-color);
    }
  }
`

function App() {
    return (
        <MainContainer>
            <Aspect>
                <Grid/>
                <Footer>
                    <a target={'_blank'} rel={'noopener noreferrer'}
                       href={"https://www.gigamic.com/jeux-de-voyage/511-detrak-3421271117919.html"}>Détrack, a game by
                        gicamic</a> //// <a target={'_blank'} rel={'noopener noreferrer'} href={""}>GitHub</a>
                </Footer>
            </Aspect>
        </MainContainer>
    )
}

export default App
