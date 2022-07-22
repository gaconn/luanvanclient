export const toTimeString = (timestamp) => {
    const date = new Date(timestamp)
    if(!date) return ''
    var strDatetime = ""

    if(date.getDate()*1 <10) {
        strDatetime += `0${date.getDate()}`
    }else {
        strDatetime += date.getDate()
    }

    if((date.getMonth() +1) <10) {
        strDatetime += ` / 0${date.getMonth()+1}`
    } else {
        strDatetime += ' / '+(date.getMonth()+1)
    }

    strDatetime += ' / ' + date.getFullYear()

    return strDatetime
}

export const formatDateForInput = (timestamp) => {
    const date = new Date(timestamp)
    var strDatetime = ""
    strDatetime += date.getFullYear()
    strDatetime += '-' + (date.getMonth()+1 >10 ? date.getMonth()+1 : `0${date.getMonth()+1}`)
    strDatetime += '-' + (date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`)
    return strDatetime
}