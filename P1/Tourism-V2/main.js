// 当前语言状态
let currentLang = 'zh';

// 支持的语言列表
const SUPPORTED_LANGUAGES = ['zh', 'en'];

// 切换语言函数
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage();
    updateLangButton();
    // 保存语言偏好到本地存储
    localStorage.setItem('preferredLanguage', currentLang);
}

// 更新语言按钮显示
function updateLangButton() {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLang === 'zh' ? 'EN' : '中';
    }
}

// 更新页面文本
function updateLanguage() {
    try {
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[currentLang] && translations[currentLang][key]) {
                // 根据元素类型设置内容
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[currentLang][key];
                } else if (element.tagName === 'IMG') {
                    element.alt = translations[currentLang][key];
                } else {
                    element.textContent = translations[currentLang][key];
                }
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${currentLang}`);
            }
        });

        // 更新页面标题
        document.title = currentLang === 'zh' ? 
            '2025塔斯马尼亚探险之旅' : 
            'Tasmania Adventure 2025';

        // 更新 meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = currentLang === 'zh' ?
                '2025年塔斯马尼亚探险之旅，提供独特的自然和文化体验。' :
                'Tasmania Adventure 2025, offering unique natural and cultural experiences.';
        }
    } catch (error) {
        console.error('Error updating language:', error);
    }
}

// 设置语言
function setLanguage(lang) {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
        currentLang = lang;
        updateLanguage();
        updateLangButton();
        localStorage.setItem('preferredLanguage', currentLang);
    } else {
        console.warn(`Unsupported language: ${lang}`);
    }
}

// 获取用户偏好语言
function getPreferredLanguage() {
    // 1. 检查本地存储
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        return savedLang;
    }
    
    // 2. 检查浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
        return 'zh';
    }
    
    // 3. 默认返回英语
    return 'en';
}

// 初始化语言设置
document.addEventListener('DOMContentLoaded', () => {
    try {
        const preferredLang = getPreferredLanguage();
        setLanguage(preferredLang);
    } catch (error) {
        console.error('Error initializing language:', error);
        // 发生错误时默认使用中文
        setLanguage('zh');
    }
    
    // 添加表单提交处理
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里添加表单提交逻辑
            alert(currentLang === 'zh' ? '预订已提交！' : 'Booking submitted!');
        });
    }
});