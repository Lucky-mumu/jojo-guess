document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("output").innerText = "診断スタートだよね！（質問を出す処理を追加予定）";
        currentQuestionIndex = 0;
        answers = {};
        askQuestion(); // ← ここを追加！
    });
});

const characters = [
    { name: "空条承太郎", traits: { 帽子: true, スタンド: true, 喫煙: true, 学生: true } },
    { name: "ジョセフ・ジョースター", traits: { 帽子: false, スタンド: true, 喫煙: false, 学生: false } },
    { name: "東方仗助", traits: { 帽子: false, スタンド: true, 喫煙: false, 学生: true } }
];

const questions = [
    { text: "帽子をかぶっていますか？", key: "帽子" },
    { text: "スタンドを持っていますか？", key: "スタンド" },
    { text: "喫煙者ですか？", key: "喫煙" },
    { text: "学生ですか？", key: "学生" }
];

let currentQuestionIndex = 0;
let answers = {};

function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById("output").innerHTML = `
            <p>${questions[currentQuestionIndex].text}</p>
            <button onclick="answerQuestion(true)">はい</button>
            <button onclick="answerQuestion(false)">いいえ</button>
            <button onclick="answerQuestion(null)">分からない</button>
        `;
    } else {
        determineCharacter();
    }
}

function answerQuestion(answer) {
    answers[questions[currentQuestionIndex].key] = answer;
    currentQuestionIndex++;
    askQuestion();
}

function determineCharacter() {
    let possibleCharacters = characters.filter(char => {
        return Object.keys(answers).every(key => 
            answers[key] === null || char.traits[key] === answers[key]
        );
    });

    if (possibleCharacters.length === 1) {
        document.getElementById("output").innerHTML = `<p>あなたが思い浮かべたのは… <strong>${possibleCharacters[0].name}</strong> ですね！</p>`;
    } else if (possibleCharacters.length > 1) {
        document.getElementById("output").innerHTML = `<p>候補が複数います: ${possibleCharacters.map(c => c.name).join(", ")}</p>`;
    } else {
        document.getElementById("output").innerHTML = `<p>該当するキャラが見つかりませんでした。</p>`;
    }
}
