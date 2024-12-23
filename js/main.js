document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const page1Header = document.querySelector('.page-1-header');
    const page2Header = document.querySelector('.page-2-header');
    const page1Content = document.querySelector('.rows-container:not(.page-2)');
    const page2Content = document.querySelector('.rows-container.page-2');
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        
        page1Header.style.display = page === 1 ? 'flex' : 'none';
        page2Header.style.display = page === 1 ? 'none' : 'flex';

        page1Content.style.display = page === 1 ? 'flex' : 'none';
        page2Content.style.display = page === 1 ? 'none' : 'flex';

        const pageNumbers = paginationNumbers.children;
        Array.from(pageNumbers).forEach((num, index) => {
            if (index + 1 === page) {
                num.classList.add('page-number');
            } else {
                num.classList.remove('page-number');
            }
        });

        if (page === 1) {
            prevButton.classList.add('inactive');
            nextButton.classList.remove('inactive');
        } else {
            prevButton.classList.remove('inactive');
            nextButton.classList.add('inactive');
        }

        if (page === 1) {
            updateProgressBars();
        }
    }

    function updateProgressBars() {
        const headerColumns = document.querySelectorAll('.page-1-header .stat-column');
        const allManagerRows = document.querySelectorAll('.manager-row, .manager-row-alt');
        
        allManagerRows.forEach(row => {
            const statColumns = row.querySelectorAll('.stat-column');
            
            statColumns.forEach((column, index) => {
                const statValue = parseInt(column.querySelector('.stat-value').textContent);
                const progressBar = column.querySelector('.progress-bar');
                const progressFill = column.querySelector('.progress-fill');
                
                if (progressBar && progressFill) {
                    const normText = headerColumns[index].querySelector('.stat-subtitle').textContent;
                    const maxValue = parseInt(normText.match(/\d+/)[0]);
                    const fillPercentage = (statValue / maxValue) * 100;
                    
                    progressFill.style.width = Math.min(fillPercentage, 100) + '%';
                    
                    if (fillPercentage >= 100) {
                        progressFill.classList.add('highlight');
                        progressBar.classList.add('highlight');
                    } else {
                        progressFill.classList.remove('highlight');
                        progressBar.classList.remove('highlight');
                    }
                }
            });
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentPage !== 1) {
            showPage(1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage !== 2) {
            showPage(2);
        }
    });

    Array.from(paginationNumbers.children).forEach((num, index) => {
        num.addEventListener('click', () => {
            showPage(index + 1);
        });
    });

    showPage(1);
}); 