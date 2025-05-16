document.addEventListener("DOMContentLoaded", () => {
  // جلب زر البدء
  const startButton = document.getElementById("startGame");

  // حدث عند الضغط على زر البدء
  startButton.addEventListener("click", () => {
    // جلب قيمة الاسم المدخل
    const nameInput = document.getElementById("username");
    const name = nameInput.value.trim();

    // التحقق من أن الاسم غير فارغ
    if (name) {
      // تخزين الاسم في localStorage للاستخدام في الصفحات التالية
      localStorage.setItem("playerName", name);
      // الانتقال لصفحة اختيار المستوى
      window.location.href = "level.html";
    } else {
      alert("Please enter your name!");
    }
  });
});