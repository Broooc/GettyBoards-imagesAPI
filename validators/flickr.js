async function getColorCode(color) {
    
    switch (color) {
        case 'yellow':
            return '4'
        case 'green':
            return '5'
        case 'teal':
            return '6'
        case 'orange':
            return '2'
        case 'white':
            return 'c'
        case 'black':
            return 'e'
        case 'red':
            return '0'
        case 'purple':
            return '9'
        case 'magenta':
            return 'a'
        case 'blue':
            return '8'
        case 'black_and_white':
            return 'e,c'
        case undefined:
            return null
        default:
            return null
    }
    
}

module.exports = getColorCode