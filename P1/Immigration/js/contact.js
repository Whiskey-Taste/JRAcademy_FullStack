document.addEventListener('DOMContentLoaded', function() {
    // 选择联系表单
    const contactForm = document.getElementById('contactForm');
    
    // 检查表单是否存在
    if (contactForm) {
        // 添加表单提交事件监听器
        contactForm.addEventListener('submit', function(event) {
            // 阻止默认表单提交行为
            event.preventDefault();
            
            // 获取表单字段值并去除空白
            const name = contactForm.name.value.trim();
            const phone = contactForm.phone.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            // 电话和邮箱验证正则表达式
            const phoneRegex = /^1[3-9]\d{9}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // 验证结果数组
            const errors = [];

            // 姓名验证
            if (name.length < 2) {
                errors.push('请输入有效的姓名（至少2个字）');
            }

            // 电话号码验证
            if (!phoneRegex.test(phone)) {
                errors.push('请输入有效的中国大陆手机号码');
            }

            // 邮箱验证
            if (!emailRegex.test(email)) {
                errors.push('请输入有效的电子邮箱地址');
            }

            // 咨询内容验证
            if (message.length < 10) {
                errors.push('咨询内容不能少于10个字');
            }

            // 检查是否有错误
            if (errors.length > 0) {
                // 显示错误信息
                alert(errors.join('\n'));
                return;
            }

            // 获取提交按钮
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // 禁用提交按钮并修改文本
            submitButton.disabled = true;
            submitButton.textContent = '正在提交...';

            // 模拟表单提交（实际应用中应该是AJAX提交）
            simulateFormSubmission(name, phone, email, message)
                .then(response => {
                    // 提交成功处理
                    alert('感谢您的咨询，我们将尽快与您联系！');
                    contactForm.reset();
                })
                .catch(error => {
                    // 提交失败处理
                    alert('提交失败，请稍后重试');
                    console.error('表单提交错误:', error);
                })
                .finally(() => {
                    // 恢复提交按钮
                    submitButton.disabled = false;
                    submitButton.textContent = '提交咨询';
                });
        });
    }

    // 模拟表单提交的异步函数
    function simulateFormSubmission(name, phone, email, message) {
        return new Promise((resolve, reject) => {
            // 模拟网络请求
            setTimeout(() => {
                // 这里可以添加实际的API调用
                // 例如：fetch()或axios.post()等
                
                // 模拟成功提交
                const randomSuccess = Math.random() > 0.1; // 90%成功率

                if (randomSuccess) {
                    resolve({
                        status: 'success',
                        message: '提交成功'
                    });
                } else {
                    reject(new Error('提交失败'));
                }
            }, 1500); // 模拟1.5秒的网络延迟
        });
    }

    // 实时表单验证
    function addLiveValidation(inputElement, validationFunction) {
        inputElement.addEventListener('input', function() {
            const isValid = validationFunction(this.value);
            
            if (!isValid) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
    }

    // 如果表单存在，添加实时验证
    if (contactForm) {
        // 姓名实时验证
        addLiveValidation(
            contactForm.name, 
            (value) => value.trim().length >= 2
        );

        // 手机号实时验证
        addLiveValidation(
            contactForm.phone, 
            (value) => /^1[3-9]\d{9}$/.test(value.trim())
        );

        // 邮箱实时验证
        addLiveValidation(
            contactForm.email, 
            (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        );
    }
});