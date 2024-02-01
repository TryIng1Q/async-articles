(async () => {

    const DOM_FUNCTION = {
        createPageArticles({list, page}) {
            const activePage = document.querySelector('.active-page');
            activePage.textContent = page ? Number(page) + 1 : 1;

            const articlesContainer = document.getElementById('blog__container');

            for (let i = 0; i < list.length; ++i) {
                let articleLink = document.createElement('a');
                articleLink.classList.add('blog__article');
                articleLink.textContent = list[i].title;
                articleLink.dataset.content = i + 1;
                articleLink.setAttribute('href', `post.html?page=${page ? page : 0}&id=${i}`);
                articlesContainer.append(articleLink);
            } 
        },

        createPageNavigator() {
            const container = document.getElementById('page-list');
            const searchParams = new URLSearchParams(window.location.search);
            const thisPage = searchParams.get('page') ? Number(searchParams.get('page')) : 0;

            for (let i = thisPage - 4; i <= thisPage + 4; i++) {
                if (i < 0) continue;

                let navItem = document.createElement('li');

                if (i == thisPage) navItem.classList.add('block__active-page'); 
                navItem.classList.add('blog__page-item');


                let navContent = document.createElement('a');
                navContent.setAttribute('href', 'index.html?page=' + i);
                navContent.textContent = i + 1;

                navItem.append(navContent);
                container.append(navItem);
            }
        }
    }

    const EVENT_FUNCTION = {

    }

    const ASYNC_FUNCTION = {
        async parsePageArticles() {
            const searchParams = new URLSearchParams(window.location.search);
            let pageList = searchParams.get('page') ? await fetch('https://gorest.co.in/public/v2/posts?page=' + searchParams.get('page')) : await fetch('https://gorest.co.in/public/v2/posts?page=0');
            return {'list': await pageList.json(), 'page': searchParams.get('page')};
        }
    }

    const activeObject = await ASYNC_FUNCTION.parsePageArticles();
    console.log(activeObject.list);
    DOM_FUNCTION.createPageArticles(activeObject);
    DOM_FUNCTION.createPageNavigator();
})();