(function(){
    const dbCollection = firebase.firestore().collection('contactList');
    function renderData() {
        dbCollection.get().then(function(querySnapshot) {
            const list = [];
            let index = 1;
            querySnapshot.forEach(function(doc) {
                list.push(renderItem(doc, index));
                index += 1;
            });
            $('#entries').html(list);
            $('.removeItem').click((e) => {
                const key = e.target.getAttribute("dataKey");
                if (confirm('Are you sure?')) {
                    dbCollection.doc(key).delete().then(function(){
                        renderData();
                    });
                } 
            });
            $('.info').click((e) => {
                const key = e.target.getAttribute("dataKey");
                window.location.href = 'contact.html?id='+key;
            });
            $('.edit').click((e) => {
                const key = e.target.getAttribute("dataKey");
                window.location.href = 'edit.html?id='+key;
            });
        });
    }

    function renderItem(value, index) {
        const contact = value.data();
        const html = 
        `<tr key=${value.id}>
            <th>${index}</th>
            <th>${contact.name}</th>
            <th>${contact.email}</th>
            <th>${contact.phone}</th>
            <th>
                <button dataKey=${value.id} type="button" class="info btn btn-info">Info</button>
                <button dataKey=${value.id} type="button" class="edit btn btn-warning">Edit</button>
                <button dataKey=${value.id} type="button" class="removeItem btn btn-danger">Delete</button>
            </th>
        </tr>`;
        return html;
    }

   renderData();
})();