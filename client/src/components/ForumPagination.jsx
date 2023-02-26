

const ForumPagination = (props) => {
    const pageNumbers = [];
    for(let i = 1; i <= props.maxPage; i++) {
        pageNumbers.push(i);
    }
    const buttonStyle = {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        border: '1px solid black',
        borderRadius: '5px',
        textAlign: 'center',
        lineHeight: '30px',
        cursor: 'pointer'
    }
    const pageButtons = pageNumbers.map((number) => {
        return (
            <div style={buttonStyle} key={number} onClick={() => props.changePage(number)}>
                {number}
            </div>
        )
    })
  return (
    <div>
      {pageButtons}
    </div>
  )
}

export default ForumPagination
