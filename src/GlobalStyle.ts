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

  body,
  html {
    font-size: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  *,
  *:after,
  *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    font-family: "Lato", serif, Calibri, Arial;
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    
    color: #656c6d;
    background: #efe9e9;
    font-size: 0.9em;
    font-weight: 400;
  }
  .second-font {
  font-family: "Lato", sans-serif;
  }

  .p-none {
    padding: 0 !important;
  }

  .m-none {
    margin: 0 !important;
  }

  .mb-0 {
    margin-bottom: 0 !important;
  }

  .btn {
    font-family: "Lato", sans-serif, Calibri, Arial;
    box-shadow: none;
    border-radius: 0;
    font-weight: 600;
    height: 42px;
  }

  .btn i {
    font-size: 14px;
    padding-left: 8px;
  }

  .btn:hover {
    box-shadow: none;
    color: #eee;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .font-weight-300 {
    font-weight: 300;
  }

  .font-weight-400 {
    font-weight: 400;
  }

  .font-weight-500 {
    font-weight: 500;
  }

  .font-weight-600 {
    font-weight: 600;
  }

  .font-weight-700 {
    font-weight: 700;
  }

  .font-weight-900 {
    font-weight: 900;
  }

  .wrapper {
    overflow: hidden;
  }

  .section-padding {
    padding: 0 24px !important;
  }
  .section-padding.section-padding-right-none {
    padding-right: 0 !important;
  }

  .container {
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
  }

  @media only screen and (min-width: 601px) {
    .blog .container {
      width: 95%;
    }
  }

  @media only screen and (min-width: 993px) {
    .blog .container {
      width: 95%;
    }
  }

  @media only screen and (min-width: 1199px) {
    .blog .container {
      width: 1170px;
    }
  }

  .d-inline-block {
    display: inline-block;
  }

  .main-picture {
    background-image: url(https://warricksmith.com/images/warrick.jpg);
    padding: 0;
    margin-top: 24px;
    margin-left: 24px;
    height: calc(100vh - 48px);
    background-size: cover;
    background-position: center center;
    width: calc(33.3333333333% - 48px);
  }
`
export default GlobalStyle
