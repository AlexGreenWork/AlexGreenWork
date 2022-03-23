function EventClose() {
    document.querySelector(".close-btn").addEventListener('click', function() {
        let removeDiv = document.querySelector('#tab-true');

        if (removeDiv) {
            if(localStorage.getItem('userTabelNum') === null){
                document.querySelector('#firstName').value = null;
                document.querySelector('#middleName').value= null;
                document.querySelector('#lastName').value = null;
                document.querySelector('#emailInput').value = null;
                document.querySelector('#phoneNumber').value = null;
                document.querySelector('#nameOffer').value = null;
                document.querySelector('#problem').value = null;
                document.querySelector('#offer').value = null;
                document.querySelector('#agree').checked = false;
                 if(document.querySelector('#tabelNumber')){
                     document.querySelector('#tabelNumber').value = null;
                 }
            } else{
                document.querySelector('#firstName').value = null;
                document.querySelector('#middleName').value= null;
                document.querySelector('#lastName').value = null;
                document.querySelector('#nameOffer').value = null;
                document.querySelector('#problem').value = null;
                document.querySelector('#offer').value = null;
                document.querySelector('#agree').checked = false;
                 if(document.querySelector('#tabelNumber')){
                     document.querySelector('#tabelNumber').value = null;
                 }
            }
           
        
            document.querySelector('#file').value = '';
            removeDiv.remove();
          // window.location = "http://localhost:3000/personalCabinet/myOffers";
           window.location.href = "/";
        } else {
            console.log('removeDiv не существует');
        }
    });
    
        
} 


export default EventClose;