import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 定义场地数据类型
interface Venue {
  id: string
  name: string
}

// 定义时段类型
interface TimeSlot {
  id: string
  start: string
  end: string
}

// 定义预订数据类型
interface BookingSlot {
  timeSlotId: string
  venueId: string
  available: boolean
  bookedBy?: string
}

const Svg: React.FC<{ path: string; className?: string }> = ({ path, className }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
)

const IconChevronDown: React.FC = () => <Svg path="M6 9l6 6 6-6" />
const IconChevronUp: React.FC = () => <Svg path="M18 15l-6-6-6 6" />
const IconChevronLeft: React.FC = () => <Svg path="M15 18l-6-6 6-6" />
const IconChevronRight: React.FC = () => <Svg path="M9 18l6-6-6-6" />
const IconSave: React.FC = () => <Svg path="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
const IconSend: React.FC = () => <Svg path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />

const storeOptions = [
	"TT网球（福田中心店）",
	"TT网球（南山中心店）"
]

// 模拟场地数据（去掉价格）
const venues: Venue[] = [
  { id: '1', name: '1号场' },
  { id: '2', name: '2号场' },
  { id: '3', name: '3号场' },
  { id: '4', name: '4号场' },
  { id: '5', name: '5号场' },
  { id: '6', name: '6号场' },
]

// 模拟时段数据 - 24小时可选择
const timeSlots: TimeSlot[] = [
  { id: '0000-0030', start: '00:00', end: '00:30' },
  { id: '0030-0100', start: '00:30', end: '01:00' },
  { id: '0100-0130', start: '01:00', end: '01:30' },
  { id: '0130-0200', start: '01:30', end: '02:00' },
  { id: '0200-0230', start: '02:00', end: '02:30' },
  { id: '0230-0300', start: '02:30', end: '03:00' },
  { id: '0300-0330', start: '03:00', end: '03:30' },
  { id: '0330-0400', start: '03:30', end: '04:00' },
  { id: '0400-0430', start: '04:00', end: '04:30' },
  { id: '0430-0500', start: '04:30', end: '05:00' },
  { id: '0500-0530', start: '05:00', end: '05:30' },
  { id: '0530-0600', start: '05:30', end: '06:00' },
  { id: '0600-0630', start: '06:00', end: '06:30' },
  { id: '0630-0700', start: '06:30', end: '07:00' },
  { id: '0700-0730', start: '07:00', end: '07:30' },
  { id: '0730-0800', start: '07:30', end: '08:00' },
  { id: '0800-0830', start: '08:00', end: '08:30' },
  { id: '0830-0900', start: '08:30', end: '09:00' },
  { id: '0900-0930', start: '09:00', end: '09:30' },
  { id: '0930-1000', start: '09:30', end: '10:00' },
  { id: '1000-1030', start: '10:00', end: '10:30' },
  { id: '1030-1100', start: '10:30', end: '11:00' },
  { id: '1100-1130', start: '11:00', end: '11:30' },
  { id: '1130-1200', start: '11:30', end: '12:00' },
  { id: '1200-1230', start: '12:00', end: '12:30' },
  { id: '1230-1300', start: '12:30', end: '13:00' },
  { id: '1300-1330', start: '13:00', end: '13:30' },
  { id: '1330-1400', start: '13:30', end: '14:00' },
  { id: '1400-1430', start: '14:00', end: '14:30' },
  { id: '1430-1500', start: '14:30', end: '15:00' },
  { id: '1500-1530', start: '15:00', end: '15:30' },
  { id: '1530-1600', start: '15:30', end: '16:00' },
  { id: '1600-1630', start: '16:00', end: '16:30' },
  { id: '1630-1700', start: '16:30', end: '17:00' },
  { id: '1700-1730', start: '17:00', end: '17:30' },
  { id: '1730-1800', start: '17:30', end: '18:00' },
  { id: '1800-1830', start: '18:00', end: '18:30' },
  { id: '1830-1900', start: '18:30', end: '19:00' },
  { id: '1900-1930', start: '19:00', end: '19:30' },
  { id: '1930-2000', start: '19:30', end: '20:00' },
  { id: '2000-2030', start: '20:00', end: '20:30' },
  { id: '2030-2100', start: '20:30', end: '21:00' },
  { id: '2100-2130', start: '21:00', end: '21:30' },
  { id: '2130-2200', start: '21:30', end: '22:00' },
  { id: '2200-2230', start: '22:00', end: '22:30' },
  { id: '2230-2300', start: '22:30', end: '23:00' },
  { id: '2300-2330', start: '23:00', end: '23:30' },
  { id: '2330-0000', start: '23:30', end: '24:00' },
]

// 模拟预订状态数据 - 只有少量时段被预订，其他都可用
const mockBookings: BookingSlot[] = [
  // 早晨时段 - 部分被预订
  { timeSlotId: '0800-0830', venueId: '1', available: false, bookedBy: '微信付款 早起鸟 13111111111' },
  { timeSlotId: '0800-0830', venueId: '2', available: false, bookedBy: 'Don 13410751228' },
  { timeSlotId: '0900-0930', venueId: '5', available: false, bookedBy: '微信付款 李教练 18575583233' },
  { timeSlotId: '0930-1000', venueId: '6', available: false, bookedBy: '微信付款 晨练者 13222222222' },
  
  // 中午时段 - 部分被预订
  { timeSlotId: '1100-1130', venueId: '2', available: false, bookedBy: 'Don 13410751228' },
  { timeSlotId: '1100-1130', venueId: '5', available: false, bookedBy: '微信付款 18575583233' },
  { timeSlotId: '1200-1230', venueId: '1', available: false, bookedBy: '微信付款 午餐队 13333333333' },
  { timeSlotId: '1200-1230', venueId: '5', available: false, bookedBy: '微信付款 解小客 18823824315' },
  { timeSlotId: '1230-1300', venueId: '5', available: false, bookedBy: '微信付款 解小客 18823824315' },
  
  // 下午时段 - 部分被预订
  { timeSlotId: '1500-1530', venueId: '3', available: false, bookedBy: '微信付款 王教练 13912345678' },
  { timeSlotId: '1600-1630', venueId: '6', available: false, bookedBy: '微信付款 下午茶 13444444444' },
  { timeSlotId: '1800-1830', venueId: '4', available: false, bookedBy: '微信付款 张学员 15987654321' },
  
  // 晚上时段 - 部分被预订
  { timeSlotId: '1900-1930', venueId: '1', available: false, bookedBy: '微信付款 夜猫子 13555555555' },
  { timeSlotId: '1900-1930', venueId: '2', available: false, bookedBy: '微信付款 陈教练 18611112222' },
  { timeSlotId: '2000-2030', venueId: '3', available: false, bookedBy: '微信付款 刘学员 13666667777' },
  { timeSlotId: '2100-2130', venueId: '6', available: false, bookedBy: '微信付款 夜场王 13777777777' },
]

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

const courseOptions = [
	"1对1私教体验课-室内60分钟",
	"1对2私教体验课-室内60分钟", 
	"1对1导师体验课-室内60分钟",
	"1对2导师体验课-室内60分钟",
	"周末单次小团课体验-4人班/120分钟"
]

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

const remarkTemplates = [
	"首次接触网球",
	"掌握正反手基础知识但不熟练",
	"正反手熟练",
	"青少年学员"
]

// 时段和场地网格组件
const TimeVenueGrid: React.FC<{
	selectedSlot: { timeSlotId: string, venueId: string } | null
	onSlotSelect: (timeSlotId: string, venueId: string) => void
}> = ({ selectedSlot, onSlotSelect }) => {
	// 获取特定时段和场地的预订状态
	const getBookingStatus = (timeSlotId: string, venueId: string) => {
		return mockBookings.find(b => b.timeSlotId === timeSlotId && b.venueId === venueId)
	}

	// 处理时段选择
	const handleSlotSelect = (timeSlotId: string, venueId: string) => {
		const booking = getBookingStatus(timeSlotId, venueId)
		if (booking?.available !== false) {
			onSlotSelect(timeSlotId, venueId)
		}
	}

	return (
		<div className="form-field">
			<label className="field-label">时段和场地选择</label>
			<div className="booking-grid">
				<div className="grid-header">
					<div className="time-header">时段</div>
					{venues.map(venue => (
						<div key={venue.id} className="venue-header">
							{venue.name}
						</div>
					))}
				</div>

				{timeSlots.map(timeSlot => (
					<div key={timeSlot.id} className="grid-row">
						<div className="time-cell">
							<div className="time-range">
								{timeSlot.start}<br />~<br />{timeSlot.end}
							</div>
						</div>
						{venues.map(venue => {
							const booking = getBookingStatus(timeSlot.id, venue.id)
							const isSelected = selectedSlot?.timeSlotId === timeSlot.id && selectedSlot?.venueId === venue.id
							const isAvailable = booking?.available !== false
							
							return (
								<div 
									key={venue.id}
									className={`venue-cell ${!isAvailable ? 'unavailable' : ''} ${isSelected ? 'selected' : ''}`}
									onClick={() => handleSlotSelect(timeSlot.id, venue.id)}
								>
									{isAvailable ? (
										<div className="available-slot">
										</div>
									) : (
										<div className="booked-slot">
										</div>
									)}
								</div>
							)
						})}
					</div>
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

const FormField: React.FC<{ label: string; placeholder: string; type?: 'text' | 'textarea' }> = ({ label, placeholder, type = 'text' }) => (
	<div className="form-field">
		<label className="field-label">{label}</label>
		<div className="field-input">
			{type === 'textarea' ? (
				<textarea 
					className="input-textarea" 
					placeholder={placeholder}
					rows={4}
				/>
			) : (
				<div className="input-select">
					<input 
						type="text" 
						className="input-text" 
						placeholder={placeholder}
						readOnly
					/>
					<IconChevronDown />
				</div>
			)}
		</div>
	</div>
)

// 日历选择组件
const CalendarField: React.FC<{ 
	label: string; 
	selectedDate: string;
	onDateSelect: (date: string) => void;
	disabled?: boolean;
}> = ({ label, selectedDate, onDateSelect, disabled = false }) => {
	const [currentMonth, setCurrentMonth] = useState(new Date())
	
	// 获取当前月份的所有日期
	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)
		const daysInMonth = lastDay.getDate()
		const startingDayOfWeek = firstDay.getDay()
		
		const days = []
		
		// 添加上个月的尾部日期（灰色显示）
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			const prevDate = new Date(year, month, -i)
			days.push({
				date: prevDate.getDate(),
				isCurrentMonth: false,
				fullDate: prevDate
			})
		}
		
		// 添加当前月的所有日期
		for (let day = 1; day <= daysInMonth; day++) {
			const currentDate = new Date(year, month, day)
			days.push({
				date: day,
				isCurrentMonth: true,
				fullDate: currentDate
			})
		}
		
		// 添加下个月的开头日期（灰色显示），补齐6行
		const remainingDays = 42 - days.length
		for (let day = 1; day <= remainingDays; day++) {
			const nextDate = new Date(year, month + 1, day)
			days.push({
				date: day,
				isCurrentMonth: false,
				fullDate: nextDate
			})
		}
		
		return days
	}
	
	// 格式化日期为显示格式
	const formatDate = (date: Date) => {
		const month = date.getMonth() + 1
		const day = date.getDate()
		const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		const weekday = weekdays[date.getDay()]
		return `${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日 ${weekday}`
	}
	
	// 检查日期是否被选中
	const isDateSelected = (date: Date) => {
		if (!selectedDate) return false
		return formatDate(date) === selectedDate
	}
	
	// 检查日期是否是今天或之后
	const isDateAvailable = (date: Date) => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		return date >= today
	}
	
	// 处理日期选择
	const handleDateSelect = (date: Date) => {
		if (!disabled && isDateAvailable(date)) {
			onDateSelect(formatDate(date))
		}
	}
	
	// 切换月份
	const changeMonth = (increment: number) => {
		setCurrentMonth(prev => {
			const newDate = new Date(prev)
			newDate.setMonth(prev.getMonth() + increment)
			return newDate
		})
	}
	
	const days = getDaysInMonth(currentMonth)
	const monthYear = `${currentMonth.getFullYear()}年${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}月`
	
	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className={`calendar-container ${disabled ? 'disabled' : ''}`}>
				<div className="calendar-header">
					<button 
						type="button"
						className={`calendar-nav-btn ${disabled ? 'disabled' : ''}`}
						onClick={() => !disabled && changeMonth(-1)}
						disabled={disabled}
					>
						<IconChevronLeft />
					</button>
					<span className="calendar-month-year">{monthYear}</span>
					<button 
						type="button"
						className={`calendar-nav-btn ${disabled ? 'disabled' : ''}`}
						onClick={() => !disabled && changeMonth(1)}
						disabled={disabled}
					>
						<IconChevronRight />
					</button>
				</div>
				<div className="calendar-weekdays">
					{['日', '一', '二', '三', '四', '五', '六'].map(weekday => (
						<div key={weekday} className="calendar-weekday">{weekday}</div>
					))}
				</div>
				<div className="calendar-days">
					{days.map((day, index) => (
						<button
							key={index}
							type="button"
							className={`calendar-day ${
								!day.isCurrentMonth ? 'other-month' : ''
							} ${
								isDateSelected(day.fullDate) ? 'selected' : ''
							} ${
								!isDateAvailable(day.fullDate) || disabled ? 'disabled' : ''
							}`}
							onClick={() => handleDateSelect(day.fullDate)}
							disabled={!isDateAvailable(day.fullDate) || disabled}
						>
							{day.date}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

// 学员信息输入字段组件
const StudentInfoField: React.FC<{ 
	phoneLabel: string; 
	phonePlaceholder: string;
	phoneValue: string;
	onPhoneChange: (value: string) => void;
	nicknameLabel: string;
	nicknamePlaceholder: string;
	nicknameValue: string;
	onNicknameChange: (value: string) => void;
	disabled?: boolean;
}> = ({ phoneLabel, phonePlaceholder, phoneValue, onPhoneChange, nicknameLabel, nicknamePlaceholder, nicknameValue, onNicknameChange, disabled = false }) => {
	return (
		<div className="student-info-fields">
			<div className="form-field">
				<label className="field-label">{phoneLabel}</label>
				<div className="field-input">
					<input 
						type="text" 
						className={`input-text ${disabled ? 'disabled' : ''}`}
						placeholder={phonePlaceholder}
						value={phoneValue}
						onChange={(e) => !disabled && onPhoneChange(e.target.value)}
						disabled={disabled}
					/>
				</div>
				<div className="field-hint">支持输入四位尾号快速查找</div>
			</div>
			<div className="form-field">
				<label className="field-label">{nicknameLabel}</label>
				<div className="field-input">
					<input 
						type="text" 
						className={`input-text ${disabled ? 'disabled' : ''}`}
						placeholder={nicknamePlaceholder}
						value={nicknameValue}
						onChange={(e) => !disabled && onNicknameChange(e.target.value)}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	)
}

// 教练选择组件
const CoachSelectionField: React.FC<{ 
	label: string; 
	coaches: Array<{id: string, name: string}>;
	selectedCoach: string;
	onCoachSelect: (coachId: string) => void;
	disabled?: boolean;
}> = ({ label, coaches, selectedCoach, onCoachSelect, disabled = false }) => {
	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="radio-group">
				{coaches.map((coach) => (
					<label key={coach.id} className={`radio-item ${disabled ? 'disabled' : ''}`}>
						<input 
							type="radio" 
							name="coach-selection"
							value={coach.id}
							checked={selectedCoach === coach.id}
							onChange={(e) => !disabled && onCoachSelect(e.target.value)}
							disabled={disabled}
						/>
						<span className="radio-label">{coach.name}</span>
					</label>
				))}
			</div>
		</div>
	)
}

export const PublishCourse: React.FC = () => {
	const navigate = useNavigate()
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')
	const [selectedStore, setSelectedStore] = useState('')
	const [selectedCourse, setSelectedCourse] = useState('')
	const [selectedCoach, setSelectedCoach] = useState('')
	const [studentPhone, setStudentPhone] = useState('')
	const [studentNickname, setStudentNickname] = useState('')
	const [remarks, setRemarks] = useState('')
	const [selectedSlot, setSelectedSlot] = useState<{ timeSlotId: string, venueId: string } | null>(null)
	
	// 模拟学员数据库
	const studentDatabase = [
		{ phone: '13111111111', nickname: '早起鸟' },
		{ phone: '13410751228', nickname: 'Don' },
		{ phone: '18575583233', nickname: '李教练' },
		{ phone: '13222222222', nickname: '晨练者' },
		{ phone: '13333333333', nickname: '午餐队' },
		{ phone: '18823824315', nickname: '解小客' },
		{ phone: '13912345678', nickname: '王教练' },
		{ phone: '13444444444', nickname: '下午茶' },
		{ phone: '15987654321', nickname: '张学员' },
		{ phone: '13555555555', nickname: '夜猫子' },
		{ phone: '18611112222', nickname: '陈教练' },
		{ phone: '13666667777', nickname: '刘学员' },
		{ phone: '13777777777', nickname: '夜场王' },
	]
	
	// 模拟教练数据库
	const coachDatabase = [
		{ id: '1', name: '小蒙' },
		{ id: '2', name: '李' },
		{ id: '3', name: '王教练' },
		{ id: '4', name: '张教练' },
	]
	
	// Check if we're in edit mode
	const urlParams = new URLSearchParams(window.location.search)
	const isEditMode = urlParams.get('mode') === 'edit'
	const editId = urlParams.get('id')
	
	// 处理时段选择
	const handleSlotSelect = (timeSlotId: string, venueId: string) => {
		setSelectedSlot({ timeSlotId, venueId })
	}
	
	// 处理手机号输入和查找
	const handlePhoneChange = (value: string) => {
		setStudentPhone(value)
		
		// 如果输入的是4位数字，尝试查找完整手机号
		if (value.length === 4 && /^\d{4}$/.test(value)) {
			const foundStudent = studentDatabase.find(student => 
				student.phone.endsWith(value)
			)
			if (foundStudent) {
				setStudentPhone(foundStudent.phone)
				setStudentNickname(foundStudent.nickname)
			}
		}
		
		// 如果输入完整手机号，查找对应昵称
		if (value.length === 11 && /^\d{11}$/.test(value)) {
			const foundStudent = studentDatabase.find(student => 
				student.phone === value
			)
			if (foundStudent) {
				setStudentNickname(foundStudent.nickname)
			}
		}
	}

	// Pre-fill data if in edit mode
	React.useEffect(() => {
		if (isEditMode && editId) {
			// Pre-fill with sample data for demo
			setSelectedDate('08月13日 星期三')
			setSelectedTime('13:00-14:00')
			setSelectedStore('TT网球（南山中心店）')
			setSelectedCourse('1对2导师体验课-室内60分钟')
			setRemarks('掌握正反手基础知识但不熟练')
		}
	}, [isEditMode, editId])
	
	return (
		<div className="page publish-course">
			{!isEditMode && (
				<div className="publish-header">
					<h1 className="publish-title">发布课程</h1>
				</div>
			)}
			
			<div className="publish-content">
				<RadioField 
					label="网球门店" 
					options={storeOptions}
					value={selectedStore}
					onChange={setSelectedStore}
					disabled={isEditMode}
				/>
				
				<CalendarField 
					label="日期选择" 
					selectedDate={selectedDate}
					onDateSelect={setSelectedDate}
					disabled={isEditMode}
				/>
				
				{/* 当选择了日期后，显示时段和场地网格 */}
				{selectedDate && (
					<TimeVenueGrid 
						selectedSlot={selectedSlot}
						onSlotSelect={handleSlotSelect}
					/>
				)}
				<RadioField 
					label="课程选择" 
					options={courseOptions}
					value={selectedCourse}
					onChange={setSelectedCourse}
					disabled={isEditMode}
				/>
				
				<CoachSelectionField 
					label="教练选择 (选填)"
					coaches={coachDatabase}
					selectedCoach={selectedCoach}
					onCoachSelect={setSelectedCoach}
					disabled={isEditMode}
				/>
				
				<StudentInfoField 
					phoneLabel="学员手机号"
					phonePlaceholder="请输入手机号或四位尾号"
					phoneValue={studentPhone}
					onPhoneChange={handlePhoneChange}
					nicknameLabel="学员昵称"
					nicknamePlaceholder="请输入学员昵称"
					nicknameValue={studentNickname}
					onNicknameChange={setStudentNickname}
					disabled={isEditMode}
				/>
				
				<RemarkField 
					label="备注 (选填)" 
					placeholder="输入学员情况、注意事项等"
					value={remarks}
					onChange={setRemarks}
					disabled={isEditMode}
				/>
			</div>
			
			<div className="publish-actions">
				<button className="save-btn" onClick={() => alert('保存')}>
					<IconSave />
					<span>保存</span>
				</button>
				<button className="publish-btn" onClick={() => navigate('/reservation')}>
					<IconSend />
					<span>{isEditMode ? '确认修改' : '立即发布'}</span>
				</button>
			</div>
		</div>
	)
} 