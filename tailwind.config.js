const { spacing } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      spacing: {
        gutter: spacing[6]
      }
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    }
  }
}
