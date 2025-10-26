document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".presentation_text");
    const overlay = document.getElementById("intro-overlay");
    const enterButton = document.getElementById("intro-enter");
    const header = document.querySelector(".header");

    const text = `Étudiant à Epitech en spécialisation IA, je
recherche une alternance pour approfondir mes compétences
dans ce domaine.
J’ai également acquis une bonne connaissance des
secteurs luxe et culture grâce à une précédente expérience
en alternance.`;

    let index = 0;
    let typingStarted = false;

    function typeWriter() {
        if (index < text.length) {
            textElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 12);
        }
    }

    function startExperience() {
        if (typingStarted) return;
        typingStarted = true;
        typeWriter();
    }

    function animateHeaderCode(onDone) {
        if (!header) {
            onDone();
            return;
        }

        const fauxCode = `/* header.css */ <header class="header"> .header__navCtn{display:flex;justify-content:space-between} a{color:#fff} </header> <!-- html --> <ul><li>Présentation</li><li>Mon parcours</li><li>Mes expériences</li><li>Contact</li></ul>`;

        const pres = document.querySelector('.presentation');
        const parcours = document.querySelector('.parcours');
        const presCode = `/* presentation.css */\n.presentation{ background:#000; color:#fff }\n/* html */\n<section id="presentation">\n  <h2>Présentation</h2>\n  <div class="presentation__contentCtn">\n    <p>...</p>\n  </div>\n</section>`;
        const parcoursCode = `/* parcours.css */\n.parcours{ display:block }\n/* html */\n<section id="parcours">\n  <h2>Mon Parcours</h2>\n  <article>...</article>\n</section>`;
        precreateOverlay(pres);
        precreateOverlay(parcours);

        header.classList.add("header--animating");
        const codeLayer = document.createElement("div");
        codeLayer.className = "header__code";
        const codeText = document.createElement("span");
        codeText.className = "header__codeText";
        codeLayer.appendChild(codeText);
        header.appendChild(codeLayer);

        startSectionOverlay(pres, presCode, 2000, 0);
        startSectionOverlay(parcours, parcoursCode, 2000, 0);

        const totalDurationMs = 2000;
        const steps = 100;
        const intervalMs = Math.max(6, Math.floor(totalDurationMs / steps));
        const chunkSize = Math.max(1, Math.ceil(fauxCode.length / steps));
        let i = 0;

        function typeNext() {
            if (i < fauxCode.length) {
                const nextChunk = fauxCode.slice(i, i + chunkSize);
                codeText.textContent += nextChunk;
                i += nextChunk.length;
                setTimeout(typeNext, intervalMs);
            } else {
                codeLayer.classList.add("is-hidden");
                header.classList.remove("header--animating");
                setTimeout(() => {
                    codeLayer.remove();
                    onDone();
                }, 220);
            }
        }

        typeNext();
    }

    function precreateOverlay(container) {
        if (!container) return;
        if (container.classList.contains('presentation')) container.classList.add('presentation--animating');
        if (container.classList.contains('parcours')) container.classList.add('parcours--animating');
    }

    function startSectionOverlay(container, code, durationMs, delayMs) {
        if (!container) return;
        setTimeout(() => {
            const codeLayer = document.createElement('div');
            codeLayer.className = 'header__code code--multiline';
            const codeText = document.createElement('span');
            codeText.className = 'header__codeText';
            codeLayer.appendChild(codeText);
            container.appendChild(codeLayer);

        const steps = 100;
        const intervalMs = Math.max(6, Math.floor(durationMs / steps));
        const chunkSize = Math.max(1, Math.ceil(code.length / steps));
            let i = 0;

            function typeNext() {
                if (i < code.length) {
                    const nextChunk = code.slice(i, i + chunkSize);
                    codeText.textContent += nextChunk;
                    i += nextChunk.length;
                    setTimeout(typeNext, intervalMs);
                } else {
                    codeLayer.classList.add('is-hidden');
                    if (container.classList.contains('presentation')) container.classList.remove('presentation--animating');
                    if (container.classList.contains('parcours')) container.classList.remove('parcours--animating');
                    setTimeout(() => {
                        codeLayer.remove();
                    }, 220);
                }
            }

            typeNext();
        }, delayMs);
    }


    function closeOverlay() {
        if (!overlay) {
            document.body.classList.remove("is-intro");

            animateHeaderCode(startExperience);
            return;
        }
        overlay.classList.add("is-hidden");
        document.body.classList.remove("is-intro");
        setTimeout(() => {
            overlay.remove();
        }, 750);
        animateHeaderCode(startExperience);
    }

    if (enterButton) {
        enterButton.addEventListener("click", closeOverlay);
    }

    if (!overlay) {
        animateHeaderCode(startExperience);
    }
});
