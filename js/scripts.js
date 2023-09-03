'use strict';


/*Variables que importan y hacen uso del contenido HTML*/
const container =document.querySelector('.container');
const body = document.querySelector('.body');
const search =document.querySelector('.areab button');
const bq = document.querySelector('.areab input');
const txt = document.getElementById("texto");
const cclima =document.querySelector('.climacaja');
const btd =document.querySelector('.climacaja button');
const btd1 =document.querySelector('.error button');
const cdeta =document.querySelector('.cdetalles');
const erro =document.querySelector('.error');
const mp = document.querySelector('.map');
const day = document.querySelector('.stat')
const am = document.querySelector('.ama')
const at = document.querySelector('.ata');
const logo = document.querySelector('.tit')
const lg = document.querySelector('.t2');
const urm = document.getElementById('largeMapLink');
const urm2 = document.getElementById('dirMapLink');
const fram = document.querySelector('.map iframe');

/*listener que al momento de hacer click haga la funcion buscar*/
search.addEventListener('click', ()=> {
/*esta API key la encuentras al registrarte en open wheatermap */
    const APIKey = 'a80b57a65614ddb3cfc42ad79f0836e0';
    const ciudad = document.querySelector(".areab input").value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    /*if donde busca la ciudad obteniendo los valores tales como clima, humedad, detalles en sí*/
    if(ciudad=== ''){
        Toast.fire({
            icon: 'warning',
            title: 'Ingresa una ciudad',
            
          });
          
        return;
    }
        
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}&lang=es`).then(response => response.json())
    .then(json=>
        {

            if(json.cod === '404'){
                container.style.height= '400px';
                body.style.justifyContent = 'center';
                cclima.style.display ='none';
                cdeta.style.display = 'none';
                day.style.display = 'none';
                logo.style.display = 'none';
                lg.style.display = 'none';
                erro.style.display= 'block';
                erro.classList.add('fadeIn');
                //logo.style.display = '';
                
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
            const snrs = document.querySelector(".ama .fecha");
            const snst = document.querySelector(".ata .fecha2");

            

            // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${APIKey}`).then(response => response.json())
            // .then(jsons=>
            //     {
            //             console.log(jsons.city);
            //     })
            
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
                ciu.innerHTML =  `${json.name}`;
            }
        if(humedad){
                humedad.innerHTML =  `${json.main.humidity}%`;
            }
        if (viento){
                viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            }
        let lt = json.coord.lat;
        let ln = json.coord.lon;
        fram.src = `https://www.bing.com/maps/embed?h=400&w=500&cp=${lt}~${ln}&lvl=13&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
        urm.href = `https://www.bing.com/maps?cp=${lt}~${ln}&amp;sty=r&amp;lvl=13&amp;FORM=MBEDLD`;
        urm2.href = `https://www.bing.com/maps/directions?cp=${lt}~${ln}&amp;sty=r&amp;lvl=13.955591479114542&amp;rtp=~pos.cp=${lt}~${ln}___&amp;FORM=MBEDLD`;
        



        
            let snrise = `${json.sys.sunrise}`
            let snset = `${json.sys.sunset}`; 
            let fecha = new Date(snrise * 1000);
            let fech = new Date(snset * 1000)
            let y1 = fecha.getFullYear();
            let ms1 = fecha.getMonth() + 1;
            let d1 = fecha.getDate();
            let h1 = ("0" + fecha.getHours()).slice(-2);
            let m1 = ("0" + fecha.getMinutes()).slice(-2);
            let s1 = ("0" + fecha.getSeconds()).slice(-2);
            let y2 = fech.getFullYear();
            let ms2 = fech.getMonth() + 1;
            let d2 = fech.getDate();
            let h2 = ("0" + fech.getHours()).slice(-2);
            let m2 = ("0" + fech.getMinutes()).slice(-2);
            let s2 = ("0" + fech.getSeconds()).slice(-2);
            if (snrs){
                snrs.innerHTML = `${d1}/${ms1}/${y1} <br> &nbsp; ${h1}:${m1}:${s1}`;
            }
            if (snst){
                snst.innerHTML = `${d2}/${ms2}/${y2} <br> &nbsp; ${h2}:${m2}:${s2}`;
            }   
            if(cclima){
                cclima.style.display = '';
            }
            if (cdeta){
                cdeta.style.display = '';
            }
            if(day){
                day.style.display = '';
            }
            if(am){
                am.style.display = '';
            }
            if(at){
                at.style.display = '';
            }

            
            if(logo){
                logo.style.display = 'none';

            }
            if(lg){
                lg.style.display = '';
            }
            
           
            if(cclima){
                cclima.classList.add('fadeIn');
            }
            if(cdeta){
                cdeta.classList.add('fadeIn');
            }
            if(am){
                am.classList.add('fadeIn')
                am.style.animationDelay= '3s';
                
            }
            if(at){
                at.classList.add('fadeIn');
                at.style.animationDelay= '.5';
            }
            
            if(container){
                container.style.height= '590px';
                container.style.animationDelay = '1';
            }
            if(body){
                body.style.justifyContent = 'left';
            }
            if(day){

                day.style.height= '450px';
                day.style.width='800px'
                day.style.display= 'block';
                day.classList.add('fadeIn');

            }
            if(lg){
                lg.classList.add('fadeIn');
            }
            
            
            
    });
    btd.addEventListener('click', ()=> {
        container.style.height= '105px';
        cclima.style.display ='none';
        cdeta.style.display = 'none';
        day.style.display = 'none';
        am.style.display= 'none';
        at.style.display= 'none';
        logo.style.display = '';
        lg.style.display = 'none';
        texto.value = "";
        body.style.justifyContent = 'center';
        container.style.animationDelay = '6s';
        
        return;
    });
    btd1.addEventListener('click', ()=> {
        container.style.height= '105px';
        cclima.style.display ='none';
        cdeta.style.display = 'none';
        lg.style.display = 'none';
        texto.value = "";
        body.style.justifyContent = 'center';
        container.style.animationDelay = '6s';
        logo.style.display = '';
        return;
    });
});


bq.addEventListener('keypress', function(event) {
    if (event.key === "a") {
        console.log("hola mundo");
    }
    /*esta API key la encuentras al registrarte en open wheatermap */
        const APIKey = 'a80b57a65614ddb3cfc42ad79f0836e0';
        const ciudad = document.querySelector(".areab input").value;
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
        /*if donde busca la ciudad obteniendo los valores tales como clima, humedad, detalles en sí*/
        if(ciudad=== ''){
            Toast.fire({
                icon: 'warning',
                title: 'Ingresa una ciudad',
                
              });
              
            return;
        }
            
            
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}&lang=es`).then(response => response.json())
        .then(json=>
            {
    
                if(json.cod === '404'){
                    container.style.height= '400px';
                    body.style.justifyContent = 'center';
                    cclima.style.display ='none';
                    cdeta.style.display = 'none';
                    day.style.display = 'none';
                    logo.style.display = 'none';
                    lg.style.display = 'none';
                    erro.style.display= 'block';
                    erro.classList.add('fadeIn');
                    //logo.style.display = '';
                    
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
                const snrs = document.querySelector(".ama .fecha");
                const snst = document.querySelector(".ata .fecha2");
    
                
    
                // fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${APIKey}`).then(response => response.json())
                // .then(jsons=>
                //     {
                //             console.log(jsons.city);
                //     })
                
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
                    ciu.innerHTML =  `${json.name}`;
                }
            if(humedad){
                    humedad.innerHTML =  `${json.main.humidity}%`;
                }
            if (viento){
                    viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
                }
            let lt = json.coord.lat;
            let ln = json.coord.lon;
            fram.src = `https://www.bing.com/maps/embed?h=400&w=500&cp=${lt}~${ln}&lvl=13&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
            urm.href = `https://www.bing.com/maps?cp=${lt}~${ln}&amp;sty=r&amp;lvl=13&amp;FORM=MBEDLD`;
            urm2.href = `https://www.bing.com/maps/directions?cp=${lt}~${ln}&amp;sty=r&amp;lvl=13.955591479114542&amp;rtp=~pos.cp=${lt}~${ln}___&amp;FORM=MBEDLD`;
            
    
    
    
            
                let snrise = `${json.sys.sunrise}`
                let snset = `${json.sys.sunset}`; 
                let fecha = new Date(snrise * 1000);
                let fech = new Date(snset * 1000)
                let y1 = fecha.getFullYear();
                let ms1 = fecha.getMonth() + 1;
                let d1 = fecha.getDate();
                let h1 = ("0" + fecha.getHours()).slice(-2);
                let m1 = ("0" + fecha.getMinutes()).slice(-2);
                let s1 = ("0" + fecha.getSeconds()).slice(-2);
                let y2 = fech.getFullYear();
                let ms2 = fech.getMonth() + 1;
                let d2 = fech.getDate();
                let h2 = ("0" + fech.getHours()).slice(-2);
                let m2 = ("0" + fech.getMinutes()).slice(-2);
                let s2 = ("0" + fech.getSeconds()).slice(-2);
                if (snrs){
                    snrs.innerHTML = `${d1}/${ms1}/${y1} <br> &nbsp; ${h1}:${m1}:${s1}`;
                }
                if (snst){
                    snst.innerHTML = `${d2}/${ms2}/${y2} <br> &nbsp; ${h2}:${m2}:${s2}`;
                }   
                if(cclima){
                    cclima.style.display = '';
                }
                if (cdeta){
                    cdeta.style.display = '';
                }
                if(day){
                    day.style.display = '';
                }
                if(am){
                    am.style.display = '';
                }
                if(at){
                    at.style.display = '';
                }
    
                
                if(logo){
                    logo.style.display = 'none';
    
                }
                if(lg){
                    lg.style.display = '';
                }
                
               
                if(cclima){
                    cclima.classList.add('fadeIn');
                }
                if(cdeta){
                    cdeta.classList.add('fadeIn');
                }
                if(am){
                    am.classList.add('fadeIn')
                    am.style.animationDelay= '3s';
                    
                }
                if(at){
                    at.classList.add('fadeIn');
                    at.style.animationDelay= '.5';
                }
                
                if(container){
                    container.style.height= '590px';
                    container.style.animationDelay = '1';
                }
                if(body){
                    body.style.justifyContent = 'left';
                }
                if(day){
    
                    day.style.height= '450px';
                    day.style.width='800px'
                    day.style.display= 'block';
                    day.classList.add('fadeIn');
    
                }
                if(lg){
                    lg.classList.add('fadeIn');
                }
                
                
                
        });
        btd.addEventListener('click', ()=> {
            container.style.height= '105px';
            cclima.style.display ='none';
            cdeta.style.display = 'none';
            day.style.display = 'none';
            am.style.display= 'none';
            at.style.display= 'none';
            logo.style.display = '';
            lg.style.display = 'none';
            texto.value = "";
            body.style.justifyContent = 'center';
            container.style.animationDelay = '6s';
            
            return;
        });
        btd1.addEventListener('click', ()=> {
            container.style.height= '105px';
            cclima.style.display ='none';
            cdeta.style.display = 'none';
            lg.style.display = 'none';
            texto.value = "";
            body.style.justifyContent = 'center';
            container.style.animationDelay = '6s';
            logo.style.display = '';
            return;
        });
    });
    
/*CARLOS EDUARDO HERNANDEZ MONTES*/