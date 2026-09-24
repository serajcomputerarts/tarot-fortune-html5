const tarotCards = [
  ["ابله", "🃏", "آغاز تازه، آزادی، شجاعت برای تجربه‌ای جدید و حرکت با اعتماد.", "شتاب‌زدگی، نادیده گرفتن خطرها یا نیاز به برنامه‌ریزی بیشتر."],
  ["جادوگر", "✦", "توانایی، خلاقیت و استفاده از مهارت‌ها برای تبدیل ایده به عمل.", "تردید در توانایی خود یا استفاده نکردن از ظرفیت‌ها."],
  ["کاهنه اعظم", "☾", "شهود، رازهای درونی و نیاز به گوش دادن به صدای قلب.", "نادیده گرفتن احساسات درونی یا آشفتگی ذهنی."],
  ["ملکه", "♛", "رشد، فراوانی، مراقبت، خلاقیت و توجه به زیبایی‌های زندگی.", "وابستگی بیش از حد یا بی‌توجهی به نیازهای شخصی."],
  ["امپراتور", "♚", "نظم، ثبات، مسئولیت‌پذیری و ایجاد ساختاری محکم.", "سخت‌گیری، کنترل‌گری یا مقاومت در برابر انعطاف."],
  ["عاشقان", "♥", "هماهنگی، انتخاب آگاهانه، رابطه و هم‌راستایی ارزش‌ها.", "دوگانگی، اختلاف در ارزش‌ها یا نیاز به گفت‌وگوی صادقانه."],
  ["ارابه", "⚔", "اراده، تمرکز، پیشروی و پیروزی بر موانع.", "پراکندگی، عجله یا از دست دادن کنترل مسیر."],
  ["قدرت", "🦁", "شجاعت درونی، صبر، مهربانی و کنترل احساسات.", "کمبود اعتمادبه‌نفس یا واکنش‌های احساسی شدید."],
  ["گوشه‌نشین", "🔮", "تأمل، جست‌وجوی حقیقت و نیاز به زمانی برای خودشناسی.", "انزوا یا دوری بیش از حد از دیگران."],
  ["چرخ سرنوشت", "☸", "تغییر، چرخه‌های زندگی و فرصت‌های غیرمنتظره.", "مقاومت در برابر تغییر یا احساس گیر افتادن در یک چرخه."],
  ["عدالت", "⚖", "تعادل، انصاف، مسئولیت‌پذیری و نتیجه انتخاب‌ها.", "بی‌عدالتی یا نیاز به بررسی دوباره تصمیم."],
  ["مرگ", "🦋", "پایان یک مرحله و آغاز دگرگونی عمیق؛ رها کردن گذشته.", "ترس از پایان یا تأخیر در تغییر ضروری."],
  ["اعتدال", "☯", "تعادل، صبر، درمان و هماهنگ کردن بخش‌های مختلف زندگی.", "افراط، بی‌نظمی یا نیاز به بازگرداندن آرامش."],
  ["برج", "⚡", "تغییر ناگهانی، آشکار شدن حقیقت و شکستن ساختارهای ناپایدار.", "ترس از تحول یا نگه داشتن وضعیتی ناکارآمد."],
  ["ستاره", "★", "امید، الهام، آرامش و ایمان به مسیر آینده.", "ناامیدی موقت یا فراموش کردن توانایی‌های خود."],
  ["ماه", "🌙", "ابهام، رویا، احساسات پنهان و نیاز به احتیاط در برداشت‌ها.", "شفاف شدن تدریجی واقعیت یا روبه‌رو شدن با ترس‌ها."],
  ["خورشید", "☀", "شادی، موفقیت، وضوح، انرژی و نتیجه‌ای مثبت.", "تأخیر کوتاه در شادی یا نیاز به واقع‌بینی بیشتر."],
  ["داوری", "📯", "بیداری، ارزیابی گذشته، بخشش و تصمیمی مهم برای آینده.", "خودسرزنشی یا ترس از قضاوت."],
  ["جهان", "🌍", "کامل شدن یک چرخه، موفقیت و رسیدن به نتیجه.", "کار ناتمام یا نیاز به جمع‌بندی مسیر."]
];

const positions = {
  1: ["پیام کارت شما"],
  3: ["گذشته", "حال", "مسیر احتمالی آینده"]
};

let selectedMode = 1;

const cardsContainer = document.getElementById("cardsContainer");
const interpretation = document.getElementById("interpretation");
const message = document.getElementById("message");
const drawButton = document.getElementById("drawButton");
const modeButtons = document.querySelectorAll(".mode-btn");

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMode = Number(button.dataset.mode);

    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cardsContainer.innerHTML = "";
    interpretation.innerHTML = "";
    interpretation.hidden = true;

    message.textContent =
      selectedMode === 1
        ? "فال یک کارتی انتخاب شد. اکنون کارت خود را بکشید."
        : "فال سه کارتی انتخاب شد. اکنون کارت‌ها را بکشید.";
  });
});

function shuffle(items) {
  const copiedItems = [...items];

  for (let index = copiedItems.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [copiedItems[index], copiedItems[randomIndex]] = [
      copiedItems[randomIndex],
      copiedItems[index]
    ];
  }

  return copiedItems;
}

function createCard(card, position) {
  const [name, symbol, upright, reversedMeaning] = card;
  const isReversed = Math.random() < 0.35;
  const meaning = isReversed ? reversedMeaning : upright;

  const wrapper = document.createElement("div");
  wrapper.className = "card-wrapper";

  wrapper.innerHTML = `
    <p class="position-title">${position}</p>

    <div
      class="tarot-card"
      role="button"
      tabindex="0"
      aria-label="نمایش کارت ${name}"
    >
      <div class="card-face card-back">☾</div>

      <div class="card-face card-front ${isReversed ? "reversed" : ""}">
        <div class="card-symbol">${symbol}</div>
        <div class="card-name">${name}</div>
        <div class="card-orientation">
          ${isReversed ? "وارونه" : "مستقیم"}
        </div>
      </div>
    </div>
  `;

  const cardElement = wrapper.querySelector(".tarot-card");

  function revealCard() {
    if (cardElement.classList.contains("flipped")) {
      return;
    }

    cardElement.classList.add("flipped");
    interpretation.hidden = false;

    interpretation.innerHTML += `
      <div>
        <h3>${position}: ${name} ${isReversed ? "(وارونه)" : "(مستقیم)"}</h3>
        <p>${meaning}</p>
      </div>
    `;
  }

  cardElement.addEventListener("click", revealCard);

  cardElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      revealCard();
    }
  });

  return wrapper;
}

drawButton.addEventListener("click", () => {
  const selectedCards = shuffle(tarotCards).slice(0, selectedMode);

  cardsContainer.innerHTML = "";
  interpretation.innerHTML = "";
  interpretation.hidden = true;
  message.textContent = "روی هر کارت کلیک کنید تا آشکار شود.";

  selectedCards.forEach((card, index) => {
    cardsContainer.appendChild(
      createCard(card, positions[selectedMode][index])
    );
  });
});
