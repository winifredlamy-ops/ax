import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TopBar.css'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
		<path d={path} fill="currentColor" />
	</svg>
)

const IconBack: React.FC = () => (
	<Svg path="M19 12H5M12 19l-7-7 7-7" />
)

const IconMore: React.FC = () => (
	<Svg path="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm12 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
)

export const TopBar: React.FC<{ title: string; onBack?: () => void; right?: React.ReactNode }> = ({ title, onBack, right }) => {
	const navigate = useNavigate()
	return (
		<header className="topbar">
			<button className="icon-btn" aria-label="返回" onClick={() => (onBack ? onBack() : navigate(-1))}>
				<IconBack />
			</button>
			<div className="topbar-title">{title}</div>
			<div className="topbar-right">
				{right ?? <IconMore />}
			</div>
		</header>
	)
} 