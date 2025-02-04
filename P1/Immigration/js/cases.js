document.addEventListener('DOMContentLoaded', function() {
    // 选择关键元素
    const casesGrid = document.getElementById('casesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const chartCanvas = document.getElementById('successRateChart');

    // 模拟成功案例数据（实际应用中应从后端获取）
    const casesData = [
        {
            id: 'case1',
            category: 'science',
            title: '材料科学专家6个月获批',
            background: '清华大学博士',
            processingTime: '6个月',
            publications: '论文引用200+',
            summary: '申请人在材料科学领域发表多篇高影响因子论文，获得多项发明专利',
            image: 'images/case1.jpg'
        },
        {
            id: 'case2',
            category: 'art',
            title: '著名画家成功获批',
            background: '知名艺术学院教授',
            processingTime: '5个月',
            publications: '国际艺术展3次',
            summary: '在艺术领域享有盛誉，多次参加国际艺术展',
            image: 'images/case2.jpg'
        },
        {
            id: 'case3',
            category: 'education',
            title: '大学教授成功获批',
            background: '顶尖高校终身教授',
            processingTime: '4个月',
            publications: '学术论文300+',
            summary: '在教育研究领域有重大贡献，出版多部教材',
            image: 'images/case3.jpg'
        },
        {
            id: 'case4',
            category: 'business',
            title: '知名企业家成功获批',
            background: '跨国公司CEO',
            processingTime: '3个月',
            publications: '商业影响力报告10+',
            summary: '管理全球企业，在商业领域做出杰出贡献',
            image: 'images/case4.jpg'
        },
        {
            id: 'case5',
            category: 'sports',
            title: '国家级运动员成功获批',
            background: '奥运会金牌得主',
            processingTime: '6个月',
            publications: '国际比赛记录',
            summary: '在体育领域取得世界级成就，代表国家参加多个奥运会',
            image: 'images/case5.jpg'
        }
    ];
    

    // 渲染成功案例
    function renderCases(cases) {
        if (!casesGrid) return;

        // 清空当前网格
        casesGrid.innerHTML = '';

        // 渲染案例卡片
        cases.forEach(caseItem => {
            const caseCard = document.createElement('div');
            caseCard.className = `case-card`;
            caseCard.setAttribute('data-category', caseItem.category);
            
            caseCard.innerHTML = `
                <div class="case-image">
                    <img src="${caseItem.image}" alt="${caseItem.title}">
                    <div class="case-tag">${getCategoryLabel(caseItem.category)}</div>
                </div>
                <div class="case-content">
                    <h3>${caseItem.title}</h3>
                    <div class="case-details">
                        <p><i class="fas fa-user-graduate"></i> 背景：${caseItem.background}</p>
                        <p><i class="fas fa-clock"></i> 用时：${caseItem.processingTime}</p>
                        <p><i class="fas fa-file-alt"></i> ${caseItem.publications}</p>
                    </div>
                    <p class="case-summary">${caseItem.summary}</p>
                    <button class="btn btn-outline">查看详情</button>
                </div>
            `;
            
            casesGrid.appendChild(caseCard);
        });
    }

    // 获取类别标签
    function getCategoryLabel(category) {
        const categoryLabels = {
            'science': '科研学者',
            'art': '艺术人才',
            'education': '教育专家',
            'business': '商业精英',
            'sports': '体育人士'
        };
        return categoryLabels[category] || category;
    }

    // 案例筛选
    function setupCaseFilters() {
        if (!filterButtons.length) return;
    
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
    
                const filter = this.getAttribute('data-filter');
                let filteredCases = (filter === 'all') ? casesData : casesData.filter(c => c.category === filter);
                renderCases(filteredCases);
            });
        });
    }    

    // 初始化成功案例统计图表
    function initSuccessRateChart() {
        if (!chartCanvas) return;

        if (typeof Chart === 'undefined') {
            console.error('Chart.js 未加载');
            return;
        }

        new Chart(chartCanvas, {
            type: 'pie',
            data: {
                labels: ['科研学者', '艺术领域', '教育领域', '商业领域', '体育领域'],
                datasets: [{
                    data: [40, 25, 15, 15, 5],
                    backgroundColor: ['#3498db', '#f39c12', '#9b59b6', '#e74c3c', '#2ecc71'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 初始化
    function init() {
        renderCases(casesData);
        setupCaseFilters();
        initSuccessRateChart();
    }

    init();
});
