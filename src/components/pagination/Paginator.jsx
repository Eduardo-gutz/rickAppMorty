import './Paginator.css'
import { Stack, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'

const Paginator = ({ totalItems, itemsPerPage, changePage, currentpage }) => {
    const [pages, setPages] = useState(0)

    useEffect(() => {
        const pages = Math.ceil(totalItems / itemsPerPage)
        setPages(pages)
    }, [itemsPerPage, totalItems])

    return (
        <Stack spacing={2} sx={{ marginTop: '1rem' }}>
            <Pagination
                count={pages}
                variant="outlined"
                shape="rounded"
                color='secondary'
                sx={{ margin: 'auto'}}
                className='pagination'
                onChange={(_, page) => changePage(page)}
                page={currentpage}
            />
        </Stack>
    )
}

export default Paginator;