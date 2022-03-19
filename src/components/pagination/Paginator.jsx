import './Paginator.css'
import { Stack, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'

/**
 * Paginator component
 * @param { number } totalItems Total number of items
 * @param { number } itemsPerPage Number of items that will be shown for each page
 * @param { function } changePage function that executes in each change of page
 * @param { number } currentpage
 * @returns React Component
 */
const Paginator = ({ totalItems, itemsPerPage, changePage, currentpage }) => {
  const [pages, setPages] = useState(0)

  useEffect(() => {
    // Calculate the number of pages
    const pages = Math.ceil(totalItems / itemsPerPage)
    setPages(pages)
  }, [itemsPerPage, totalItems])

  return (
    <Stack spacing={2} sx={{ marginTop: '1rem' }}>
      <Pagination
        count={pages}
        variant='outlined'
        shape='rounded'
        color='secondary'
        sx={{ margin: 'auto' }}
        className='pagination'
        onChange={(_, page) => changePage(page)}
        page={currentpage}
      />
    </Stack>
  )
}

export default Paginator
