document.addEventListener("DOMContentLoaded", () => {
  const levelCards = document.querySelectorAll(".level-card");
  const startButton = document.getElementById("startGame");
  let selectedLevel = null;

  // إضافة حدث عند الضغط على كل بطاقة مستوى
  levelCards.forEach(card => {
    card.addEventListener("click", () => {
      // إزالة التحديد من كل البطاقات
      levelCards.forEach(c => c.classList.remove("border-primary"));
      // تحديد البطاقة المختارة
      card.classList.add("border", "border-primary");

      // حفظ اسم المستوى المختار
      selectedLevel = card.getAttribute("data-level");

      // تفعيل زر البدء
      startButton.disabled = false;
    });
  });

  // عند الضغط على زر البدء
  startButton.addEventListener("click", () => {
    if (!selectedLevel) {
      alert("Please select a level!");
      return;
    }
    // حفظ المستوى في localStorage
    localStorage.setItem("gameLevel", selectedLevel);
    // الانتقال إلى صفحة اللعبة
    window.location.href = "game.html";
  });
});
