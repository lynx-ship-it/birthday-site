const card= 
document.getElementById("birthdayCard");
const button=
document.getElementById("surpriseBtn");
const message=
document.getElementById("message");
const bgMusic=
document.getElementById("bgMusic");
const heartsContainer=
document.getElementById("heartsContainer");
const front = document.querySelector(".front"); // for decorative hearts on front

button.addEventListener("click", function(){
    // flip card to show back
    card.classList.add("flipped");
    // fade out the front face once flipped so only back remains
    setTimeout(() => {
        if (front) {
            fadeAway(front);
        }
    }, 1000);

    setTimeout(() => {
        message.classList.add("show");
        // ensure the container scrolls to the top when message becomes visible
        const msgContainer = document.getElementById("messageContainer");
        if (msgContainer) {
            msgContainer.scrollTop = 0;
        }
    }, 1000)
    bgMusic.play()
    generateHearts()
})
function generateHearts(){
    for(let i=0; i<30; i++){
        const heart=
document.createElement("div")
        heart.classList.add("heart")
        heart.style.left=Math.random()*
window.innerWidth+"px"
        heart.style.animationDuration=2+
Math.random()*3+"s"
        heart.textContent="💖"
        heartsContainer.appendChild(heart)
        heart.addEventListener("animationend", ()=>heart.remove())
    }    
}

// generate a few gentle hearts inside the front side for romance
function generateFrontHearts(){
    if(!front) return;
    const count = 5;
    const rect = front.getBoundingClientRect();
    for(let i=0; i<count; i++){
        const heart = document.createElement("div");
        heart.classList.add("front-heart");
        // position somewhere randomly within the front card
        const x = Math.random() * (rect.width - 40);
        const y = Math.random() * (rect.height - 40);
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        heart.textContent = "💖";
        front.appendChild(heart);
        // remove after a while to avoid clutter
        setTimeout(()=> heart.remove(), 5000 + Math.random()*5000);
    }
}

// start the front hearts when page loads
window.addEventListener("DOMContentLoaded", () => {
    generateFrontHearts();
    setInterval(generateFrontHearts, 2000);
});

// new button for previewing images
const previewBtn = document.getElementById("previewBtn");
const imagesContainer = document.getElementById("Images");

// helper to fade an element and hide after delay
function fadeAway(el) {
    if (!el) return;
    el.classList.add('fade-out');
    setTimeout(() => el.style.display = 'none', 500);
}

previewBtn.addEventListener("click", function() {
    // fade back page (message) out so media appears cleanly
    const backSide = card.querySelector('.back');
    if (backSide) {
        fadeAway(backSide);
    }
    
    // clear any previous images
    imagesContainer.innerHTML = "";

    // list of media URLs (images or videos) -- update to your own files
    const mediaURLs = [
        "videos/clip1.mp4",
        "images/picture1.jpg",
        "videos/clip2.mp4",
        "images/picture2.jpg",
        "videos/clip3.mp4",
        "images/picture3.jpg",
        "videos/clip5.mp4",
        "images/picture5.jpg",
        "videos/clip6.mp4",
        "images/picture6.jpg",
        "videos/clip7.mp4",
        "images/picture4.jpg",
        "videos/clip8.mp4",
        "videos/clip9.mp4",
        "videos/clip10.mp4"
    ];

    mediaURLs.forEach(url => {
        const ext = url.split('.').pop().toLowerCase();
        if (['mp4', 'webm', 'ogg'].includes(ext)) {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            // ensure video is not muted and has volume
            video.muted = false;
            video.volume = 1;
            video.classList.add('preview-media');
            video.style.maxWidth = '100%';
            imagesContainer.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = url;
            img.alt = "Birthday preview";
            img.classList.add("preview-img");
            imagesContainer.appendChild(img);
        }
    });

    // if the behind section is hidden, make sure it's visible
    imagesContainer.closest(".behind").style.display = "block";

    // ensure professional button is visible (in case it was hidden earlier)
    const profBtn = document.getElementById("professionalBtn");
    if (profBtn) {
        profBtn.style.display = "block";
    }
});

// handle professional button: show embedded quiz rather than redirect
const professionalBtn = document.getElementById("professionalBtn");
const quizSection = document.getElementById("quizSection");
if (professionalBtn && quizSection) {
    professionalBtn.addEventListener("click", () => {
        // fade media page (behind) away
        const behind = document.querySelector('.behind');
        fadeAway(behind);
        // reveal quiz and optionally scroll into view
        quizSection.style.display = "block";
        quizSection.scrollIntoView({ behavior: "smooth" });
    });
}

// quiz logic (questions stored in array)
const questions = [
    { text: "When is our Anniversary?", options: ["September 25", "May 15", "October 5", "October 25"], answer: 2 },
    { text: "Where did we have our last hug?", options: ["Lecture", " Standard School", "Uniben", "Junior School"], answer: 0 },
    { text: "Have I ever given you a valentine gift?", options: ["Yes", "No", "Maybe", "I don't know"], answer: 0 },
    { text: "What was the gift?", options: ["Flower", "Data", "A special moment", "Frame"], answer: 3 },
    { text: "When did we make our last video together?", options: ["Your WAEC", "Our last school exam", "A random day", "My birthday"], answer: 0 },
    { text: "What is my favourite colour?", options: ["Red", "Blue", "Green", "Yellow"], answer: 1 },
    { text: "When was I promised a kiss?", options: ["My birthday", "My graduation", "After Admission", "Our first date"], answer: 1 },
    { text: "Have I ever giiven you a Birthday gift?", options: ["Yes", "No", "Maybe", "I don't know"], answer: 1 },
    { text: "What did i use to save your number last year?", options: ["Mine","HER","My Shayla","Pleasure"], answer: 2 },
    { text: "Wanna meet up tomorrow?", options: ["Yes", "No", "Maybe", "I don't know"], answer: 0 }
];

// render all questions at once
function renderQuiz() {
    const wrapper = document.getElementById('questionsWrapper');
    wrapper.innerHTML = '';
    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('quiz-question');
        qDiv.textContent = (idx + 1) + ". " + q.text;

        const optsDiv = document.createElement('div');
        optsDiv.classList.add('quiz-options');
        q.options.forEach((opt, oidx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                const feedback = qDiv.querySelector('.quiz-feedback');
                if (oidx === q.answer) {
                    feedback.textContent = '✔️ Correct!';
                    feedback.style.color = 'green';
                } else {
                    feedback.textContent = '❌ Incorrect';
                    feedback.style.color = 'red';
                }
                // disable all buttons for this question after an attempt
                const allBtns = optsDiv.querySelectorAll('button');
                allBtns.forEach(b => b.disabled = true);
            });
            optsDiv.appendChild(btn);
        });

        const feedback = document.createElement('div');
        feedback.classList.add('quiz-feedback');
        qDiv.appendChild(optsDiv);
        qDiv.appendChild(feedback);
        wrapper.appendChild(qDiv);
    });
}

// call when quiz section shown
renderQuiz();

// close button logic for quiz
const closeQuizBtn = document.getElementById('closeQuizBtn');
const thankOverlay = document.getElementById('thankyouOverlay');
if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', () => {
        fadeAway(quizSection);
        if (thankOverlay) {
            thankOverlay.classList.add('show');
        }
    });
}
