function answer(choice) {
    document.getElementById("result").innerText = "あなたの答え: " + choice;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("output").innerText = "診断スタート！（質問を出す処理を追加予定）";
    });
});
