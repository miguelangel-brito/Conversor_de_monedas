const selector = document.querySelector('#currencySelect')
//get uf data
ufData = async () => {
    try {
        const res = await fetch("https://mindicador.cl/api/uf")
        const data = await res.json()
        const currencyDate = data.serie
        const currencyValue = data.serie
        let ufPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        let ufPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { ufPastDates, ufPastValues }
    } catch (error) {
        console.log(error)
    }
}
//get utmdata
utmData = async () => {
    const endPoint = "https://mindicador.cl/api/utm"
    try {
        const res = await fetch(endPoint)
        const data = await res.json()
        const currencyDate = data.serie
        const currencyValue = data.serie
        let utmPastDates = currencyDate.map((value) => {
            const dates = new Date(value.fecha).toDateString()
            return dates
        })
        let utmPastValues = currencyValue.map((value) => {
            const pastValue = value.valor
            return pastValue
        })
        return { utmPastDates, utmPastValues }
    } catch (error) {
        console.log(error)
    }
}
//config graph and values
async function configGraphAndRender() {
    const grafica = document.querySelector('#graphicmap')
    try {
        utm = await utmData()
        uf = await ufData()
    } catch (error) {
    }
    const labels = utm.utmPastDates
    const data = {
        labels: labels,
        datasets: [{
            label: 'Elige una moneda de conversión',
            backgroundColor: 'rgb(219, 242, 39)',
            data: ''
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 8,
                    }
                }
            }
        }
    };
    const graphicmap = new Chart(grafica, config)
    graphicmap.render()

    selector.addEventListener('change', updateChart = () => {
        if (selector.value === 'uf') {
            graphicmap.data.datasets[0].label = 'Valor UF en el tiempo'
            graphicmap.data.datasets[0].data = uf.ufPastValues
            graphicmap.update();
            //console.log(selector.value)
        } else if (selector.value === 'utm') {
            graphicmap.data.datasets[0].label = 'Valor UTM en el tiempo'
            graphicmap.data.datasets[0].data = utm.utmPastValues
            graphicmap.update();
            //console.log(selector.value)
        } else {
            graphicmap.data.datasets[0].label = ''
            graphicmap.data.datasets[0].data = ''
            graphicmap.update()
        }
    })
}

//call graph
document.addEventListener('DOMContentLoaded', (event) => {
    configGraphAndRender();
});