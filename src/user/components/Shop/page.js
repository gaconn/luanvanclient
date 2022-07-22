

const PaginationShop = ({  current,totalPage, NewPerPage, paginate, pageLimit, Max, Min, handelNext, handelPrev }) => {

    const numberPage = []

    for (let i = 1; i < Math.ceil(totalPage / NewPerPage); i++) {
        numberPage.push(i)
    }
    const pageIncrement = null
    if (numberPage.length > Max) {
        pageIncrement = <a href="#" onClick={handelNext}> &hellip; </a>
    }
    const pageDecrement = null
    if (numberPage.length > Max) {
        pageDecrement = <a href="#" onClick={handelPrev}> &hellip; </a>
    }

    const renderPageNumber = numberPage.map((number) => {
        if (number < Max + 1 && number > Min) {
            return (<a href="#" key={number} onClick={() => { paginate(number) }} >{number}</a>)
        } else {
            return null
        }
    })
    return (
        <>
            <div className="product__pagination">
                <button  onClick={handelPrev} disabled={current==numberPage[0] ? true : false}> Trước &nbsp;</button>
                {pageDecrement}
                {renderPageNumber}
                {pageIncrement}
                <button  onClick={handelNext} disabled={current==numberPage[numberPage.length-1] ? true : false}> Sau </button>
            </div>
        </>
    );
}

export default PaginationShop;