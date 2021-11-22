function EventClose() {

    document.querySelector(".close-btn").addEventListener('click', function() {
        let removeDiv = document.querySelector('#tab-true');

        if (removeDiv) {

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


          //  document.querySelector('#firstNameFree').value = null;
          //  document.querySelector('#middleNameFree').value= null;
          //  document.querySelector('#lastNameFree').value = null;
          // //document.querySelector('#tabelNumber').value = null;
          //  document.querySelector('#emailInputFree').value = null;
          //  document.querySelector('#phoneNumberFree').value = null;
          //  document.querySelector('#nameOfferFree').value = null;
          //  document.querySelector('#problemfree').value = null;
          //  document.querySelector('#offerfree').value = null;
          //  document.querySelector('#agreeFree').checked = false;
           
           document.querySelector('#file').value = '';
           // document.querySelector('#fileFree').value = '';
          
           removeDiv.remove();
            //window.location.href = "http://localhost:3000/index";

        } else {
            console.log('removeDiv не существует');
        }
    });
    
        
} 


export default EventClose;
