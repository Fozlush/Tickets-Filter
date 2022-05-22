import module from './panel.module.scss'
import Option from './Option'

function Panel({settingsFilter, selectSettings, airCompany}) {
    function sortChange(e){
        const target = e.target
        const name = target.name
        const value = target.value
        selectSettings(name, value)
    }
	return (
		<div className={module.panel}>
            <div className={module.filterBlock}>
                <span className={module.filterTitle}>Сортировать</span>
                <div className={module.filterChooze}>
                    <input id='sortInput1' type='radio' name='sort' value='priceUp' onChange={sortChange} checked={settingsFilter.sort == 'priceUp'}/>
                    <label htmlFor='sortInput1'>- по возрастанию цены</label>
                </div>
                <div className={module.filterChooze}>
                    <input id='sortInput2' type='radio' name='sort' value='priceDown' onChange={sortChange} checked={settingsFilter.sort == 'priceDown'}/>
                    <label htmlFor='sortInput2'>- по убыванию цены</label>
                </div>
                <div className={module.filterChooze}>
                    <input id='sortInput3' type='radio' name='sort' value='duration' onChange={sortChange} checked={settingsFilter.sort == 'duration'}/>
                    <label htmlFor='sortInput3'>- по времени в пути</label>
                </div>
            </div>
            <div className={module.filterBlock}>
                <span className={module.filterTitle}>Фильтровать</span>
                <div className={module.filterChooze}>
                    <input id='filterInput1' type='radio' name='transfer' value='all' onChange={sortChange} checked={settingsFilter.transfer == 'all'}/>
                    <label htmlFor='filterInput1'>- Все</label>
                </div>
                <div className={module.filterChooze}>
                    <input id='filterInput2' type='radio' name='transfer' value='1' onChange={sortChange} checked={settingsFilter.transfer == '1'}/>
                    <label htmlFor='filterInput2'>- 1 пересадка</label>
                </div>
                <div className={module.filterChooze}>
                    <input id='filterInput3' type='radio' name='transfer' value='none' onChange={sortChange} checked={settingsFilter.transfer == 'none'}/>
                    <label htmlFor='filterInput3'>- без пересадок</label>
                </div>
            </div>
            <div className={module.filterBlock}>
                <span className={module.filterTitle}>Цена</span>
                <div className={module.filterChoozePrice}>
                    <span>От</span>
                    <input type="number" value={settingsFilter.priceDown} name='priceDown' onChange={sortChange}/>
                </div>
                <div className={module.filterChoozePrice}>
                    <span>До</span>
                    <input type="number" value={settingsFilter.priceUp} name='priceUp' onChange={sortChange}/>
                </div>
            </div>
            <div className={module.filterBlock}>
                <span className={module.filterTitle}>Авиакомпании</span>
                <select name='airCompany' onChange={sortChange} value={settingsFilter.airCompany}>
                    {airCompany.map((item, index) => (
						<Option key={index} data={item}/>
					))}
                </select>
            </div>
		</div>
	);
}

export default Panel;