import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookingSuccess.css'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconArrowLeft: React.FC = () => <Svg path="M19 12H5M12 19l-7-7 7-7" />
const IconUser: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
const IconMore: React.FC = () => <Svg path="M12 12h.01M12 6h.01M12 18h.01" />

export const BookingSuccess: React.FC = () => {
	const navigate = useNavigate()
	
	// 获取当前时间信息
	const now = new Date()
	const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	const currentWeekday = weekdays[now.getDay()]
	const currentTime = now.toLocaleTimeString('zh-CN', { 
		hour: '2-digit', 
		minute: '2-digit',
		hour12: false 
	})

	// 模拟预约信息（实际应用中应该从路由参数或状态管理中获取）
	const bookingInfo = {
		storeName: 'TT网球（南山中心店）',
		dateTime: '2025年08月13日 星期三 13:00-14:00',
		course: '1对2导师体验课-室内60分钟',
		coach: '导师E'
	}

	return (
		<div className="booking-success-page">
			{/* 顶部导航栏 */}
			<div className="success-header">
				<button className="back-btn" onClick={() => navigate('/home')}>
					<IconArrowLeft />
				</button>
				<h1 className="header-title">TT网球俱乐部</h1>
				<button className="user-btn">
					<IconUser />
				</button>
			</div>

			{/* 时间显示 */}
			<div className="current-time">
				{currentWeekday} {currentTime}
			</div>

			{/* 成功通知卡片 */}
			<div className="success-card">
				<div className="card-header">
					<h2 className="success-title">约课成功通知</h2>
					<button className="more-btn">
						<IconMore />
					</button>
				</div>

				<div className="booking-details">
					<div className="detail-row">
						<span className="detail-label">门店名称</span>
						<span className="detail-value">{bookingInfo.storeName}</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">预约时段</span>
						<span className="detail-value">{bookingInfo.dateTime}</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">预约项目</span>
						<span className="detail-value">{bookingInfo.course}</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">导师名称</span>
						<span className="detail-value">{bookingInfo.coach}</span>
					</div>
				</div>
			</div>

			{/* 底部品牌信息 */}
			<div className="bottom-branding">
				<div className="brand-info">
					<div className="brand-icon">
						<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
							<circle cx="12" cy="12" r="10" fill="#4ade80"/>
							<path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
						</svg>
					</div>
					<span className="brand-name">TT网球俱乐部</span>
				</div>
				<div className="miniprogram-tag">
					小程序
				</div>
			</div>

		</div>
	)
}
