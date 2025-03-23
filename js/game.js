document.addEventListener("DOMContentLoaded", () => {
    const ghostOrb = document.querySelector(".ghost-orb");


    
    function moveGhostOrb() {
        const x = Math.random() * window.innerWidth * 0.95;
        const y = Math.random() * window.innerHeight * 0.95;

        ghostOrb.style.transition = "transform 7s ease-in-out";
        ghostOrb.style.transform = `translate(${x}px, ${y}px)`;

        setTimeout(moveGhostOrb, Math.random() * 5000 + 10000);
    }

    moveGhostOrb();

    document.getElementById("start-overlay").addEventListener("click", () => {
        const welcomeSound = new Audio("../assets/audio/welcome.mp3");
        welcomeSound.play();
    
        document.getElementById("start-overlay").remove();
    });
    
    // 🔹 GESTIONE CARTE
    const cardDeck = document.getElementById("card-deck");
    const cardDrawSound = document.getElementById("card-draw-sound");

    let cardOrder = [
          "moon-card",
        "sun-card",
        "tower-card",
        "wheel-of-fortune-card",
        "devil-card", 
        "death-card", 
        "final-card"
    ];

    let drawnCards = 0;

    const cardsRemainingText = document.getElementById("cards-remaining");


    cardDeck.addEventListener("click", () => {


        if (drawnCards < cardOrder.length) {
            const drawnCardId = cardOrder[drawnCards];
            const cardDialog = document.getElementById(drawnCardId);
    
            if (cardDialog) {
                console.log(`🔵 Carta pescata: ${drawnCardId}`);
    
                cardDrawSound.currentTime = 0;
                cardDrawSound.play().catch(e => console.warn("🎵 Errore audio:", e));
    
                cardDialog.classList.add("show");
    
                // 🔥 Avvia direttamente la funzione senza timeout
                if (drawnCardId === "moon-card") playMoonCard();
                else if (drawnCardId === "sun-card") playSunCard();
                else if (drawnCardId === "tower-card") playTowerCard();
                else if (drawnCardId === "wheel-of-fortune-card") playWheelCard();
                else if (drawnCardId === "devil-card") playDevilCard();
                else if (drawnCardId === "death-card") playDeathCard();
                else if (drawnCardId === "final-card") playFinalCard();

                drawnCards++;
                const cardsLeft = cardOrder.length - drawnCards;
cardsRemainingText.textContent = `Cards remaining: ${cardsLeft}`;

            } else {
                console.error(`❌ ERRORE: Nessun elemento trovato con ID '${drawnCardId}'`);
            }
        }
    });
    

    

    // 🔹 CHIUSURA DIALOGHI
    document.querySelectorAll(".close-button").forEach(button => {
        button.addEventListener("click", () => {
            const cardDialog = button.closest(".card-dialog");
            cardDialog.classList.add("fade-out-card");
            setTimeout(() => {
                cardDialog.classList.remove("show", "fade-out-card");
            }, 1500);
        });
    });

    // 🔥 The Moon Card Effect
    function playMoonCard() {
        const cardDialog = document.getElementById("moon-card");
        const cardDisplay = document.getElementById("moon-display");
        const memeVideo = document.createElement("video");

        cardDisplay.src = "../assets/img/cards/moon-card.webp";

        setTimeout(() => { cardDisplay.classList.add("burning"); }, 1500);

        setTimeout(() => {
            memeVideo.src = "../assets/video/viego.mp4"; 
            memeVideo.autoplay = true;
            memeVideo.muted = false;
            memeVideo.controls = false;
            memeVideo.classList.add("video-fullscreen-sukuna");

            cardDisplay.style.display = "none";
            cardDialog.innerHTML = "";
            cardDialog.appendChild(memeVideo);

            // ⏳ Fade-out prima della chiusura
            memeVideo.addEventListener("timeupdate", () => {
                if (memeVideo.duration - memeVideo.currentTime <= 2.3) {
                    memeVideo.pause();
                    memeVideo.classList.add("fade-out-video");
                    setTimeout(() => { cardDialog.classList.remove("show"); }, 1500);
                }
            });

        }, 2500);
    }

    function playSunCard() {
        const cardDialog = document.getElementById("sun-card");
        const cardVideo = document.createElement("video");
        const evidenceText = document.createElement("p");
        const cardAudio = new Audio("../assets/audio/evidence.mp3");
        const cardDisplay = document.getElementById("sun-display");
    
        cardDisplay.src = "../assets/img/cards/sun-card.webp";
        cardDisplay.style.display = "block";
        cardDialog.classList.add("show");
    
        // 🔥 Effetto bruciatura dopo 1.5 secondi
        setTimeout(() => {
            cardDisplay.classList.add("burning");
        }, 1500);
    
        // ⏳ Dopo 2 secondi, avvia il video
        setTimeout(() => {
            cardVideo.src = "../assets/video/first-vid.mp4";
            cardVideo.autoplay = true;
            cardVideo.muted = false;
            cardVideo.controls = false;
            cardVideo.classList.add("video-fullscreen");
    
            cardDisplay.style.display = "none"; // Nasconde la carta
            cardDialog.innerHTML = ""; // Pulisce il contenuto e aggiunge il video
            cardDialog.appendChild(cardVideo);
    
            // 🎬 Alla fine del video, mostra l'evidenza
            cardVideo.onended = () => {
                cardVideo.classList.add("fade-out-video");
    
                setTimeout(() => {
                    cardVideo.remove();
                    evidenceText.innerHTML = "You got the first evidence:<br> <strong>Spirit Box</strong>";
                    evidenceText.classList.add("evidence-glow");
                    cardDialog.appendChild(evidenceText);
    
                    revealEvidence(0); 

                    cardAudio.play();
    
                    cardAudio.onended = () => {
                        evidenceText.classList.add("fade-out");
                        setTimeout(() => {
                            cardDialog.classList.remove("show");
                            evidenceText.remove();
                        }, 1500);
                    };
                }, 1000); // Aspetta 1 secondo dopo la dissolvenza prima di mostrare l'evidenza
            };
        }, 2000); // ⏳ Aspetta 2 secondi prima di far partire il video
    }
    

    // ⚡ The Tower Card Effect
    function playTowerCard() {
        const cardDialog = document.getElementById("tower-card");
        const cardDisplay = document.getElementById("tower-display");
        const sukunaLaugh = new Audio("../assets/audio/sukuna-laugh.mp3");
        const sukunaVideo = document.createElement("video");

        cardDisplay.src = "../assets/img/cards/tower-card.webp";
        sukunaLaugh.play();

        setTimeout(() => {
            sukunaVideo.src = "../assets/video/sukuna.mp4";
            sukunaVideo.autoplay = true;
            sukunaVideo.muted = false;
            sukunaVideo.controls = false;
            sukunaVideo.classList.add("video-fullscreen-sukuna");

            cardDisplay.style.display = "none";
            cardDialog.innerHTML = "";
            cardDialog.appendChild(sukunaVideo);

            document.body.classList.add("shake");

            // ⏳ Alla fine del video, dissolvenza e chiusura
            sukunaVideo.onended = () => {
                document.body.classList.remove("shake");
                cardDialog.classList.add("fade-out-card");

                setTimeout(() => {
                    cardDialog.classList.remove("show");
                }, 1500);
            };
        }, 2000);
    }

    function playWheelCard() {
        const cardDialog = document.getElementById("wheel-of-fortune-card");
        const cardVideo = document.createElement("video");
        const evidenceText = document.createElement("p");
        const cardAudio = new Audio("../assets/audio/evidence.mp3");
        const cardDisplay = document.getElementById("wheel-display");
    
        cardDisplay.src = "../assets/img/cards/wheel-of-fortune-card.webp";
        cardDisplay.style.display = "block";
        cardDialog.classList.add("show");
    
        // 🔥 Effetto bruciatura dopo 1.5 secondi
        setTimeout(() => {
            cardDisplay.classList.add("burning");
        }, 1500);
    
        // ⏳ Dopo 2 secondi, avvia il video
        setTimeout(() => {
            cardVideo.src = "../assets/video/second-vid.mp4"; // Cambia con il nuovo video
            cardVideo.autoplay = true;
            cardVideo.muted = false;
            cardVideo.controls = false;
            cardVideo.classList.add("video-fullscreen");
    
            cardVideo.playbackRate = 0.75; // 🎬 Rallenta il video a metà velocità

            cardDisplay.style.display = "none"; // Nasconde la carta
            cardDialog.innerHTML = ""; // Pulisce il contenuto e aggiunge il video
            cardDialog.appendChild(cardVideo);
    
            // 🎬 Alla fine del video, mostra l'evidence
            cardVideo.onended = () => {
                cardVideo.classList.add("fade-out-video");
    
                setTimeout(() => {
                    cardVideo.remove();
                    evidenceText.innerHTML = "You got the second evidence:<br> <strong>Fingerprints</strong>";
                    evidenceText.classList.add("evidence-glow");
                    cardDialog.appendChild(evidenceText);
    
                    revealEvidence(1); 

                    cardAudio.play();
    
                    cardAudio.onended = () => {
                        evidenceText.classList.add("fade-out");
                        setTimeout(() => {
                            cardDialog.classList.remove("show");
                            evidenceText.remove();
                        }, 1500);
                    };
                }, 1000); // Aspetta 1 secondo dopo la dissolvenza prima di mostrare l'evidence
            };
        }, 2000); // ⏳ Aspetta 2 secondi prima di far partire il video
    }
    
    function playDevilCard() {
        const cardDialog = document.getElementById("devil-card");
        const cardVideo = document.createElement("video");
        const cardDisplay = document.getElementById("devil-display");
    
        cardDisplay.src = "../assets/img/cards/devil-card.webp";
        cardDisplay.style.display = "block";
        cardDialog.classList.add("show");
    
        // 🔥 Effetto bruciatura dopo 1.5 secondi
        setTimeout(() => {
            cardDisplay.classList.add("burning");
        }, 1500);
    
        // ⏳ Dopo 2 secondi, avvia il video jumpscare
        setTimeout(() => {
            cardVideo.src = "../assets/video/third-vid.mp4"; // 📌 Sostituisci con il video giusto
            cardVideo.autoplay = true;
            cardVideo.muted = false;
            cardVideo.controls = false;
            cardVideo.classList.add("video-fullscreen");
    
            cardDisplay.style.display = "none";
            cardDialog.innerHTML = "";
            cardDialog.appendChild(cardVideo);
    
            // 🕒 Intercetta 2 secondi prima della fine
            cardVideo.addEventListener("timeupdate", () => {
                if (cardVideo.duration - cardVideo.currentTime <= 2.1) {
                    cardVideo.pause();
                    cardVideo.classList.add("fade-out-video");
    
                    setTimeout(() => {
                        cardDialog.classList.remove("show");
                        cardVideo.remove();
                    }, 1500);
                }
            });
    
            cardVideo.onerror = () => {
                console.error("⚠️ Errore nel caricamento del video third-vid.mp4");
            };
        }, 2000);
    }
    
    function playDeathCard() {
        const cardDialog = document.getElementById("death-card");
        const cardVideo = document.createElement("video");
        const evidenceText = document.createElement("p");
        const cardAudio = new Audio("../assets/audio/evidence.mp3");
        const cardDisplay = document.getElementById("death-display");
    
        cardDisplay.src = "../assets/img/cards/death-card.webp";
        cardDisplay.style.display = "block";
        cardDialog.classList.add("show");
    
        // 🔥 Effetto bruciatura dopo 1.5 secondi
        setTimeout(() => {
            cardDisplay.classList.add("burning");
        }, 1500);
    
        // ⏳ Dopo 2 secondi, avvia il video
        setTimeout(() => {
            cardVideo.src = "../assets/video/death-vid.mp4";
            cardVideo.autoplay = true;
            cardVideo.muted = false;
            cardVideo.controls = false;
            cardVideo.classList.add("video-fullscreen-sukuna");
    
            cardDisplay.style.display = "none"; // Nasconde la carta
            cardDialog.innerHTML = ""; // Pulisce il contenuto e aggiunge il video
            cardDialog.appendChild(cardVideo);
    
            // Ferma il video 2 secondi prima della fine
            cardVideo.addEventListener("timeupdate", () => {
                if (cardVideo.duration - cardVideo.currentTime <= 2.1) {
                    cardVideo.pause();
                    cardVideo.classList.add("fade-out-video");
    
                    setTimeout(() => {
                        cardVideo.remove();
                        evidenceText.innerHTML = "You got the last evidence:<br><strong>Freezing Temperatures</strong>";
                        evidenceText.classList.add("evidence-glow");
                        cardDialog.appendChild(evidenceText);
    
                        // 🔄 Registra la terza evidenza
                        revealEvidence(2);
                        cardAudio.play();
    
                        cardAudio.onended = () => {
                            evidenceText.classList.add("fade-out");
    
                            setTimeout(() => {
                                cardDialog.classList.remove("show");
                                evidenceText.remove();
    
                                // ✨ Mostra il Mimic come unico candidato
                                highlightFinalGhost("The Mimic");
    
                            }, 1500);
                        };
                    }, 1000);
                }
            });
    
        }, 2000);
    }
    
    
    function highlightFinalGhost(ghostName) {
        const ghosts = document.querySelectorAll(".ghost-option");
    
        ghosts.forEach(ghost => {
            if (ghost.textContent.trim() === ghostName) {
                ghost.classList.add("highlight-mimic");
            } else {
                ghost.classList.add("ghost-fade");
            }
        });
    
    }
    
// 👻 Mostra il reveal se cliccano su "The Mimic"
const mimicGhost = document.getElementById("mimic-ghost");
mimicGhost.addEventListener("click", () => {
    showGhostRevealDialog();
});

    
    function showGhostRevealDialog() {
        const dialog = document.getElementById("ghost-reveal-dialog");
        dialog.classList.remove("hidden");
    
        const btn = document.getElementById("reveal-surprise-btn");
        btn.addEventListener("click", () => {
            dialog.classList.add("hidden");
            enableFinalCard(); // questa è la funzione che attiva l’ultima carta
        });
    }
    

    function enableFinalCard() {
        finalCardUnlocked = true;
    
        // ✨ Evidenzia la carta finale nel mazzo (opzionale)
        const finalCard = document.querySelector('[data-index="6"]');
        finalCard.classList.add("glow-card");
    }

    
    function playFinalCard() {
        const cardDialog = document.getElementById("final-card");
        const cardDisplay = document.getElementById("final-display");
        const cardVideo = document.createElement("video");
    
        // Mostra la carta per qualche secondo prima del video
        cardDisplay.src = "../assets/img/cards/high-priestess-card.webp";
        cardDisplay.style.display = "block";
        cardDialog.classList.add("show");
    
        // Dopo 2s mostra il video
        setTimeout(() => {
            cardVideo.src = "../assets/video/final-vid.mp4";
            cardVideo.autoplay = true;
            cardVideo.muted = false;
            cardVideo.controls = false;
            cardVideo.classList.add("video-fullscreen");
    
            cardDisplay.style.display = "none";
            cardDialog.innerHTML = "";
            cardDialog.appendChild(cardVideo);
    
            // Chiudiamo 2s prima della fine del video
            cardVideo.addEventListener("timeupdate", () => {
                if (cardVideo.duration && cardVideo.duration - cardVideo.currentTime <= 2.1) {
                    cardVideo.pause();
                    cardVideo.classList.add("fade-out-video");
    
                    setTimeout(() => {
                        cardDialog.classList.remove("show");
                    }, 1500);
                }
            });
        }, 2000);
    }
    
    
    
    // 🔄 Aggiornamento evidenze
    function updateEvidenceList(evidence) {
        const evidenceContainer = document.querySelector(".evidence-container");
        const noEvidenceText = document.getElementById("evidence-text");

        if (noEvidenceText) {
            noEvidenceText.remove();
        }

        const newEvidence = document.createElement("p");
        newEvidence.textContent = `🔍 ${evidence}`;
        newEvidence.classList.add("evidence-item");
        evidenceContainer.appendChild(newEvidence);
    }

    
    // 📌 Lista delle evidenze fisse per The Mimic
    const mimicEvidences = ["Spirit Box", "Fingerprints", "Freezing Temperatures"];
    
    // 📌 Lista di tutti i fantasmi e le loro evidenze
    const ghostData = {
        "Spirit": ["EMF Level 5", "Ghost Writing", "Spirit Box"],
        "Wraith": ["Spirit Box", "Fingerprints", "D.O.T.S Projector"],
        "Phantom": ["Spirit Box", "Fingerprints", "D.O.T.S Projector"],
        "Poltergeist": ["Spirit Box", "Fingerprints", "Ghost Writing"],
        "Banshee": ["Fingerprints", "Ghost Orbs", "D.O.T.S Projector"],
        "Jinn": ["EMF Level 5", "Fingerprints", "Freezing Temperatures"],
        "Mare": ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
        "Revenant": ["Ghost Orbs", "Ghost Writing", "Freezing Temperatures"],
        "Shade": ["EMF Level 5", "Ghost Writing", "Freezing Temperatures"],
        "Demon": ["Fingerprints", "Ghost Writing", "Freezing Temperatures"],
        "Yurei": ["Ghost Orbs", "Freezing Temperatures", "D.O.T.S Projector"],
        "Oni": ["EMF Level 5", "Freezing Temperatures", "D.O.T.S Projector"],
        "Yokai": ["Spirit Box", "Ghost Orbs", "D.O.T.S Projector"],
        "Hantu": ["Fingerprints", "Ghost Orbs", "Freezing Temperatures"],
        "Goryo": ["EMF Level 5", "Fingerprints", "D.O.T.S Projector"],
        "Myling": ["EMF Level 5", "Fingerprints", "Ghost Writing"],
        "Onryo": ["Spirit Box", "Ghost Orbs", "Freezing Temperatures"],
        "The Twins": ["EMF Level 5", "Spirit Box", "Freezing Temperatures"],
        "Raiju": ["EMF Level 5", "Ghost Orbs", "D.O.T.S Projector"],
        "Obake": ["EMF Level 5", "Fingerprints", "Ghost Orbs"],
        "The Mimic": ["Spirit Box", "Fingerprints", "Freezing Temperatures"], // 🔥 Il nostro target!
        "Moroi": ["Spirit Box", "Ghost Writing", "Freezing Temperatures"],
        "Deogen": ["Spirit Box", "Ghost Writing", "D.O.T.S Projector"],
        "Thaye": ["Ghost Orbs", "Ghost Writing", "D.O.T.S Projector"]
    };

    let foundEvidences = [];

    function updateGhostList() {
        const ghostOptions = document.querySelectorAll(".ghost-option");

        ghostOptions.forEach(ghost => {
            const ghostName = ghost.textContent.trim();
            const ghostEvidences = ghostData[ghostName];

            if (ghostEvidences) {
                const isValid = foundEvidences.every(ev => ghostEvidences.includes(ev));

                if (!isValid) {
                    ghost.classList.add("crossed-out"); // 🔥 Tratteggia il fantasma
                }
            }
        });
    }

    function addEvidence(evidence) {
        if (!foundEvidences.includes(evidence)) {
            foundEvidences.push(evidence);
            updateEvidenceList(evidence);
            updateGhostList();
        }
    }

    function updateEvidenceList(evidence) {
        const evidenceContainer = document.querySelector(".evidence-container");
        const noEvidenceText = document.getElementById("evidence-text");

        if (noEvidenceText) {
            noEvidenceText.remove();
        }

        const newEvidence = document.createElement("p");
        newEvidence.textContent = `🔍 ${evidence}`;
        newEvidence.classList.add("evidence-item");
        evidenceContainer.appendChild(newEvidence);
    }

    // 🔹 Assegniamo le evidenze fisse del Mimic durante il gioco
    function revealEvidence(index) {
        if (index < mimicEvidences.length) {
            setTimeout(() => {
                addEvidence(mimicEvidences[index]);
            }, 500); // 🔥 Ritardo per effetto visivo
        }
    }
    const style = document.createElement("style");
    style.innerHTML = `
        .crossed-out {
            opacity: 0.3;
            text-decoration: line-through;
        }
    `;
    document.head.appendChild(style);
});
