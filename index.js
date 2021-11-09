function createEmployeeRecord(array){
    let empRecord = {}
    empRecord.firstName = array[0]
    empRecord.familyName = array[1]
    empRecord.title = array[2]
    empRecord.payPerHour = array[3]
    empRecord.timeInEvents = []
    empRecord.timeOutEvents = []
    return empRecord
  }
  
  function createEmployeeRecords(array){
    return array.map((person) => createEmployeeRecord(person))
  }
  
  function createTimeInEvent(timeStamp){
    let event = {}
    let [date,time] = timeStamp.split(" ")
    event.type = "TimeIn"
    event.hour = parseInt(time)
    event.date = date
    this.timeInEvents.push(event)
    return this
  }
  
  function createTimeOutEvent(timeStamp){
    let event = {}
    let [date,time] = timeStamp.split(" ")
    event.type = "TimeOut"
    event.hour = parseInt(time)
    event.date = date
    this.timeOutEvents.push(event)
    return this
  }
  
  function hoursWorkedOnDate(date){
    let timeOut = this.timeOutEvents.find((event) => event.date === date).hour
    let timeIn = this.timeInEvents.find((event) => event.date === date).hour
    return (timeOut - timeIn) / 100
  }
  
  function wagesEarnedOnDate(date){
    let payRate = this.payPerHour
    return hoursWorkedOnDate.call(this,date) * payRate
  }

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(records,firstName){
    return records.find((record) => record.firstName === firstName)
  }
  
  function calculatePayroll(records){
    return records.reduce((sum,record) => sum + allWagesFor.call(record),0)
  }