import { createGlobalStyle } from 'styled-components';

export type Spacing = 'tiny' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export const GlobalStyle = createGlobalStyle`
:root {
  --primary-color: #00632e;
  --secondary-color: #f68d20;
  --default-font-size: 16px;
  --default-font-color: #444;

  --spacing-tiny: 0.25rem; /* 4 */
  --spacing-small: 0.5rem; /* 8 */
  --spacing-medium: 1rem; /* 16 */
  --spacing-large: 1.5rem; /* 24 */
  --spacing-x-large: 2rem; /* 32 */
  --spacing-xx-large: 2.5rem; /* 40 */
}

html,
body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  color: var(--default-font-color);
  font-size: var(--default-font-size);
  line-height: 1.2em;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  clear: both;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f2f2f2;
}

* {
  box-sizing: border-box;
}

strong,
.bold {
  font-weight: 700;
  line-height: inherit;
}

.thin {
  font-weight: 100;
}

.color-default {
  color: var(--default-font-color);
}

.color-primary {
  color: var(--primary-color) !important;
}

.color-secondary {
  color: var(--secondary-color) !important;
}

.inherit-color {
  color: inherit;
}

.white-text {
  color: #fff !important;
}
`;
