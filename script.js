document.addEventListener('DOMContentLoaded', function() {
    const playButtonOverlay = document.getElementById('playButtonOverlay');
    const gridOverlay = document.getElementById('gridOverlay');
    
    // إعدادات الشبكة 5x5
    const GRID_SIZE = 5;
    const SAFE_CELLS_COUNT = 3;
    
    // مصفوفة لتخزين المربعات المختارة
    let selectedCells = [];
    
    // حساب مواضع المربعات في الشبكة
    function calculateGridPositions() {
        const positions = [];
        
        // نسب الشبكة بناءً على الصورة
        const gridTop = 19; // نسبة مئوية من الأعلى
        const gridLeft = 15; // نسبة مئوية من اليسار
        const gridWidth = 70; // نسبة مئوية من العرض
        const gridHeight = 45; // نسبة مئوية من الارتفاع
        
        const cellWidth = gridWidth / GRID_SIZE;
        const cellHeight = gridHeight / GRID_SIZE;
        
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                positions.push({
                    top: gridTop + (row * cellHeight),
                    left: gridLeft + (col * cellWidth),
                    width: cellWidth * 0.8, // تقليل الحجم قليلاً للمظهر
                    height: cellHeight * 0.8
                });
            }
        }
        
        return positions;
    }
    
    // اختيار مربعات عشوائية
    function selectRandomCells() {
        const totalCells = GRID_SIZE * GRID_SIZE;
        const selected = new Set();
        
        while (selected.size < SAFE_CELLS_COUNT) {
            const randomIndex = Math.floor(Math.random() * totalCells);
            selected.add(randomIndex);
        }
        
        return Array.from(selected);
    }
    
    // إنشاء وعرض المربعات المختارة
    function showSafeCells() {
        // إزالة المربعات السابقة
        clearPreviousCells();
        
        // اختيار مربعات جديدة
        selectedCells = selectRandomCells();
        const positions = calculateGridPositions();
        
        // إنشاء وعرض المربعات
        selectedCells.forEach(cellIndex => {
            const position = positions[cellIndex];
            const cellElement = document.createElement('div');
            
            cellElement.className = 'grid-cell';
            cellElement.style.top = position.top + '%';
            cellElement.style.left = position.left + '%';
            cellElement.style.width = position.width + '%';
            cellElement.style.height = position.height + '%';
            
            gridOverlay.appendChild(cellElement);
            
            // تأثير الظهور التدريجي
            setTimeout(() => {
                cellElement.classList.add('active');
            }, 100);
        });
    }
    
    // إزالة المربعات السابقة
    function clearPreviousCells() {
        const existingCells = gridOverlay.querySelectorAll('.grid-cell');
        existingCells.forEach(cell => {
            cell.classList.remove('active');
            setTimeout(() => {
                if (cell.parentNode) {
                    cell.parentNode.removeChild(cell);
                }
            }, 300);
        });
    }
    
    // إضافة مستمع الحدث للزر
    playButtonOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        showSafeCells();
        
        // تأثير بصري للزر
        this.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
        setTimeout(() => {
            this.style.backgroundColor = 'transparent';
        }, 200);
    });
    
    // إضافة تأثير hover للزر
    playButtonOverlay.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
    });
    
    playButtonOverlay.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
});

