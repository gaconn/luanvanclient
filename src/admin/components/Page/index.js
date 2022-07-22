import { useEffect, useState } from "react";
import { Spinner, Pagination } from "react-bootstrap"


const Page = ({page, onClickPage}) => {


    return (
        <Pagination className="justify-content-center">
            {
                page.now > 2 &&
                <>
                    <Pagination.Item onClick={onClickPage}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>
            }

            {page.prev && <Pagination.Item onClick={onClickPage}>{page.prev}</Pagination.Item>}
            <Pagination.Item active>{page.now}</Pagination.Item>
            {page.next && <Pagination.Item onClick={onClickPage}>{page.next}</Pagination.Item>}

            {
                page.next && page.next*10 < page.rowCount &&
                <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={onClickPage}>{Math.ceil(page.rowCount/10)}</Pagination.Item>
                </>
            }
        </Pagination>
    )
}

export default Page