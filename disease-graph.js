import * as maths from './maths.js'

const diseases = document.querySelectorAll('.disease-row div')
const disease_rows = document.querySelectorAll('.disease-row')
let indexed = false


export function updateGraph() {
    let maxWidth = 80
    let minWidth = 10
    let changeRate = 2
    let change = 0
    let changeChange = 20

    diseases.forEach((disease) => {

        let width
        if (!(disease.style.width)) {
            width = Math.round(maths.randomNumberBetween(minWidth, maxWidth))
            disease.style.width = toPx(width)
        } else {

            width = disease.style.width
            width = parseInt(width.replace(/\D/g, ''));
            if (width < maxWidth && width > minWidth && (Math.round(Math.random() * changeChange) === 1)) {
                disease.style.background = 'white'
                change = Math.round(maths.randomNumberBetween(0, changeRate) - (changeRate / 2))
                width += Math.round(maths.randomNumberBetween(0, changeRate) - (changeRate / 2))
            } else if (width < minWidth && (Math.round(Math.random() * changeChange) === 3)) {
                width += Math.round(maths.randomNumberBetween(0, changeRate / 2))
            } else if (width+1 > maxWidth && (Math.round(Math.random() * changeChange) === 2)) {
                width -= Math.round(maths.randomNumberBetween(0, changeRate / 2))
            }
            if (width+1>maxWidth){
                console.log('danger')
                disease.style.background = 'red'
            }
            disease.style.width = toPx(width)
        }

    })

    if (!(indexed)) {
        initialIndexing(disease_rows)
    }
    indexed = true

    // bubbleSort(disease_rows)

}
let lastRow = 1



function initialIndexing(arr) {

    arr.forEach((row, i) => {
        if (row.style.order === '') {
            row.style.order = i
        }
        if (row.style.order > 10) {
            row.classList.add('hidden')
        }
    })
}

function bubbleSort(arr, desc = false) {
    let sortArr = arr;

  


    for (let i = 0; i < sortArr.length; i++) {


        for (let j = 1; j < sortArr.length; j++) {

            for (let x = 0;x<2000;x++){
                let y = x*100/1*123/132*1294
                console.log(y)
            }

            let sortArr_last = sortArr[j - 1].childNodes[3].style.width
            sortArr_last = parseInt(sortArr_last.replace(/\D/g, ''));

            let sortArr_current = sortArr[j].childNodes[3].style.width
            sortArr_current = parseInt(sortArr_current.replace(/\D/g, ''));

                if (sortArr_last > sortArr_current) {
                    // if (Math.random()>Math.random()*10) {
                        console.log(sortArr[j - 1].style.order)
                        console.log(sortArr[j].style.order)


                    let temp = sortArr[j-1].style.order
                    sortArr[j - 1].style.order=sortArr[j].style.order
                    sortArr[j].style.order = temp
                }
        }

        return sortArr;
    }
}

function toPx(num) {
    return `${num}px`
}

// function bubbleSort(array) {
//     var done = false;
//     while (!done) {
//         done = true;
//         for (var i = 1; i < array.length; i += 1) {
//             if (array[i - 1] > array[i]) {
//                 done = false;
//                 var tmp = array[i - 1];
//                 array[i - 1] = array[i];
//                 array[i] = tmp;
//             }
//         }
//     }

//     return array;
// }

//   var numbers = [12, 10, 15, 11, 14, 13, 16];
//   bubbleSort(numbers);
//   console.log(numbers);


var mockData = ['10px', '15px', '16px', '3px', '11px', '9px', '21px']

function mockSort(arr, desc = false) {
    let sortArr = arr;

    for (let i = 0; i < sortArr.length; i++) {
        for (let j = 1; j < sortArr.length; j++) {

            let sortArr_last = sortArr[j - 1]
            sortArr_last = parseInt(sortArr_last.replace(/\D/g, ''));

            let sortArr_current = sortArr[j]
            sortArr_current = parseInt(sortArr_current.replace(/\D/g, ''));


            if (sortArr_last > sortArr_current) {
                [sortArr[j - 1], sortArr[j]] = [sortArr[j], sortArr[j - 1]];
            }
        }

        return sortArr;
    }
}