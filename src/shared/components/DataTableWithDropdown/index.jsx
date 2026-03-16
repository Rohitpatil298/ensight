import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Box,
  Typography,
  IconButton,
  Collapse,
  alpha,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

/**
 * Expandable Row Component
 */
function ExpandableRow({ row, columns, renderExpandedContent, onRowClick }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        onClick={() => onRowClick?.(row)}
        sx={{
          cursor: onRowClick ? 'pointer' : 'default',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          },
          transition: 'all 0.2s',
        }}
      >
        <TableCell sx={{ width: 60 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            sx={{
              bgcolor: (theme) => open ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              },
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {columns.map((column, index) => (
          <TableCell
            key={column.field || index}
            align={column.align || 'left'}
            sx={{
              fontSize: '0.875rem',
              ...(column.cellSx || {}),
            }}
          >
            {column.render
              ? column.render(row[column.field], row)
              : row[column.field] || '-'}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 3,
                p: 3.5,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                borderRadius: 3,
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
              }}
            >
              {renderExpandedContent(row)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

/**
 * DataTable with Dropdown/Expandable Rows
 * 
 * @param {Array} columns - Array of column definitions { field, header, render?, align?, headerSx?, cellSx? }
 * @param {Array} data - Array of data objects
 * @param {Function} renderExpandedContent - Function that returns JSX for expanded content (row) => JSX
 * @param {Function} onRowClick - Optional row click handler
 * @param {String} emptyMessage - Message when no data
 * @param {Boolean} showFooter - Show pagination footer (default: true)
 * @param {String} footerText - Custom footer text
 * @param {Object} sx - Additional styling for the Card container
 */
export function DataTableWithDropdown({
  columns = [],
  data = [],
  renderExpandedContent,
  onRowClick,
  emptyMessage = 'No data available',
  showFooter = true,
  footerText,
  sx = {},
}) {
  const hasData = data && data.length > 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <TableCell sx={{ width: 60 }} />
              {columns.map((column, index) => (
                <TableCell
                  key={column.field || index}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
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
              data.map((row, index) => (
                <ExpandableRow
                  key={row.id || index}
                  row={row}
                  columns={columns}
                  renderExpandedContent={renderExpandedContent}
                  onRowClick={onRowClick}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 8 }}>
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

      {/* Table Footer */}
      {showFooter && hasData && (
        <Box
          sx={{
            p: 2.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {footerText || `Showing 1 to ${data.length} of ${data.length} entries`}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
