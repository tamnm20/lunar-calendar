/**
 * =====================================================
 * MAIN.JS - Logic chính của ứng dụng
 * =====================================================
 */

// ========== HOLIDAYS DATA ==========

// Ngày lễ Dương lịch
const SOLAR_HOLIDAYS = {
    '1/1': 'Tết Dương Lịch',
    '14/2': 'Lễ Tình Nhân',
    '8/3': 'Quốc tế Phụ nữ',
    '30/4': 'Giải phóng miền Nam',
    '1/5': 'Quốc tế Lao động',
    '1/6': 'Quốc tế Thiếu nhi',
    '27/7': 'Thương binh Liệt sĩ',
    '2/9': 'Quốc Khánh',
    '20/10': 'Phụ nữ Việt Nam',
    '20/11': 'Nhà giáo Việt Nam',
    '22/12': 'Quân đội Nhân dân',
    '25/12': 'Giáng Sinh'
};

// Ngày lễ Âm lịch
const LUNAR_HOLIDAYS = {
    '1/1': 'Tết Nguyên Đán',
    '2/1': 'Mùng 2 Tết',
    '3/1': 'Mùng 3 Tết',
    '15/1': 'Rằm tháng Giêng',
    '10/3': 'Giỗ Tổ Hùng Vương',
    '15/4': 'Phật Đản',
    '5/5': 'Tết Đoan Ngọ',
    '15/7': 'Vu Lan',
    '15/8': 'Tết Trung Thu',
    '23/12': 'Ông Táo chầu Trời',
    '30/12': 'Tất Niên'
};

// Các ngày trong tuần
const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

// ========== GLOBAL VARIABLES ==========
let currentDate = new Date();
let selectedDate = new Date();
let viewMonth = currentDate.getMonth();
let viewYear = currentDate.getFullYear();

// ========== INITIALIZATION ==========
function init() {
    // Khởi tạo dropdown năm (từ 1900 đến 2100)
    const yearSelect = document.getElementById('year-select');
    for (let y = 1900; y <= 2100; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = 'Năm ' + y;
        yearSelect.appendChild(option);
    }
    
    // Set giá trị mặc định
    document.getElementById('month-select').value = viewMonth;
    document.getElementById('year-select').value = viewYear;
    
    // Render lịch
    updateDayCalendar();
    renderMonthCalendar();
    renderHolidayList();
    updateWeather();
    
    // Debug: In ra kết quả để kiểm tra
    console.log('=== KIỂM TRA THUẬT TOÁN ÂM LỊCH ===');
    const testDate = new Date();
    const dd = testDate.getDate();
    const mm = testDate.getMonth() + 1;
    const yy = testDate.getFullYear();
    const lunar = LunarCalendar.solar2Lunar(dd, mm, yy);
    console.log(`Dương lịch: ${dd}/${mm}/${yy}`);
    console.log(`Âm lịch: ${lunar.day}/${lunar.month}/${lunar.year}${lunar.leap ? ' (nhuận)' : ''}`);
    console.log(`Can Chi Ngày: ${LunarCalendar.getDayCanChi(lunar.jd)}`);
    console.log(`Can Chi Năm: ${LunarCalendar.getYearCanChi(lunar.year)}`);
}

/**
 * Cập nhật phần Lịch Ngày
 */
function updateDayCalendar() {
    const dd = selectedDate.getDate();
    const mm = selectedDate.getMonth() + 1;
    const yy = selectedDate.getFullYear();
    const dayOfWeek = selectedDate.getDay();
    
    // Chuyển sang âm lịch
    const lunar = LunarCalendar.solar2Lunar(dd, mm, yy);
    
    // Cập nhật Dương lịch
    //document.getElementById('solar-day').textContent = dd.toString().padStart(2, '0');
    document.getElementById('solar-day').textContent = dd;
    document.getElementById('solar-weekday').textContent = WEEKDAYS[dayOfWeek];
    document.getElementById('solar-month-year').textContent = `Tháng ${mm} năm ${yy}`;
    
    // Cập nhật Âm lịch
    //document.getElementById('lunar-day').textContent = lunar.day.toString().padStart(2, '0');
    document.getElementById('lunar-day').textContent = lunar.day;
    const monthName = LunarCalendar.getLunarMonthName(lunar.month, lunar.leap);
    document.getElementById('lunar-month-info').textContent = `${monthName} năm ${lunar.year}`;
    
    // Cập nhật Can Chi
    document.getElementById('day-canchi').textContent = LunarCalendar.getDayCanChi(lunar.jd);
    document.getElementById('month-canchi').textContent = LunarCalendar.getMonthCanChi(lunar.month, lunar.year);
    document.getElementById('year-canchi').textContent = LunarCalendar.getYearCanChi(lunar.year);
    
    // Cập nhật năm con giáp
    const zodiac = LunarCalendar.getYearZodiac(lunar.year);
    const yearCanChi = LunarCalendar.getYearCanChi(lunar.year);
    document.getElementById('zodiac-icon').textContent = zodiac;
    document.getElementById('lunar-year-name').textContent = 'Năm ' + yearCanChi;
    
    // Kiểm tra ngày lễ
    const holidayInfo = document.getElementById('holiday-info');
    const solarKey = `${dd}/${mm}`;
    const lunarKey = `${lunar.day}/${lunar.month}`;
    
    let holiday = SOLAR_HOLIDAYS[solarKey] || LUNAR_HOLIDAYS[lunarKey];
    
    if (holiday) {
        holidayInfo.classList.remove('hidden');
        holidayInfo.querySelector('span').textContent = '🎉 ' + holiday;
    } else {
        holidayInfo.classList.add('hidden');
    }
}

/**
 * Render lịch tháng
 */
function renderMonthCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // Cập nhật tiêu đề
    document.getElementById('calendar-title').textContent = `Tháng ${viewMonth + 1} / ${viewYear}`;
    document.getElementById('month-select').value = viewMonth;
    document.getElementById('year-select').value = viewYear;
    
    // Tính ngày đầu tiên của tháng
    const firstDay = new Date(viewYear, viewMonth, 1);
    let startDay = firstDay.getDay(); // 0 = CN
    startDay = startDay === 0 ? 6 : startDay - 1; // Chuyển về T2 = 0
    
    // Số ngày trong tháng
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    
    // Số ngày tháng trước cần hiển thị
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    
    // Render các ô trống đầu tháng (tháng trước)
    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        const prevMonth = viewMonth === 0 ? 12 : viewMonth;
        const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
        const lunar = LunarCalendar.solar2Lunar(day, prevMonth, prevYear);
        
        grid.innerHTML += `
            <div class="calendar-day p-2 min-h-[60px] md:min-h-[80px] rounded-lg bg-gray-50 opacity-50 cursor-pointer"
                 onclick="selectDate(${prevYear}, ${prevMonth - 1}, ${day})">
                <div class="text-lg font-medium text-gray-400">${day}</div>
                <div class="text-xs text-gray-400">${lunar.day}</div>
            </div>
        `;
    }
    
    // Render các ngày trong tháng
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(viewYear, viewMonth, day);
        const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
        const isSelected = day === selectedDate.getDate() && viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear();
        const isSunday = date.getDay() === 0;
        const isSaturday = date.getDay() === 6;
        
        // Chuyển sang âm lịch
        const lunar = LunarCalendar.solar2Lunar(day, viewMonth + 1, viewYear);
        
        // Kiểm tra ngày lễ
        const solarKey = `${day}/${viewMonth + 1}`;
        const lunarKey = `${lunar.day}/${lunar.month}`;
        const holiday = SOLAR_HOLIDAYS[solarKey] || LUNAR_HOLIDAYS[lunarKey];
        
        // Style classes
        let bgClass = 'bg-white hover:bg-gray-50';
        let textClass = 'text-gray-700';
        let lunarTextClass = 'text-gray-500';
        
        if (isToday) {
            bgClass = 'bg-emerald-500 hover:bg-emerald-600';
            textClass = 'text-white';
            lunarTextClass = 'text-emerald-100';
        } else if (isSunday) {
            bgClass = 'bg-red-50 hover:bg-red-100';
            textClass = 'text-red-500';
        } else if (isSaturday) {
            textClass = 'text-blue-500';
        }
        
        if (isSelected && !isToday) {
            bgClass = 'bg-emerald-100 hover:bg-emerald-200 ring-2 ring-emerald-500';
        }
        
        // Hiển thị ngày âm đặc biệt (mùng 1 hoặc ngày 1)
        let lunarDisplay = lunar.day;
        if (lunar.day === 1) {
            lunarDisplay = `${lunar.day}/${lunar.month}`;
            lunarTextClass = isToday ? 'text-emerald-100 font-bold' : 'text-red-500 font-bold';
        }
        
        grid.innerHTML += `
            <div class="calendar-day p-2 min-h-[60px] md:min-h-[80px] rounded-lg ${bgClass} cursor-pointer border border-gray-100"
                 onclick="selectDate(${viewYear}, ${viewMonth}, ${day})">
                <div class="text-lg md:text-xl font-semibold ${textClass}">${day}</div>
                <div class="text-xs ${lunarTextClass}">${lunarDisplay}</div>
                ${holiday ? `<div class="text-[10px] bg-green-500 text-white px-1 rounded mt-1 truncate" title="${holiday}">${holiday}</div>` : ''}
            </div>
        `;
    }
    
    // Render các ngày còn lại (tháng sau)
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    
    for (let i = 1; i <= remainingCells; i++) {
        const nextMonth = viewMonth === 11 ? 1 : viewMonth + 2;
        const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
        const lunar = LunarCalendar.solar2Lunar(i, nextMonth, nextYear);
        
        grid.innerHTML += `
            <div class="calendar-day p-2 min-h-[60px] md:min-h-[80px] rounded-lg bg-gray-50 opacity-50 cursor-pointer"
                 onclick="selectDate(${nextYear}, ${nextMonth - 1}, ${i})">
                <div class="text-lg font-medium text-gray-400">${i}</div>
                <div class="text-xs text-gray-400">${lunar.day}</div>
            </div>
        `;
    }
}

/**
 * Render danh sách ngày lễ
 */
function renderHolidayList() {
    const container = document.getElementById('holiday-list');
    document.getElementById('holiday-year').textContent = viewYear;
    container.innerHTML = '';
    
    // Sắp xếp ngày lễ dương lịch theo thứ tự
    const sortedSolarHolidays = Object.entries(SOLAR_HOLIDAYS).sort((a, b) => {
        const [d1, m1] = a[0].split('/').map(Number);
        const [d2, m2] = b[0].split('/').map(Number);
        return m1 - m2 || d1 - d2;
    });
    
    // Ngày lễ Dương lịch
    for (const [date, name] of sortedSolarHolidays) {
        const [d, m] = date.split('/');
        container.innerHTML += `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-12 h-12 bg-emerald-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span class="text-[10px] text-emerald-600 leading-none">T${m}</span>
                    <span class="text-xl font-bold text-emerald-700 leading-none mt-0.5">${d}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-700 truncate">${name}</div>
                    <div class="text-sm text-gray-500">Dương lịch</div>
                </div>
            </div>
        `;
    }
    
    // Một số ngày lễ Âm lịch quan trọng
    const importantLunarHolidays = ['1/1', '10/3', '15/8'];
    for (const date of importantLunarHolidays) {
        const name = LUNAR_HOLIDAYS[date];
        const [d, m] = date.split('/');
        // Chuyển sang dương lịch
        const solar = LunarCalendar.lunar2Solar(parseInt(d), parseInt(m), viewYear, 0);
        if (solar[0] > 0) {
            container.innerHTML += `
                <div class="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <div class="w-12 h-12 bg-amber-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                        <span class="text-[10px] text-amber-600 leading-none">${d}/${m}</span>
                        <span class="text-lg font-bold text-amber-700 leading-none mt-0.5">ÂL</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-700 truncate">${name}</div>
                        <div class="text-sm text-gray-500">Âm lịch (DL: ${solar[0]}/${solar[1]}/${solar[2]})</div>
                    </div>
                </div>
            `;
        }
    }
}

/**
 * Chọn một ngày cụ thể
 */
function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    viewMonth = month;
    viewYear = year;
    updateDayCalendar();
    renderMonthCalendar();
}

/**
 * Chuyển ngày (phần Lịch Ngày)
 */
function changeDay(delta) {
    selectedDate.setDate(selectedDate.getDate() + delta);
    viewMonth = selectedDate.getMonth();
    viewYear = selectedDate.getFullYear();
    updateDayCalendar();
    renderMonthCalendar();
}

/**
 * Chuyển tháng (phần Lịch Tháng)
 */
function changeMonth(delta) {
    viewMonth += delta;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
    } else if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
    }
    renderMonthCalendar();
    renderHolidayList();
}

/**
 * Xử lý khi thay đổi dropdown tháng/năm
 */
function onMonthYearChange() {
    viewMonth = parseInt(document.getElementById('month-select').value);
    viewYear = parseInt(document.getElementById('year-select').value);
    renderMonthCalendar();
    renderHolidayList();
}

/**
 * Quay về ngày hôm nay
 */
function goToToday() {
    selectedDate = new Date();
    viewMonth = selectedDate.getMonth();
    viewYear = selectedDate.getFullYear();
    updateDayCalendar();
    renderMonthCalendar();
    renderHolidayList();
}

/**
 * Cập nhật thời tiết (placeholder)
 */
function updateWeather() {
    const weatherIcons = ['☀️', '⛅', '🌤️', '🌥️', '🌧️'];
    const temps = [25, 28, 30, 32, 27];
    const randomIndex = Math.floor(Math.random() * weatherIcons.length);
    
    document.getElementById('weather-icon').textContent = weatherIcons[randomIndex];
    document.getElementById('weather-text').textContent = `Hà Nội - ${temps[randomIndex]}°C`;
}

// Khởi chạy khi trang load xong
document.addEventListener('DOMContentLoaded', init);