import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconCalendar: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
const IconClock: React.FC = () => <Svg path="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" />
const IconMapPin: React.FC = () => <Svg path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
const IconPerson: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
const IconImage: React.FC = () => <Svg path="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
const IconEdit: React.FC = () => <Svg path="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
const IconX: React.FC = () => <Svg path="M18 6L6 18M6 6l12 12" />

export const ReservationDetail: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	
	return (
		<div className="page reservation-detail-new">
			<div className="detail-content">
				<h2 className="detail-title-simple">订单详情</h2>
				<div className="detail-card">
					
					<div className="course-info">
						<h2 className="course-title">1对2导师体验课-室内60分钟</h2>
						
						<div className="course-details">
							<div className="detail-row">
								<IconCalendar />
								<span>08月13日 星期三 13:00-14:00</span>
							</div>
							
							<div className="detail-row">
								<IconMapPin />
								<span>TT网球 (南山中心店)</span>
							</div>
							
							<div className="detail-row">
								<IconPerson />
								<span>导师E</span>
							</div>
						</div>
						
						<div className="instructor-section">
							<div className="instructor-avatar">
								<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e0e7ff'/%3E%3Ccircle cx='20' cy='16' r='6' fill='%236366f1'/%3E%3Cpath d='M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12' fill='%236366f1'/%3E%3C/svg%3E" alt="导师头像" />
							</div>
							<div className="instructor-intro">
								<p>资深网球教练，拥有10年教学经验。擅长初学者指导和技术提升。耐心细致，因材施教。</p>
							</div>
						</div>
					</div>
				</div>
				
				<div className="order-info">
					<div className="order-row">
						<span className="order-label">订单号</span>
						<span className="order-value">20250808165800000000</span>
					</div>
					<div className="order-row">
						<span className="order-label">总价</span>
						<span className="order-price">¥265</span>
					</div>
				</div>
			</div>
			
			<div className="detail-actions">
				<button className="change-btn" onClick={() => navigate(`/publish?mode=edit&id=${id}`)}>
					<IconEdit />
					<span>更改预约</span>
				</button>
				<button className="confirm-btn" onClick={() => navigate('/reservation')}>
					<IconX />
					<span>取消订单</span>
				</button>
			</div>
		</div>
	)
} 