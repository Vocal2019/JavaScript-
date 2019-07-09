class Tonyhorse {
  constructor(year, month, date) {
    this.today = new Date()

    if (!year || !month || !date) {
      this.time = new Date()
    } else {
      this.time = new Date(year, month - 1, date)
    }
  }

  day() {
    return this.time.getDay() === 0 ? 7 : this.time.getDay()
  }

  isToday(time) {
    let year = this.today.getFullYear()
    let month = this.today.getMonth()
    let date = this.today.getDate()
    let _year = time.getFullYear()
    let _month = time.getMonth()
    let _date = time.getDate()
    return year == _year && month == _month && date == _date ? true : false
  }

  monday() {
    return new Date(this.time - (this.day() - 1) * 86400000)
  }

  monLastDay() {
    return new Date(this.monday() - 86400000)
  }

  sunday() {
    return new Date((this.monday() / 1000 + 6 * 86400) * 1000)
  }

  sunNextDay() {
    return new Date((this.sunday() / 1000 + 86400) * 1000)
  }

  week() {
    let res = []
    for (let i = 0; i < 7; i++) {
      let date = new Date(this.sunday() - (6 - i) * 86400000)
      res.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay() === 0 ? 7 : date.getDay(),
        _year: `${date.getFullYear()}`,
        _month:
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`,
        _date: date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`,
        isToday: this.isToday(date)
      })
    }
    return res
  }

  lastWeek() {
    this.time = this.monLastDay()
    return this.week()
  }

  nextWeek() {
    this.time = this.sunNextDay()
    return this.week()
  }

  reset(year, month, date) {
    if (!year || !month || !date) {
      this.time = new Date()
    } else {
      this.time = new Date(year, month - 1, date)
    }
    return this.week()
  }
}

export default Tonyhorse
