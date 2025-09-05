import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconChevronDown: React.FC = () => <Svg path="M6 9l6 6 6-6" />
const IconChevronUp: React.FC = () => <Svg path="M18 15l-6-6-6 6" />
const IconSave: React.FC = () => <Svg path="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
const IconSend: React.FC = () => <Svg path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />

const dateOptions = [
	"08月15日 星期四",
	"08月16日 星期五", 
	"08月17日 星期六",
	"08月18日 星期日",
	"08月19日 星期一",
	"08月20日 星期二",
	"08月21日 星期三"
]

const timeOptions = [
	"09:00-10:00",
	"10:00-11:00",
	"11:00-12:00",
	"13:00-14:00",
	"14:00-15:00",
	"15:00-16:00",
	"16:00-17:00",
	"17:00-18:00",
	"18:00-19:00",
	"19:00-20:00"
]

const storeOptions = [
	"TT网球（福田中心店）",
	"TT网球（南山中心店）"
]

const courseOptions = [
	"1对1私教体验课-室内60分钟",
	"1对2私教体验课-室内60分钟", 
	"1对1导师体验课-室内60分钟",
	"1对2导师体验课-室内60分钟",
	"周末单次小团课体验-4人班/120分钟"
]

const remarkTemplates = [
	"首次接触网球",
	"掌握正反手基础知识但不熟练",
	"正反手熟练",
	"青少年学员"
]

const DropdownField: React.FC<{ 
	label: string; 
	placeholder: string; 
	options: string[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}> = ({ label, placeholder, options, value, onChange, disabled = false }) => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="field-input">
				<div className={`input-select ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setIsOpen(!isOpen)}>
					<input 
						type="text" 
						className="input-text" 
						placeholder={placeholder}
						value={value}
						readOnly
					/>
					{!disabled && (isOpen ? <IconChevronUp /> : <IconChevronDown />)}
				</div>
				{isOpen && !disabled && (
					<div className="dropdown-menu">
						{options.map((option, index) => (
							<div 
								key={index}
								className="dropdown-item"
								onClick={() => {
									onChange(option)
									setIsOpen(false)
								}}
							>
								{option}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const RadioField: React.FC<{ 
	label: string; 
	options: string[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}> = ({ label, options, value, onChange, disabled = false }) => {
	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="radio-group">
				{options.map((option, index) => (
					<label key={index} className={`radio-item ${disabled ? 'disabled' : ''}`}>
						<input 
							type="radio" 
							name={label}
							value={option}
							checked={value === option}
							onChange={(e) => !disabled && onChange(e.target.value)}
							disabled={disabled}
						/>
						<span className="radio-label">{option}</span>
					</label>
				))}
			</div>
		</div>
	)
}

const RemarkField: React.FC<{ 
	label: string; 
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}> = ({ label, placeholder, value, onChange, disabled = false }) => {
	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="remark-content">
				<div className="template-buttons">
					{remarkTemplates.map((template, index) => (
						<button 
							key={index}
							className={`template-btn ${disabled ? 'disabled' : ''}`}
							onClick={() => !disabled && onChange(template)}
							disabled={disabled}
						>
							{template}
						</button>
					))}
				</div>
				<textarea 
					className={`input-textarea ${disabled ? 'disabled' : ''}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => !disabled && onChange(e.target.value)}
					rows={4}
					disabled={disabled}
				/>
			</div>
		</div>
	)
}

export const EditReservation: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')
	const [selectedStore, setSelectedStore] = useState('')
	const [selectedCourse, setSelectedCourse] = useState('')
	const [remarks, setRemarks] = useState('')
	
	// Pre-fill data for editing
	useEffect(() => {
		setSelectedDate('08月13日 星期三')
		setSelectedTime('13:00-14:00')
		setSelectedStore('TT网球（南山中心店）')
		setSelectedCourse('1对2导师体验课-室内60分钟')
		setRemarks('掌握正反手基础知识但不熟练')
	}, [])
	
	return (
		<div className="page publish-course">
			<div className="publish-content">
				<DropdownField 
					label="日期选择" 
					placeholder="请选择日期" 
					options={dateOptions}
					value={selectedDate}
					onChange={setSelectedDate}
					disabled={true}
				/>
				<DropdownField 
					label="时间选择" 
					placeholder="请选择时间" 
					options={timeOptions}
					value={selectedTime}
					onChange={setSelectedTime}
				/>
				<RadioField 
					label="网球门店" 
					options={storeOptions}
					value={selectedStore}
					onChange={setSelectedStore}
					disabled={true}
				/>
				<RadioField 
					label="课程选择" 
					options={courseOptions}
					value={selectedCourse}
					onChange={setSelectedCourse}
					disabled={true}
				/>
				<RemarkField 
					label="备注 (选填)" 
					placeholder="输入学员情况、注意事项等"
					value={remarks}
					onChange={setRemarks}
					disabled={true}
				/>
			</div>
			
			<div className="publish-actions">
				<button className="save-btn" onClick={() => alert('保存')}>
					<IconSave />
					<span>保存</span>
				</button>
				<button className="publish-btn" onClick={() => navigate('/reservation')}>
					<IconSend />
					<span>确认修改</span>
				</button>
			</div>
		</div>
	)
} 