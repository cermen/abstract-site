class Site {
    static allBoards = [];
    constructor () {
        this.boards = [];   // 사이트에 있는 게시판
    }

    addBoard (board) {
        if (this.findBoardByName(board.name)) {
            throw new Error('같은 이름의 게시판이 존재합니다.');
        }
        this.boards.push(board);
        Site.allBoards.push(board);
    }

    findBoardByName (name) {
        return this.boards.find(item => item.name === name);
    }
}

class Board {
    static entireArticles = [];
    constructor (name) {
        if (!name) {
            throw new Error('게시판 이름이 입력되지 않았습니다.');
        }
        this.name = name;
        this.articles = [];   // 게시판에 등록된 게시물
    }

    publish (article) {
        if (!Site.allBoards.includes(this)) {
            throw new Error('등록되지 않은 게시판입니다.');
        }

        const date = new Date();
        article.id = `${this.name}-${date.getTime()}`;
        article.createdDate = date.toISOString();

        this.articles.push(article);
        Board.entireArticles.push(article);
    }

    getAllArticles () {
        return this.articles;
    }
}

class Article {
    constructor (item) {
        if (!(item.subject && item.content && item.author)) {
            throw new Error('게시글 입력 오류!');
        }
        this.subject = item.subject;
        this.content = item.content;
        this.author = item.author;
        this.comments = [];   // 게시물에 등록된 댓글
    }

    reply (comment) {
        if (!Board.entireArticles.includes(this)) {
            throw new Error('게시하지 않은 글입니다.');
        }

        const date = new Date();
        comment.createdDate = date.toISOString();
        this.comments.push(comment);
    }

    getAllComments () {
        return this.comments;
    }
}

class Comment {
    constructor (item) {
        if (!(item.content && item.author)) {
            throw new Error('댓글 입력 오류');
        }
        this.content = item.content;
        this.author = item.author;
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};