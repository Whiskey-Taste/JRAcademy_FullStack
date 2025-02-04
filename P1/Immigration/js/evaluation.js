document.addEventListener('DOMContentLoaded', function() {
    // 选择评估表单
    const evaluationForm = document.getElementById('evaluationForm');
    const evaluationResult = document.getElementById('evaluationResult');
    
    if (evaluationForm && evaluationResult) {
        // 评估标准配置
        const evaluationCriteria = [
            {
                id: 'awards',
                label: '重要奖项',
                weight: 3,
                description: '获得国家级或国际级重要奖项'
            },
            {
                id: 'membership',
                label: '专业协会会员',
                weight: 2,
                description: '成为要求杰出成就的专业协会会员'
            },
            {
                id: 'publications',
                label: '学术论文',
                weight: 2,
                description: '在高影响因子期刊发表学术论文'
            },
            {
                id: 'patents',
                label: '发明专利',
                weight: 2,
                description: '拥有重要的发明专利'
            },
            {
                id: 'media',
                label: '媒体报道',
                weight: 1,
                description: '个人成就获得主流媒体报道'
            }
        ];

        // 动态创建复选框
        function createEvaluationCheckboxes() {
            const checkboxContainer = evaluationForm.querySelector('.criteria-checklist');
            
            evaluationCriteria.forEach(criterion => {
                const label = document.createElement('label');
                label.className = 'criteria-option';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'criteria';
                checkbox.value = criterion.id;
                
                const span = document.createElement('span');
                span.textContent = criterion.label;
                
                label.appendChild(checkbox);
                label.appendChild(span);
                
                // 添加鼠标悬停提示
                label.setAttribute('title', criterion.description);
                
                checkboxContainer.appendChild(label);
            });
        }

        // 计算评估结果
        function calculateEvaluationScore() {
            let totalScore = 0;
            let selectedCriteria = [];

            // 计算分数
            evaluationForm.querySelectorAll('input[name="criteria"]:checked').forEach(checkbox => {
                const criterion = evaluationCriteria.find(c => c.id === checkbox.value);
                if (criterion) {
                    totalScore += criterion.weight;
                    selectedCriteria.push(criterion.label);
                }
            });

            return {
                score: totalScore,
                criteria: selectedCriteria
            };
        }

        // 生成评估结果
        function generateEvaluationResult(result) {
            let resultHtml = '';
            let recommendation = '';
            let resultClass = '';

            if (result.score >= 6) {
                resultHtml = `
                    <h3 class="text-success">🎉 高度匹配 EB1-A 要求</h3>
                    <p>您的资料非常优秀，很可能符合EB1-A申请条件！</p>
                `;
                recommendation = '强烈建议申请';
                resultClass = 'success';
            } else if (result.score >= 4) {
                resultHtml = `
                    <h3 class="text-warning">👍 基本符合 EB1-A 要求</h3>
                    <p>您的资料有潜力，可以进一步完善。</p>
                `;
                recommendation = '建议咨询专业顾问';
                resultClass = 'warning';
            } else {
                resultHtml = `
                    <h3 class="text-danger">📝 需要提升</h3>
                    <p>目前资料可能难以满足EB1-A要求。</p>
                `;
                recommendation = '建议继续积累成就';
                resultClass = 'danger';
            }

            // 添加已选择的标准
            if (result.criteria.length > 0) {
                resultHtml += `
                    <div class="selected-criteria">
                        <h4>您符合的标准：</h4>
                        <p>${result.criteria.join('、')}</p>
                    </div>
                `;
            }

            resultHtml += `
                <div class="recommendation ${resultClass}">
                    <strong>专家建议：</strong>${recommendation}
                </div>
            `;

            return resultHtml;
        }

        // 表单提交处理
        evaluationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // 检查是否选择了至少一个标准
            const checkedBoxes = evaluationForm.querySelectorAll('input[name="criteria"]:checked');
            
            if (checkedBoxes.length === 0) {
                alert('请至少选择一个申请标准');
                return;
            }

            // 计算评估结果
            const result = calculateEvaluationScore();

            // 显示结果
            evaluationResult.innerHTML = generateEvaluationResult(result);
            evaluationResult.style.display = 'block';
        });

        // 初始化复选框
        createEvaluationCheckboxes();
    }

    // 开始评估的全局函数（可能被其他页面调用）
    window.startEvaluation = function() {
        // 滚动到评估表单
        const evaluationForm = document.getElementById('evaluationForm');
        if (evaluationForm) {
            evaluationForm.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    };
});