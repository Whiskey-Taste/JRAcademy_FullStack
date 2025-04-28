// 符合人类思考方式的代码是最好的代码

// SOLID 原则 - IT界的武功秘籍
// - 单一职责
// - 开闭原则
// - 依赖注入

// - 不写 if else
// - 不写 注释
// - 不写 循环

// 1.找个税表
// 2.问收入
// 3.找到对应区间
// 4.算税

const TaxTable_2023 = [
    { min: 0,      max: 18200,    rate: 0,     base: 0 },
    { min: 18201,  max: 45000,    rate: 0.19,  base: 0 },
    { min: 45001,  max: 120000,   rate: 0.325, base: 5092 },
    { min: 120001, max: 180000,   rate: 0.37,  base: 29467 },
    { min: 180001, max: Infinity, rate: 0.45,  base: 51667 },
]

const TaxTable_2024 = [
    { min: 0,      max: 18200,    rate: 0,    base: 0 },
    { min: 18201,  max: 45000,    rate: 0.16, base: 0 },
    { min: 45001,  max: 135000,   rate: 0.30, base: 4288 },
    { min: 135001, max: 190000,   rate: 0.37, base: 31288 },
    { min: 190001, max: Infinity, rate: 0.45, base: 51638 },
]

function calculateTax(income, taxTable) {
    const range = taxTable.find((item) => income > item.min && income <= item.max);

    const { rate, base, min } = range;

    return base + (income - min) * rate;
}

calculateTax(200000, TaxTable_2023);
calculateTax(200000, TaxTable_2024);

// Qantas

// const tickets = [{ origin: 'Mel', destination: 'PVG' }]
// getStops(tickets) => Direct

// const tickets = [{ origin: 'Mel', destination: 'HKG' }, { origin: 'HKG', destination: 'PVG' }]
// getStops(tickets) => 1 stops

// const tickets = [{ origin: 'Mel', destination: 'SIN' }, { origin: 'SIN', destination: 'HKG' }, { origin: 'PVG', destination: 'HKG' }]
// getStops(tickets) => 2 stops