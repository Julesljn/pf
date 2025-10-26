document.addEventListener('DOMContentLoaded', function () {
    const navContainer = document.querySelector('.header__navCtn');
    const navList = document.querySelector('.header__nav');
    if (!navContainer || !navList) return;

    const burgerBtn = document.createElement('button');
    burgerBtn.className = 'header__burger';
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
    burgerBtn.setAttribute('aria-expanded', 'false');

    navContainer.appendChild(burgerBtn);

    const modal = document.createElement('div');
    modal.className = 'mobileMenu';
    modal.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'mobileMenu__content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobileMenu__close';
    closeBtn.setAttribute('aria-label', 'Fermer le menu');
    closeBtn.textContent = '✕';

    const modalNav = document.createElement('ul');
    modalNav.className = 'mobileMenu__nav';

    navList.querySelectorAll('li').forEach((li) => {
        const clone = li.cloneNode(true);
        clone.classList.add('mobileMenu__nav--item');
        modalNav.appendChild(clone);
    });

    content.appendChild(closeBtn);
    content.appendChild(modalNav);
    modal.appendChild(content);
    document.body.appendChild(modal);

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        burgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('is-modal-open');
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-modal-open');
    }

    burgerBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    modalNav.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'A') {
            closeModal();
        }
    });
});
