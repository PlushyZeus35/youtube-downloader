if(flashMessages.length>0){
    const toastLiveExample = document.getElementById('liveToast');
    let toastText = document.getElementById('liveToastText');
    let toastTittle = document.getElementById('toast-title');
    toastTittle.innerHTML = "¡Ha ocurrido un error!";
    toastText.innerHTML = flashMessages[0];
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}