(async () => {
    const postFunction = {
        async getURIvar() {
            const postInfo = await this.parseArticleInfo();

            const postContainer = document.getElementById('article__container');
            const commentsContainer = document.getElementById('article__comments');
            const articleTitle = document.createElement('h1');
            const articleParagraf = document.createElement('p');

            articleTitle.classList.add('article-title');
            articleParagraf.classList.add('article-paragraf');

            articleTitle.textContent = postInfo[0].title;
            articleParagraf.textContent = postInfo[0].body;

            postContainer.append(articleTitle);
            postContainer.append(articleParagraf);

            for (let comment of postInfo[1]) {
                let commentCreater = document.createElement('h2');
                let commentInfo = document.createElement('p');

                commentCreater.classList.add('comment-creater');
                commentInfo.classList.add('comment-info');

                commentCreater.textContent = comment.name;
                commentInfo.textContent = comment.body;

                commentsContainer.append(commentCreater);
                commentsContainer.append(commentInfo);
            } 
        },

        async parseArticleInfo() {
            const searchParams = new URLSearchParams(window.location.search);

            let activeArticle = await fetch('https://gorest.co.in/public/v2/posts?page=' + searchParams.get('page'));
            activeArticle = await activeArticle.json();
            activeArticle = activeArticle[searchParams.get('id')];

            let articleCreater = activeArticle.id;
            articleCreater = await fetch('https://gorest.co.in/public-api/comments?post_id=' + articleCreater);
            articleCreater = await articleCreater.json();
            articleCreater = articleCreater.data;

            return [{'title': activeArticle.title, 'body': activeArticle.body}, articleCreater];
        },
    };

    let backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        const searchParams = new URLSearchParams(window.location.search);
        window.location = 'index.html?page=' + (searchParams.has('page') ? searchParams.get('page') : 0);
    });

    
    postFunction.getURIvar();
})()