import {getSubscribers} from './home.js';


let url = {
    urlGetPost: 'http://localhost:3030/jsonstore/collections/myboard/posts/',
    urlComments: 'http://localhost:3030/jsonstore/collections/myboard/comments'
};

export async function comments(postId) {
    let divThemeContent = document.createElement('div');
    divThemeContent.className = "theme-content";

    let container = document.querySelector('.container');


    async function postComment(ev) {
        ev.preventDefault();
        let parentOfBtn = ev.target.parentNode;
        let comment = parentOfBtn.querySelector('textarea');
        let username = parentOfBtn.querySelector('input');

        if (comment.value.length > 0 && username.value.length > 0) {
            let date = new Date();
            try {
                await fetch(url.urlComments, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'username': username.value,
                        'comment': comment.value,
                        'post_id': postId,
                        'date': date
                    })
                })
            } catch (e) {
                alert('cant comment on this post');
            }
        }
    }

    async function getComments() {
        try {
            let response = await fetch(url.urlComments);
            let data = await response.json();

            let data2 = Object.entries(data).filter(([key, value]) => value.post_id === postId);
            if (data2.length > 0) {
                data2.forEach(l => {
                    let divComment = document.createElement('div');
                    divComment.className = "comment";

                    let divHeader = document.createElement('div');
                    divHeader.className = "header";
                    divHeader.innerHTML = `<p><span>${l[1].username}</span> posted on <time>${l[1].date}</time></p>`;

                    let divCommentMain = document.createElement('div');
                    divCommentMain.className = "comment-main";

                    let divUserDetails = document.createElement('div');
                    divUserDetails.className = "userdetails";
                    divUserDetails.innerHTML = `<img src="./static/profile.png" alt="avatar">`;

                    let divPostContent = document.createElement('div');
                    divPostContent.className = "post-content";
                    divPostContent.innerHTML = `<p>${l[1].comment}</p>`;

                    let divFooter = document.createElement('div');
                    divFooter.className = "footer";
                    divFooter.innerHTML = `<p><span>0</span> likes</p>`;

                    divCommentMain.appendChild(divUserDetails);
                    divCommentMain.appendChild(divPostContent);

                    divComment.appendChild(divHeader);

                    divComment.appendChild(divCommentMain);
                    divComment.appendChild(divFooter);
                    divThemeContent.appendChild(divComment);
                })


            }

        } catch (e) {
            alert(e.message);
        }
    }

    async function getThemeTitle() {
        try {
            let response = await fetch(url.urlGetPost + postId);
            let data = await response.json();


            let divThemeTitle = document.createElement('div');
            divThemeTitle.className = "theme-title";

            let divThemeNameWrapper = document.createElement('div');
            divThemeNameWrapper.className = "theme-name-wrapper";

            let divThemeName = document.createElement('div');
            divThemeName.className = "theme-name";
            divThemeName.innerHTML = `<h2>${data.title}</h2><p>Date: <time>${data.date}</time></p>`;

            let divSubscribers = document.createElement('div');
            divSubscribers.className = "subscribers";
            divSubscribers.innerHTML = `<p>Subscribers: <span>${await getSubscribers(postId)}</span></p>`;

            divThemeNameWrapper.appendChild(divThemeName);
            divThemeNameWrapper.appendChild(divSubscribers);
            divThemeTitle.appendChild(divThemeNameWrapper);
            divThemeContent.appendChild(divThemeTitle);


        } catch (e) {
            alert(e.message);
        }
    }

    async function createAnswerComment() {
        let divAnswerComment = document.createElement('div');
        divAnswerComment.className = "answer-comment";
        divAnswerComment.innerHTML = '<p><span>currentUser</span> comment:</p>';

        let divAnswer = document.createElement('div');
        divAnswer.className = "answer";

        let divForm = document.createElement('form');
        divForm.innerHTML = '<form>\n' +
            '                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>\n' +
            '                        <div>\n' +
            '                            <label for="username">Username <span class="red">*</span></label>\n' +
            '                            <input type="text" name="username" id="username">\n' +
            '                        </div>\n' +
            '                    </form>'
        let btnPost = document.createElement('button');
        btnPost.textContent = 'Post';
        btnPost.addEventListener('click', postComment);

        divForm.appendChild(btnPost);
        divAnswer.appendChild(divForm);
        divAnswerComment.appendChild(divAnswer);
        divThemeContent.appendChild(divAnswerComment);


    }

    await getThemeTitle();
    await getComments();
    await createAnswerComment();

    container.appendChild(divThemeContent);

}