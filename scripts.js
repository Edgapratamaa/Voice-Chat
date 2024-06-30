navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        console.log('Anda mengizinkan saya menggunakan mikrofon Anda!');
    })
    .catch(function(err) {
        console.log('Tidak ada mikrofon untuk Anda!');
    });

function runSpeechRecognition() {
    var output = document.getElementById("output");
    var responseDiv = document.getElementById("response");
    var action = document.getElementById("action");
    var speakBtn = document.getElementById("speakBtn");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        action.innerHTML = "<small>Silakan bicara...</small>";
        speakBtn.classList.add("listening");
    };

    recognition.onspeechend = function() {
        action.innerHTML = "<small>Selesai...</small>";
        speakBtn.classList.remove("listening");
        recognition.stop();
    };

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Transcript: ", transcript); 
        output.innerHTML = "<strong>Asli:</strong> " + transcript;
        output.classList.remove("hide");

        var responseText = "Maaf, saya tidak mengerti. Bisa tolong diulangi?";
        if (transcript.includes("halo")) {
            responseText = "Halo! Ada yang bisa saya bantu?";
        } else if (transcript.includes("apa kabar")) {
            responseText = "Saya baik, terima kasih! Bagaimana dengan Anda?";
        } else if (transcript.includes("apakah kamu mencintaiku")) {
            responseText = "Tentu saja, ya!";
        } else if (transcript.includes("siapa namamu")) {
            responseText = "Saya adalah VoiceTranslate Chat.";
        } else if (transcript.includes("selamat tinggal")) {
            responseText = "Selamat tinggal! Semoga harimu menyenangkan!";
        } else if (transcript.includes("terima kasih")) {
            responseText = "Sama-sama!";
        } else if (transcript.includes("berapa umurmu")) {
            responseText = "Saya tidak punya umur, saya adalah program komputer!";
        }

        responsiveVoice.speak(responseText, "Indonesian Female");
        responseDiv.innerHTML = "<strong>Respon:</strong> " + responseText;
        responseDiv.classList.remove("hide");
    };

    recognition.lang = 'id-ID';  
    recognition.start();
}
