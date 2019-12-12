(function(){
    const dbCollection = firebase.firestore().collection('contactList');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    function renderData() {
        dbCollection.doc(id).get().then(function(doc) {
            $('.card-body').html(renderItem(doc));
        });
    }

    function renderItem(value) {
        const contact = value.data();
        const html = 
        `<div>
            <span>Name:</span>
            <span class="badge badge-primary">${contact.name}</span>
         </div>
        <div>
            <span>Email:</span>
            <span class="badge badge-primary">${contact.email}</span>
        </div>
        <div>
            <span>Phone:</span>
            <span class="badge badge-primary">${contact.phone}</span>
        </div>`;
        return html;
    }

    $("#delete-btn").click(() => {
        if (confirm('Are you sure?')) {
            dbCollection.doc(id).delete().then(function(){
                window.location.href = 'index.html';
            });
        } 
    });

    $("#edit-btn").click(() => {
        window.location.href = 'edit.html?id='+id;
    });

   renderData();
})();