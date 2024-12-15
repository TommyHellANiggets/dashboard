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
        const statColumns = page1Content.querySelectorAll('.stat-column');
        statColumns.forEach((column, index) => {
            const statValue = parseInt(column.querySelector('.stat-value').textContent);
            const progressBar = column.querySelector('.progress-bar');
            const progressFill = column.querySelector('.progress-fill');
            
            if (progressBar && progressFill) {
                const maxValue = index === 1 ? 100 : 50;
                const fillPercentage = (statValue / maxValue) * 100;
                
                progressFill.style.width = Math.min(fillPercentage, 100) + '%';
                
                if (statValue >= maxValue) {
                    progressBar.style.backgroundColor = 'var(--yellow)';
                    progressFill.style.backgroundColor = 'var(--yellow)';
                } else {
                    progressBar.style.backgroundColor = 'var(--progress-bg)';
                    progressFill.style.backgroundColor = 'var(--white)';
                }
            }
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