const form = document.querySelector('#form'),
      cards = document.querySelector('#cards')

let load = []

/* Crear */
const createDate = (seller, productName, productValue)=>{
    let data = {
        seller: seller,
        productName: productName,
        productValue: productValue
    }   

    load.push(data)

    return data
}

/* Guardar */
const saveDB = ()=>{
    localStorage.setItem('loaded', JSON.stringify(load))

    readDB()
}

/* Cargar */
const readDB = ()=>{

    cards.innerHTML = ''
    
    load = JSON.parse(localStorage.getItem('loaded'))

    if(load === null){
        load = []
    }else{
        load.forEach(element => {
            cards.innerHTML = `   
                <div class="card">
                    <div class="seller">
                        <ion-icon name="person"></ion-icon>
                        <h2>Seller: <span>${element.seller}</span></h2>
                    </div>

                    <div class="productN">
                        <ion-icon name="basket"></ion-icon>
                        <h2>Product: <span>${element.productName}</span></h2>
                    </div>

                    <div class="productV">
                        <ion-icon name="cash"></ion-icon>
                        <h2>Value $<span>${element.productValue}</span></h2>
                    </div>

                    <div class="action">
                        <ion-icon name="trash">delete</ion-icon>
                    </div>
                </div>
            `
        })
    }
}

/* Eliminar */
const deleteDB = seller =>{

    let indexArray

    load.forEach((element, index)=>{
        if(element.seller === seller) indexArray = index
    })

    load.splice(indexArray, 1)

    saveDB()
}

// const editDB = (seller)=>{
//     let indexArray = load.findIndex(element =>{
//         return element.seller === seller
//     })
// }

/* Envio del Form */
form.addEventListener('submit', e =>{
    e.preventDefault() /* Sirve para evitar que la pagina se cargue a la hora de apretar el button con el submit */

    let seller = document.querySelector('#seller').value.toUpperCase(),
        productName = document.querySelector('#productN').value.toUpperCase(),
        productValue = document.querySelector('#productV').value    

    createDate(seller, productName, productValue)

    saveDB()

    form.reset()
})

/* Accion de Eliminar */
cards.addEventListener('click', e =>{
    e.preventDefault()

    if(e.target.innerHTML === 'edit' || e.target.innerHTML === 'delete'){
        
        let text = e.path[6].childNodes[1].childNodes[3].childNodes[1].innerText

        if(e.target.innerHTML === 'delete') deleteDB(text)

        // if(e.target.innerHTML === 'edit') editDB(text)
    }
})

document.addEventListener('DOMContentLoaded', readDB)


