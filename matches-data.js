/**
 * ============================================================
 * WORLD CUP 2026 - APP CONTROLLER (GIỮ RENDER CHUNG KẾT/HANG 3 ĐẶC BIỆT)
 * ============================================================
 */

'use strict';

// ===========================================
// DỮ LIỆU LỊCH THI ĐẤU VÒNG BẢNG ĐẦY ĐỦ (24 TRẬN)
// ===========================================
let matchesRound1 = [
    { code: "B1", date: '12/06', time: '02:00', group: 'A', team1: { name: 'Mexico', code: 'mx' }, team2: { name: 'Nam Phi', code: 'za' } },
    { code: "B2", date: '12/06', time: '09:00', group: 'A', team1: { name: 'Hàn Quốc', code: 'kr' }, team2: { name: 'CH Czech', code: 'cz' } },
    { code: "B3", date: '13/06', time: '02:00', group: 'B', team1: { name: 'Canada', code: 'ca' }, team2: { name: 'Bosnia và Herzegovina', code: 'ba' } },
    { code: "B4", date: '13/06', time: '08:00', group: 'D', team1: { name: 'Mỹ', code: 'us' }, team2: { name: 'Paraguay', code: 'py' } },
    { code: "B5", date: '14/06', time: '02:00', group: 'B', team1: { name: 'Qatar', code: 'qa' }, team2: { name: 'Thụy Sĩ', code: 'ch' } },
    { code: "B6", date: '14/06', time: '05:00', group: 'C', team1: { name: 'Brazil', code: 'br' }, team2: { name: 'Morocco', code: 'ma' } },
    { code: "B7", date: '14/06', time: '08:00', group: 'C', team1: { name: 'Haiti', code: 'ht' }, team2: { name: 'Scotland', code: 'gb-sct' } },
    { code: "B8", date: '14/06', time: '11:00', group: 'D', team1: { name: 'Úc', code: 'au' }, team2: { name: 'Thổ Nhĩ Kỳ', code: 'tr' } },
    { code: "B9", date: '15/06', time: '00:00', group: 'E', team1: { name: 'Đức', code: 'de' }, team2: { name: 'Curacao', code: 'cw' } },
    { code: "B10", date: '15/06', time: '03:00', group: 'F', team1: { name: 'Hà Lan', code: 'nl' }, team2: { name: 'Nhật Bản', code: 'jp' } },
    { code: "B11", date: '15/06', time: '06:00', group: 'E', team1: { name: 'Bờ Biển Ngà', code: 'ci' }, team2: { name: 'Ecuador', code: 'ec' } },
    { code: "B12", date: '15/06', time: '09:00', group: 'F', team1: { name: 'Thụy Điển', code: 'se' }, team2: { name: 'Tunisia', code: 'tn' } },
    { code: "B13", date: '15/06', time: '23:00', group: 'H', team1: { name: 'Tây Ban Nha', code: 'es' }, team2: { name: 'Cape Verde', code: 'cv' } },
    { code: "B14", date: '16/06', time: '02:00', group: 'G', team1: { name: 'Bỉ', code: 'be' }, team2: { name: 'Ai Cập', code: 'eg' } },
    { code: "B15", date: '16/06', time: '05:00', group: 'H', team1: { name: 'Saudi Arabia', code: 'sa' }, team2: { name: 'Uruguay', code: 'uy' } },
    { code: "B16", date: '16/06', time: '08:00', group: 'G', team1: { name: 'Iran', code: 'ir' }, team2: { name: 'New Zealand', code: 'nz' } },
    { code: "B17", date: '17/06', time: '02:00', group: 'I', team1: { name: 'Pháp', code: 'fr' }, team2: { name: 'Senegal', code: 'sn' } },
    { code: "B18", date: '17/06', time: '05:00', group: 'I', team1: { name: 'Iraq', code: 'iq' }, team2: { name: 'Na Uy', code: 'no' } },
    { code: "B19", date: '17/06', time: '08:00', group: 'J', team1: { name: 'Argentina', code: 'ar' }, team2: { name: 'Algeria', code: 'dz' } },
    { code: "B20", date: '17/06', time: '11:00', group: 'J', team1: { name: 'Áo', code: 'at' }, team2: { name: 'Jordan', code: 'jo' } },
    { code: "B21", date: '18/06', time: '00:00', group: 'K', team1: { name: 'Bồ Đào Nha', code: 'pt' }, team2: { name: 'CHDC Congo', code: 'cd' } },
    { code: "B22", date: '18/06', time: '03:00', group: 'K', team1: { name: 'Anh', code: 'gb-eng' }, team2: { name: 'Croatia', code: 'hr' } },
    { code: "B23", date: '18/06', time: '06:00', group: 'L', team1: { name: 'Ghana', code: 'gh' }, team2: { name: 'Panama', code: 'pa' } },
    { code: "B24", date: '18/06', time: '09:00', group: 'K', team1: { name: 'Uzbekistan', code: 'uz' }, team2: { name: 'Colombia', code: 'co' } }
];

let matchesRound2 = [
    { code: "B25", date: '18/06', time: '23:00', group: 'A', team1: { name: 'CH Czech', code: 'cz' }, team2: { name: 'Nam Phi', code: 'za' } },
    { code: "B26", date: '19/06', time: '02:00', group: 'B', team1: { name: 'Thụy Sĩ', code: 'ch' }, team2: { name: 'Bosnia và Herzegovina', code: 'ba' } },
    { code: "B27", date: '19/06', time: '05:00', group: 'B', team1: { name: 'Canada', code: 'ca' }, team2: { name: 'Qatar', code: 'qa' } },
    { code: "B28", date: '19/06', time: '08:00', group: 'A', team1: { name: 'Mexico', code: 'mx' }, team2: { name: 'Hàn Quốc', code: 'kr' } },
    { code: "B29", date: '20/06', time: '02:00', group: 'D', team1: { name: 'Mỹ', code: 'us' }, team2: { name: 'Úc', code: 'au' } },
    { code: "B30", date: '20/06', time: '05:00', group: 'C', team1: { name: 'Scotland', code: 'gb-sct' }, team2: { name: 'Morocco', code: 'ma' } },
    { code: "B31", date: '20/06', time: '07:30', group: 'C', team1: { name: 'Brazil', code: 'br' }, team2: { name: 'Haiti', code: 'ht' } },
    { code: "B32", date: '20/06', time: '10:00', group: 'D', team1: { name: 'Thổ Nhĩ Kỳ', code: 'tr' }, team2: { name: 'Paraguay', code: 'py' } },
    { code: "B33", date: '21/06', time: '00:00', group: 'F', team1: { name: 'Hà Lan', code: 'nl' }, team2: { name: 'Thụy Điển', code: 'se' } },
    { code: "B34", date: '21/06', time: '03:00', group: 'E', team1: { name: 'Đức', code: 'de' }, team2: { name: 'Bờ Biển Ngà', code: 'ci' } },
    { code: "B35", date: '21/06', time: '07:00', group: 'E', team1: { name: 'Ecuador', code: 'ec' }, team2: { name: 'Curacao', code: 'cw' } },
    { code: "B36", date: '21/06', time: '11:00', group: 'F', team1: { name: 'Tunisia', code: 'tn' }, team2: { name: 'Nhật Bản', code: 'jp' } },
    { code: "B37", date: '21/06', time: '23:00', group: 'H', team1: { name: 'Tây Ban Nha', code: 'es' }, team2: { name: 'Saudi Arabia', code: 'sa' } },
    { code: "B38", date: '22/06', time: '02:00', group: 'G', team1: { name: 'Bỉ', code: 'be' }, team2: { name: 'Iran', code: 'ir' } },
    { code: "B39", date: '22/06', time: '05:00', group: 'H', team1: { name: 'Uruguay', code: 'uy' }, team2: { name: 'Cape Verde', code: 'cv' } },
    { code: "B40", date: '22/06', time: '08:00', group: 'G', team1: { name: 'New Zealand', code: 'nz' }, team2: { name: 'Ai Cập', code: 'eg' } },
    { code: "B41", date: '23/06', time: '00:00', group: 'J', team1: { name: 'Argentina', code: 'ar' }, team2: { name: 'Áo', code: 'at' } },
    { code: "B42", date: '23/06', time: '04:00', group: 'I', team1: { name: 'Pháp', code: 'fr' }, team2: { name: 'Iraq', code: 'iq' } },
    { code: "B43", date: '23/06', time: '07:00', group: 'I', team1: { name: 'Na Uy', code: 'no' }, team2: { name: 'Senegal', code: 'sn' } },
    { code: "B44", date: '23/06', time: '10:00', group: 'J', team1: { name: 'Jordan', code: 'jo' }, team2: { name: 'Algeria', code: 'dz' } },
    { code: "B45", date: '24/06', time: '00:00', group: 'K', team1: { name: 'Bồ Đào Nha', code: 'pt' }, team2: { name: 'Uzbekistan', code: 'uz' } },
    { code: "B46", date: '24/06', time: '03:00', group: 'L', team1: { name: 'Anh', code: 'gb-eng' }, team2: { name: 'Ghana', code: 'gh' } },
    { code: "B47", date: '24/06', time: '06:00', group: 'L', team1: { name: 'Panama', code: 'pa' }, team2: { name: 'Croatia', code: 'hr' } },
    { code: "B48", date: '24/06', time: '09:00', group: 'K', team1: { name: 'Colombia', code: 'co' }, team2: { name: 'CHDC Congo', code: 'cd' } }
];

let matchesRound3 = [
    { code: "B49", date: '25/06', time: '02:00', group: 'B', team1: { name: 'Thụy Sĩ', code: 'ch' }, team2: { name: 'Canada', code: 'ca' } },
    { code: "B50", date: '25/06', time: '02:00', group: 'B', team1: { name: 'Bosnia và Herzegovina', code: 'ba' }, team2: { name: 'Qatar', code: 'qa' } },
    { code: "B51", date: '25/06', time: '05:00', group: 'C', team1: { name: 'Scotland', code: 'gb-sct' }, team2: { name: 'Brazil', code: 'br' } },
    { code: "B52", date: '25/06', time: '05:00', group: 'C', team1: { name: 'Morocco', code: 'ma' }, team2: { name: 'Haiti', code: 'ht' } },
    { code: "B53", date: '25/06', time: '08:00', group: 'A', team1: { name: 'CH Czech', code: 'cz' }, team2: { name: 'Mexico', code: 'mx' } },
    { code: "B54", date: '25/06', time: '08:00', group: 'A', team1: { name: 'Nam Phi', code: 'za' }, team2: { name: 'Hàn Quốc', code: 'kr' } },
    { code: "B55", date: '26/06', time: '03:00', group: 'E', team1: { name: 'Curacao', code: 'cw' }, team2: { name: 'Bờ Biển Ngà', code: 'ci' } },
    { code: "B56", date: '26/06', time: '03:00', group: 'E', team1: { name: 'Ecuador', code: 'ec' }, team2: { name: 'Đức', code: 'de' } },
    { code: "B57", date: '26/06', time: '06:00', group: 'F', team1: { name: 'Nhật Bản', code: 'jp' }, team2: { name: 'Thụy Điển', code: 'se' } },
    { code: "B58", date: '26/06', time: '06:00', group: 'F', team1: { name: 'Tunisia', code: 'tn' }, team2: { name: 'Hà Lan', code: 'nl' } },
    { code: "B59", date: '26/06', time: '09:00', group: 'D', team1: { name: 'Thổ Nhĩ Kỳ', code: 'tr' }, team2: { name: 'Mỹ', code: 'us' } },
    { code: "B60", date: '26/06', time: '09:00', group: 'D', team1: { name: 'Paraguay', code: 'py' }, team2: { name: 'Úc', code: 'au' } },
    { code: "B61", date: '27/06', time: '02:00', group: 'I', team1: { name: 'Na Uy', code: 'no' }, team2: { name: 'Pháp', code: 'fr' } },
    { code: "B62", date: '27/06', time: '02:00', group: 'I', team1: { name: 'Senegal', code: 'sn' }, team2: { name: 'Iraq', code: 'iq' } },
    { code: "B63", date: '27/06', time: '07:00', group: 'H', team1: { name: 'Cape Verde', code: 'cv' }, team2: { name: 'Saudi Arabia', code: 'sa' } },
    { code: "B64", date: '27/06', time: '07:00', group: 'H', team1: { name: 'Uruguay', code: 'uy' }, team2: { name: 'Tây Ban Nha', code: 'es' } },
    { code: "B65", date: '27/06', time: '10:00', group: 'G', team1: { name: 'Ai Cập', code: 'eg' }, team2: { name: 'Iran', code: 'ir' } },
    { code: "B66", date: '27/06', time: '10:00', group: 'G', team1: { name: 'New Zealand', code: 'nz' }, team2: { name: 'Bỉ', code: 'be' } },
    { code: "B67", date: '28/06', time: '04:00', group: 'L', team1: { name: 'Panama', code: 'pa' }, team2: { name: 'Anh', code: 'gb-eng' } },
    { code: "B68", date: '28/06', time: '04:00', group: 'L', team1: { name: 'Croatia', code: 'hr' }, team2: { name: 'Ghana', code: 'gh' } },
    { code: "B69", date: '28/06', time: '06:30', group: 'K', team1: { name: 'Colombia', code: 'co' }, team2: { name: 'Bồ Đào Nha', code: 'pt' } },
    { code: "B70", date: '28/06', time: '06:30', group: 'K', team1: { name: 'CHDC Congo', code: 'cd' }, team2: { name: 'Uzbekistan', code: 'uz' } },
    { code: "B71", date: '28/06', time: '09:00', group: 'J', team1: { name: 'Algeria', code: 'dz' }, team2: { name: 'Áo', code: 'at' } },
    { code: "B72", date: '28/06', time: '09:00', group: 'J', team1: { name: 'Jordan', code: 'jo' }, team2: { name: 'Argentina', code: 'ar' } }
];

// ===========================================
// SƠ ĐỒ NHÁNH ĐẤU KNOCKOUT MẶC ĐỊNH
// ===========================================
let bracketData = {
    round32: [
        { code: 1, date: '29/06', time: '02:00', team1: 'Nhì bảng A', team2: 'Nhì bảng B' },
        { code: 2, date: '30/06', time: '00:00', team1: 'Nhất bảng C', team2: 'Nhì bảng F' },
        { code: 3, date: '30/06', time: '03:30', team1: 'Nhất bảng E', team2: 'Nhì bảng A/B/C/D/F' },
        { code: 4, date: '30/06', time: '08:00', team1: 'Nhất bảng F', team2: 'Nhì bảng C' },
        { code: 5, date: '01/07', time: '00:00', team1: 'Nhì bảng E', team2: 'Nhì bảng I' },
        { code: 6, date: '01/07', time: '04:00', team1: 'Nhất bảng I', team2: 'Hạng 3 C/D/F/G/H' },
        { code: 7, date: '01/07', time: '08:00', team1: 'Nhất bảng A', team2: 'Hạng 3 C/E/F/H/I' },
        { code: 8, date: '01/07', time: '23:00', team1: 'Nhất bảng L', team2: 'Hạng 3 E/H/I/J/K' },
        { code: 9, date: '02/07', time: '03:00', team1: 'Nhất bảng G', team2: 'Hạng 3 A/E/H/I/J' },
        { code: 10, date: '02/07', time: '07:00', team1: 'Nhất bảng D', team2: 'Hạng 3 B/E/F/I/J' },
        { code: 11, date: '03/07', time: '02:00', team1: 'Nhất bảng H', team2: 'Nhì bảng J' },
        { code: 12, date: '03/07', time: '06:00', team1: 'Nhì bảng K', team2: 'Nhì bảng L' },
        { code: 13, date: '03/07', time: '10:00', team1: 'Nhất bảng B', team2: 'Hạng 3 E/F/G/I/J' },
        { code: 14, date: '04/07', time: '01:00', team1: 'Nhì bảng D', team2: 'Nhì bảng G' },
        { code: 15, date: '04/07', time: '05:00', team1: 'Nhất bảng J', team2: 'Nhì bảng H' },
        { code: 16, date: '04/07', time: '08:30', team1: 'Nhất bảng K', team2: 'Hạng 3 D/E/I/J/L' }
    ],
    round16: [
        { code: 17, date: '05/07', time: '00:00', team1: 'Thắng trận 1', team2: 'Thắng trận 4' },
        { code: 18, date: '05/07', time: '04:00', team1: 'Thắng trận 3', team2: 'Thắng trận 6' },
        { code: 19, date: '06/07', time: '03:00', team1: 'Thắng trận 2', team2: 'Thắng trận 5' },
        { code: 20, date: '06/07', time: '07:00', team1: 'Thắng trận 7', team2: 'Thắng trận 8' },
        { code: 21, date: '07/07', time: '02:00', team1: 'Thắng trận 11', team2: 'Thắng trận 12' },
        { code: 22, date: '07/07', time: '07:00', team1: 'Thắng trận 10', team2: 'Thắng trận 9' },
        { code: 23, date: '07/07', time: '23:00', team1: 'Thắng trận 15', team2: 'Thắng trận 14' },
        { code: 24, date: '08/07', time: '03:00', team1: 'Thắng trận 13', team2: 'Thắng trận 16' }
    ],
    quarter: [
        { code: 25, date: '10/07', time: '03:00', team1: 'Thắng 1/8 - 2', team2: 'Thắng 1/8 - 1' },
        { code: 26, date: '11/07', time: '02:00', team1: 'Thắng 1/8 - 5', team2: 'Thắng 1/8 - 6' },
        { code: 27, date: '12/07', time: '04:00', team1: 'Thắng 1/8 - 3', team2: 'Thắng 1/8 - 4' },
        { code: 28, date: '12/07', time: '08:00', team1: 'Thắng 1/8 - 7', team2: 'Thắng 1/8 - 8' }
    ],
    semi: [
        { code: 29, date: '15/07', time: '02:00', team1: 'Thắng Tứ kết 1', team2: 'Thắng Tứ kết 2' },
        { code: 30, date: '16/07', time: '02:00', team1: 'Thắng Tứ kết 3', team2: 'Thắng Tứ kết 4' }
    ],
    thirdPlace: { code: 31, date: '19/07', time: '04:00', team1: 'Thua Bán kết 1', team2: 'Thua Bán kết 2' },
    final: { code: 32, date: '20/07', time: '02:00', team1: 'Thắng Bán kết 1', team2: 'Thắng Bán kết 2' }
};

let groupScores = {};

// ============================================================
// MODULE 1: RENDER TRẬN ĐẤU (BAO GỒM CARD ĐẶC BIỆT CHUNG KẾT/HẠNG 3)
// ============================================================
const MatchRenderer = {
    matchCard(match) {
        const scoreData = groupScores[match.code] || { homeScore: '', awayScore: '' };
        return `
            <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center" data-match-code="${match.code}">
                <div class="flex flex-col items-center justify-center w-20 border-r border-gray-100 pr-3 shrink-0">
                    <span class="text-xs text-gray-500 font-medium">${match.date}</span>
                    <span class="text-lg font-bold text-gray-800 leading-tight">${match.time}</span>
                    <span class="mt-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Bảng ${match.group}</span>
                </div>
                <div class="flex-1 pl-4 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <img src="https://flagcdn.com/w40/${match.team1.code}.png" class="w-5 h-5 rounded-full border" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\'><circle cx=\'5\' cy=\'5\' r=\'4\' fill=\'%23ccc\'/></svg>'">
                            <span class="font-semibold text-gray-800 text-sm">${match.team1.name}</span>
                        </div>
                        <input type="number" data-type="home" class="w-12 text-center font-bold bg-gray-50 border rounded text-sm p-1 focus:bg-white focus:outline-none" value="${scoreData.homeScore}">
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <img src="https://flagcdn.com/w40/${match.team2.code}.png" class="w-5 h-5 rounded-full border" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\'><circle cx=\'5\' cy=\'5\' r=\'4\' fill=\'%23ccc\'/></svg>'">
                            <span class="font-semibold text-gray-800 text-sm">${match.team2.name}</span>
                        </div>
                        <input type="number" data-type="away" class="w-12 text-center font-bold bg-gray-50 border rounded text-sm p-1 focus:bg-white focus:outline-none" value="${scoreData.awayScore}">
                    </div>
                </div>
            </div>
        `;
    },

    knockoutEditCard(match) {
        return `
            <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center" data-ko-code="${match.code}">
                <div class="flex flex-col items-center justify-center w-20 border-r border-gray-100 pr-3 shrink-0">
                    <span class="text-xs text-gray-500 font-medium">${match.date}</span>
                    <span class="text-lg font-bold text-gray-800 leading-tight">${match.time}</span>
                    <span class="mt-1 text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded">Trận ${match.code}</span>
                </div>
                <div class="flex-1 pl-4 space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-gray-400 w-6">Đ1:</span>
                        <input type="text" data-team="team1" class="ko-team-input flex-1 font-semibold text-gray-800 bg-gray-50 border rounded text-sm p-1 focus:bg-white focus:outline-none" value="${match.team1 || ''}" placeholder="Nhập tên Đội 1">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-gray-400 w-6">Đ2:</span>
                        <input type="text" data-team="team2" class="ko-team-input flex-1 font-semibold text-gray-800 bg-gray-50 border rounded text-sm p-1 focus:bg-white focus:outline-none" value="${match.team2 || ''}" placeholder="Nhập tên Đội 2">
                    </div>
                </div>
            </div>
        `;
    },

    // RENDER THẺ LỚN ĐẶC BIỆT THEO KIỂU GỐC CỦA BẠN (Tích hợp ô nhập liệu đồng bộ)
    renderSingleKnockout(containerId, match, options = {}) {
        const container = document.getElementById(containerId);
        if (!container || !match) return;
        
        const { highlight = false, label = '' } = options;
        const bgClass = highlight 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
            : 'bg-white border border-gray-200 shadow-md';
        const textClass = highlight ? 'text-white' : 'text-gray-800';
        const labelClass = highlight ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600';
        const inputBg = highlight ? 'bg-white/20 text-white placeholder-white/50 border-white/30 focus:bg-white/30' : 'bg-gray-50 text-gray-800 border-gray-200 focus:bg-white';

        container.innerHTML = `
            <div class="${bgClass} rounded-2xl p-4 flex items-center" data-ko-code="${match.code}">
                <div class="flex flex-col items-center justify-center w-24 border-r ${highlight ? 'border-white/30' : 'border-gray-100'} pr-3 shrink-0">
                    <span class="text-xs ${highlight ? 'text-white/80' : 'text-gray-500'} font-medium">${match.date}</span>
                    <span class="text-xl font-bold ${textClass} leading-tight">${match.time}</span>
                    <span class="mt-1 text-[10px] font-bold ${labelClass} px-2 py-0.5 rounded">${label}</span>
                </div>
                <div class="flex-1 pl-4 space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold ${highlight ? 'text-white/70' : 'text-gray-400'} w-6">Đ1:</span>
                        <input type="text" data-team="team1" class="ko-team-input flex-1 font-bold bg-transparent border-b outline-none text-sm py-0.5 px-1 transition ${inputBg}" value="${match.team1 || ''}" placeholder="Tên đội 1">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold ${highlight ? 'text-white/70' : 'text-gray-400'} w-6">Đ2:</span>
                        <input type="text" data-team="team2" class="ko-team-input flex-1 font-bold bg-transparent border-b outline-none text-sm py-0.5 px-1 transition ${inputBg}" value="${match.team2 || ''}" placeholder="Tên đội 2">
                    </div>
                </div>
            </div>
        `;
    },

    renderAllSections() {
        // Vòng bảng
        document.getElementById('matches-round-1').innerHTML = matchesRound1.map(m => this.matchCard(m)).join('');
        document.getElementById('matches-round-2').innerHTML = matchesRound2.map(m => this.matchCard(m)).join('');
        document.getElementById('matches-round-3').innerHTML = matchesRound3.map(m => this.matchCard(m)).join('');
        
        // Vòng Knockout danh sách trên
        document.getElementById('matches-round-32').innerHTML = bracketData.round32.map(m => this.knockoutEditCard(m)).join('');
        document.getElementById('matches-round-16').innerHTML = bracketData.round16.map(m => this.knockoutEditCard(m)).join('');
        document.getElementById('matches-quarter').innerHTML = bracketData.quarter.map(m => this.knockoutEditCard(m)).join('');
        document.getElementById('matches-semi').innerHTML = bracketData.semi.map(m => this.knockoutEditCard(m)).join('');
        
        // GIỮ LẠI PHẦN RENDER RIÊNG CHO HẠNG 3 VÀ CHUNG KẾT ĐẶC BIỆT NHƯ CŨ
        this.renderSingleKnockout('match-third-place', bracketData.thirdPlace, { label: 'Hạng 3' });
        this.renderSingleKnockout('match-final', bracketData.final, { highlight: true, label: '🏆 CHUNG KẾT' });

        this.bindInputEvents();
    },

    bindInputEvents() {
        // Điểm số vòng bảng
        document.querySelectorAll('[data-match-code] input').forEach(input => {
            input.addEventListener('input', (e) => {
                const card = e.target.closest('[data-match-code]');
                const code = card.dataset.matchCode;
                const scoreType = e.target.dataset.type === 'home' ? 'homeScore' : 'awayScore';
                if (!groupScores[code]) groupScores[code] = { homeScore: '', awayScore: '' };
                groupScores[code][scoreType] = e.target.value;
            });
        });

        // Đồng bộ dữ liệu từ các danh sách trên (gồm cả thẻ Single đặc biệt) xuống Roadmap dưới
        document.querySelectorAll('[data-ko-code] .ko-team-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const card = e.target.closest('[data-ko-code]');
                const code = parseInt(card.dataset.koCode);
                const teamField = e.target.dataset.team;
                const val = e.target.value;

                let match = bracketData.round32.find(m => m.code === code) ||
                            bracketData.round16.find(m => m.code === code) ||
                            bracketData.quarter.find(m => m.code === code) ||
                            bracketData.semi.find(m => m.code === code);
                if (!match && bracketData.final.code === code) match = bracketData.final;
                if (!match && bracketData.thirdPlace.code === code) match = bracketData.thirdPlace;

                if (match) {
                    match[teamField] = val;
                    const rmInput = document.querySelector(`.bracket-match[data-code="${code}"] input[data-team="${teamField}"]`);
                    if (rmInput) rmInput.value = val;
                }
            });
        });
    },

    init() {
        this.renderAllSections();
        BracketRenderer.init();
    }
};

// ============================================================
// MODULE 2: BRACKET RENDERER (GIỮ LẠI SƠ ĐỒ ROADMAP ĐỒ HỌA 7 CỘT CŨ)
// ============================================================
const BracketRenderer = {
    container: null,
    
    init() {
        this.container = document.getElementById('bracket-container');
        if (!this.container) return;
        this.render();
        this.bindRoadmapEvents();
    },

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
            <div class="bracket-match ${c.bg} ${c.border} border rounded-lg p-2 shadow-sm" data-code="${match.code}">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[9px] text-gray-500 font-medium">${match.date} • ${match.time}</span>
                    <span class="text-[9px] font-bold text-white ${c.badge} px-1.5 rounded">#${match.code}</span>
                </div>
                <div class="space-y-1">
                    <input type="text" class="roadmap-input w-full text-xs font-semibold text-gray-800 bg-white/70 rounded px-2 py-1 border border-transparent focus:bg-white focus:outline-none focus:border-blue-500" value="${match.team1 || ''}" data-code="${match.code}" data-team="team1" placeholder="Đội 1">
                    <input type="text" class="roadmap-input w-full text-xs font-semibold text-gray-800 bg-white/70 rounded px-2 py-1 border border-transparent focus:bg-white focus:outline-none focus:border-blue-500" value="${match.team2 || ''}" data-code="${match.code}" data-team="team2" placeholder="Đội 2">
                </div>
            </div>
        `;
    },

    render() {
        const r16Left = bracketData.round16.slice(0, 4);
        const r16Right = bracketData.round16.slice(4, 8);
        const quarterLeft = bracketData.quarter.slice(0, 2);
        const quarterRight = bracketData.quarter.slice(2, 4);
        const semiLeft = bracketData.semi[0];
        const semiRight = bracketData.semi[1];

        this.container.innerHTML = `
    <div class="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 rounded-t-2xl">
            <h3 class="text-center text-lg font-bold flex items-center justify-center gap-2">🗺️ Roadmap World Cup 2026</h3>
        </div>
        <div class="bg-gradient-to-b from-blue-50 to-purple-50 p-4 rounded-b-2xl overflow-x-auto">
            <div class="bracket-grid relative" style="min-width: 1150px;">
                <div class="grid grid-cols-7 gap-x-12 gap-y-3 mb-3 text-center text-xs font-bold relative z-10">
                    <div class="text-emerald-600">VÒNG 1/8</div>
                    <div class="text-purple-600">TỨ KẾT</div>
                    <div class="text-yellow-600">BÁN KẾT</div>
                    <div class="text-orange-600">🏆 CHUNG KẾT</div>
                    <div class="text-yellow-600">BÁN KẾT</div>
                    <div class="text-purple-600">TỨ KẾT</div>
                    <div class="text-emerald-600">VÒNG 1/8</div>
                </div>
                <div class="grid grid-cols-7 gap-x-12 gap-y-4 items-center relative z-10">
                        <div class="space-y-3">${r16Left.map(m => this.matchBox(m, 'r16')).join('')}</div>
                        <div class="space-y-12">${quarterLeft.map(m => this.matchBox(m, 'quarter')).join('')}</div>
                        <div class="flex items-center justify-center">${this.matchBox(semiLeft, 'semi')}</div>
                        <div class="space-y-3">
                            <div class="text-center"><div class="text-4xl mb-2">🏆</div></div>
                            ${this.matchBox(bracketData.final, 'final')}
                            <div class="text-center text-[10px] text-gray-500 font-semibold mt-2">TRANH HẠNG 3</div>
                            ${this.matchBox(bracketData.thirdPlace, 'third')}
                        </div>
                        <div class="flex items-center justify-center">${this.matchBox(semiRight, 'semi')}</div>
                        <div class="space-y-12">${quarterRight.map(m => this.matchBox(m, 'quarter')).join('')}</div>
                        <div class="space-y-3">${r16Right.map(m => this.matchBox(m, 'r16')).join('')}</div>
                    </div>
                </div>
            </div>
            <div class="bg-white p-3 rounded-b-2xl border-t border-gray-100 flex justify-center gap-2">
                <button id="btn-save-all-wc" class="px-6 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 shadow-md transition flex items-center gap-2">
                    💾 Lưu toàn bộ giải đấu (Gửi Google Sheet)
                </button>
            </div>
        `;
    },

    bindRoadmapEvents() {
        // Đồng bộ ngược từ Roadmap lên các ô nhập liệu phía trên khi gõ ở Roadmap dưới
        this.container.addEventListener('input', (e) => {
            if (e.target.classList.contains('roadmap-input')) {
                const code = parseInt(e.target.dataset.code);
                const teamField = e.target.dataset.team;
                const val = e.target.value;

                let match = bracketData.round32.find(m => m.code === code) ||
                            bracketData.round16.find(m => m.code === code) ||
                            bracketData.quarter.find(m => m.code === code) ||
                            bracketData.semi.find(m => m.code === code);
                if (!match && bracketData.final.code === code) match = bracketData.final;
                if (!match && bracketData.thirdPlace.code === code) match = bracketData.thirdPlace;

                if (match) {
                    match[teamField] = val;
                    const topInput = document.querySelector(`[data-ko-code="${code}"] input[data-team="${teamField}"]`);
                    if (topInput) topInput.value = val;
                }
            }
        });

        document.getElementById('btn-save-all-wc')?.addEventListener('click', () => {
            saveAllWorldCupData();
        });
    }
};

// ============================================================
// ĐỒNG BỘ DỮ LIỆU ĐI / VỀ VỚI GOOGLE APPS SCRIPT
// ============================================================
async function saveAllWorldCupData() {
    const savedPin = localStorage.getItem('savedPin');
    if (!savedPin) {
        alert('Vui lòng mở khóa phần Sự kiện cá nhân bằng mã PIN trước khi lưu!');
        return;
    }

    const payload = { type: 'save_wc', pin: savedPin, bracketData: bracketData, scoresData: groupScores };
    const body = new URLSearchParams();
    body.append('data', JSON.stringify(payload));

    try {
        const btn = document.getElementById('btn-save-all-wc');
        btn.textContent = '⏳ Đang đồng bộ lên Google Sheet...';
        btn.disabled = true;

        const res = await fetch(APPS_SCRIPT_URL, { method: 'POST', body, mode: 'cors' });
        const result = await res.json();

        if (result.success) {
            alert('✅ Đã đồng bộ thành công dữ liệu giải đấu và tỷ số lên Google Sheet!');
            localStorage.setItem('cached_wc_bracket', JSON.stringify(bracketData));
            localStorage.setItem('cached_wc_scores', JSON.stringify(groupScores));
        } else { alert('❌ Không thể lưu: ' + result.message); }
    } catch (e) {
        console.error(e);
        alert('❌ Lỗi mạng hoặc không kết nối được Apps Script.');
    } finally {
        const btn = document.getElementById('btn-save-all-wc');
        if (btn) {
            btn.textContent = '💾 Lưu toàn bộ giải đấu (Gửi Google Sheet)';
            btn.disabled = false;
        }
    }
}

async function loadWorldCupFromSheet() {
    const savedPin = localStorage.getItem('savedPin');
    if (!savedPin) return;

    try {
        const res = await fetch(`${APPS_SCRIPT_URL}?type=get_wc&pin=${savedPin}`, { method: 'GET' });
        const result = await res.json();
        if (result.success && result.data) {
            if (result.data.bracket) bracketData = JSON.parse(result.data.bracket);
            if (result.data.scores) groupScores = JSON.parse(result.data.scores);
            MatchRenderer.init();
        }
    } catch (e) {
        console.warn('Sử dụng dữ liệu local fallback.', e);
        const localB = localStorage.getItem('cached_wc_bracket');
        const localS = localStorage.getItem('cached_wc_scores');
        if (localB) bracketData = JSON.parse(localB);
        if (localS) groupScores = JSON.parse(localS);
        MatchRenderer.init();
    }
}

// ============================================================
// MODULE: ĐÓNG MỞ PANEL WORLD CUP
// ============================================================
const WCPanel = {
    openBtn: null, closeBtn: null, panel: null,
    init() {
        this.openBtn = document.getElementById('btn-open-wc');
        this.closeBtn = document.getElementById('btn-close-wc');
        this.panel = document.getElementById('wc-panel');
        if (this.openBtn && this.closeBtn && this.panel) this.bindEvents();
    },
    bindEvents() {
        this.openBtn.addEventListener('click', () => {
            this.panel.classList.remove('invisible', 'translate-x-full');
            document.body.classList.add('overflow-hidden');
            loadWorldCupFromSheet();
        });
        this.closeBtn.addEventListener('click', () => {
            this.panel.classList.add('translate-x-full');
            setTimeout(() => this.panel.classList.add('invisible'), 300);
            document.body.classList.remove('overflow-hidden');
        });
    }
};

// ============================================================
// MODULE: FIXED ĐỔI MÀU MENU CHUYỂN TAB & SCROLL SPY CHUẨN XANH
// ============================================================
const WCNav = {
    navBtns: null, navContainer: null, scrollContainer: null, sections: null,
    isProgrammaticScroll: false, scrollLockTimeout: null, NAV_OFFSET: 80,

    init() {
        this.navBtns = document.querySelectorAll('.wc-nav-btn');
        this.navContainer = document.querySelector('.wc-nav-container');
        this.scrollContainer = document.getElementById('wc-main-scroll');
        this.sections = document.querySelectorAll('#wc-main-scroll section[id]');

        if (!this.navBtns.length || !this.scrollContainer) return;

        this.bindClickEvents();
        this.initScrollSpy();
    },

    bindClickEvents() {
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (!targetSection) return;

                const containerRect = this.scrollContainer.getBoundingClientRect();
                const targetRect = targetSection.getBoundingClientRect();
                const scrollPos = this.scrollContainer.scrollTop + (targetRect.top - containerRect.top) - this.NAV_OFFSET;

                this.isProgrammaticScroll = true;
                clearTimeout(this.scrollLockTimeout);
                this.scrollLockTimeout = setTimeout(() => { this.isProgrammaticScroll = false; }, 1000);

                this.scrollContainer.scrollTo({ top: Math.max(0, scrollPos), behavior: 'smooth' });
                this.setActive(btn);
            });
        });
    },

    setActive(activeBtn) {
        if (!activeBtn) return;
        this.navBtns.forEach(btn => {
            if (btn === activeBtn) {
                // Thêm class màu xanh và chữ trắng nổi bật
                btn.className = "wc-nav-btn px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-md";
            } else {
                // Trả về giao diện nút xám mặc định ban đầu
                btn.className = "wc-nav-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap";
            }
        });
        this.scrollNavToBtn(activeBtn);
    },

    scrollNavToBtn(btn) {
        if (!this.navContainer) return;
        const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
        const targetScrollLeft = btnCenter - this.navContainer.clientWidth / 2;
        this.navContainer.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'auto' });
    },

    initScrollSpy() {
        if (!('IntersectionObserver' in window)) return;

        const options = {
            root: this.scrollContainer,
            rootMargin: `-${this.NAV_OFFSET}px 0px -50% 0px`,
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            if (this.isProgrammaticScroll) return;
            const visible = entries.filter(e => e.isIntersecting);
            if (visible.length > 0) {
                const sorted = visible.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
                const targetId = sorted[0].target.id;
                const btn = document.querySelector(`.wc-nav-btn[data-target="${targetId}"]`);
                if (btn) this.setActive(btn);
            }
        }, options);

        this.sections.forEach(sec => observer.observe(sec));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    MatchRenderer.init();
    WCPanel.init();
    WCNav.init();
});