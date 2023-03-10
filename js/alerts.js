/*(async () => {
  const { value: lang } = await Swal.fire({
    title: 'Hola',
    text: 'Selecciona tu idioma',
    icon: 'info',
    allowOutsideClick: false,
    input: 'select',
    inputPlaceholder: 'Idioma',
    inputValue: '',
    inputOptions: {
      es: 'Español',
      en: 'English'
    }
  });

  if (lang) {
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
    
    if (lang === 'es') {
      
      Toast.fire({
        icon: 'success',
        title: 'Idioma al español',
        
      });
    }
    if (lang === 'en') {
      
      Toast.fire({
        icon: 'success',
        title: 'Language to english'
      });
    }
  }
})();*/