class TonyZebra {
  constructor(year, month) {
    this.today = year || month ? new Date(year, month) : new Date()
    this.year = year ? year : this.today.getFullYear()
    this.month = month ? month : this.today.getMonth() + 1
  }

  checkSunday(num) {
    return num === 0 ? 7 : num
  }

  curMonthFirstDate() {
    return new Date(this.year, this.month - 1, 1)
  }

  curMonthFirstDay() {
    return this.checkSunday(this.curMonthFirstDate().getDay())
  }

  curMonthLastDate() {
    return new Date(this.year, this.month, 0)
  }

  lastMonthLastDate() {
    return new Date(this.year, this.month - 1, 0)
  }

  preMonthDayCount() {
    return this.curMonthFirstDay() - 1
  }

  getMonth() {
    let res = []
    for (let i = 0; i < 7 * 6; i++) {
      let count = (i + 1) - this.preMonthDayCount()
      let year = this.year
      let month = this.month
      let date = count
      let day
      let currentMonth = false

      if (date <= 0) {
        month = this.month - 1
        date = this.lastMonthLastDate().getDate() + date

      } else if (date > this.curMonthLastDate().getDate()) {
        month = month + 1
        date = date - this.curMonthLastDate().getDate()

      } else {
        currentMonth = true
      }

      if (month === 0) {
        month = 12
        year -= 1
      }

      if (month === 13) {
        month = 1
        year += 1
      }

      day = new Date(year, month - 1, date).getDay()

      res.push({
        year,
        month,
        date,
        day,
        index: count,
        currentMonth,
        _year: `${year}`,
        _month: month < 10 ? `0${month}` : `${month}`,
        _date: date < 10 ? `0${date}` : `${date}`
      })
    }

    return res
  }

  lastMonth() {
    this.month = (this.month - 1) === 0 ? 12 : (this.month - 1)
    this.year = (this.month === 12) ? this.year - 1 : this.year
    return this.getMonth()
  }

  nextMonth() {
    this.month = (this.month + 1) === 12 ? 1 : (this.month + 1)
    this.year = (this.month === 1) ? this.year + 1 : this.year
    return this.getMonth()
  }

  resetMonth() {
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth() + 1
    return this.getMonth()
  }
}

export default TonyZebra
