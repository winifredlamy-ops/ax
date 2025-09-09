import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ReservationDetail.css'

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
const IconCourt: React.FC = () => <Svg path="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7zm2 2v6h6V9H9z" />
const IconPhone: React.FC = () => <Svg path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />

// 取消订单确认弹窗组件
const CancelOrderModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="cancel-modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h3>提示</h3>
				</div>
				<div className="modal-content">
					<p className="cancelled-message">课程已取消</p>
				</div>
				<div className="modal-actions">
					<button className="modal-btn primary single" onClick={onConfirm}>
						确定
					</button>
				</div>
			</div>
		</div>
	);
};

export const ReservationDetail: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [showCancelModal, setShowCancelModal] = useState(false)
	
	// Determine if this is a pending or accepted order based on ID
	// For demo purposes: IDs 1,2,3 are pending, 4,5 are accepted
	const isPending = id && ['1', '2', '3'].includes(id)
	
	// 模拟学员数据
	const studentInfo = {
		name: isPending ? '李同学' : '张同学',
		phone: isPending ? '139****8888' : '138****5678',
		level: isPending ? '中级' : '初学者',
		note: isPending ? '有一定基础，希望提高技术水平' : '掌握正反手基础知识但不熟练'
	}
	
	const handleCancelOrder = () => {
		setShowCancelModal(true)
	}
	
	const handleConfirmCancel = () => {
		setShowCancelModal(false)
		// 这里可以添加实际的取消订单逻辑
		navigate('/reservation')
	}
	
	const handleCloseCancelModal = () => {
		setShowCancelModal(false)
	}
	
	const handleCallStudent = () => {
		// 这里可以添加拨打电话逻辑
		alert('拨打学员电话')
	}
	
	return (
		<div className="page reservation-detail-new">
			<div className="detail-content">
				<h2 className="detail-title-simple">订单详情</h2>
				<div className="detail-card">
					
					<div className="course-info">
						<h2 className="course-title">
							{isPending ? "周末单次小团课体验-4人班/120分钟" : "1对2导师体验课-室内60分钟"}
						</h2>
						
						<div className="course-details">
							<div className="detail-row">
								<IconCalendar />
								<span>
									{isPending ? "08月10日 星期日 18:00-20:00" : "08月07日 星期四 12:00-13:00"}
								</span>
							</div>
							
							<div className="detail-row">
								<IconCourt />
								<span>
									{isPending ? "3号场" : "4号场"}
								</span>
							</div>
							
							<div className="detail-row">
								<IconMapPin />
								<span>TT网球 (南山中心店)</span>
							</div>
							
							{!isPending && (
								<div className="detail-row">
									<IconPerson />
									<span>导师B</span>
								</div>
							)}
						</div>
						
						{!isPending && (
							<div className="instructor-section">
								<div className="instructor-avatar">
									<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e0e7ff'/%3E%3Ccircle cx='20' cy='16' r='6' fill='%236366f1'/%3E%3Cpath d='M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12' fill='%236366f1'/%3E%3C/svg%3E" alt="导师头像" />
								</div>
								<div className="instructor-intro">
									<p>资深网球教练，拥有10年教学经验。擅长初学者指导和技术提升。耐心细致，因材施教。</p>
								</div>
							</div>
						)}
					</div>
				</div>
				
				{/* 学员信息卡片 */}
				<div className="detail-card">
					<div className="student-info">
						<h3 className="student-title">学员信息</h3>
						<div className="student-details">
							<div className="student-header">
								<div className="student-avatar">
									<IconPerson />
								</div>
								<div className="student-basic">
									<div className="student-name">{studentInfo.name}</div>
									<div className="student-level">{studentInfo.level}</div>
								</div>
								<button className="call-btn" onClick={handleCallStudent}>
									<IconPhone />
								</button>
							</div>
							<div className="student-contact">
								<span className="phone-label">联系电话：</span>
								<span className="phone-number">{studentInfo.phone}</span>
							</div>
							<div className="student-note">
								<div className="note-label">学员备注：</div>
								<div className="note-content">{studentInfo.note}</div>
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
				{isPending ? (
					<>
						<button className="change-btn" onClick={() => navigate('/publish')}>
							<IconEdit />
							<span>更改预约</span>
						</button>
						<button className="confirm-btn" onClick={handleCancelOrder}>
							<IconX />
							<span>取消订单</span>
						</button>
					</>
				) : (
					<>
						<button className="change-btn" onClick={() => navigate(`/edit-reservation/${id}`)}>
							<IconEdit />
							<span>更改预约</span>
						</button>
						<button className="confirm-btn" onClick={handleCancelOrder}>
							<IconX />
							<span>取消订单</span>
						</button>
					</>
				)}
			</div>
			
			<CancelOrderModal 
				isOpen={showCancelModal}
				onClose={handleCloseCancelModal}
				onConfirm={handleConfirmCancel}
			/>
		</div>
	)
} 