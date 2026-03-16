import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';

/**
 * Premium DataTable Component
 * 
 * @param {Array} columns - Array of column definitions with { field, header, render?, align?, width?, minWidth? }
 * @param {Array} data - Array of data objects
 * @param {Function} onRowClick - Optional row click handler
 * @param {String} emptyMessage - Message to show when no data
 * @param {Boolean} hover - Enable row hover effect (default: true)
 * @param {Number} elevation - Paper elevation (default: 0)
 * @param {Object} sx - Additional styling
 */
export function DataTable({
  columns = [],
  data = [],
  onRowClick,
  emptyMessage = 'No data available',
  hover = true,
  elevation = 0,
  sx = {},
}) {
  const hasData = data && data.length > 0;

  return (
    <TableContainer
      component={Paper}
      elevation={elevation}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Table>
        <TableHead
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#F8F9FA',
          }}
        >
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={column.field || index}
                align={column.align || 'left'}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  width: column.width,
                  minWidth: column.minWidth,
                  ...(column.headerSx || {}),
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hasData ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  ...(hover && {
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'scale(1.001)',
                    },
                  }),
                  '&:last-child td': {
                    borderBottom: 0,
                  },
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={column.field || colIndex}
                    align={column.align || 'left'}
                    sx={{
                      fontSize: '0.875rem',
                      ...(column.cellSx || {}),
                    }}
                  >
                    {column.render
                      ? column.render(row[column.field], row, rowIndex)
                      : row[column.field] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
