document.querySelector('#uploadBtn').addEventListener('click', ()=>{
   const file = document.querySelector('#fireUpload').files[0];

   const storageRef = firebase.storage().ref();
   const fileRef = storageRef.child(`folder1/${file.name}`);

   const storage = fileRef.put(file);

   storage.on('state_changed', 
   function progress(snapshot) {
      // let percentage = (snapshot.bytesTransfer / snapshot.totalBytes) * 100;
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      //enable progress bar
      document.querySelector('#progress').style.display = 'block';

      document.querySelector('#progress').value = percentage;
   },
   function error(err) {
      console.log(`error during upload.... details available here`, err);
   },
   function succuss() {
      document.querySelector('#status').innerText = 'file uploaded';
      getFileURL(`folder1/${file.name}`);
   }
   )

   function getFileURL(file) {
      const storage = firebase.storage().ref(file);
      storage.getDownloadURL().then((url) => {
         document.querySelector('#downloadLink').innerText  = url;
      })
   }

})

