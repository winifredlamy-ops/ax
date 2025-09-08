import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditReservation.css'

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
	{ id: '1', name: "1对1私教", duration: "60分钟" },
	{ id: '2', name: "1对2私教", duration: "60分钟" },
	{ id: '3', name: "1对1导师", duration: "60分钟" },
	{ id: '4', name: "1对2导师", duration: "60分钟" },
	{ id: '5', name: "小团课", duration: "120分钟" }
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

const CheckboxField: React.FC<{ 
	label: string; 
	options: string[];
	values: string[];
	onChange: (values: string[]) => void;
	disabled?: boolean;
}> = ({ label, options, values, onChange, disabled = false }) => {
	const handleCheckboxChange = (option: string) => {
		if (disabled) return;
		
		if (values.includes(option)) {
			// Remove option from selection
			onChange(values.filter(v => v !== option));
		} else {
			// Add option to selection
			onChange([...values, option]);
		}
	};

	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="checkbox-group">
				{options.map((option, index) => (
					<label key={index} className={`checkbox-item ${disabled ? 'disabled' : ''}`}>
						<input 
							type="checkbox" 
							value={option}
							checked={values.includes(option)}
							onChange={() => handleCheckboxChange(option)}
							disabled={disabled}
						/>
						<span className="checkbox-label">{option}</span>
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

// 课程选择组件
const CourseSelectionField: React.FC<{ 
	label: string; 
	courses: Array<{id: string, name: string, duration: string}>;
	selectedCourse: string;
	onCourseSelect: (courseId: string) => void;
	disabled?: boolean;
}> = ({ label, courses, selectedCourse, onCourseSelect, disabled = false }) => {
	const handleCourseChange = (courseId: string) => {
		if (disabled) return;
		onCourseSelect(courseId);
	};

	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="course-grid">
				{courses.map((course) => (
					<div 
						key={course.id} 
						className={`course-grid-item ${selectedCourse === course.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
						onClick={() => handleCourseChange(course.id)}
					>
						<div className="course-name">{course.name}</div>
						<div className="course-duration">{course.duration}</div>
						{selectedCourse === course.id && (
							<div className="course-check">✓</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

// 教练选择组件
const CoachSelectionField: React.FC<{ 
	label: string; 
	coaches: Array<{id: string, name: string}>;
	selectedCoaches: string[];
	onCoachSelect: (coachIds: string[]) => void;
	disabled?: boolean;
}> = ({ label, coaches, selectedCoaches, onCoachSelect, disabled = false }) => {
	const handleCoachChange = (coachId: string) => {
		if (disabled) return;
		
		if (selectedCoaches.includes(coachId)) {
			// Remove coach from selection
			onCoachSelect(selectedCoaches.filter(id => id !== coachId));
		} else {
			// Add coach to selection
			onCoachSelect([...selectedCoaches, coachId]);
		}
	};

	return (
		<div className="form-field">
			<label className="field-label">{label}</label>
			<div className="coach-grid">
				{coaches.map((coach) => (
					<div 
						key={coach.id} 
						className={`coach-grid-item ${selectedCoaches.includes(coach.id) ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
						onClick={() => handleCoachChange(coach.id)}
					>
						<div className="coach-name">{coach.name}</div>
						{selectedCoaches.includes(coach.id) && (
							<div className="coach-check">✓</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export const EditReservation: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')
	const [selectedStores, setSelectedStores] = useState<string[]>([])
	const [selectedCourse, setSelectedCourse] = useState<string>('')
	const [selectedCoaches, setSelectedCoaches] = useState<string[]>([])
	const [studentPhone, setStudentPhone] = useState('')
	const [studentNickname, setStudentNickname] = useState('')
	const [remarks, setRemarks] = useState('')
	
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
		{ id: '2', name: '李教练' },
		{ id: '3', name: '王教练' },
		{ id: '4', name: '张教练' },
		{ id: '5', name: '陈教练' },
		{ id: '6', name: '刘教练' },
		{ id: '7', name: '赵教练' },
		{ id: '8', name: '孙教练' },
	]
	
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
	
	// Pre-fill data for editing
	useEffect(() => {
		setSelectedDate('08月13日 星期三')
		setSelectedTime('13:00-14:00')
		setSelectedStores(['TT网球（南山中心店）'])
		setSelectedCourse('4') // 选中"1对2导师"课程
		setSelectedCoaches(['2']) // 选中"李"教练
		setRemarks('掌握正反手基础知识但不熟练')
	}, [])
	
	return (
		<div className="page publish-course">
			<div className="publish-content">
				<CheckboxField 
					label="网球门店" 
					options={storeOptions}
					values={selectedStores}
					onChange={setSelectedStores}
					disabled={true}
				/>
				
				<CalendarField 
					label="日期选择" 
					selectedDate={selectedDate}
					onDateSelect={setSelectedDate}
					disabled={true}
				/>
				<DropdownField 
					label="时间选择" 
					placeholder="请选择时间" 
					options={timeOptions}
					value={selectedTime}
					onChange={setSelectedTime}
				/>
				<CourseSelectionField 
					label="课程选择" 
					courses={courseOptions}
					selectedCourse={selectedCourse}
					onCourseSelect={setSelectedCourse}
					disabled={true}
				/>
				
				<CoachSelectionField 
					label="教练选择 (选填)"
					coaches={coachDatabase}
					selectedCoaches={selectedCoaches}
					onCoachSelect={setSelectedCoaches}
					disabled={true}
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