export function twoDP(number){
    return (Math.round(number * 100) / 100).toFixed(2);
  }

export function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}