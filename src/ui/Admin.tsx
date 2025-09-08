import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconScan: React.FC = () => <Svg path="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M12 8v8m-4-4h8" />
const IconReserve: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
const IconRecord: React.FC = () => <Svg path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6" />
const IconOrder: React.FC = () => <Svg path="M3 3h18v18H3zM7 7h10v2H7zM7 11h10v2H7z" />
const IconAdd: React.FC = () => <Svg path="M12 5v14M5 12h14" />
const IconDeduct: React.FC = () => <Svg path="M18 6L6 18M6 6l12 12" />
const IconFolder: React.FC = () => <Svg path="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5l-2-2H5a2 2 0 0 0-2 2z" />
const IconSearch: React.FC = () => <Svg path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
const IconStar: React.FC = () => <Svg path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
const IconCheck: React.FC = () => <Svg path="M20 6L9 17l-5-5" />
const IconSchedule: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
const IconPerson: React.FC = () => <Svg path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
const IconPeople: React.FC = () => <Svg path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
const IconCourse: React.FC = () => <Svg path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
const IconReservation: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
const IconSettings: React.FC = () => <Svg path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" />
const IconChart: React.FC = () => <Svg path="M3 3v18h18M18 17V9M12 17V5M6 17v-3" />
const IconCalendar: React.FC = () => <Svg path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
const IconClock: React.FC = () => <Svg path="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 8v4l3 3" />
const IconCard: React.FC = () => <Svg path="M3 3h18v18H3zM7 7h10v2H7zM7 11h10v2H7z" />
const IconSettlement: React.FC = () => <Svg path="M21 12H3M21 6H3M21 18H3" />

const GridItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
	<button className="grid-item" onClick={onClick}>
		<div className="grid-icon">{icon}</div>
		<div className="grid-label">{label}</div>
	</button>
)

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
	<div className="admin-section">
		<div className="section-title">{title}</div>
		<div className="grid-container">{children}</div>
	</div>
)

export const Admin: React.FC = () => {
	const navigate = useNavigate()
	
	return (
		<div className="page admin compact">
			<div className="admin-content">
				<Section title="快捷操作">
					<GridItem icon={<IconScan />} label="扫码开机" onClick={() => alert('扫码开机')} />
					<GridItem icon={<IconReserve />} label="场地预订" onClick={() => alert('场地预订')} />
					<GridItem icon={<IconRecord />} label="订场记录" onClick={() => alert('订场记录')} />
				</Section>

				<Section title="储值管理">
					<GridItem icon={<IconOrder />} label="储值订单" onClick={() => alert('储值订单')} />
					<GridItem icon={<IconAdd />} label="储值操作" onClick={() => alert('储值操作')} />
					<GridItem icon={<IconDeduct />} label="扣除储值" onClick={() => alert('扣除储值')} />
				</Section>

				<Section title="卡券管理">
					<GridItem icon={<IconFolder />} label="卡券订单" onClick={() => alert('卡券订单')} />
					<GridItem icon={<IconAdd />} label="添加卡券" onClick={() => alert('添加卡券')} />
				</Section>

				<Section title="活动管理">
					<GridItem icon={<IconSearch />} label="活动查询" onClick={() => alert('活动查询')} />
					<GridItem icon={<IconStar />} label="发布活动" onClick={() => alert('发布活动')} />
					<GridItem icon={<IconCheck />} label="活动审核" onClick={() => alert('活动审核')} />
				</Section>

				<Section title="培训管理">
					<GridItem icon={<IconSchedule />} label="排课管理" onClick={() => alert('排课管理')} />
					<GridItem icon={<IconPerson />} label="教练管理" onClick={() => alert('教练管理')} />
					<GridItem icon={<IconPeople />} label="学员管理" onClick={() => alert('学员管理')} />
					<GridItem icon={<IconCourse />} label="课程管理" onClick={() => alert('课程管理')} />
					<GridItem icon={<IconReservation />} label="预定管理" onClick={() => navigate('/reservation')} />
				</Section>

				<Section title="角色管理">
					<GridItem icon={<IconPeople />} label="角色列表" onClick={() => alert('角色列表')} />
					<GridItem icon={<IconSettings />} label="角色配置" onClick={() => alert('角色配置')} />
				</Section>

				<Section title="门店数据">
					<GridItem icon={<IconChart />} label="数据总览" onClick={() => alert('数据总览')} />
					<GridItem icon={<IconCalendar />} label="日订场统计" onClick={() => alert('日订场统计')} />
					<GridItem icon={<IconClock />} label="月订场统计" onClick={() => alert('月订场统计')} />
					<GridItem icon={<IconCard />} label="卡券销售" onClick={() => alert('卡券销售')} />
					<GridItem icon={<IconSettlement />} label="分账管理" onClick={() => alert('分账管理')} />
				</Section>
			</div>
		</div>
	)
} 