
const buttons = document.querySelectorAll('.gradeButton');


function removeSuffix() {
    buttons.forEach(button => {
        button.textContent = button.textContent.replace('-сынып', '');
    });
}


function addSuffix() {
    buttons.forEach(button => {
        if (!button.textContent.includes('-сынып')) {
            button.textContent += '-сынып';
        }
    });
}

function contSuffix()
{
    if (window.innerWidth < 560) {
        removeSuffix();
    } else {
        addSuffix();
    }
}

window.addEventListener('resize', () => {
    contSuffix()
});

contSuffix()




window.onload = function() {
    const bookList = document.getElementById("bookList");
    const searchInput = document.getElementById("searchInput");
    const gradeButtons = document.querySelectorAll(".gradeButton");
    const bookNumbers = ["7.txt", "8.txt", "9.txt", "10.txt"];

    // 加载书籍列表
    function loadBooks() {
        bookList.innerHTML = "";
        bookNumbers.forEach(bookNumberFile => {
            fetch(bookNumberFile)
                .then(response => response.text())
                .then(data => {
                    const lines = data.split('\n');
                    lines.forEach(line => {
                        const [number, ...titleParts] = line.split(' ');
                        const title = titleParts.join(' ');
                        const bookImgUrl = `https://okulyk.kz/wp-content/books/${number}/${number}.jpg`;
                        const bookPdfUrl = `https://s3.timeweb.com/29ae0e9e-okulyk-books/${number}/${number}.pdf`;
                        const bookItem = document.createElement("div");
                        bookItem.classList.add("book");
                        if (title.toLowerCase().includes(searchInput.value.toLowerCase())) {
                            const bookImg = document.createElement("img");
                            bookImg.src = bookImgUrl;
                            bookImg.alt = title;
                            bookImg.addEventListener("click", () => {
                                //const confirmation = confirm("Ашуға растайсыз ба");
                                //if (confirmation) 
                                {
                                    window.open(bookPdfUrl);
                                }
                            });
                            bookItem.appendChild(bookImg);
                            bookList.appendChild(bookItem);
                        }
                    });
                });
        });
    }


    searchInput.addEventListener("input", loadBooks);


    gradeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const grade = this.getAttribute("data-grade");
            searchInput.value = ""; // 清空搜索框内容
            loadBooksByGrade(grade);
        });
    });

    // 根据年级加载书籍列表
    function loadBooksByGrade(grade) {
        bookList.innerHTML = "";
        const bookNumberFile = `${grade}.txt`;
        fetch(bookNumberFile)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                lines.forEach(line => {
                    const [number, title] = line.split(' ');
                    const bookImgUrl = `https://okulyk.kz/wp-content/books/${number}/${number}.jpg`;
                    const bookPdfUrl = `https://s3.timeweb.com/29ae0e9e-okulyk-books/${number}/${number}.pdf`;
                    const bookItem = document.createElement("div");
                    bookItem.classList.add("book");
                    const bookImg = document.createElement("img");
                    bookImg.src = bookImgUrl;
                    bookImg.alt = title;
                    bookImg.addEventListener("click", () => {
                        window.open(bookPdfUrl);
                    });
                    bookItem.appendChild(bookImg);
                    bookList.appendChild(bookItem);
                });
            });
    }

    // 初始化加载所有书籍列表
    loadBooks();
};

