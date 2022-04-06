class Sensor {
    // Sensor 클래스 내부에서만 접근 가능
    // #reportingInterval 
    constructor(sensorId) {
        this.sensorId = sensorId
        this.powerStatus = "off"
        this.status = null
        this.reportingInterval = 10000
        this.OnOff = null
    }

    turn(receivePowerStatus) {
        if(receivePowerStatus === 'on'){
            if(this.powerStatus === receivePowerStatus) {
                throw Error()
            }
            this.powerStatus = receivePowerStatus
            this.status = 'idle'
            this.OnOff = "On"
            setTimeout(() => {
                this.status = 'sensingDistance'
                setTimeout(() => {
                    this.status = 'reportingData'
                    setTimeout(() => {
                        this.status = 'idle'
                        return
                    }, 1000);
                }, 500);
            }, this.reportingInterval);
    
            return this.powerStatus + ''
        }
        else {
            if(this.powerStatus === receivePowerStatus) {
            throw Error()
            }
            this.powerStatus = 'off'
            this.OnOff = "Off"
            // this.reportingInterval = 10000 어차피 이렇게안됨
        }
    }   

    forExtend(num) {
        return this.reportingInterval = num
    }

    changeInterval(interval) {
        this.reportingInterval = interval
    }

    // set changeInterval(interval) {
    //     this.reportingInterval = interval
    // }

    // get interval() {
    //     return this.#reportingInterval
    // }
}

class IotServer extends Sensor {
    sensors = [];

    constructor() {
        super()
        
    }

    start(sensors) {
        this.sensors = sensors;
        // console.log(this.sensors);
    }

    publish(information) {
        if(this.sensors[0].OnOff == "On") 
        {
            if (information.actionId === 'CHANGE_REPORTING_INTERVAL') {
                this.sensors.forEach(sensor => {
                    sensor.changeInterval(information.payload)
                })
                return;
            }
        }

        else {
            this.sensors.forEach(sensor => {
                sensor.changeInterval(10000)
                console.log("2", sensor.OnOff);
            })
            return;
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};