import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableRow, TableCell, TableFooter } from '@material-ui/core'

export const StyledTableHead = withStyles(theme => ({
	root: {
		"backgroundColor": "rgb(246, 249, 250)",
		"color": "#3a3b3f",
		"padding": "12px",
		"opacity": "0.8",
		"borderRadius": "1px",
		"boxShadow": "0 1px 3px 2px rgba(96, 148, 177, 0.26)",
		"border": "solid 0 #6094b1",
	}
}))(TableHead)

export const StyledTableRow = withStyles(theme => ({
	root: {
		"backgroundColor": "#FFFFFF",
		"cursor": "pointer",
		"color": "#3a3b3f",
		"padding": "12px",
		"opacity": "0.8",
		"borderRadius": "1px",
		"boxShadow": "0 1px 3px 2px rgba(96, 148, 177, 0.26)",
		"border": "solid 0 #6094b1",
	}
}))(TableRow)

export const StyledTableFooter = withStyles(theme => ({
	root: {
		"backgroundColor": "rgb(246, 249, 250)",
		"color": "#3a3b3f",
		"opacity": "0.5",
		"borderRadius": "1px",
		"boxShadow": "0 1px 3px 2px rgba(96, 148, 177, 0.26)",
		"border": "solid 0 #6094b1",
	}
}))(TableFooter)

export const StyledTableCell = withStyles(theme => ({
	head: {
		"fontSize": 14,
	},
	body: {
		"fontSize": 14,
	},
}))(TableCell)