// Design tokens — always import from here instead of writing magic values inline.

export const colors = {
  black:      '#000000',
  white:      '#ffffff',
  yellow:     '#fdf108',  // brand accent / loader background
  textMuted:  'rgba(255,255,255,0.85)',
  overlay:    'rgba(255,255,255,0.05)',
  backdrop:   'rgba(0,0,0,0.75)',
}

export const fonts = {
  body:         'var(--font-archivo), sans-serif',
  heading:      'var(--font-rational), sans-serif',
  headingLight: 'var(--font-rational-light), sans-serif',
}

export const zIndex = {
  loader: 100,
  nav:    50,
  modal:  200,
}
