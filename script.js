function generateMaterial() {

    const lesson = document.getElementById("lessonInput").value.trim();

    if (lesson === "") {
        alert("Please enter your lesson first.");
        return;
    }

    document.getElementById("results").classList.remove("hidden");

    document.getElementById("notesContent").innerHTML = `
        <p><strong>Lesson Summary</strong></p>
        <p>${lesson}</p>

        <br>

        <p><strong>Key Concepts</strong></p>

        <ul>
            <li>Main concept identified</li>
            <li>Important definition</li>
            <li>Important application</li>
        </ul>
    `;

    document.getElementById("quizContent").innerHTML = `
        <p>
            What is the main concept discussed
            in today's lesson?
        </p>

        <button onclick="answer('A')">
            A. Concept A
        </button>

        <br>

        <button onclick="answer('B')">
            B. Concept B
        </button>

        <br>

        <button onclick="answer('C')">
            C. Concept C
        </button>
    `;

    document.getElementById("flashcardContent").innerHTML = `
        <p><strong>Question:</strong></p>

        <p>
            What is an important concept
            from today's lesson?
        </p>

        <button onclick="showAnswer()">
            Reveal Answer
        </button>

        <p id="flashAnswer" class="hidden">
            The answer would be generated
            from the lesson by the AI.
        </p>
    `;
}


function showAnswer() {

    document
        .getElementById("flashAnswer")
        .classList.toggle("hidden");

}


function answer(option) {

    alert("You selected option " + option);

}


function askQuestion() {

    const question =
        document.getElementById("question").value.trim();

    if (question === "") {

        alert("Please enter a question.");

        return;
    }

    document.getElementById("chatAnswer").innerHTML = `

        <p><strong>ClassMind AI:</strong></p>

        <p>
            Your question has been received.
            The AI would provide an answer based
            on the lesson content.
        </p>

    `;
}
