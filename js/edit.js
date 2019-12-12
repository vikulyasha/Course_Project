(function() {
    const dbCollection = firebase.firestore().collection('contactList');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $('#new_entry').submit(function(e){
        e.preventDefault();
        
        var entry = {};
        entry.name = $(this).find('#name').val();
        entry.email = $(this).find('#exampleInputEmail1').val();
        entry.phone = $(this).find('#phone').val()

        dbCollection.doc(id).set({
            name: entry.name,
            email: entry.email,
            phone: entry.phone
        })
        .then(function(docRef) {
            window.location.href = 'contact.html?id='+id;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        return false;
    });


    function render() {
        dbCollection.doc(id).get().then(function(doc) {
            const contact = doc.data();
            console.log(contact)
            $('#name').val(contact.name);
            $('#exampleInputEmail1').val(contact.email);
            $('#phone').val(contact.phone)
        });
    };

    render()
})();