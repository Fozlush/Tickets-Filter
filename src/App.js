import { useState, useEffect } from "react";
import Panel from "./components/Panel";
import Ticket from "./components/Ticket";
import './style.scss'
import module from './app.module.scss'
import jsonFlight from "./http/flights.js";

let Alltickets = jsonFlight[0].result.flights
let airPreCompany = ['all']
Alltickets.forEach(element => {
	let toNumPrice = Number(element.flight.price.total.amount)
	element.flight.price.total.amount = toNumPrice
	let toNumDuration1 = Number(element.flight.legs[0].duration)
	let toNumDuration2 = Number(element.flight.legs[1].duration)
	let numDuration = toNumDuration1 + toNumDuration2
	element.flight.totalDuration = numDuration
	airPreCompany.push(element.flight.legs[0].segments[0].airline.caption)
	airPreCompany.push(element.flight.legs[1].segments[0].airline.caption)
})
let airCompany = [...new Set(airPreCompany)]

function App() {
	const [tickets, setTickets] = useState([])
	const [settingsFilter, setSettingsFilter] = useState({
		sort: 'priceUp',
		transfer: 'all',
		priceDown: 10000,
		priceUp: 170000,
		airCompany: 'all'
	})
	let airCompanyFas = []
	let preTickets = []
	function selectSettings(name, value){
		setSettingsFilter({...settingsFilter, [name] : value})
	}
	function sortTickets(){
		if(settingsFilter.sort === 'priceUp'){
			tickets.sort((a, b) => a.flight.price.total.amount >= b.flight.price.total.amount ? 1 : -1)
		}else if(settingsFilter.sort === 'priceDown'){
			tickets.sort((a, b) => a.flight.price.total.amount <= b.flight.price.total.amount ? 1 : -1)
		}else if(settingsFilter.sort === 'duration'){
			tickets.sort((a, b) => a.flight.totalDuration >= b.flight.totalDuration ? 1 : -1)
		}
	}
	useEffect(() => {
		tickets.length = 0
		Alltickets.forEach(element => {
			if(element.flight.price.total.amount >= settingsFilter.priceDown && element.flight.price.total.amount <= settingsFilter.priceUp){
				preTickets.push(element)
			}
		})
		preTickets.forEach(element => {
			if(settingsFilter.transfer === 'all'){
				tickets.push(element)
			}else if(settingsFilter.transfer === '1'){
				if((element.flight.legs[0].segments[1] && !element.flight.legs[1].segments[1]) || (element.flight.legs[1].segments[1] && !element.flight.legs[0].segments[1])){
					tickets.push(element)
				}
			}else if(settingsFilter.transfer === 'none'){
				if(!element.flight.legs[0].segments[1] && !element.flight.legs[1].segments[1]){
					tickets.push(element)
				}
			}
		})
		airPreCompany = ['all']
		tickets.forEach(element => {
			airPreCompany.push(element.flight.legs[0].segments[0].airline.caption)
			airPreCompany.push(element.flight.legs[1].segments[0].airline.caption)
		})
		airPreCompany.push(settingsFilter.airCompany)
		airCompany = [...new Set(airPreCompany)]
		preTickets = Object.assign([], tickets);
		tickets.length = 0
		preTickets.forEach(element => {
			if(settingsFilter.airCompany === 'all'){
				tickets.push(element)
			}else if(settingsFilter.airCompany === element.flight.legs[0].segments[0].airline.caption || settingsFilter.airCompany === element.flight.legs[1].segments[0].airline.caption){
				tickets.push(element)
			}
		})
		sortTickets()
		setTickets([...tickets])
	}, [settingsFilter])
	return (
		<div className='container'>
			<div className={module.app}>
				<div className={module.panel}>
					<Panel settingsFilter={settingsFilter} selectSettings={selectSettings} airCompany={airCompany}/>
				</div>
				<div className={module.list}>
					{tickets.length !== 0 ? tickets.map((item, index) => (
						<Ticket key={index} data={item}/>
					)) : 'Подходящих рейсов не найдено'}
				</div>
			</div>
		</div>
	);
}

export default App;