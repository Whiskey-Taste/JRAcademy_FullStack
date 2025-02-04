document.addEventListener('DOMContentLoaded', function() {
    // 房产筛选器
    const filterContainer = document.querySelector('.filter-container');
    const propertyGrid = document.getElementById('propertyGrid');
    const loadMoreBtn = document.getElementById('loadMoreProperties');

    // 模拟房产数据（实际应用中应从后端获取）
    const propertyData = [
        {
            id: 'prop1',
            title: '洛杉矶市中心豪华公寓',
            location: '洛杉矶市中心',
            price: 1500000,
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            image: 'images/property1.jpg',
            features: ['地铁沿线', '学区房', '配套完善'],
            tag: '热门',
            details: `
                <h2>洛杉矶市中心豪华公寓详情</h2>
                <p>这是一处位于洛杉矶市中心的高端公寓，交通便利，周边配套齐全。</p>
                <h3>房产特点</h3>
                <ul>
                    <li>3间卧室，2间卫生间</li>
                    <li>总面积180平方米</li>
                    <li>紧邻地铁站</li>
                    <li>优质学区</li>
                </ul>
                <h3>投资价值</h3>
                <p>洛杉矶房地产市场稳定增长，具有良好的投资潜力。</p>
            `
        },
        // 可以添加更多房产数据
    ];

    // 筛选功能
    function setupFilterFunctionality() {
        if (!filterContainer) return;

        const locationFilter = document.getElementById('location');
        const priceFilter = document.getElementById('price');
        const typeFilter = document.getElementById('type');

        function filterProperties() {
            const selectedLocation = locationFilter.value;
            const selectedPrice = priceFilter.value;
            const selectedType = typeFilter.value;

            const filteredProperties = propertyData.filter(property => {
                const matchLocation = !selectedLocation || 
                    property.location.toLowerCase().includes(selectedLocation);
                
                const matchPrice = !selectedPrice || 
                    (selectedPrice === '0-500000' && property.price < 500000) ||
                    (selectedPrice === '500000-1000000' && property.price >= 500000 && property.price < 1000000) ||
                    (selectedPrice === '1000000-2000000' && property.price >= 1000000 && property.price < 2000000) ||
                    (selectedPrice === '2000000+' && property.price >= 2000000);
                
                // 这里可以根据需要扩展类型过滤逻辑
                const matchType = !selectedType; // 暂时不实现类型过滤

                return matchLocation && matchPrice && matchType;
            });

            renderProperties(filteredProperties);
        }

        locationFilter.addEventListener('change', filterProperties);
        priceFilter.addEventListener('change', filterProperties);
        typeFilter.addEventListener('change', filterProperties);
    }

    // 渲染房产卡片
    function renderProperties(properties) {
        if (!propertyGrid) return;

        // 清空当前网格
        propertyGrid.innerHTML = '';

        // 渲染房产卡片
        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    ${property.tag ? `<span class="property-tag">${property.tag}</span>` : ''}
                </div>
                <div class="property-content">
                    <h3>${property.title}</h3>
                    <div class="property-info">
                        <span><i class="fas fa-bed"></i> ${property.bedrooms}房</span>
                        <span><i class="fas fa-bath"></i> ${property.bathrooms}卫</span>
                        <span><i class="fas fa-ruler-combined"></i> ${property.area}㎡</span>
                    </div>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <div class="property-price">
                        <strong>$${property.price.toLocaleString()}</strong>
                    </div>
                    <div class="property-features">
                        ${property.features.map(feature => `<span>${feature}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary" onclick="showPropertyDetail('${property.id}')">查看详情</button>
                </div>
            `;
            propertyGrid.appendChild(propertyCard);
        });
    }

    // 加载更多房产
    function setupLoadMore() {
        if (!loadMoreBtn) return;

        let currentPage = 1;
        const propertiesPerPage = 3;

        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            // 模拟加载更多数据
            // 实际应用中应从后端获取
            const moreProperties = propertyData.slice(0, currentPage * propertiesPerPage);
            renderProperties(moreProperties);

            // 如果已加载所有属性，隐藏加载更多按钮
            if (moreProperties.length >= propertyData.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // 显示房产详情
    window.showPropertyDetail = function(propertyId) {
        const property = propertyData.find(p => p.id === propertyId);
        if (!property) return;

        const propertyModal = document.getElementById('propertyModal');
        const propertyDetail = document.getElementById('propertyDetail');

        if (propertyModal && propertyDetail) {
            propertyDetail.innerHTML = property.details;
            propertyModal.style.display = 'flex';

            // 关闭模态框
            const closeBtn = propertyModal.querySelector('.close');
            closeBtn.onclick = function() {
                propertyModal.style.display = 'none';
            };

            // 点击模态框外部关闭
            propertyModal.onclick = function(event) {
                if (event.target === propertyModal) {
                    propertyModal.style.display = 'none';
                }
            };
        }
    };

    // 初始化
    function init() {
        setupFilterFunctionality();
        renderProperties(propertyData);
        setupLoadMore();
    }

    init();
});