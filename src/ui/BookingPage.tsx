import React, { useState } from 'react'

// 定义场地数据类型
interface Venue {
  id: string
  name: string
  price: number
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

// 模拟场地数据
const venues: Venue[] = [
  { id: '1', name: '1号场', price: 59 },
  { id: '2', name: '2号场', price: 59 },
  { id: '3', name: '3号场', price: 64 },
  { id: '4', name: '4号场', price: 59 },
  { id: '5', name: '5号场', price: 59 },
  { id: '6', name: '6号场', price: 59 },
]

// 模拟时段数据
const timeSlots: TimeSlot[] = [
  { id: '1100-1130', start: '11:00', end: '11:30' },
  { id: '1130-1200', start: '11:30', end: '12:00' },
  { id: '1200-1230', start: '12:00', end: '12:30' },
  { id: '1230-1300', start: '12:30', end: '13:00' },
  { id: '1300-1330', start: '13:00', end: '13:30' },
  { id: '1330-1400', start: '13:30', end: '14:00' },
]

// 模拟预订状态数据
const mockBookings: BookingSlot[] = [
  { timeSlotId: '1100-1130', venueId: '1', available: true },
  { timeSlotId: '1100-1130', venueId: '2', available: false, bookedBy: 'Don 13410751228' },
  { timeSlotId: '1100-1130', venueId: '3', available: true },
  { timeSlotId: '1100-1130', venueId: '4', available: true },
  { timeSlotId: '1100-1130', venueId: '5', available: false, bookedBy: '微信付款 18575583233' },
  { timeSlotId: '1100-1130', venueId: '6', available: true },
  
  { timeSlotId: '1130-1200', venueId: '1', available: true },
  { timeSlotId: '1130-1200', venueId: '2', available: true },
  { timeSlotId: '1130-1200', venueId: '3', available: true },
  { timeSlotId: '1130-1200', venueId: '4', available: false }, // 选中的时段
  { timeSlotId: '1130-1200', venueId: '5', available: true },
  { timeSlotId: '1130-1200', venueId: '6', available: true },
  
  { timeSlotId: '1200-1230', venueId: '1', available: true },
  { timeSlotId: '1200-1230', venueId: '2', available: true },
  { timeSlotId: '1200-1230', venueId: '3', available: true },
  { timeSlotId: '1200-1230', venueId: '4', available: true },
  { timeSlotId: '1200-1230', venueId: '5', available: false, bookedBy: '微信付款 解小客 18823824315' },
  { timeSlotId: '1200-1230', venueId: '6', available: true },
  
  { timeSlotId: '1230-1300', venueId: '1', available: true },
  { timeSlotId: '1230-1300', venueId: '2', available: true },
  { timeSlotId: '1230-1300', venueId: '3', available: true },
  { timeSlotId: '1230-1300', venueId: '4', available: true },
  { timeSlotId: '1230-1300', venueId: '5', available: false, bookedBy: '微信付款 解小客 18823824315' },
  { timeSlotId: '1230-1300', venueId: '6', available: true },
  
  { timeSlotId: '1300-1330', venueId: '1', available: true },
  { timeSlotId: '1300-1330', venueId: '2', available: true },
  { timeSlotId: '1300-1330', venueId: '3', available: true },
  { timeSlotId: '1300-1330', venueId: '4', available: true },
  { timeSlotId: '1300-1330', venueId: '5', available: true },
  { timeSlotId: '1300-1330', venueId: '6', available: true },
  
  { timeSlotId: '1330-1400', venueId: '1', available: true },
  { timeSlotId: '1330-1400', venueId: '2', available: true },
  { timeSlotId: '1330-1400', venueId: '3', available: true },
  { timeSlotId: '1330-1400', venueId: '4', available: true },
  { timeSlotId: '1330-1400', venueId: '5', available: true },
  { timeSlotId: '1330-1400', venueId: '6', available: false, bookedBy: '微信付款 晚场王 13777777777' },
]

export const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-09-07')
  const [selectedSlot, setSelectedSlot] = useState<{ timeSlotId: string, venueId: string } | null>({
    timeSlotId: '1130-1200',
    venueId: '4'
  })
  const [formData, setFormData] = useState({
    phone: '',
    contactName: '',
    nickname: '',
    gender: ''
  })
  
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)

  // 获取特定时段和场地的预订状态
  const getBookingStatus = (timeSlotId: string, venueId: string) => {
    return mockBookings.find(b => b.timeSlotId === timeSlotId && b.venueId === venueId)
  }

  // 处理时段选择
  const handleSlotSelect = (timeSlotId: string, venueId: string) => {
    const booking = getBookingStatus(timeSlotId, venueId)
    if (booking?.available) {
      setSelectedSlot({ timeSlotId, venueId })
    }
  }

  // 处理表单提交
  const handleSubmit = () => {
    if (!selectedSlot) {
      alert('请选择时段和场地')
      return
    }
    
    if (!formData.phone || !formData.contactName) {
      alert('请填写必要信息')
      return
    }
    
    console.log('提交预订:', {
      date: selectedDate,
      slot: selectedSlot,
      formData
    })
    alert('预订提交成功！')
  }

  return (
    <div className="booking-page">
      {/* 店铺选择头部 */}
      <div className="store-header">
        <span>当前门店：会展店</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>

      {/* 表单字段 */}
      <div className="booking-form">
        <div className="form-row">
          <label>手机号</label>
          <input
            type="tel"
            placeholder="请输入手机号"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <label>联系人姓名</label>
          <input
            type="text"
            placeholder="请输入联系人姓名"
            value={formData.contactName}
            onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <label>昵称</label>
          <input
            type="text"
            placeholder="请输入昵称"
            value={formData.nickname}
            onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <label>性别</label>
          <div className="select-wrapper">
            <div 
              className="select-input"
              onClick={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <span>{formData.gender || '请选择性别'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            {showGenderDropdown && (
              <div className="dropdown">
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, gender: '男' }))
                    setShowGenderDropdown(false)
                  }}
                >
                  男
                </div>
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, gender: '女' }))
                    setShowGenderDropdown(false)
                  }}
                >
                  女
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <label>日期</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* 时段和场地选择表格 */}
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
              const isAvailable = booking?.available ?? true
              
              return (
                <div 
                  key={venue.id}
                  className={`venue-cell ${!isAvailable ? 'unavailable' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSlotSelect(timeSlot.id, venue.id)}
                >
                  {isAvailable ? (
                    <div className="available-slot">
                      ¥ {venue.price}
                    </div>
                  ) : (
                    <div className="booked-slot">
                      {booking?.bookedBy ? (
                        <div className="booked-info">
                          <div className="booked-badge">微信付款</div>
                          <div className="booked-contact">{booking.bookedBy.replace('微信付款 ', '')}</div>
                        </div>
                      ) : (
                        <div className="unavailable-text">不可用</div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* 提交按钮 */}
      <div className="submit-section">
        <button 
          className="submit-btn"
          onClick={handleSubmit}
        >
          提交
        </button>
      </div>
    </div>
  )
}
