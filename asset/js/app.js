//obteniendo data del endpoint
async function getConvertion() {
    try {
        const res = await fetch("https://mindicador.cl/api");
        const resJSON = await res.json()
        const currency = resJSON
        return currency
    }
    catch (err) {
        console.log(err)
    }
}

//calculando conversión
const btn = document.querySelector('#btnConvertion')

btn.addEventListener('click', calculate = async () => {
    //retrieve dom elements
    const clp = document.querySelector('#InputCLP')
    const currencySelector = document.querySelector('#currencySelect')
    const result = document.querySelector('#total')
    const currency = await getConvertion()

    //Mensaje ingrear solo números
    if (clp.value == '') {
        return alert('Ingresa la cantidad de CLP que deseas convertir')
        
    } 
    //conversión a uf
    else if (currencySelector.value === "uf") {
        return result.innerHTML = `$${(clp.value / currency.uf.valor).toFixed(2)}`

    }
    //conversión a utm
    else if (currencySelector.value === "utm") {
        return result.innerHTML = `$${(clp.value / currency.utm.valor).toFixed(2)}`

    }
    //sino, mostrar error
    else {
        return result.innerHTML = 'Error'
    }
})