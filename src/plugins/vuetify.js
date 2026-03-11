import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#FFD90F',
          secondary: '#5DA9E9',
          accent: '#F77F00',
          error: '#D62828',
          info: '#4CC9F0',
          success: '#2A9D8F',
          warning: '#F4A261',
        },
      },
    },
  },
})