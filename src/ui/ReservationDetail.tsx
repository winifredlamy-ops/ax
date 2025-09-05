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
const IconCheck: React.FC = () => <Svg path="M20 6L9 17l-5-5" />

export const ReservationDetail: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	
	return (
		<div className="page reservation-detail-new">
			<div className="detail-header">
				<h1 className="detail-title">我的约课</h1>
			</div>
			
			<div className="detail-content">
				<div className="detail-card">
					<div className="course-status">
						<span className="status-badge accepted">已接单</span>
					</div>
					
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
								<IconImage />
							</div>
							<div className="instructor-intro">
								<p>关于导师的三句话简介</p>
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
					<IconCheck />
					<span>取消订单</span>
				</button>
			</div>
		</div>
	)
} 