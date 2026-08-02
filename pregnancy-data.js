const PregnancyTracker = {
    data: {
        dueDate: null,
        weeks: {} // Lưu dữ liệu dạng { 12: {milestone, nutrition}, 17: {...} }
    },

    init() {
        this.openBtn = document.getElementById('btn-open-preg');
        this.closeBtn = document.getElementById('btn-close-preg');
        this.panel = document.getElementById('preg-panel');
        
        if (!this.openBtn || !this.panel) return;
        this.bindEvents();
        if (!this.data.dueDate) {
            this.fetchData();
        }
    },

    bindEvents() {
        this.openBtn.addEventListener('click', async () => {
            this.panel.classList.remove('invisible', 'translate-x-full');
            document.body.classList.add('overflow-hidden');
            
            this.renderData();
        });

        this.closeBtn.addEventListener('click', () => {
            this.panel.classList.add('translate-x-full');
            setTimeout(() => this.panel.classList.add('invisible'), 300);
            document.body.classList.remove('overflow-hidden');
        });
    },

    async fetchData() {
        try {
            const nutritionContent = document.getElementById('preg-nutrition-content');
            if (nutritionContent) {
                nutritionContent.innerHTML = "<em>Đang đồng bộ dữ liệu...</em>";
            }
            
            const res = await fetch(`${APPS_SCRIPT_URL}?type=pregnancy`);
            const result = await res.json();

            if (result.success) {
                this.data.dueDate = result.dueDate;
                result.data.forEach(item => {
                    this.data.weeks[item.week] = {
                        milestone: item.milestone,
                        nutrition: item.nutrition
                    };
                });
                // Render lại nếu Panel đang được mở
                if (!this.panel.classList.contains('invisible')) {
                    this.renderData();
                }
            } else {
                console.error("Lỗi từ server:", result.message);
            }
        } catch (error) {
            console.error("Không thể kết nối đến Google Sheets", error);
            const nutritionContent = document.getElementById('preg-nutrition-content');
            if (nutritionContent) {
                nutritionContent.innerHTML = "<span class='text-red-500'>Lỗi tải dữ liệu. Hãy kiểm tra kết nối mạng.</span>";
            }
        }
    },

    // 1. Cập nhật hàm tính tuổi thai (Bổ sung biến month)
    calculateAge(targetDate) {
        if (!this.data.dueDate) return { week: 0, days: 0, month: 0 };

        const dueDate = new Date(this.data.dueDate);
        const refDate = targetDate ? new Date(targetDate) : new Date();
        
        refDate.setHours(0, 0, 0, 0);
        const dueDateClean = new Date(dueDate);
        dueDateClean.setHours(0, 0, 0, 0);

        const totalDays = 280; // 40 tuần
        
        const diffTime = dueDateClean.getTime() - refDate.getTime();
        const daysLeft = Math.round(diffTime / (1000 * 60 * 60 * 24));
        const daysPassed = totalDays - daysLeft;

        if (daysPassed < 0) return { week: 0, days: 0, month: 0 };
        if (daysPassed > 294) return { week: 42, days: 0, month: 9 };

        const week = Math.floor(daysPassed / 7);
        const days = daysPassed % 7;

        // Bảng quy đổi Tuần sang Tháng (Chuẩn y khoa khớp với 3 Tam cá nguyệt)
        let month = 1;
        if (week <= 4) month = 1;
        else if (week <= 8) month = 2;
        else if (week <= 13) month = 3;  // Hết Tam cá nguyệt 1
        else if (week <= 17) month = 4;
        else if (week <= 22) month = 5;
        else if (week <= 27) month = 6;  // Hết Tam cá nguyệt 2
        else if (week <= 31) month = 7;
        else if (week <= 35) month = 8;
        else month = 9;                  // Tam cá nguyệt 3 (Chuẩn bị sinh)

        return { 
            week: week, 
            days: days,
            month: month,
            refDate: refDate
        };
    },

    // 2. Cập nhật hàm renderData (Hiển thị UI Tháng + Tuần)
    renderData() {
        if (!this.data.dueDate) return;

        const activeDate = (typeof selectedDate !== 'undefined' && selectedDate) ? selectedDate : new Date();
        const age = this.calculateAge(activeDate);
        
        // ----------------------------------------------------
        // CẬP NHẬT GIAO DIỆN HIỂN THỊ THÁNG THAI KỲ
        // ----------------------------------------------------
        const ageTextEl = document.getElementById('preg-age-text');
        if (ageTextEl) {
            // Tháng hiện to, Tuần/Ngày hiện nhỏ hơn ở dưới
            ageTextEl.innerHTML = `Tháng thứ ${age.month}
                <div class="text-xl font-normal opacity-90 mt-1 drop-shadow-md">
                    (${age.week} Tuần ${age.days} Ngày)
                </div>`;
        }

        const d = activeDate.getDate();
        const m = activeDate.getMonth() + 1;
        const y = activeDate.getFullYear();
        const formattedDate = `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
        
        const subTitleEl = document.querySelector('#preg-hero h3');
        if (subTitleEl) {
            subTitleEl.textContent = `Tuổi thai vào ngày ${formattedDate}`;
        }

        const heroEl = document.getElementById('preg-hero');
        if (heroEl) {
            heroEl.style.backgroundImage = `url('public/pregnancy/week-${age.week}.png'), url('public/pregnancy/default.png')`;
        }

        const extraImgContainer = document.getElementById('preg-extra-img-container');
        const extraImg = document.getElementById('preg-extra-img');
        
        if (extraImgContainer && extraImg) {
            const specialWeeks = [13, 27, 38];
            if (specialWeeks.includes(age.week)) {
                // Đặt đường dẫn ảnh (ví dụ tuần 13 -> week-131.png)
                extraImg.src = `public/pregnancy/week-${age.week}1.png`;
                extraImgContainer.classList.remove('hidden');
            } else {
                extraImgContainer.classList.add('hidden');
                extraImg.src = ""; // Xóa src để tránh load ngầm
            }
        }

        const weekData = this.data.weeks[age.week] || {};
        const milestoneContainer = document.getElementById('preg-milestone-container');
        const milestoneContent = document.getElementById('preg-milestone-content');
        
        if (milestoneContainer && milestoneContent) {
            if (weekData.milestone) {
                milestoneContent.innerHTML = `<p>${weekData.milestone}</p>`;
                milestoneContainer.classList.remove('hidden');
            } else {
                milestoneContainer.classList.add('hidden');
            }
        }

        const nutritionContent = document.getElementById('preg-nutrition-content');
        if (nutritionContent) {
            if (weekData.nutrition) {
                nutritionContent.innerHTML = `<p>${weekData.nutrition}</p>`;
            } else {
                nutritionContent.innerHTML = `<p class="text-gray-400 italic">Duy trì chế độ ăn đa dạng, bổ sung đầy đủ dưỡng chất và vitamin tổng hợp theo chỉ định của bác sĩ.</p>`;
            }
        }
    }
};

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    PregnancyTracker.init();
});

/**
 * =====================================================
 * MODULE: CẨM NANG DINH DƯỠNG (SWIPE GALLERY)
 * =====================================================
 */
const NutriBookTracker = {
    // TỔNG SỐ TRANG (Sửa con số này đúng với số lượng ảnh trang-?.png bạn có)
    TOTAL_PAGES: 23, 

    init() {
        this.openBtn = document.getElementById('btn-open-nutri-book');
        this.closeBtn = document.getElementById('btn-close-nutri-book');
        this.modal = document.getElementById('nutri-gallery-modal');
        this.slider = document.getElementById('nutri-slider');
        this.counter = document.getElementById('nutri-page-counter');
        
        if (!this.openBtn || !this.modal) return;

        this.isRendered = false;
        this.bindEvents();
    },

    bindEvents() {
        // Bấm mở sách
        this.openBtn.addEventListener('click', () => {
            if (!this.isRendered) this.renderImages();
            
            this.modal.classList.remove('hidden');
            // Cần 1 chút delay để CSS transition opacity hoạt động
            setTimeout(() => this.modal.classList.remove('opacity-0'), 10);
        });

        // Bấm đóng sách
        this.closeBtn.addEventListener('click', () => {
            this.modal.classList.add('opacity-0');
            setTimeout(() => this.modal.classList.add('hidden'), 300);
        });

        // Lắng nghe sự kiện cuộn (vuốt ngang) để cập nhật số trang
        this.slider.addEventListener('scroll', () => {
            // Lấy vị trí cuộn hiện tại chia cho chiều rộng 1 màn hình để ra số trang
            const scrollX = this.slider.scrollLeft;
            const width = this.slider.clientWidth;
            const currentPage = Math.round(scrollX / width) + 1;
            
            this.counter.textContent = `Trang ${currentPage} / ${this.TOTAL_PAGES}`;
        });
    },

    renderImages() {
        this.slider.innerHTML = ''; // Xóa rỗng trước khi nạp

        for (let i = 1; i <= this.TOTAL_PAGES; i++) {
            // Tạo div bọc ảnh có thuộc tính snap-center để khi vuốt nó khựng lại đúng giữa màn hình
            const wrapper = document.createElement('div');
            wrapper.className = "w-full h-full flex-shrink-0 snap-center flex justify-center items-center p-2";
            
            // Tạo thẻ img (sử dụng loading="lazy" để web không bị đơ khi nạp quá nhiều ảnh cùng lúc)
            const img = document.createElement('img');
            img.src = `public/care/trang-${i}.png`; // Đường dẫn ảnh của bạn
            img.className = "max-w-full max-h-full object-contain rounded-lg";
            img.loading = "lazy"; 
            img.alt = `Cẩm nang dinh dưỡng trang ${i}`;

            wrapper.appendChild(img);
            this.slider.appendChild(wrapper);
        }

        this.counter.textContent = `Trang 1 / ${this.TOTAL_PAGES}`;
        this.isRendered = true; // Đánh dấu đã render để lần sau mở không phải load lại
    }
};

// Khởi tạo sau khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    NutriBookTracker.init();
});