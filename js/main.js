document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.querySelector('.back-to-top');
  const heroTitle = document.querySelector('.hero-title');
  const heroSection = document.querySelector('.hero');
  const statsSection = document.querySelector('.stats-section');
  const solutionTabs = Array.from(document.querySelectorAll('.solution-tab'));

  if (backToTopButton) {
    const updateBackToTopVisibility = () => {
      backToTopButton.classList.toggle('is-visible', window.scrollY > 500);
    };

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
  }

  if (heroTitle && heroSection) {
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          heroTitle.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.35 });
      heroObserver.observe(heroSection);
    } else {
      heroTitle.classList.add('is-visible');
    }
  }

  if (solutionTabs.length) {
    function activateSolutionTab(selectedTab) {
      solutionTabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.setAttribute('aria-hidden', String(!isSelected));
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });
    }

    solutionTabs.forEach((tab, tabIndex) => {
      tab.addEventListener('click', () => activateSolutionTab(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (tabIndex + direction + solutionTabs.length) % solutionTabs.length;
        solutionTabs[nextIndex].focus();
        activateSolutionTab(solutionTabs[nextIndex]);
      });
    });
  }

  if (statsSection) {
    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          statsSection.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.2 });
      statsObserver.observe(statsSection);
    } else {
      statsSection.classList.add('is-visible');
    }
  }
});
