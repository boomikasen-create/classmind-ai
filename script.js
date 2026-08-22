let recognition;
let isRecording = false;
let finalTranscript = "";
let timerInterval;
let seconds = 0;


/* =========================
   TEXT → STUDY MATERIAL
========================= */

function generateFromText() {

    const lesson =
        document.getElementById("lessonInput").value.trim();

    if (lesson === "") {
        alert("Please paste your lesson first.");
        return;
    }

    generateStudyMaterial(lesson);
}


/* =========================
   SPEECH RECOGNITION
========================= */

function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return false;
    }

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";


    recognition.onresult = function(event) {

        let interimTranscript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                finalTranscript += transcript + " ";

            } else {

                interimTranscript += transcript;
            }
        }

        document.getElementById("transcript").innerText =
            finalTranscript + interimTranscript;
    };


    recognition.onerror = function(event) {

        console.log(
            "Speech recognition error:",
            event.error
        );
    };


    recognition.onend = function() {

        if (isRecording) {
            recognition.start();
        }
    };


    return true;
}


/* =========================
   RECORDING
========================= */

function toggleRecording() {

    if (!recognition) {

        const ready =
            setupSpeechRecognition();

        if (!ready) {
            return;
        }
    }


    const button =
        document.getElementById("recordCircle");

    const status =
        document.getElementById("recordingStatus");


    if (!isRecording) {

        finalTranscript = "";

        seconds = 0;

        document.getElementById("timer").innerText =
            "00:00";

        document.getElementById("transcript").innerText =
            "Listening...";


        recognition.start();

        isRecording = true;

        button.classList.add("recording");

        status.innerText =
            "🔴 Recording class...";


        startTimer();

    } else {

        recognition.stop();

        isRecording = false;

        button.classList.remove("recording");

        status.innerText =
            "Recording stopped.";

        stopTimer();
    }
}


/* =========================
   TIMER
========================= */

function startTimer() {

    timerInterval = setInterval(function() {

        seconds++;

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        document.getElementById("timer").innerText =

            String(minutes).padStart(2, "0")
            + ":" +
            String(remainingSeconds).padStart(2, "0");

    }, 1000);
}


function stopTimer() {

    clearInterval(timerInterval);
}


/* =========================
   AUDIO → STUDY MATERIAL
========================= */

function generateFromAudio() {

    const transcript =
        finalTranscript.trim();

    if (transcript === "") {

        alert(
            "Record your class before generating the study pack."
        );

        return;
    }

    generateStudyMaterial(transcript);
}


/* =========================
   GENERATE STUDY PACK
========================= */

function generateStudyMaterial(lesson) {

    const results =
        document.getElementById("results");

    results.classList.remove("hidden");


    /*
       Prototype version:
       The transcript is displayed as the
       source material.

       Later we can connect this to an actual
       AI API to automatically summarize it.
    */


    window.currentLesson = lesson;


    document.getElementById("notesContent").innerHTML = `

        <p>
            <strong>Lesson captured successfully.</strong>
        </p>

        <br>

        <p>
            ${lesson}
        </p>

        <br>

        <p>
            Your AI-generated summary will appear
            here when the AI backend is connected.
        </p>

    `;


    document.getElementById("quizContent").innerHTML = `

        <p>
            Your quiz will be generated from
            this lesson.
        </p>

        <br>

        <p>
            <strong>Sample question:</strong>
        </p>

        <p>
            What is the main concept discussed
            in this lesson?
        </p>

        <button onclick="answer('A')">
            A. Main concept
        </button>

        <br>

        <button onclick="answer('B')">
            B. Secondary concept
        </button>

        <br>

        <button onclick="answer('C')">
            C. Unrelated concept
        </button>

    `;


    document.getElementById("flashcardContent").innerHTML = `

        <p>
            <strong>Flashcard</strong>
        </p>

        <br>

        <p>
            What is one important idea
            from this lesson?
        </p>

        <button onclick="showFlashcardAnswer()">
            Reveal answer
        </button>

        <p
            id="flashcardAnswer"
            class="hidden">

            The AI-generated answer will be
            displayed here.

        </p>

    `;


    results.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================
   NOTES
========================= */

function showNotes() {

    const notes =
        document.getElementById("notesContent");

    notes.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   QUIZ
========================= */

function showQuiz() {

    const quiz =
        document.getElementById("quizContent");

    quiz.scrollIntoView({
        behavior: "smooth"
    });

}


function answer(option) {

    alert(
        "You selected option " + option
    );

}


/* =========================
   FLASHCARDS
========================= */

function showFlashcards() {

    const flashcards =
        document.getElementById("flashcardContent");

    flashcards.scrollIntoView({
        behavior: "smooth"
    });

}


function showFlashcardAnswer() {

    document
        .getElementById("flashcardAnswer")
        .classList.toggle("hidden");

}


/* =========================
   AI CHAT
========================= */

function askQuestion() {

    const question =
        document
            .getElementById("question")
            .value
            .trim();


    if (question === "") {

        alert("Please enter a question.");

        return;
    }


    document
        .getElementById("chatAnswer")
        .innerHTML = `

        <p>
            <strong>ClassMind AI:</strong>
        </p>

        <p>
            Your question has been received.
            The AI will answer using the content
            of your lesson once the AI backend
            is connected.
        </p>

    `;
}
