import React from 'react'
import { useNavigate } from 'react-router-dom'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
		<path d={path} fill="currentColor" />
	</svg>
)

const Chevron: React.FC = () => (
	<Svg path="M9 18l6-6-6-6" className="chevron" />
)

const IconMsg: React.FC = () => (
	<Svg path="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
)
const IconImage: React.FC = () => (
	<Svg path="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14m18 0H3m18 0-5-6-4 5-3-4-6 5" />
)
const IconEvent: React.FC = () => (
	<Svg path="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 14H5V9h14v9Z" />
)
const IconCoupon: React.FC = () => (
	<Svg path="M21 7h-6V3H9v4H3v4a2 2 0 1 1 0 4v4h6v4h6v-4h6v-4a2 2 0 1 1 0-4V7Z" />
)
const IconFollow: React.FC = () => (
	<Svg path="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
)
const IconDoc: React.FC = () => (
	<Svg path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6" />
)
const IconSupport: React.FC = () => (
	<Svg path="M12 1a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h2v-8H6a6 6 0 0 1 12 0h-2v8h2a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9Z" />
)
const IconAbout: React.FC = () => (
	<Svg path="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2Zm0-8h-2V7h2Z" />
)
const IconAdmin: React.FC = () => (
	<Svg path="M4 6h16v10H4Zm0 12h16v2H4zM6 8h5v6H6z" />
)
const IconPermission: React.FC = () => (
	<Svg path="M12 2 2 7l10 5 10-5Zm0 7 10-5v8a10 10 0 1 1-20 0V4Z" />
)

export const Mine: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className="page mine compact">
			<div className="card balance">
				<div className="balance-left">余额</div>
				<div className="balance-right">
					<span className="currency">¥</span>
					<span className="amount">25</span>
				</div>
			</div>

			<div className="card list-group">
				<button className="list-item" onClick={() => navigate('/mine/messages')}>
					<div className="left"><IconMsg /><span>我的消息</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/images')}>
					<div className="left"><IconImage /><span>我的影像</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/events')}>
					<div className="left"><IconEvent /><span>我的活动</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/coupons')}>
					<div className="left"><IconCoupon /><span>优惠卡券</span></div>
					<Chevron />
				</button>
			</div>

			<div className="card list-group">
				<button className="list-item" onClick={() => navigate('/mine/follow')}>
					<div className="left"><IconFollow /><span>关注公众号</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/agreements')}>
					<div className="left"><IconDoc /><span>协议与条款</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/support')}>
					<div className="left"><IconSupport /><span>联系客服</span></div>
					<Chevron />
				</button>
				<button className="list-item" onClick={() => navigate('/mine/about')}>
					<div className="left"><IconAbout /><span>关于</span></div>
					<Chevron />
				</button>
			</div>

			<div className="card">
				<button className="list-item danger" onClick={() => alert('已退出登录（示例）')}>
					<div className="left"><span>退出登录</span></div>
				</button>
			</div>

			<div className="section-title">管理</div>
			<div className="card list-group">
				<button className="list-item" onClick={() => navigate('/mine/admin')}>
					<div className="left"><IconAdmin /><span>管理后台</span></div>
					<Chevron />
				</button>
			</div>

			<div className="card list-group">
				<button className="list-item" onClick={() => navigate('/mine/permission')}>
					<div className="left"><IconPermission /><span>开机(开机权限)</span></div>
					<Chevron />
				</button>
			</div>
		</div>
	)
} 