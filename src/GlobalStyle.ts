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
    --color-alt2: #666;
    --color-alt3: #999;
    --bg-color: #111111;
    --bg-color-alt: #222222;
    --border-style: 1px solid #666;
    --border-style-alt: 1px solid white;
    --fs-xxsm: min(calc(0 + 1.5vh), 0.75rem);
    --fs-xsm: min(calc(0.25vw + 2vh), 1.1rem);
    --fs-sm: min(calc(0.5vw + 2.25vh), 1.5rem);
    --fs-med: min(calc(0.75vw + 2.5vh), 2rem);
    --fs-lge: min(calc(1vw + 2.75vh), 2.5rem);
    --media-mobile: 315px;

  }

  body,
  html, input,textarea {
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
    min-width: 33vw;
    min-height: 100vh;
    color: var(--color);
    background: var(--bg-color);
    font-weight: 700;
    overflow: hidden;
  }
`
export default GlobalStyle
