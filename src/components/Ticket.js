import module from './ticket.module.scss'
import clockIMG from './../img/clock.png'

function Ticket({data}) {
	let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
	let mounths = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.']
	function setDateInterface(date){
		let year = date[0] + date[1] + date[2] + date[3]
		let mounth
		date[5] == 0 ? mounth = date[6] : mounth = date[5] + date[6]
		let day
		date[8] == 0 ? day = date[9] : day = date[8] + date[9]
		let week = new Date(year, mounth, day)
		week = days[week.getDay()]
		mounth = mounths[mounth]
		let result = `${day} ${mounth} ${week}`
		return result
	}
	function setDurationInterface(duration){
		let hour = Math.floor(duration / 60)
		let min = duration % 60
		let result = `${hour} ч ${min} мин`
		return result
	}

	//дата отправки
	let departureFullDate = data.flight.legs[0].segments[0].departureDate.split('')
	let departureTime = departureFullDate[11] + departureFullDate[12] + departureFullDate[13] + departureFullDate[14] + departureFullDate[15]
	let departureDate = setDateInterface(departureFullDate)
	//дата прибытия
	let arrivalFullDate
	data.flight.legs[0].segments[1] ? arrivalFullDate = data.flight.legs[0].segments[1].arrivalDate.split('') : arrivalFullDate = data.flight.legs[0].segments[0].arrivalDate.split('')
	let arrivalTime = arrivalFullDate[11] + arrivalFullDate[12] + arrivalFullDate[13] + arrivalFullDate[14] + arrivalFullDate[15]
	let arrivalDate = setDateInterface(arrivalFullDate)
	//длительность полета
	let duration = setDurationInterface(data.flight.legs[0].duration)
	//дата отправки обратно
	let departureFullDateBack = data.flight.legs[1].segments[0].departureDate.split('')
	let departureTimeBack = departureFullDateBack[11] + departureFullDateBack[12] + departureFullDateBack[13] + departureFullDateBack[14] + departureFullDateBack[15]
	let departureDateBack = setDateInterface(departureFullDateBack)
	//дата прибытия обратно
	let arrivalFullDateBack
	data.flight.legs[1].segments[1] ? arrivalFullDateBack = data.flight.legs[1].segments[1].arrivalDate.split('') : arrivalFullDateBack = data.flight.legs[1].segments[0].arrivalDate.split('')
	let arrivalTimeBack = arrivalFullDateBack[11] + arrivalFullDateBack[12] + arrivalFullDateBack[13] + arrivalFullDateBack[14] + arrivalFullDateBack[15]
	let arrivalDateBack = setDateInterface(arrivalFullDateBack)
	//длительность полета обратно
	let durationBack = setDurationInterface(data.flight.legs[1].duration)

	return (
		<div className={module.ticket}>
			<header className={module.header}>
                <div className={module.logo}></div>
                <div className={module.price}>
                    <span>{data.flight.price.total.amount} &#8381;</span>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </header>
            <div className={module.info}>
                <div className={module.to}>
					<div className={module.airport}>
						<p>{data.flight.legs[0].segments[0].departureCity.caption} {data.flight.legs[0].segments[0].departureAirport.caption} ({data.flight.legs[0].segments[0].departureAirport.uid}) &#8594;
							{
								data.flight.legs[0].segments[1]
								?
								` ${data.flight.legs[0].segments[1].arrivalAirport.caption} (${data.flight.legs[0].segments[1].arrivalAirport.uid})`
								:
								` ${data.flight.legs[0].segments[0].arrivalCity.caption} ${data.flight.legs[0].segments[0].arrivalAirport.caption} (${data.flight.legs[0].segments[0].arrivalAirport.uid})`
							}
						</p>
					</div>
					<div className={module.date}>
						<p>{departureTime} <span>{departureDate}</span></p>
						<p><img src={clockIMG}/> {duration}</p>
						<p><span>{arrivalDate}</span> {arrivalTime}</p>
					</div>
					<div className={module.transfer}>
						{
							data.flight.legs[0].segments[1] && <span>1 пересадка</span>
						}
					</div>
                    <p className={module.company}>Рейс выполняет: {data.flight.legs[0].segments[0].airline.caption}</p>
                </div>
                <div className={module.back}>
					<div className={module.airport}>
						<p>{data.flight.legs[1].segments[0].departureAirport.caption} ({data.flight.legs[1].segments[0].departureAirport.uid}) &#8594;
							{
								data.flight.legs[1].segments[1]
								?
								` ${data.flight.legs[1].segments[1].arrivalCity.caption} ${data.flight.legs[1].segments[1].arrivalAirport.caption} (${data.flight.legs[1].segments[1].arrivalAirport.uid})`
								:
								` ${data.flight.legs[1].segments[0].arrivalCity.caption} ${data.flight.legs[1].segments[0].arrivalAirport.caption} (${data.flight.legs[1].segments[0].arrivalAirport.uid})`
							}
						</p>
					</div>
					<div className={module.date}>
						<p>{departureTimeBack} <span>{departureDateBack}</span></p>
						<p><img src={clockIMG}/> {durationBack}</p>
						<p><span>{arrivalDateBack}</span> {arrivalTimeBack}</p>
					</div>
					<div className={module.transfer}>
						{
							data.flight.legs[1].segments[1] && <span>1 пересадка</span>
						}
					</div>
					<p className={module.company}>Рейс выполняет: {data.flight.legs[1].segments[0].airline.caption}</p>
                </div>
            </div>
            <button className={module.button}>ВЫБРАТЬ</button>
		</div>
	);
}

export default Ticket;