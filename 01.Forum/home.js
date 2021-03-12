let url = {
    urlGetPost:'http://localhost:3030/jsonstore/collections/myboard/posts/',
    urlSubscribers:'http://localhost:3030/jsonstore/collections/myboard/comments'
};

async function getSubscribers(postId) {
    try {
        let response = await fetch(url.urlSubscribers);
        let data = await response.json();
        let counter = 0;
        // if (data.post_id === postId){
        //     counter++;
        // }
        Object.entries(data)
            .forEach(([key,value])=>{
                if (value.post_id === postId){
                    counter++;
                }
            })


        return counter;
    }catch (e) {
        return 0;
    }
}

 function home(topicBorderForm, topicTitleComments, body) {


    let createTopicTitle = document.createElement('div');
    createTopicTitle.className = 'topic-title';

    window.onload = getComments();

     // async function getSubscribers(postId) {
     //     try {
     //         let response = await fetch(url.urlSubscribers);
     //         let data = await response.json();
     //         let counter = 0;
     //         // if (data.post_id === postId){
     //         //     counter++;
     //         // }
     //         Object.entries(data)
     //             .forEach(([key,value])=>{
     //                 if (value.post_id === postId){
     //                     counter++;
     //                 }
     //             })
     //
     //         console.log(counter)
     //
     //         return counter;
     //     }catch (e) {
     //         return 0;
     //     }
     // }

    async function getComments() {

        try {
            let divTopicTitle = document.createElement('div');
            divTopicTitle.className = "topic-title";

            let response = await fetch(url.urlGetPost);
            let data = await response.json();
            //  console.log(data)
            if (Object.keys(data).length !== 0) {
                for (const [key, value] of Object.entries(data)) {
                    let divTopicContainer = document.createElement('div');
                    divTopicContainer.className = "topic-container";

                    let divTopicNameWrapper = document.createElement('div');
                    divTopicNameWrapper.className = "topic-name-wrapper";

                    let divTopicName = document.createElement('div');
                    divTopicName.className = "topic-name";

                    let aHref = document.createElement('a');
                    aHref.className = "normal";
                    aHref.setAttribute('href', key);

                    let h2 = document.createElement('h2');
                    h2.textContent = value.title;

                    aHref.appendChild(h2);
                    divTopicName.appendChild(aHref);

                    let divColumns = document.createElement('div');
                    divColumns.className = "columns";

                    let firstDiv = document.createElement('div');
                    firstDiv.innerHTML = `<p>Date2: <time>${value.date}</time></p> <div class="nick-name"><p>Username: <span>${value.username}</span></p></div>`;

                    let secondDiv = document.createElement('div');
                    secondDiv.className= "subscribers";
                    secondDiv.innerHTML = `<p>Subscribers: <span>${await getSubscribers(value._id)}</span></p>`
                    divColumns.appendChild(firstDiv);
                    divColumns.appendChild(secondDiv);

                    divTopicName.appendChild(divColumns);
                    divTopicNameWrapper.appendChild(divTopicName);
                    divTopicContainer.appendChild(divTopicNameWrapper);

                    body.appendChild(divTopicContainer);
                }

            }

        } catch (e) {
            alert(e.message)
        }


    }


    let btns = topicBorderForm.querySelectorAll('button');

    let btnCancel = btns[0];
    let btnPost = btns[1];


    btnCancel.addEventListener('click', ev => {
        ev.preventDefault();
        let form = topicBorderForm.querySelector('form');
        let texts = form.querySelectorAll('[type=text]')
        cleanForm(texts);
    });
    btnPost.addEventListener('click', ev => {
        ev.preventDefault();
        let form = topicBorderForm.querySelector('form');
        let texts = form.querySelectorAll('[type=text]')
        if (texts[0].value.length > 0 && texts[1].value.length > 0 && texts[2].value.length > 0) {
            postPost(texts[0].value, texts[1].value, texts[2].value);
            cleanForm(texts);
        }
    });

    function cleanForm(texts) {
        texts
            .forEach(line => {
                line.value = '';
            })
    }


    async function postPost(title, username, post) {
        try {
            await fetch(url.urlGetPost, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, username, post, 'date': new Date})
            })
        } catch (e) {
            alert(e.message)
        }

    }

}

 export {
    home,
     getSubscribers
 }


