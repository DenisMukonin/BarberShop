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
