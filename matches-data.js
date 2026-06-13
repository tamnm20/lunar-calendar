/**
 * ============================================================
 * WORLD CUP 2026 - APP CONTROLLER
 * ============================================================
 * Cấu trúc: 3 module độc lập (MatchRenderer, WCPanel, WCNav)
 * ============================================================
 */

'use strict';

// ===========================================
// DỮ LIỆU LỊCH THI ĐẤU VÒNG BẢNG
// ===========================================

const matchesRound1 = [
    { date: '12/06', time: '02:00', group: 'A', team1: { name: 'Mexico', code: 'mx' }, team2: { name: 'Nam Phi', code: 'za' } },
    { date: '12/06', time: '09:00', group: 'A', team1: { name: 'Hàn Quốc', code: 'kr' }, team2: { name: 'CH Czech', code: 'cz' } },
    { date: '13/06', time: '02:00', group: 'B', team1: { name: 'Canada', code: 'ca' }, team2: { name: 'Bosnia và Herzegovina', code: 'ba' } },
    { date: '13/06', time: '08:00', group: 'D', team1: { name: 'Mỹ', code: 'us' }, team2: { name: 'Paraguay', code: 'py' } },
    { date: '14/06', time: '02:00', group: 'B', team1: { name: 'Qatar', code: 'qa' }, team2: { name: 'Thụy Sĩ', code: 'ch' } },
    { date: '14/06', time: '05:00', group: 'C', team1: { name: 'Brazil', code: 'br' }, team2: { name: 'Morocco', code: 'ma' } },
    { date: '14/06', time: '08:00', group: 'C', team1: { name: 'Haiti', code: 'ht' }, team2: { name: 'Scotland', code: 'gb-sct' } },
    { date: '14/06', time: '11:00', group: 'D', team1: { name: 'Úc', code: 'au' }, team2: { name: 'Thổ Nhĩ Kỳ', code: 'tr' } },
    { date: '15/06', time: '00:00', group: 'E', team1: { name: 'Đức', code: 'de' }, team2: { name: 'Curacao', code: 'cw' } },
    { date: '15/06', time: '03:00', group: 'F', team1: { name: 'Hà Lan', code: 'nl' }, team2: { name: 'Nhật Bản', code: 'jp' } },
    { date: '15/06', time: '06:00', group: 'E', team1: { name: 'Bờ Biển Ngà', code: 'ci' }, team2: { name: 'Ecuador', code: 'ec' } },
    { date: '15/06', time: '09:00', group: 'F', team1: { name: 'Thụy Điển', code: 'se' }, team2: { name: 'Tunisia', code: 'tn' } },
    { date: '15/06', time: '23:00', group: 'H', team1: { name: 'Tây Ban Nha', code: 'es' }, team2: { name: 'Cape Verde', code: 'cv' } },
    { date: '16/06', time: '02:00', group: 'G', team1: { name: 'Bỉ', code: 'be' }, team2: { name: 'Ai Cập', code: 'eg' } },
    { date: '16/06', time: '05:00', group: 'H', team1: { name: 'Saudi Arabia', code: 'sa' }, team2: { name: 'Uruguay', code: 'uy' } },
    { date: '16/06', time: '08:00', group: 'G', team1: { name: 'Iran', code: 'ir' }, team2: { name: 'New Zealand', code: 'nz' } },
    { date: '17/06', time: '02:00', group: 'I', team1: { name: 'Pháp', code: 'fr' }, team2: { name: 'Senegal', code: 'sn' } },
    { date: '17/06', time: '05:00', group: 'I', team1: { name: 'Iraq', code: 'iq' }, team2: { name: 'Na Uy', code: 'no' } },
    { date: '17/06', time: '08:00', group: 'J', team1: { name: 'Argentina', code: 'ar' }, team2: { name: 'Algeria', code: 'dz' } },
    { date: '17/06', time: '11:00', group: 'J', team1: { name: 'Áo', code: 'at' }, team2: { name: 'Jordan', code: 'jo' } },
    { date: '18/06', time: '00:00', group: 'K', team1: { name: 'Bồ Đào Nha', code: 'pt' }, team2: { name: 'CHDC Congo', code: 'cd' } },
    { date: '18/06', time: '03:00', group: 'K', team1: { name: 'Anh', code: 'gb-eng' }, team2: { name: 'Croatia', code: 'hr' } },
    { date: '18/06', time: '06:00', group: 'L', team1: { name: 'Ghana', code: 'gh' }, team2: { name: 'Panama', code: 'pa' } },
    { date: '18/06', time: '09:00', group: 'K', team1: { name: 'Uzbekistan', code: 'uz' }, team2: { name: 'Colombia', code: 'co' } }
];

// ===========================================
// LƯỢT TRẬN 2
// ===========================================

const matchesRound2 = [
    { date: '18/06', time: '23:00', group: 'A', team1: { name: 'CH Czech', code: 'cz' }, team2: { name: 'Nam Phi', code: 'za' } },
    { date: '19/06', time: '02:00', group: 'B', team1: { name: 'Thụy Sĩ', code: 'ch' }, team2: { name: 'Bosnia và Herzegovina', code: 'ba' } },
    { date: '19/06', time: '05:00', group: 'B', team1: { name: 'Canada', code: 'ca' }, team2: { name: 'Qatar', code: 'qa' } },
    { date: '19/06', time: '08:00', group: 'A', team1: { name: 'Mexico', code: 'mx' }, team2: { name: 'Hàn Quốc', code: 'kr' } },
    { date: '20/06', time: '02:00', group: 'D', team1: { name: 'Mỹ', code: 'us' }, team2: { name: 'Úc', code: 'au' } },
    { date: '20/06', time: '05:00', group: 'C', team1: { name: 'Scotland', code: 'gb-sct' }, team2: { name: 'Morocco', code: 'ma' } },
    { date: '20/06', time: '07:30', group: 'C', team1: { name: 'Brazil', code: 'br' }, team2: { name: 'Haiti', code: 'ht' } },
    { date: '20/06', time: '10:00', group: 'D', team1: { name: 'Thổ Nhĩ Kỳ', code: 'tr' }, team2: { name: 'Paraguay', code: 'py' } },
    { date: '21/06', time: '00:00', group: 'F', team1: { name: 'Hà Lan', code: 'nl' }, team2: { name: 'Thụy Điển', code: 'se' } },
    { date: '21/06', time: '03:00', group: 'E', team1: { name: 'Đức', code: 'de' }, team2: { name: 'Bờ Biển Ngà', code: 'ci' } },
    { date: '21/06', time: '07:00', group: 'E', team1: { name: 'Ecuador', code: 'ec' }, team2: { name: 'Curacao', code: 'cw' } },
    { date: '21/06', time: '11:00', group: 'F', team1: { name: 'Tunisia', code: 'tn' }, team2: { name: 'Nhật Bản', code: 'jp' } },
    { date: '21/06', time: '23:00', group: 'H', team1: { name: 'Tây Ban Nha', code: 'es' }, team2: { name: 'Saudi Arabia', code: 'sa' } },
    { date: '22/06', time: '02:00', group: 'G', team1: { name: 'Bỉ', code: 'be' }, team2: { name: 'Iran', code: 'ir' } },
    { date: '22/06', time: '05:00', group: 'H', team1: { name: 'Uruguay', code: 'uy' }, team2: { name: 'Cape Verde', code: 'cv' } },
    { date: '22/06', time: '08:00', group: 'G', team1: { name: 'New Zealand', code: 'nz' }, team2: { name: 'Ai Cập', code: 'eg' } },
    { date: '23/06', time: '00:00', group: 'J', team1: { name: 'Argentina', code: 'ar' }, team2: { name: 'Áo', code: 'at' } },
    { date: '23/06', time: '04:00', group: 'I', team1: { name: 'Pháp', code: 'fr' }, team2: { name: 'Iraq', code: 'iq' } },
    { date: '23/06', time: '07:00', group: 'I', team1: { name: 'Na Uy', code: 'no' }, team2: { name: 'Senegal', code: 'sn' } },
    { date: '23/06', time: '10:00', group: 'J', team1: { name: 'Jordan', code: 'jo' }, team2: { name: 'Algeria', code: 'dz' } },
    { date: '24/06', time: '00:00', group: 'K', team1: { name: 'Bồ Đào Nha', code: 'pt' }, team2: { name: 'Uzbekistan', code: 'uz' } },
    { date: '24/06', time: '03:00', group: 'L', team1: { name: 'Anh', code: 'gb-eng' }, team2: { name: 'Ghana', code: 'gh' } },
    { date: '24/06', time: '06:00', group: 'L', team1: { name: 'Panama', code: 'pa' }, team2: { name: 'Croatia', code: 'hr' } },
    { date: '24/06', time: '09:00', group: 'K', team1: { name: 'Colombia', code: 'co' }, team2: { name: 'CHDC Congo', code: 'cd' } }
];

// ===========================================
// LƯỢT TRẬN 3
// ===========================================

const matchesRound3 = [
    { date: '25/06', time: '02:00', group: 'B', team1: { name: 'Thụy Sĩ', code: 'ch' }, team2: { name: 'Canada', code: 'ca' } },
    { date: '25/06', time: '02:00', group: 'B', team1: { name: 'Bosnia và Herzegovina', code: 'ba' }, team2: { name: 'Qatar', code: 'qa' } },
    { date: '25/06', time: '05:00', group: 'C', team1: { name: 'Scotland', code: 'gb-sct' }, team2: { name: 'Brazil', code: 'br' } },
    { date: '25/06', time: '05:00', group: 'C', team1: { name: 'Morocco', code: 'ma' }, team2: { name: 'Haiti', code: 'ht' } },
    { date: '25/06', time: '08:00', group: 'A', team1: { name: 'CH Czech', code: 'cz' }, team2: { name: 'Mexico', code: 'mx' } },
    { date: '25/06', time: '08:00', group: 'A', team1: { name: 'Nam Phi', code: 'za' }, team2: { name: 'Hàn Quốc', code: 'kr' } },
    { date: '26/06', time: '03:00', group: 'E', team1: { name: 'Curacao', code: 'cw' }, team2: { name: 'Bờ Biển Ngà', code: 'ci' } },
    { date: '26/06', time: '03:00', group: 'E', team1: { name: 'Ecuador', code: 'ec' }, team2: { name: 'Đức', code: 'de' } },
    { date: '26/06', time: '06:00', group: 'F', team1: { name: 'Nhật Bản', code: 'jp' }, team2: { name: 'Thụy Điển', code: 'se' } },
    { date: '26/06', time: '06:00', group: 'F', team1: { name: 'Tunisia', code: 'tn' }, team2: { name: 'Hà Lan', code: 'nl' } },
    { date: '26/06', time: '09:00', group: 'D', team1: { name: 'Thổ Nhĩ Kỳ', code: 'tr' }, team2: { name: 'Mỹ', code: 'us' } },
    { date: '26/06', time: '09:00', group: 'D', team1: { name: 'Paraguay', code: 'py' }, team2: { name: 'Úc', code: 'au' } },
    { date: '27/06', time: '02:00', group: 'I', team1: { name: 'Na Uy', code: 'no' }, team2: { name: 'Pháp', code: 'fr' } },
    { date: '27/06', time: '02:00', group: 'I', team1: { name: 'Senegal', code: 'sn' }, team2: { name: 'Iraq', code: 'iq' } },
    { date: '27/06', time: '07:00', group: 'H', team1: { name: 'Cape Verde', code: 'cv' }, team2: { name: 'Saudi Arabia', code: 'sa' } },
    { date: '27/06', time: '07:00', group: 'H', team1: { name: 'Uruguay', code: 'uy' }, team2: { name: 'Tây Ban Nha', code: 'es' } },
    { date: '27/06', time: '10:00', group: 'G', team1: { name: 'Ai Cập', code: 'eg' }, team2: { name: 'Iran', code: 'ir' } },
    { date: '27/06', time: '10:00', group: 'G', team1: { name: 'New Zealand', code: 'nz' }, team2: { name: 'Bỉ', code: 'be' } },
    { date: '28/06', time: '04:00', group: 'L', team1: { name: 'Panama', code: 'pa' }, team2: { name: 'Anh', code: 'gb-eng' } },
    { date: '28/06', time: '04:00', group: 'L', team1: { name: 'Croatia', code: 'hr' }, team2: { name: 'Ghana', code: 'gh' } },
    { date: '28/06', time: '06:30', group: 'K', team1: { name: 'Colombia', code: 'co' }, team2: { name: 'Bồ Đào Nha', code: 'pt' } },
    { date: '28/06', time: '06:30', group: 'K', team1: { name: 'CHDC Congo', code: 'cd' }, team2: { name: 'Uzbekistan', code: 'uz' } },
    { date: '28/06', time: '09:00', group: 'J', team1: { name: 'Algeria', code: 'dz' }, team2: { name: 'Áo', code: 'at' } },
    { date: '28/06', time: '09:00', group: 'J', team1: { name: 'Jordan', code: 'jo' }, team2: { name: 'Argentina', code: 'ar' } }
];

// ===========================================
// VÒNG 32 ĐỘI (Knockout - Round of 32)
// ===========================================
const matchesRound32 = [
    { date: '29/06', time: '02:00', code: 1,  team1: 'Nhì bảng A',  team2: 'Nhì bảng B' },
    { date: '30/06', time: '00:00', code: 2,  team1: 'Nhất bảng C', team2: 'Nhì bảng F' },
    { date: '30/06', time: '03:30', code: 3,  team1: 'Nhất bảng E', team2: 'Nhì bảng A/B/C/D/F' },
    { date: '30/06', time: '08:00', code: 4,  team1: 'Nhất bảng F', team2: 'Nhì bảng C' },
    { date: '01/07', time: '00:00', code: 5,  team1: 'Nhì bảng E',  team2: 'Nhì bảng I' },
    { date: '01/07', time: '04:00', code: 6,  team1: 'Nhất bảng I', team2: 'Hạng 3 C/D/F/G/H' },
    { date: '01/07', time: '08:00', code: 7,  team1: 'Nhất bảng A', team2: 'Hạng 3 C/E/F/H/I' },
    { date: '01/07', time: '23:00', code: 8,  team1: 'Nhất bảng L', team2: 'Hạng 3 E/H/I/J/K' },
    { date: '02/07', time: '03:00', code: 9,  team1: 'Nhất bảng G', team2: 'Hạng 3 A/E/H/I/J' },
    { date: '02/07', time: '07:00', code: 10, team1: 'Nhất bảng D', team2: 'Hạng 3 B/E/F/I/J' },
    { date: '03/07', time: '02:00', code: 11, team1: 'Nhất bảng H', team2: 'Nhì bảng J' },
    { date: '03/07', time: '06:00', code: 12, team1: 'Nhì bảng K',  team2: 'Nhì bảng L' },
    { date: '03/07', time: '10:00', code: 13, team1: 'Nhất bảng B', team2: 'Hạng 3 E/F/G/I/J' },
    { date: '04/07', time: '01:00', code: 14, team1: 'Nhì bảng D',  team2: 'Nhì bảng G' },
    { date: '04/07', time: '05:00', code: 15, team1: 'Nhất bảng J', team2: 'Nhì bảng H' },
    { date: '04/07', time: '08:30', code: 16, team1: 'Nhất bảng K', team2: 'Hạng 3 D/E/I/J/L' }
];

// ===========================================
// VÒNG 16 ĐỘI (Round of 16)
// ===========================================
const matchesRound16 = [
    { date: '05/07', time: '00:00', code: 17, team1: 'Thắng trận 1',  team2: 'Thắng trận 4' },
    { date: '05/07', time: '04:00', code: 18, team1: 'Thắng trận 3',  team2: 'Thắng trận 6' },
    { date: '06/07', time: '03:00', code: 19, team1: 'Thắng trận 2',  team2: 'Thắng trận 5' },
    { date: '06/07', time: '07:00', code: 20, team1: 'Thắng trận 7',  team2: 'Thắng trận 8' },
    { date: '07/07', time: '02:00', code: 21, team1: 'Thắng trận 11', team2: 'Thắng trận 12' },
    { date: '07/07', time: '07:00', code: 22, team1: 'Thắng trận 10', team2: 'Thắng trận 9' },
    { date: '07/07', time: '23:00', code: 23, team1: 'Thắng trận 15', team2: 'Thắng trận 14' },
    { date: '08/07', time: '03:00', code: 24, team1: 'Thắng trận 13', team2: 'Thắng trận 16' }
];

// ===========================================
// TỨ KẾT (Quarter-finals)
// ===========================================
const matchesQuarter = [
    { date: '10/07', time: '03:00', code: 25, team1: 'Thắng 1/8 - 2', team2: 'Thắng 1/8 - 1' },
    { date: '11/07', time: '02:00', code: 26, team1: 'Thắng 1/8 - 5', team2: 'Thắng 1/8 - 6' },
    { date: '12/07', time: '04:00', code: 27, team1: 'Thắng 1/8 - 3', team2: 'Thắng 1/8 - 4' },
    { date: '12/07', time: '08:00', code: 28, team1: 'Thắng 1/8 - 7', team2: 'Thắng 1/8 - 8' }
];

// ===========================================
// BÁN KẾT (Semi-finals)
// ===========================================
const matchesSemi = [
    { date: '15/07', time: '02:00', code: 29, team1: 'Thắng Tứ kết 1', team2: 'Thắng Tứ kết 2' },
    { date: '16/07', time: '02:00', code: 30, team1: 'Thắng Tứ kết 3', team2: 'Thắng Tứ kết 4' }
];

// ===========================================
// TRANH HẠNG 3
// ===========================================
const matchThirdPlace = [
    { date: '19/07', time: '04:00', code: 31, team1: 'Thua Bán kết 1', team2: 'Thua Bán kết 2' }
];

// ===========================================
// CHUNG KẾT (Final)
// ===========================================
const matchFinal = [
    { date: '20/07', time: '02:00', code: 32, team1: 'Thắng Bán kết 1', team2: 'Thắng Bán kết 2' }
];

// ===========================================
// ROADMAP BRACKET - Cấu trúc cây knockout
// Có thể chỉnh sửa bằng tay hoặc load từ API
// ===========================================
const bracketData = {
    round16: [ // Vòng 1/8 (16 đội = 8 trận)
        { code: 17, date: '05/07', time: '00:00', team1: 'Thắng trận 1',  team2: 'Thắng trận 4' },
        { code: 18, date: '05/07', time: '04:00', team1: 'Thắng trận 3',  team2: 'Thắng trận 6' },
        { code: 19, date: '06/07', time: '03:00', team1: 'Thắng trận 2',  team2: 'Thắng trận 5' },
        { code: 20, date: '06/07', time: '07:00', team1: 'Thắng trận 7',  team2: 'Thắng trận 8' },
        { code: 21, date: '07/07', time: '02:00', team1: 'Thắng trận 11', team2: 'Thắng trận 12' },
        { code: 22, date: '07/07', time: '07:00', team1: 'Thắng trận 10', team2: 'Thắng trận 9' },
        { code: 23, date: '07/07', time: '23:00', team1: 'Thắng trận 15', team2: 'Thắng trận 14' },
        { code: 24, date: '08/07', time: '03:00', team1: 'Thắng trận 13', team2: 'Thắng trận 16' }
    ],
    quarter: [ // Tứ kết
        { code: 25, date: '10/07', time: '03:00', team1: 'Thắng 1/8 - 1', team2: 'Thắng 1/8 - 2' },
        { code: 26, date: '11/07', time: '02:00', team1: 'Thắng 1/8 - 5', team2: 'Thắng 1/8 - 6' },
        { code: 27, date: '12/07', time: '04:00', team1: 'Thắng 1/8 - 3', team2: 'Thắng 1/8 - 4' },
        { code: 28, date: '12/07', time: '08:00', team1: 'Thắng 1/8 - 7', team2: 'Thắng 1/8 - 8' }
    ],
    semi: [ // Bán kết
        { code: 29, date: '15/07', time: '02:00', team1: 'Thắng Tứ kết 1', team2: 'Thắng Tứ kết 2' },
        { code: 30, date: '16/07', time: '02:00', team1: 'Thắng Tứ kết 3', team2: 'Thắng Tứ kết 4' }
    ],
    thirdPlace: { code: 31, date: '19/07', time: '04:00', team1: 'Thua Bán kết 1', team2: 'Thua Bán kết 2' },
    final: { code: 32, date: '20/07', time: '02:00', team1: 'Thắng Bán kết 1', team2: 'Thắng Bán kết 2' }
};
// ============================================================
// MODULE 1: RENDER TRẬN ĐẤU
// ============================================================
const MatchRenderer = {
    /**
     * Tạo HTML cho 1 hàng đội bóng
     */
    teamRow(team) {
        return `
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/${team.code}.png" 
                         alt="${team.name}" 
                         loading="lazy"
                         class="w-6 h-6 rounded-full object-cover border border-gray-200">
                    <span class="font-semibold text-gray-800">${team.name}</span>
                </div>
                <span class="text-gray-300 font-medium">-</span>
            </div>
        `;
    },

    /**
     * Tạo HTML cho 1 card trận đấu (Đã tích hợp tỷ số)
     */
    matchCard(match) {
        // Gọi hàm lấy tỷ số từ Local Storage
        const matchData = typeof WCScoreManager !== 'undefined' 
            ? WCScoreManager.getScore(match.team1.name, match.team2.name) 
            : null;

        // Nếu có tỷ số (khác null), hiển thị tỷ số. Nếu chưa đá, hiển thị dấu "-"
        const score1 = (matchData && matchData.homeScore !== null) ? matchData.homeScore : '-';
        const score2 = (matchData && matchData.awayScore !== null) ? matchData.awayScore : '-';
        
        // Trạng thái trận đấu (FT: Hết giờ, Live, v.v.)
        const statusHtml = matchData && matchData.status !== 'NS' 
            ? `<span class="mt-1 text-[9px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded animate-pulse">${matchData.status}</span>` 
            : `<span class="mt-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Bảng ${match.group}</span>`;

        return `
            <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center">
                <div class="flex flex-col items-center justify-center w-20 border-r border-gray-100 pr-3 shrink-0">
                    <span class="text-xs text-gray-500 font-medium">${match.date}</span>
                    <span class="text-lg font-bold text-gray-800 leading-tight">${match.time}</span>
                    ${statusHtml}
                </div>
                <div class="flex-1 pl-4 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="https://flagcdn.com/w40/${match.team1.code}.png" alt="${match.team1.name}" class="w-6 h-6 rounded-full object-cover border border-gray-200">
                            <span class="font-semibold text-gray-800">${match.team1.name}</span>
                        </div>
                        <span class="text-lg font-bold ${score1 !== '-' ? 'text-blue-600' : 'text-gray-300'}">${score1}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="https://flagcdn.com/w40/${match.team2.code}.png" alt="${match.team2.name}" class="w-6 h-6 rounded-full object-cover border border-gray-200">
                            <span class="font-semibold text-gray-800">${match.team2.name}</span>
                        </div>
                        <span class="text-lg font-bold ${score2 !== '-' ? 'text-blue-600' : 'text-gray-300'}">${score2}</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Render danh sách trận vào container
     */
    render(containerId, matchesData) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`[MatchRenderer] Không tìm thấy element: #${containerId}`);
            return;
        }
        if (!Array.isArray(matchesData) || matchesData.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-4">Chưa có dữ liệu</p>';
            return;
        }
        container.innerHTML = matchesData.map(m => this.matchCard(m)).join('');
    },
    /**
     * Template cho 1 trận đấu KNOCKOUT (không cần cờ, chỉ text)
     */
    knockoutCard(match) {
        return `
            <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center">
                <div class="flex flex-col items-center justify-center w-20 border-r border-gray-100 pr-3 shrink-0">
                    <span class="text-xs text-gray-500 font-medium">${match.date}</span>
                    <span class="text-lg font-bold text-gray-800 leading-tight">${match.time}</span>
                    <span class="mt-1 text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded">Trận ${match.code}</span>
                </div>
                <div class="flex-1 pl-4 flex items-center justify-center text-center">
                    <span class="font-semibold text-gray-700 text-sm">${match.team1}</span>
                    <span class="mx-2 text-gray-400 font-bold">vs</span>
                    <span class="font-semibold text-gray-700 text-sm">${match.team2}</span>
                </div>
            </div>
        `;
    },

    /**
     * Render danh sách trận knockout
     */
    renderKnockout(containerId, matchesData) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`[MatchRenderer] Không tìm thấy: #${containerId}`);
            return;
        }
        if (!Array.isArray(matchesData) || matchesData.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-4">Chưa có dữ liệu</p>';
            return;
        }
        container.innerHTML = matchesData.map(m => this.knockoutCard(m)).join('');
    },
    renderSingleKnockout(containerId, match, options = {}) {
            const container = document.getElementById(containerId);
            if (!container || !match) return;
            
            const { highlight = false, label = '' } = options;
            const bgClass = highlight 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                : 'bg-white border border-gray-100';
            const textClass = highlight ? 'text-white' : 'text-gray-800';
            const labelClass = highlight ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600';

            container.innerHTML = `
                <div class="${bgClass} rounded-xl p-4 shadow-md flex items-center">
                    <div class="flex flex-col items-center justify-center w-24 border-r ${highlight ? 'border-white/30' : 'border-gray-100'} pr-3 shrink-0">
                        <span class="text-xs ${highlight ? 'text-white/80' : 'text-gray-500'} font-medium">${match.date}</span>
                        <span class="text-xl font-bold ${textClass} leading-tight">${match.time}</span>
                        <span class="mt-1 text-[10px] font-bold ${labelClass} px-2 py-0.5 rounded">${label || 'Trận ' + match.code}</span>
                    </div>
                    <div class="flex-1 pl-4 flex items-center justify-center text-center">
                        <span class="font-bold ${textClass}">${match.team1}</span>
                        <span class="mx-3 ${highlight ? 'text-white/70' : 'text-gray-400'} font-bold">VS</span>
                        <span class="font-bold ${textClass}">${match.team2}</span>
                    </div>
                </div>
            `;
        },
    /**
     * Khởi tạo - render tất cả các lượt trận
     */
    init() {
        // Vòng bảng
        this.render('matches-round-1', typeof matchesRound1 !== 'undefined' ? matchesRound1 : []);
        this.render('matches-round-2', typeof matchesRound2 !== 'undefined' ? matchesRound2 : []);
        this.render('matches-round-3', typeof matchesRound3 !== 'undefined' ? matchesRound3 : []);
        
        // Vòng knockout
        this.renderKnockout('matches-round-32', typeof matchesRound32 !== 'undefined' ? matchesRound32 : []);
        this.renderKnockout('matches-round-16', typeof matchesRound16 !== 'undefined' ? matchesRound16 : []);
        this.renderKnockout('matches-quarter', typeof matchesQuarter !== 'undefined' ? matchesQuarter : []);
        this.renderKnockout('matches-semi', typeof matchesSemi !== 'undefined' ? matchesSemi : []);
        
        // Tranh hạng 3 + Chung kết
        if (typeof matchThirdPlace !== 'undefined') {
            this.renderSingleKnockout('match-third-place', matchThirdPlace[0], { label: 'Hạng 3' });
        }
        if (typeof matchFinal !== 'undefined') {
            this.renderSingleKnockout('match-final', matchFinal[0], { highlight: true, label: '🏆 CHUNG KẾT' });
        }
        
        // Render bracket roadmap
        BracketRenderer.init();
    }
};


// ============================================================
// MODULE 2: PANEL TOGGLE (Mở/Đóng panel World Cup)
// ============================================================
const WCPanel = {
    openBtn: null,
    closeBtn: null,
    panel: null,
    ANIMATION_DURATION: 300, // ms - khớp với duration-300 trong Tailwind

    init() {
        this.openBtn = document.getElementById('btn-open-wc');
        this.closeBtn = document.getElementById('btn-close-wc');
        this.panel = document.getElementById('wc-panel');

        if (!this.openBtn || !this.closeBtn || !this.panel) {
            console.warn('[WCPanel] Thiếu element cần thiết');
            return;
        }

        this.bindEvents();
    },

    bindEvents() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());

        // Đóng panel khi nhấn ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.panel.classList.contains('invisible')) {
                this.close();
            }
        });
    },

    open() {
        // 1. Bỏ invisible để có thể animate
        this.panel.classList.remove('invisible');
        
        // 2. Trigger animation slide-in (delay để browser repaint)
        requestAnimationFrame(() => {
            this.panel.classList.remove('translate-x-full');
        });

        // 3. Khóa scroll body
        document.body.classList.add('overflow-hidden');
    },

    close() {
        // 1. Animate slide-out
        this.panel.classList.add('translate-x-full');

        // 2. Ẩn hoàn toàn sau khi animation xong
        setTimeout(() => {
            this.panel.classList.add('invisible');
        }, this.ANIMATION_DURATION);

        // 3. Mở khóa scroll body
        document.body.classList.remove('overflow-hidden');
    }
};


// ============================================================
// MODULE 3: NAVIGATION (Nav menu + Scroll Spy)
// ============================================================
const WCNav = {
    navBtns: null,
    navContainer: null,
    scrollContainer: null,
    sections: null,
    observer: null,
    
    // Cờ ngăn scroll-spy can thiệp khi user click nút
    isProgrammaticScroll: false,
    scrollLockTimeout: null,
    
    NAV_OFFSET: 80, // Khoảng cách từ top khi scroll đến section

    init() {
        this.navBtns = document.querySelectorAll('.wc-nav-btn');
        this.navContainer = document.querySelector('.wc-nav-container');
        this.scrollContainer = document.getElementById('wc-main-scroll');
        this.sections = document.querySelectorAll('#wc-main-scroll section[id]');

        if (!this.navBtns.length || !this.scrollContainer) {
            console.warn('[WCNav] Thiếu element cần thiết');
            return;
        }

        this.bindClickEvents();
        this.initScrollSpy();
    },

    /**
     * Bind sự kiện click cho các nút nav
     */
    bindClickEvents() {
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                this.scrollToSection(targetId);
                this.setActive(btn);
            });
        });
    },

    /**
     * Cuộn mượt đến section đích
     */
    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) {
            console.warn(`[WCNav] Không tìm thấy section: #${targetId}`);
            return;
        }

        // Tính vị trí scroll dùng getBoundingClientRect (đơn giản & chính xác)
        const containerRect = this.scrollContainer.getBoundingClientRect();
        const targetRect = targetSection.getBoundingClientRect();
        const scrollPos = this.scrollContainer.scrollTop 
                        + (targetRect.top - containerRect.top) 
                        - this.NAV_OFFSET;

        // Khóa scroll-spy trong khi scroll programmatic
        this.lockScrollSpy();

        this.scrollContainer.scrollTo({
            top: Math.max(0, scrollPos),
            behavior: 'smooth'
        });
    },

    /**
     * Khóa scroll-spy tạm thời để tránh xung đột khi click nút
     */
    // lockScrollSpy() {
    //     this.isProgrammaticScroll = true;
    //     clearTimeout(this.scrollLockTimeout);
    //     this.scrollLockTimeout = setTimeout(() => {
    //         this.isProgrammaticScroll = false;
    //     }, 800); // Đủ thời gian cho smooth scroll hoàn tất
    // },
    lockScrollSpy() {
        this.isProgrammaticScroll = true;
        clearTimeout(this.scrollLockTimeout);
        
        // Tăng timeout từ 120ms lên 1000ms để smooth scroll hoàn tất
        // Tránh IntersectionObserver trigger quá thường xuyên
        this.scrollLockTimeout = setTimeout(() => {
            this.isProgrammaticScroll = false;
        }, 1000);
    },

    /**
     * Đặt nút active + tự cuộn thanh nav ngang đến nút đó
     */
    setActive(activeBtn) {
        if (!activeBtn) return;

        // Nếu nút hiện tại đã active => bỏ qua để tránh reflow
        if (this.currentActiveBtn === activeBtn) {
            return;
        }

        this.currentActiveBtn = activeBtn;

        // Chỉ update class cho nút cần thay đổi (tránh toàn bộ DOM reflow)
        this.navBtns.forEach(btn => {
            const isActive = btn === activeBtn;
            
            // Chỉ cập nhật nếu trạng thái thực sự thay đổi
            if (isActive && !btn.classList.contains('bg-blue-600')) {
                btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
                btn.classList.remove('bg-gray-100', 'text-gray-700');
            } else if (!isActive && btn.classList.contains('bg-blue-600')) {
                btn.classList.add('bg-gray-100', 'text-gray-700');
                btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
            }
        });

        // Tự cuộn nav ngang để nút active luôn hiển thị
        this.scrollNavToBtn(activeBtn);
    },

    /**
     * Cuộn thanh nav ngang sao cho nút active ở giữa
     * (Tránh dùng scrollIntoView vì có thể ảnh hưởng scroll page)
     */
    // scrollNavToBtn(btn) {
    //     if (!this.navContainer) return;

    //     const btnCenter = btn.offsetLeft + (btn.offsetWidth / 2);
    //     const targetScrollLeft = btnCenter - (this.navContainer.clientWidth / 2);

    //     this.navContainer.scrollTo({
    //         left: Math.max(0, targetScrollLeft),
    //         behavior: 'smooth'
    //     });
    // },
    scrollNavToBtn(btn) {
        if (!this.navContainer) return;

        const btnCenter =
            btn.offsetLeft + btn.offsetWidth / 2;

        const targetScrollLeft =
            btnCenter - this.navContainer.clientWidth / 2;

        const distance =
            Math.abs(
                this.navContainer.scrollLeft -
                targetScrollLeft
            );

        if (distance < 20) return;

        this.navContainer.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'auto'  // Thay 'smooth' bằng 'auto' để tránh animation giật
        });
    },
    /**
     * Scroll Spy với IntersectionObserver (hiệu năng cao)
     * DISABLED: Gây giật khi scroll - chỉ giữ click-to-scroll
     */
    initScrollSpy() {
        // Tạm disable để tránh giật
        // Nếu muốn bật lại: uncomment code dưới
        return;
        
        /*
        if (!('IntersectionObserver' in window)) {
            console.warn('[WCNav] Trình duyệt không hỗ trợ IntersectionObserver');
            return;
        }

        const options = {
            root: this.scrollContainer,
            rootMargin: `-${this.NAV_OFFSET}px 0px -66% 0px`,
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            if (this.isProgrammaticScroll) return;

            const visibleSections = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visibleSections.length) return;

            const activeSection = visibleSections[0];

            const btn = document.querySelector(
                `.wc-nav-btn[data-target="${activeSection.target.id}"]`
            );

            if (btn) {
                this.setActive(btn);
            }
        }, options);

        this.sections.forEach(section => this.observer.observe(section));
        */
    }
};


// ============================================================
// KHỞI CHẠY ỨNG DỤNG
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    MatchRenderer.init();
    WCPanel.init();
    WCNav.init();

    // Gọi API lấy tỷ số (không lo spam vì đã có cache 15 phút)
    WCScoreManager.fetchAndSaveScores();
});

// ============================================================
// MODULE 5: BRACKET RENDERER (Sơ đồ knockout dạng cây)
// ============================================================
const BracketRenderer = {
    container: null,
    data: null,
    
    init() {
        this.container = document.getElementById('bracket-container');
        if (!this.container) return;
        if (typeof bracketData === 'undefined') return;
        
        this.data = bracketData;
        this.render();
        this.bindEditEvents();
    },

    /**
     * Render bracket card - 1 ô trận đấu
     */
    matchBox(match, level = 'normal') {
        const colors = {
            r16:     { bg: 'bg-emerald-50',  border: 'border-emerald-200',  badge: 'bg-emerald-500' },
            quarter: { bg: 'bg-purple-50',   border: 'border-purple-200',   badge: 'bg-purple-500' },
            semi:    { bg: 'bg-yellow-50',   border: 'border-yellow-200',   badge: 'bg-yellow-500' },
            third:   { bg: 'bg-cyan-50',     border: 'border-cyan-200',     badge: 'bg-cyan-500' },
            final:   { bg: 'bg-orange-50',   border: 'border-orange-300',   badge: 'bg-orange-500' }
        };
        const c = colors[level] || colors.r16;

        return `
            <div class="bracket-match ${c.bg} ${c.border} border rounded-lg p-2 shadow-sm" 
                 data-code="${match.code}">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[9px] text-gray-500 font-medium">${match.date} • ${match.time}</span>
                    <span class="text-[9px] font-bold text-white ${c.badge} px-1.5 rounded">#${match.code}</span>
                </div>
                <div class="space-y-1">
                    <input type="text" 
                           class="bracket-team-input w-full text-xs font-semibold text-gray-800 bg-white/70 rounded px-2 py-1 border border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none transition"
                           value="${match.team1}" 
                           data-code="${match.code}" 
                           data-team="team1"
                           placeholder="Tên đội 1">
                    <input type="text" 
                           class="bracket-team-input w-full text-xs font-semibold text-gray-800 bg-white/70 rounded px-2 py-1 border border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none transition"
                           value="${match.team2}" 
                           data-code="${match.code}" 
                           data-team="team2"
                           placeholder="Tên đội 2">
                </div>
            </div>
        `;
    },

    /**
     * Render toàn bộ bracket
     */
    render() {
        const { round16, quarter, semi, thirdPlace, final } = this.data;
        
        // Chia round16 thành 2 nửa (trái: 1-4, phải: 5-8)
        const r16Left = round16.slice(0, 4);
        const r16Right = round16.slice(4, 8);
        const quarterLeft = quarter.slice(0, 2);
        const quarterRight = quarter.slice(2, 4);
        const semiLeft = semi[0];
        const semiRight = semi[1];

        this.container.innerHTML = `
            <!-- Header bracket -->
            <div class="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 rounded-t-2xl">
                <h3 class="text-center text-lg font-bold flex items-center justify-center gap-2">
                    🗺️ Sơ đồ Roadmap World Cup 2026
                </h3>
                <p class="text-center text-xs text-blue-200 mt-1">💡 Click vào tên đội để chỉnh sửa</p>
            </div>

            <!-- Bracket Grid -->
            <div class="bg-gradient-to-b from-blue-50 to-purple-50 p-3 rounded-b-2xl overflow-x-auto">
                <div class="bracket-grid" style="min-width: 1100px;">
                    
                    <!-- Header labels -->
                    <div class="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold">
                        <div class="text-emerald-600">VÒNG 1/8</div>
                        <div class="text-purple-600">TỨ KẾT</div>
                        <div class="text-yellow-600">BÁN KẾT</div>
                        <div class="text-orange-600">🏆 CHUNG KẾT</div>
                        <div class="text-yellow-600">BÁN KẾT</div>
                        <div class="text-purple-600">TỨ KẾT</div>
                        <div class="text-emerald-600">VÒNG 1/8</div>
                    </div>

                    <!-- Bracket body -->
                    <div class="grid grid-cols-7 gap-2 items-center">
                        
                        <!-- Cột 1: Vòng 1/8 trái -->
                        <div class="space-y-3">
                            ${r16Left.map(m => this.matchBox(m, 'r16')).join('')}
                        </div>
                        
                        <!-- Cột 2: Tứ kết trái -->
                        <div class="space-y-12">
                            ${quarterLeft.map(m => this.matchBox(m, 'quarter')).join('')}
                        </div>
                        
                        <!-- Cột 3: Bán kết trái -->
                        <div class="flex items-center justify-center">
                            ${this.matchBox(semiLeft, 'semi')}
                        </div>
                        
                        <!-- Cột 4: Chung kết -->
                        <div class="space-y-3">
                            <div class="text-center">
                                <div class="text-4xl mb-2">🏆</div>
                            </div>
                            ${this.matchBox(final, 'final')}
                            <div class="text-center text-[10px] text-gray-500 font-semibold mt-2">TRANH HẠNG 3</div>
                            ${this.matchBox(thirdPlace, 'third')}
                        </div>
                        
                        <!-- Cột 5: Bán kết phải -->
                        <div class="flex items-center justify-center">
                            ${this.matchBox(semiRight, 'semi')}
                        </div>
                        
                        <!-- Cột 6: Tứ kết phải -->
                        <div class="space-y-12">
                            ${quarterRight.map(m => this.matchBox(m, 'quarter')).join('')}
                        </div>
                        
                        <!-- Cột 7: Vòng 1/8 phải -->
                        <div class="space-y-3">
                            ${r16Right.map(m => this.matchBox(m, 'r16')).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Toolbar -->
            <div class="bg-white p-3 rounded-b-2xl border-t border-gray-100 flex flex-wrap gap-2 justify-center">
                <button id="btn-save-bracket" class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    💾 Lưu thay đổi
                </button>
                <button id="btn-reset-bracket" class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition flex items-center gap-2">
                    🔄 Khôi phục mặc định
                </button>
                <button id="btn-export-bracket" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    📤 Xuất JSON
                </button>
            </div>
        `;
    },

    /**
     * Bind sự kiện chỉnh sửa
     */
    bindEditEvents() {
        // Update real-time khi typing
        this.container.addEventListener('input', (e) => {
            if (e.target.classList.contains('bracket-team-input')) {
                const code = parseInt(e.target.dataset.code);
                const team = e.target.dataset.team;
                this.updateMatchData(code, team, e.target.value);
            }
        });

        // Nút Save
        document.getElementById('btn-save-bracket')?.addEventListener('click', () => {
            this.saveToLocalStorage();
            this.showToast('✅ Đã lưu thành công!');
        });

        // Nút Reset
        document.getElementById('btn-reset-bracket')?.addEventListener('click', () => {
            if (confirm('Khôi phục về mặc định? Mọi thay đổi sẽ bị mất!')) {
                localStorage.removeItem('wc-bracket-data');
                location.reload();
            }
        });

        // Nút Export
        document.getElementById('btn-export-bracket')?.addEventListener('click', () => {
            this.exportJSON();
        });

        // Load từ localStorage nếu có
        this.loadFromLocalStorage();
    },

    /**
     * Cập nhật data khi user sửa
     */
    updateMatchData(code, team, value) {
        const allMatches = [
            ...this.data.round16,
            ...this.data.quarter,
            ...this.data.semi,
            this.data.thirdPlace,
            this.data.final
        ];
        const match = allMatches.find(m => m.code === code);
        if (match) match[team] = value;
    },

    /**
     * Lưu vào localStorage
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('wc-bracket-data', JSON.stringify(this.data));
        } catch (e) {
            console.error('[Bracket] Lỗi lưu:', e);
        }
    },

    /**
     * Load từ localStorage
     */
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('wc-bracket-data');
            if (saved) {
                this.data = JSON.parse(saved);
                this.render();
                this.bindEditEvents();
            }
        } catch (e) {
            console.error('[Bracket] Lỗi load:', e);
        }
    },

    /**
     * Xuất JSON
     */
    exportJSON() {
        const json = JSON.stringify(this.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wc-bracket-data.json';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('📤 Đã tải xuống JSON!');
    },

    /**
     * Load data từ API (dành cho tương lai)
     * @param {Object} apiData - Dữ liệu từ API
     */
    loadFromAPI(apiData) {
        if (!apiData) return;
        this.data = apiData;
        this.render();
        this.bindEditEvents();
    },

    /**
     * Hiện toast thông báo
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-[100] text-sm';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
};

// ============================================================
// MODULE 6: TÍCH HỢP FOOTBALL-DATA.ORG (MIỄN PHÍ - 10 REQ/PHÚT)
// ============================================================
const WCScoreManager = {
    API_KEY: '4f8d79f51c3543f8887fe17f80105b4c', 
    COMPETITION_ID: 2000, // 2000 là ID cố định của giải FIFA World Cup trên nền tảng này
    SEASON: 2026,         // Để 2022 để test xem tỷ số có lên không. Gần giải đổi thành 2026.
    CACHE_TIME: 15 * 60 * 1000, // Cache 15 phút để không bị khóa API (Giới hạn 10 req/phút)

    // Từ điển dịch tên Đội bóng: Tiếng Anh (Football-Data) -> Tiếng Việt (Source của bạn)
    TEAM_NAME_MAP: {
        "mexico": "mexico",
        "south africa": "nam phi",
        "south korea": "hàn quốc",
        "czech republic": "ch czech",
        "canada": "canada",
        "bosnia and herzegovina": "bosnia và herzegovina",
        "united states": "mỹ", // Tên của Mỹ thường được ghi đầy đủ trên API này
        "paraguay": "paraguay",
        "qatar": "qatar",
        "ecuador": "ecuador",
        "senegal": "senegal",
        "netherlands": "hà lan",
        "england": "anh",
        "iran": "iran",
        "wales": "wales",
        "argentina": "argentina",
        "saudi arabia": "saudi arabia",
        "poland": "ba lan",
        "france": "pháp",
        "australia": "úc",
        "denmark": "đan mạch",
        "tunisia": "tunisia",
        "spain": "tây ban nha",
        "costa rica": "costa rica",
        "germany": "đức",
        "japan": "nhật bản",
        "belgium": "bỉ",
        "morocco": "ma-rốc",
        "croatia": "croatia",
        "brazil": "brazil",
        "serbia": "serbia",
        "switzerland": "thụy sĩ",
        "cameroon": "cameroon",
        "portugal": "bồ đào nha",
        "ghana": "ghana",
        "uruguay": "uruguay"
    },

    async fetchAndSaveScores() {
        const lastUpdate = localStorage.getItem('wc_last_update');
        const now = new Date().getTime();

        if (lastUpdate && (now - lastUpdate < this.CACHE_TIME)) {
            console.log('⚽ [Football-Data] Sử dụng tỷ số lưu tại LocalStorage');
            return;
        }

        try {
            console.log('⚽ [Football-Data] Đang gọi API lấy dữ liệu...');
            
            const response = await fetch(`https://api.football-data.org/v4/competitions/${this.COMPETITION_ID}/matches?season=${this.SEASON}`, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': this.API_KEY // Header đặc trưng của Football-Data.org
                }
            });
            
            const data = await response.json();

            if (data.errorCode) {
                console.error("❌ Lỗi API:", data.message);
                return;
            }

            // Mảng chứa dữ liệu trận đấu nằm trong trường data.matches
            if (data.matches && data.matches.length > 0) {
                const scoreMap = {};
                
                data.matches.forEach(match => {
                    const apiHomeEn = match.homeTeam.name ? match.homeTeam.name.toLowerCase() : "";
                    const apiAwayEn = match.awayTeam.name ? match.awayTeam.name.toLowerCase() : "";

                    const homeVi = this.TEAM_NAME_MAP[apiHomeEn] || apiHomeEn;
                    const awayVi = this.TEAM_NAME_MAP[apiAwayEn] || apiAwayEn;

                    const key = `${homeVi}-${awayVi}`;
                    
                    // Rút gọn trạng thái trận đấu
                    let shortStatus = 'NS'; 
                    if (match.status === 'FINISHED') shortStatus = 'FT';
                    else if (match.status === 'IN_PLAY' || match.status === 'PAUSED') shortStatus = 'Live';
                    else if (match.status === 'POSTPONED') shortStatus = 'Hoãn';
                    
                    // Tỷ số ở phút cuối cùng nằm trong fullTime
                    scoreMap[key] = {
                        homeScore: match.score.fullTime.home, // null nếu chưa có
                        awayScore: match.score.fullTime.away,
                        status: shortStatus
                    };
                });

                localStorage.setItem('wc_scores', JSON.stringify(scoreMap));
                localStorage.setItem('wc_last_update', now.toString());
                console.log('💾 [Football-Data] Đã cập nhật và lưu tỷ số mới vào LocalStorage!');
                
                if (typeof MatchRenderer !== 'undefined' && MatchRenderer.init) {
                    MatchRenderer.init();
                }
            }
        } catch (error) {
            console.error("❌ [Football-Data] Lỗi kết nối mạng hoặc xử lý logic:", error);
        }
    },

    getScore(team1Name, team2Name) {
        const scores = JSON.parse(localStorage.getItem('wc_scores')) || {};
        const key = `${team1Name.toLowerCase()}-${team2Name.toLowerCase()}`;
        
        if (scores[key]) return scores[key];
        
        const reverseKey = `${team2Name.toLowerCase()}-${team1Name.toLowerCase()}`;
        if (scores[reverseKey]) {
            return {
                homeScore: scores[reverseKey].awayScore,
                awayScore: scores[reverseKey].homeScore,
                status: scores[reverseKey].status
            };
        }
        return null;
    }
};