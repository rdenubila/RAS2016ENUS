var myTheme = {
    name: 'cemig',
    chart: {
        title: {
            font: {
                color: '#636467',
                family: 'Roboto',
                size: 18,
                weight: 500
            },
            horizontalAlignment: 'left'
        }
    }
};
DevExpress.viz.core.registerTheme(myTheme,'desktop');

neutro = ['#05ae93', '#7e8c85', '#006252', '#8ecea5', '#007574'],
cemig = ['#05ae93', '#7e8c85', '#006252', '#8ecea5', '#007574'],
governanca = ['#7a2816', '#8c8c8e', '#a5752f', '#faa61a', '#c03b25'],
estrategia = ['#0e3b64', '#848490', '#0077c1', '#58585a', '#001c32'],
clientes = ['#faa61a', '#8a868b', '#ffde00', '#6d3214', '#d6b981'],
resultados = ['#2ac4f4', '#8c9291', '#4d9fd7', '#14899b', '#006789'],
publico = ['#ee2b4e', '#807b89', '#d6b981', '#5a051e', '#e42c63'],
fornecedores = ['#7c388b', '#7e8a92', '#576fb5', '#a587be', '#481368'],
comunidade = ['#6b841b', '#86958d', '#01b9b5', '#2b863e', '#253d01'],
meioambiente = ['#0099da', '#7c8d97', '#106b70', '#69b1ce', '#1f5778']

cores = new Array();
cores["neutro"] = neutro;
cores["cemig"] = cemig;
cores["governanca"] = governanca;
cores["estrategia"] = estrategia;
cores["clientes"] = clientes;
cores["resultados"] = resultados;
cores["publico"] = publico;
cores["fornecedores"] = fornecedores;
cores["comunidade"] = comunidade;
cores["meioambiente"] = meioambiente;