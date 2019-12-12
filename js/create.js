(function() {
    $('#new_entry').submit(function(e){
        e.preventDefault();
        
        var entry = {};
        entry.name = $(this).find('#name').val();
        entry.email = $(this).find('#exampleInputEmail1').val();
        entry.phone = $(this).find('#phone').val()

        const dbCollection = firebase.firestore().collection('contactList');
        dbCollection.add({
            name: entry.name,
            email: entry.email,
            phone: entry.phone
        })
        .then(function(docRef) {
            window.location.href = 'contact.html?id='+docRef.id;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        return false;
    });
})();