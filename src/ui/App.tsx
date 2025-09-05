import React from 'react'
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import { Home } from './Home'
import { Mine } from './Mine'
import { Messages } from './Messages'
import { TopBar } from './TopBar'
import { Admin } from './Admin'
import { ReservationManagement } from './ReservationManagement'
import { ReservationDetail } from './ReservationDetail'
import { PublishCourse } from './PublishCourse'
import { EditReservation } from './EditReservation'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
		<path d={path} fill="currentColor" />
	</svg>
)

const IconHome: React.FC = () => <Svg path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
const IconBook: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
const IconEvents: React.FC = () => <Svg path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
const IconOrders: React.FC = () => <Svg path="M9 11H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Zm11 0h-6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Z" />
const IconMine: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />

const Book: React.FC = () => <div className="page"><h1 className="page-title">订场</h1><p className="muted">占位页</p></div>
const Events: React.FC = () => <div className="page"><h1 className="page-title">活动</h1><p className="muted">占位页</p></div>
const Orders: React.FC = () => <div className="page"><h1 className="page-title">订单</h1><p className="muted">占位页</p></div>

function useTitle() {
	const { pathname } = useLocation()
	if (pathname.startsWith('/mine/admin')) return '管理后台'
	if (pathname.startsWith('/mine')) return '我的'
	if (pathname.startsWith('/book')) return '订场'
	if (pathname.startsWith('/events')) return '活动'
	if (pathname.startsWith('/orders')) return '订单'
	if (pathname.startsWith('/edit-reservation')) return '更改预约'
	if (pathname.startsWith('/reservation')) return '我的约课'
	return '首页'
}

export const App: React.FC = () => {
	const title = useTitle()
	return (
		<div className="app-root">
			{!window.location.pathname.startsWith('/publish') && <TopBar title={title} />}
			<div className="app-content">
				<Routes>
					<Route path="/" element={<Navigate to="/home" replace />} />
					<Route path="/home" element={<Home />} />
					<Route path="/book" element={<Book />} />
					<Route path="/events" element={<Events />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/mine" element={<Mine />} />
					<Route path="/mine/messages" element={<Messages />} />
					<Route path="/mine/admin" element={<Admin />} />
					<Route path="/reservation" element={<ReservationManagement />} />
					<Route path="/reservation/:id" element={<ReservationDetail />} />
					<Route path="/edit-reservation/:id" element={<EditReservation />} />
					<Route path="/publish" element={<PublishCourse />} />
					<Route path="*" element={<Navigate to="/home" replace />} />
				</Routes>
			</div>
			<nav className="tabbar">
				<NavLink to="/home" className={({ isActive }) => isActive ? 'tab active' : 'tab'} end>
					<IconHome />
					<span>首页</span>
				</NavLink>
				<NavLink to="/book" className={({ isActive }) => isActive ? 'tab active' : 'tab'} end>
					<IconBook />
					<span>订场</span>
				</NavLink>
				<NavLink to="/events" className={({ isActive }) => isActive ? 'tab active' : 'tab'} end>
					<IconEvents />
					<span>活动</span>
				</NavLink>
				<NavLink to="/orders" className={({ isActive }) => isActive ? 'tab active' : 'tab'} end>
					<IconOrders />
					<span>订单</span>
				</NavLink>
				<NavLink to="/mine" className={({ isActive }) => isActive ? 'tab active' : 'tab'} end>
					<IconMine />
					<span>我的</span>
				</NavLink>
			</nav>
		</div>
	)
} 