

export const PercentageFromTime = (min: number, max: number) => {
    let percentage = Math.floor((min / max) * 100) 
    console.log(percentage)

    return percentage
}