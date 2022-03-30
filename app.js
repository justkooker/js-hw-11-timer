// // Таймер обратного отсчета
// // Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет-магазинах,
// страницах регистрации событий, во время технического обслуживания и т. д.

// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате
// XX:XX:XX:XX. Количество дней может состоять из более чем двух цифр.

// <div class="timer" id="timer-1">
//   <div class="field">
//     <span class="value" data-value="days">11</span>
//     <span class="label">Days</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="hours">11</span>
//     <span class="label">Hours</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="mins">11</span>
//     <span class="label">Minutes</span>
//   </div>

//   <div class="field">
//     <span class="value" data-value="secs">11</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>
// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

// Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  timerBuild() {
    const timer = document.querySelector(this.selector);
    const days = timer.querySelector('.value[data-value = "days"]');
    const hours = timer.querySelector('.value[data-value = "hours"]');
    const mins = timer.querySelector('.value[data-value = "mins"]');
    const secs = timer.querySelector('.value[data-value = "secs"]');

    setInterval(() => {
      const time = this.targetDate - Date.now();
      const daysLeft = Math.floor(time / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minsLeft = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secsLeft = Math.floor((time % (1000 * 60)) / 1000);
      days.textContent = this.timeFormat(daysLeft);
      hours.textContent = this.timeFormat(hoursLeft);
      mins.textContent = this.timeFormat(minsLeft);
      secs.textContent = this.timeFormat(secsLeft);
    }, 1000);
  }
  timeFormat(time) {
    if (String(time).length < 2) {
      return `0${time}`;
    }
    return time;
  }
}

const count = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("April 6, 2022"),
});
count.timerBuild();
