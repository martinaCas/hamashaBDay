document.addEventListener("DOMContentLoaded", () => {
    const musicBox = document.getElementById("music-box");
    const musicAudio = document.getElementById("music-audio");
    const startButton = document.getElementById("start-celebrate");
    const startMessage = document.getElementById("start-message");
    const heartbeatAudio = document.getElementById("heartbeat-audio"); // Nuovo audio


    musicBox.addEventListener("click", () => {
        if (!musicAudio.paused) return; // Evita di riavviare la musica

        musicBox.src = "../assets/gif/music-box-gif.gif";
        musicBox.classList.add("active");

        musicAudio.playbackRate = 1.5;
        musicAudio.currentTime = 0; // Riparte sempre dall'inizio
        musicAudio.play();


         // ⏳ Dopo 25 secondi, avvia il battito cardiaco dal secondo 25 dell'audio stesso
         setTimeout(() => {
            heartbeatAudio.currentTime = 32; // Parte dal secondo 25
            heartbeatAudio.play();
        }, 4000); // Avvia dopo 2 secondi

        // Ferma la musica 3.3 secondi prima della fine
        const stopTime = musicAudio.duration - 3.3;
        const checkInterval = setInterval(() => {
            if (musicAudio.currentTime >= stopTime) {
                musicAudio.pause();
                heartbeatAudio.pause();
                heartbeatAudio.currentTime = 0; // Resetta per il futuro
                clearInterval(checkInterval);

                // Torna all'immagine originale dopo la pausa
                musicBox.src = "../assets/img/music-box.png";
                musicBox.classList.remove("active");

              // Mostra il messaggio e il pulsante solo la prima volta
              if (startButton.classList.contains("hidden")) {
                setTimeout(() => {
                    startMessage.classList.remove("hidden");
                    startButton.classList.remove("hidden");
                }, 1000);
            }}
        }, 200);
    });

    const glitchAudio = document.getElementById("glitch-audio");

    startButton.addEventListener("click", () => {
        // 🎵 Inizia la riproduzione dal secondo 1
        glitchAudio.currentTime = 1;
        glitchAudio.play();

        // 🖥️ Aggiunge l'effetto shake
        document.body.classList.add("shake-effect");

        // ⏳ Ferma l’audio e aggiunge lo shade dopo 3 secondi
        setTimeout(() => {
            glitchAudio.pause();
            glitchAudio.currentTime = 0; // Reset per il futuro

            // ✴️ Effetto shade nero
            let shadeEffect = document.createElement("div");
            shadeEffect.classList.add("shade-effect");
            document.body.appendChild(shadeEffect);

            // 🔄 Dopo 1s passa alla pagina di gioco
            setTimeout(() => {
                window.location.href = "pages/game.html";
            }, 1000);
        }, 3000);
    });

   


    glitchAudio.addEventListener("canplaythrough", () => {
        console.log("Audio pronto a essere riprodotto.");
    });
    



});
