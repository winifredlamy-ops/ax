import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OrderDetail.css'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconArrowLeft: React.FC = () => <Svg path="M19 12H5M12 19l-7-7 7-7" />
const IconUser: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
const IconPhone: React.FC = () => <Svg path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
const IconMapPin: React.FC = () => <Svg path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
const IconClock: React.FC = () => <Svg path="M12 6v6l4 2" />

export const OrderDetail: React.FC = () => {
	const navigate = useNavigate()
	
	// 模拟订单数据
	const orderInfo = {
		orderId: '#202508130001',
		status: '待接课',
		storeName: 'TT网球（南山中心店）',
		dateTime: '2025年08月13日 星期三 13:00-14:00',
		course: '1对2导师体验课-室内60分钟',
		student: {
			name: '张同学',
			phone: '138****5678',
			level: '初学者',
			note: '掌握正反手基础知识但不熟练'
		},
		venue: '1号场地',
		price: '265',
		publishTime: '2小时前'
	}

	const handleAcceptOrder = () => {
		// 这里可以添加接课逻辑
		alert('接课成功！')
		navigate('/reservation')
	}

	const handleCallStudent = () => {
		// 这里可以添加拨打电话逻辑
		alert('拨打学员电话')
	}

	return (
		<div className="order-detail-page">
			{/* 顶部导航栏 */}
			<div className="order-header">
				<button className="back-btn" onClick={() => navigate(-1)}>
					<IconArrowLeft />
				</button>
				<h1 className="header-title">待接课订单详情</h1>
				<button className="user-btn">
					<IconUser />
				</button>
			</div>

			{/* 订单状态卡片 */}
			<div className="order-status-card">
				<div className="status-info">
					<div className="status-badge pending">
						{orderInfo.status}
					</div>
					<div className="order-id">{orderInfo.orderId}</div>
					<div className="publish-time">发布于 {orderInfo.publishTime}</div>
				</div>
			</div>

			{/* 课程信息卡片 */}
			<div className="course-info-card">
				<h3 className="card-title">课程信息</h3>
				<div className="course-details">
					<div className="detail-row">
						<IconMapPin />
						<div className="detail-content">
							<div className="detail-label">上课地点</div>
							<div className="detail-value">{orderInfo.storeName}</div>
						</div>
					</div>
					<div className="detail-row">
						<IconClock />
						<div className="detail-content">
							<div className="detail-label">上课时间</div>
							<div className="detail-value">{orderInfo.dateTime}</div>
						</div>
					</div>
					<div className="detail-row">
						<div className="course-icon">课</div>
						<div className="detail-content">
							<div className="detail-label">课程类型</div>
							<div className="detail-value">{orderInfo.course}</div>
						</div>
					</div>
					<div className="detail-row">
						<div className="venue-icon">场</div>
						<div className="detail-content">
							<div className="detail-label">场地安排</div>
							<div className="detail-value">{orderInfo.venue}</div>
						</div>
					</div>
				</div>
			</div>

			{/* 学员信息卡片 */}
			<div className="student-info-card">
				<h3 className="card-title">学员信息</h3>
				<div className="student-details">
					<div className="student-header">
						<div className="student-avatar">
							<IconUser />
						</div>
						<div className="student-basic">
							<div className="student-name">{orderInfo.student.name}</div>
							<div className="student-level">{orderInfo.student.level}</div>
						</div>
						<button className="call-btn" onClick={handleCallStudent}>
							<IconPhone />
						</button>
					</div>
					<div className="student-contact">
						<span className="phone-label">联系电话：</span>
						<span className="phone-number">{orderInfo.student.phone}</span>
					</div>
					<div className="student-note">
						<div className="note-label">学员备注：</div>
						<div className="note-content">{orderInfo.student.note}</div>
					</div>
				</div>
			</div>

			{/* 价格信息卡片 */}
			<div className="price-info-card">
				<div className="price-row">
					<span className="price-label">课程费用</span>
					<span className="price-value">¥{orderInfo.price}</span>
				</div>
			</div>

			{/* 底部操作按钮 */}
			<div className="order-actions">
				<button className="accept-btn" onClick={handleAcceptOrder}>
					接受订单
				</button>
			</div>
		</div>
	)
}
