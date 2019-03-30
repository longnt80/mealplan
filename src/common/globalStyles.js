// Global styles for the whole app
export default {
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
      fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      '& #root': {
        height: '100%'
      }
    },
  }
}
