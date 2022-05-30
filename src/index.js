import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import App from '~/App'
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";
import store from '~/redux'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1b4a6b'
		}
	},
	typography: {
		fontSize: 14,
	},
	overrides: {
		MuiInputBase: {
			root: {
				fontSize: '14px'
			}
		},
		MuiTextField: {
			root: {
				'&:focus': {
					outline: 'none'
				}
			}
		},
		MuiOutlinedInput: {
			root: {
				'&$focused $notchedOutline': {
					borderWidth: 1,
				},
			}
		},
		MuiButton: {
			root: {
				borderRadius: 0,
				padding: '.5rem 2rem',
				textTransform: 'capitalize'
			},
		},
		MuiDialog: {
			paperScrollPaper: {
				borderRadius: 0,
				// padding: '3.125rem 2.75rem'
			}
		},
		MuiDialogTitle: {
			root: {
				padding: 0
			}
		},
		MuiSvgIcon: {
			root: {
				cursor: 'pointer'
			}
		},
		PrivateNotchedOutline: {
			root: {
				borderRadius: 0,
			}
		}
	}
})

const history = createBrowserHistory();
ReactDOM.render((
	<MuiThemeProvider theme={theme}>
		<Provider store={store} >
			<App history={history}/>
		</Provider>
	</MuiThemeProvider>
), document.getElementById('root'))
