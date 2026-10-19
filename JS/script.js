let p = [150, 0, 45, 320, 0, 85];

let ts = 0;
let fs = 0;

let cc = document.querySelector('#cartChips');
let ri = document.querySelector('#receiptItems');
let rrt = document.querySelector('#receiptRawTotal');
let rtp = document.querySelector('#receiptToPay');
let bab = document.querySelector('#btnApplyBonuses');

let f = '';

for (let i = 0; i < p.length; i++) {
    if (p[i] === 0) {
        f += '<span class="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold border border-dashed border-slate-300">0 грн (подарунок)</span> ';
    } else {
        f += '<span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200">' + p[i] + ' грн</span> ';
    }
}

cc.innerHTML = f;

function calculateCart() {
    ts = 0;
    let rf = '';

    for (let i = 0; i < p.length; i++) {
        if (p[i] === 0) {
            continue;
        }

        let pwv = p[i] * 1.2;
        ts = ts + pwv;

        rf += '<div class="flex justify-between"><span>Товар #' + (i + 1) + ' (' + p[i] + ' грн + ПДВ):</span><span>' + pwv.toFixed(2) + ' грн</span></div>';
    }

    let ft = ts.toFixed(2) + ' грн';
    fs = ts;

    ri.innerHTML = rf;
    rrt.innerHTML = ft;
    rtp.innerHTML = ft;

    bab.removeAttribute('disabled');
}

let bbi = document.querySelector('#bonusBalanceInput');
let bsc = document.querySelector('#bonusStepsContainer');
let rd = document.querySelector('#receiptDiscount');
let bvc = document.querySelector('#btnValidateCash');

function applyBonuses() {
    let bb = Number(bbi.value);
    let s = 50;
    let md = ts * 0.5;
    let td = 0;
    let sf = '';

    while (bb >= s && td + s <= md) {
        bb = bb - s;
        td = td + s;

        sf += '<div>Списано пакет ' + s + ' балів. Залишок бонусів: ' + bb + '</div>';
    }

    fs = ts - td;

    rd.innerHTML = '-' + td.toFixed(2) + ' грн';
    rtp.innerHTML = fs.toFixed(2) + ' грн';

    bbi.value = bb;

    bsc.classList.remove('hidden');
    bsc.innerHTML = sf || '<div>Бонуси не списано (недостатньо балів або перевищено ліміт 50%).</div>';

    bab.setAttribute('disabled', 'true');
    bvc.removeAttribute('disabled');
}

let ci = document.querySelector('#cashInput');
let vm = document.querySelector('#validationMsg');
let rc = document.querySelector('#receiptCash');
let rch = document.querySelector('#receiptChange');
let bcc = document.querySelector('#btnCalculateChange');

let cg = 0;

function validateCashInput() {
    let iv = false;

    cg = Number(ci.value);

    if (ci.value.trim() !== '' && !isNaN(cg) && cg >= fs) {
        iv = true;
    }

    if (iv) {
        vm.className = 'text-xs text-emerald-600 mt-2';
        vm.innerHTML = 'Успішно! Внесено: ' + cg.toFixed(2) + ' грн (вистачає для оплати).';

        rc.innerHTML = cg.toFixed(2) + ' грн';
        bcc.disabled = false;
    } else {
        vm.className = 'text-xs text-rose-600 mt-2';
        vm.innerHTML = 'Помилка: сума має бути числом не менше за суму до сплати (' + fs.toFixed(2) + ' грн)!';
        bcc.disabled = true;
    }
}

let br = document.querySelector('#banknotesResult');

function calculateChange() {
    let ch = cg - fs;

    rch.innerHTML = ch.toFixed(2) + ' грн';

    let b = [500, 200, 100, 50, 20, 10, 5, 2, 1];
    let bf = '';
    let i = 0;

    while (i < b.length) {
        let c = Math.floor(ch / b[i]);

        if (c > 0) {
            bf = bf + '<div class="p-2 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs font-bold text-purple-900">' + b[i] + ' грн: ' + c + ' шт</div>';
        }

        ch = ch % b[i];
        i++;
    }

    br.innerHTML = bf || '<div class="text-xs text-slate-500">Решта без купюр (0 грн)</div>';
    bcc.disabled = true;
}

