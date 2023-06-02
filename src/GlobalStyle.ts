import {
  createGlobalStyle,
  GlobalStyleComponent,
  DefaultTheme,
} from 'styled-components'

type ThemedGlobalStyledClassProps = {
  theme: DefaultTheme
}

type OptionalProps = {
  [key: string]: any
}

type GlobalStyleProps = ThemedGlobalStyledClassProps & OptionalProps

const GlobalStyle: GlobalStyleComponent<
  GlobalStyleProps,
  DefaultTheme
> = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: black;
    background-color: lightyellow;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
   a {
    font-weight: 500;
    color: blue;
    text-decoration: inherit;
  }
  a:hover {
    color: blue;
  }
   body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }
   h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
   button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }   
`
export default GlobalStyle
