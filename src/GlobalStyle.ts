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
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    --color: white;
    --color-alt: #ffb400;
    --bg-color: black;
    --bg-color-alt: darkgrey;
  }

  body,
  html {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    padding: 0;
    margin: 0;
  }

  *,
  *:after,
  *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    color: var(--color);
    background: var(--bg-color);
  }
`
export default GlobalStyle
