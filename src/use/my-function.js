export function myFunction() {

    const number = 42

    return number

}

export function todayFunction() {
    let today2 = new Date()

    let dd = today2.getDate()
    let mm = today2.getMonth() + 1;
    const yyyy = today2.getFullYear();
    if(dd < 10){
        dd='0' + dd
    }
    if(mm < 10){
        mm='0' + mm
    }
    today2 = yyyy + '-' + mm + '-' + dd;

    return today2
}

export function changeStatus(value) {

    const mapValue = {
        haircut: 'haircut',
        correction: 'correction',
        children: 'children',
        modeling: 'modeling',
        beard: 'beard',
        chat: 'chat'
    }

    const mapText = {
        haircut: 'Стрижка',
        correction: 'Коррекция стрижки',
        children: 'Детская стрижка',
        modeling: 'Моделирование бороды и усов',
        beard: 'Коррекция бороды и усов',
        chat: 'Просто поболать'
    }

    return mapText[value]
}

export function choiceTime(records) {
    const timeArray = [
            {text:'Утро', isDisable:true},
            {value:'08:00', text:'08:00', isDisable:false},
            {value:'09:00', text:'09:00', isDisable:false},
            {value:'10:00', text:'10:00', isDisable:false},
            {value:'11:00', text:'11:00', isDisable:false},
            {text:'День', isDisable:true},
            {value:'12:00', text:'12:00', isDisable:false},
            {value:'13:00', text:'13:00', isDisable:false},
            {value:'14:00', text:'14:00', isDisable:false},
            {value:'15:00', text:'15:00', isDisable:false},
            {value:'16:00', text:'16:00', isDisable:false},
            {value:'17:00', text:'17:00', isDisable:false},
            {text:'Вечер', isDisable:true},
            {value:'18:00', text:'18:00', isDisable:false},
            {value:'19:00', text:'19:00', isDisable:false},
            {value:'20:00', text:'20:00', isDisable:false},
            {value:'21:00', text:'21:00', isDisable:false},
            {value:'22:00', text:'22:00', isDisable:false}
        ]


    timeArray.forEach(key => {
        for (const rec in records) {
            if (records[rec].time === key.value) {
                key.isDisable = true
            }
        }
    })

    return timeArray
}


export function blockDay(blockDayRecord, blockDays, test) {
    blockDayRecord.forEach(key => {
        key.toString().split(',').forEach(elem => {
            if (elem.toString().split('.')[1] === test.split('.')[1]
                && elem.toString().split('.')[2] === test.split('.')[2]) {
                blockDays.value.push(+elem.toString().split('.')[0]);
            }
        })
    })
    return blockDays.value
}

export function myValidateDate(value)
{
    const arrD = value.split("-");
    arrD[1] -= 1;
    const d = new Date(arrD[0], arrD[1], arrD[2]);
    const dm = new Date()
    if ((d.getFullYear() == arrD[0]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[2])) {
        if ( ((d.getFullYear() < dm.getFullYear())) ||
            ((d.getFullYear() == dm.getFullYear()) && (d.getMonth() < dm.getMonth())) ||
            ((d.getFullYear() == dm.getFullYear()) && (d.getMonth() == dm.getMonth()) && (d.getDate() < dm.getDate()))
        ) {
            return false
        }
        return true
    }
    return false
}
