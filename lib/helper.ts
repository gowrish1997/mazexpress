

const capitalizeFirstLetter = (s: string): string => {
    let newString = s[0].toUpperCase() + s.slice(1, s.length)
    return (newString)
}

const capitalizeAllFirstLetters = () => {

}
export {
    capitalizeFirstLetter,
    capitalizeAllFirstLetters
}