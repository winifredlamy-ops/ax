import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ReservationManagement.css'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconLightning: React.FC = () => <Svg path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
const IconMapPin: React.FC = () => <Svg path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
const IconPerson: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
const IconPlus: React.FC = () => <Svg path="M12 5v14M5 12h14" />

interface Reservation {
	id: number
	title: string
	dateTime: string
	location: string
	instructor?: string
	status: 'pending' | 'accepted'
	reviewStatus?: 'pending'
}

const reservations: Reservation[] = [
	{
		id: 1,
		title: "周末单次小团课体验-4人班/120分钟",
		dateTime: "08月10日 星期日 18:00-20:00",
		location: "TT网球 (南山中心店)",
		status: 'pending'
	},
	{
		id: 2,
		title: "1对2导师体验课-室内60分钟",
		dateTime: "08月13日 星期三 13:00-14:00",
		location: "TT网球 (南山中心店)",
		status: 'pending'
	},
	{
		id: 3,
		title: "周末单次小团课体验-4人班/120分钟",
		dateTime: "08月16日 星期六 18:00-20:00",
		location: "TT网球 (南山中心店)",
		status: 'pending'
	},
	{
		id: 4,
		title: "1对2导师体验课-室内60分钟",
		dateTime: "08月07日 星期四 12:00-13:00",
		location: "TT网球 (南山中心店)",
		instructor: "导师B",
		status: 'accepted',
		reviewStatus: 'pending'
	},
	{
		id: 5,
		title: "1对1私教体验课-室内60分钟",
		dateTime: "08月08日 星期五 13:00-134:00",
		location: "TT网球 (福田中心店)",
		instructor: "导师A",
		status: 'accepted',
		reviewStatus: 'pending'
	}
]

const ReservationCard: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
	const navigate = useNavigate()
	
	return (
		<div className="reservation-card">
			<div className="card-header">
				<div className="title-section">
					<h3 className="card-title">{reservation.title}</h3>
					<span className="date-time">{reservation.dateTime}</span>
				</div>
				<div className="status-section">
					<button className={`status-btn ${reservation.status}`}>
						{reservation.status === 'pending' ? '待接单' : '已接单'}
					</button>
				</div>
			</div>
			
			<div className="card-content">
				<div className="info-row">
					<IconMapPin />
					<span className="info-text">{reservation.location}</span>
				</div>
				
				{reservation.instructor && (
					<div className="info-row">
						<IconPerson />
						<span className="info-text">{reservation.instructor}</span>
					</div>
				)}
				
				<div className="card-footer">
					<button className="details-btn" onClick={() => {
						navigate(`/reservation/${reservation.id}`)
					}}>
						详情
					</button>
					{reservation.reviewStatus && (
						<div className="review-status">待评价</div>
					)}
				</div>
			</div>
		</div>
	)
}

export const ReservationManagement: React.FC = () => {
	const navigate = useNavigate()
	
	return (
		<div className="page reservation-management">
			<div className="reservation-content">
				{reservations.map(reservation => (
					<ReservationCard key={reservation.id} reservation={reservation} />
				))}
				
				<div className="more-orders">
					<button className="more-btn">更多往期订单</button>
				</div>
				
				<div className="new-reservation">
					<button className="new-btn" onClick={() => navigate('/publish')}>
						<IconPlus />
						<span>新建预约</span>
					</button>
				</div>
			</div>
		</div>
	)
} 