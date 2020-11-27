input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P7, 1)
    basic.pause(100)
    reading = pins.analogReadPin(AnalogPin.P3)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P7, 0)
    // La valeur de 610 peut varier il faut l'ajuster en fonction de votre test lorsque un des deux fils n'est pas dans la terre.  SI la valeur de « reading » est de 540 pour vous, modifier toutes les valeurs de 610 pour 540 dans ce code.
    pourcentage = Math.round((reading - 610) * 100 / (1023 - 610))
    basic.showString("" + pourcentage + "%")
})
let pourcentage = 0
let reading = 0
led.setBrightness(50)
servos.P2.setAngle(0)
basic.pause(1000)
servos.P2.stop()
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P7, 1)
    basic.pause(100)
    reading = pins.analogReadPin(AnalogPin.P3)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P7, 0)
    // La valeur de 610 peut varier il faut l'ajuster en fonction de votre test lorsque un des deux fils n'est pas dans la terre.  SI la valeur de « reading » est de 540 pour vous, modifier toutes les valeurs de 610 pour 540 dans ce code.
    pourcentage = Math.round((reading - 610) * 100 / (1023 - 610))
    // Arrosage si l'humidité du sol est inférieure à 90 %.
    // Ajuster cette valeur en fonction de vos paramètres expérimentaux.
    // Si l'humidité du sol se situe entre 90 % et 95 %, maintenir l'action actuelle (arrosage ou non).  Ajuster ces valeurs en fonction de vos paramètres expérimentaux.
    // Arrêter l'arrosage si l'humidité du sol est supérieure à 95%.  Ajuster cette valeur en fonction de vos paramètres expérimentaux.
    if (pourcentage <= 90) {
        servos.P2.setAngle(180)
    } else if (pourcentage >= 90 && pourcentage <= 95) {
        servos.P2.stop()
    } else if (pourcentage > 95) {
        servos.P2.setAngle(0)
    }
    basic.pause(1000)
    servos.P2.stop()
    // 30 secondes (30 000 ms) avant la prochaine mesure.  On peut modifier le temps entre les prises de mesures.
    basic.pause(30000)
})
