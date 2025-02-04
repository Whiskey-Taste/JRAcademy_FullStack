document.addEventListener('DOMContentLoaded', function() {
    // 返回顶部按钮功能
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            // 当页面滚动超过300像素时显示按钮
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // 点击返回顶部
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 导航菜单切换（移动端）
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
        });
    }

    // 预约咨询按钮通用处理
    const consultButtons = document.querySelectorAll('#consultBtn, .consult-btn');
    consultButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 打开咨询弹窗或跳转到联系页面
            openConsultationModal();
        });
    });

    // 咨询弹窗
    function openConsultationModal() {
        // 创建模态框（如果不存在）
        let modal = document.getElementById('consultModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'consultModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>免费咨询</h2>
                    <form id="consultationForm">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="您的姓名" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" name="phone" placeholder="联系电话" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="电子邮箱" required>
                        </div>
                        <div class="form-group">
                            <textarea name="message" placeholder="咨询内容" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">提交咨询</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // 显示模态框
        modal.style.display = 'flex';

        // 关闭按钮事件
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };

        // 点击模态框外部关闭
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        // 表单提交处理
        const form = modal.querySelector('form');
        form.onsubmit = function(e) {
            e.preventDefault();
            
            // 简单表单验证
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            // 验证规则
            const phoneRegex = /^1[3-9]\d{9}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name.length < 2) {
                alert('请输入有效的姓名');
                return false;
            }

            if (!phoneRegex.test(phone)) {
                alert('请输入有效的手机号码');
                return false;
            }

            if (!emailRegex.test(email)) {
                alert('请输入有效的电子邮箱');
                return false;
            }

            if (message.length < 10) {
                alert('咨询内容不能少于10个字');
                return false;
            }

            // 模拟提交
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '正在提交...';

            // 模拟异步提交
            setTimeout(() => {
                alert('感谢您的咨询，我们将尽快与您联系！');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = '提交咨询';
                modal.style.display = 'none';
            }, 1500);

            return false;
        };
    }

    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 全局弹窗关闭功能
    const modalCloses = document.querySelectorAll('.modal .close');
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // 防抖函数（用于性能优化）
    function debounce(func, wait = 250) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 响应式处理
    function handleResponsiveChanges() {
        const screenWidth = window.innerWidth;
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');

        if (screenWidth <= 768) {
            // 移动端菜单处理
            if (navMenu && navToggle) {
                navMenu.classList.add('mobile-menu');
            }
        } else {
            // 桌面端菜单处理
            if (navMenu && navToggle) {
                navMenu.classList.remove('mobile-menu', 'show-menu');
                navToggle.classList.remove('active');
            }
        }
    }

    // 监听窗口大小变化
    window.addEventListener('resize', debounce(handleResponsiveChanges));
    
    // 初始调用
    handleResponsiveChanges();
});

// 全局错误处理
window.addEventListener('error', function(event) {
    console.error('发生了一个未捕获的错误:', event.error);
    // 可以添加更多的错误处理逻辑，如上报错误
});