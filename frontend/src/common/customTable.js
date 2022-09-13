import { TableCell, TableRow, withStyles } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgb(243, 244, 246)',
    color: 'rgb(55, 65, 81)',
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export { StyledTableCell, StyledTableRow }
