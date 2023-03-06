/*Variables que importan y hacen uso del contenido HTML*/
const container =document.querySelector('.container');
const search =document.querySelector('.areab button');
const cclima =document.querySelector('.climacaja');
const cdeta =document.querySelector('.cdetalles');
const erro =document.querySelector('.error');

/*listener que al momento de hacer click haga la funcion buscar*/
search.addEventListener('click', ()=> {
/*esta API key la encuentras al registrarte en open wheatermap */
    const APIKey = 'a80b57a65614ddb3cfc42ad79f0836e0';
    const ciudad = document.querySelector(".areab input").value;
    /*if donde busca la ciudad obteniendo los valores tales como clima, humedad, detalles en sí*/
    if(ciudad=== '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}&lang=sp,es`).then(response => response.json())
    .then(json=>
        {

            if(json.cod === '404'){
                container.style.height= '400px';
                cclima.style.display ='none';
                cdeta.style.display = 'none';
                erro.style.display= 'block';
                erro.classList.add('fadeIn');
                return;
            }

            erro.style.display = 'none';
            erro.classList.remove('fadeIn');

            const image = document.querySelector('.climacaja img');
            const ciu = document.querySelector('.climacaja .cbuscada');
            const temperatura = document.querySelector('.climacaja .temperatura');
            const detalles = document.querySelector(".climacaja .detalles");
            const humedad = document.querySelector(".cdetalles .humedad span");
            const viento = document.querySelector(".cdetalles .viento span");
            /*al momento de validar el if primero se hace la funcion switch case para mostrar las imagenes ya sea el caso solicitado*/
            if (image) {
                switch(json.weather[0].main){
                    case 'Clear':
                        image.src ='img/sol.png';
                        break;
                    case 'Rain':
                        image.src ='img/lluvia.png';
                        break;
                    case 'Snow':
                        image.src ='img/nieve.png';
                        break;
                    case 'Clouds':
                        image.src ='img/nube.png';
                        break;
                    case 'Haze':
                        image.src ='img/nebli.png';
                        break;
                    case 'Smoke':
                        image.src ='img/nebli.png';
                        break;
                    default:
                        image.src='';
                    
            }
        }
        /*aqui se manda ya la información al HTML para mostrarlo al usuario*/
            
        if(temperatura){
                temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            }
            if(detalles){
                detalles.innerHTML = `${json.weather[0].description}`;
            }
            if(ciu){
                ciu.innerHTML =  `${ciudad}`;
            }
            if(humedad){
                humedad.innerHTML =  `${json.main.humidity}%`;
            }
            if (viento){
                viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            }   
            

            if(cclima){
                cclima.style.display = '';
            }
            if (cdeta){
                cdeta.style.display = '';
            }
            if(cclima){
                cclima.classList.add('fadeIn');
            }
            if(cdeta){
                cdeta.classList.add('fadeIn');
            }
            if(container){
                container.style.height= '590px'
            }
            
    });

});
/*CARLOS EDUARDO HERNANDEZ MONTES*/