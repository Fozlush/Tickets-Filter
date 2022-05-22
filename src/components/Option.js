function Option({data}){
    return (
        <option value={data}>{data === 'all' ? 'Все' : data}</option>
    )
}

export default Option