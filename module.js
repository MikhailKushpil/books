var app = angular.module("bookApp", ["ngRoute"]);
app.config(function($routeProvider){ // используем ngRoute для маршрутизации приложения
    $routeProvider.when ("/books",{
        templateUrl : "books.html",
        controller : "bookAppCtrl"
    });
    $routeProvider.when ("/authors",{
        templateUrl : "authors.html",
        controller : "authorsAppCtrl"
    });
    $routeProvider.when ("/authorBooks",{
        templateUrl : "authorBooks.html",
        controller: "authorsAppCtrl"
    });
    $routeProvider.when ("/authorForm",{
        templateUrl : "authorForm.html",
        controller: "authorsAppCtrl"
    });
    $routeProvider.when ("/bookForm",{
        templateUrl : "bookForm.html",
        controller: "authorsAppCtrl"
    });
});

app.controller("bookAppCtrl", function($scope){ // создаем контроллер для "всех книг" 
    $scope.bookItems = JSON.parse(localStorage.getItem("Items"));
    $scope.books_Avtor = [];
    $scope.Arry = [];
    $scope.bookFun = function(){
        for(avtor in $scope.bookItems){
            for(book in $scope.bookItems[avtor].books){
                var message = $scope.bookItems[avtor].books[book];
                $scope.books_Avtor.push(message);    
            }
        }
        // for (var i = 0; $scope.books_Avtor.length > i; i++){
        //     var Z = $scope.books_Avtor[i];
        //     $scope.Arry.push(Z);
        // }
    }
    $scope.bookFun();

    $scope.sortReverse = false; 
    $scope.booksFilter = function(x){
        $scope.byBooksFilter = x;
        $scope.sortReverse = !$scope.sortReverse;
    }
});

app.controller("authorsAppCtrl", function($scope){ // создаем контроллер для авторов и их книг
    $scope.items = JSON.parse(localStorage.getItem("Items")); // визываем обэкт "Items" з localStorage  
    var author_ID, open_Author, reapet, data_book; 

    $scope.booksAuthor = [];
    $scope.booksAuthor_two = []; 
    $scope.openAuthor = function(itemMessage){ // фукция которая открывае view с списком книг автора
        open_Author = itemMessage; // принимаем текуший item обэкт
        $scope.booksAuthor = []; // создаем  $scope.booksAuthor
        for(i in $scope.items){  
            if ($scope.items[i].ID == itemMessage.ID){
                var a = $scope.items[i];
                $scope.booksAuthor = a;
                author_ID = $scope.items[i].ID;
                sessionStorage.setItem("author_ID", author_ID);
                break;
            }        
        }
        var serialObj = [];
        sessionStorage.setItem("open_Author",  open_Author);
        serialObj = JSON.stringify($scope.booksAuthor);
        sessionStorage.setItem("myKey", serialObj);
        return open_Author;
    }
 
    $scope.booksAuthor = JSON.parse(sessionStorage.getItem("myKey")); // вынесем $scope.booksAuthor з локальной области видимости в глобальную 

    $scope.editOrCreate = function(item){ // Проверка на редактирование или создание нового автора
        var editObj = [];
        if(item){
            $scope.currentItem = angular.copy(item);
            editObj = JSON.stringify($scope.currentItem);
            localStorage.setItem("AuthorEdit", editObj);
            localStorage.setItem("Items",JSON.stringify( $scope.items)); 
        } else{
            editObj = [];
            localStorage.removeItem("AuthorEdit");
            $scope.currentItem = {};
        }
    }

    $scope.currentItem = JSON.parse(localStorage.getItem("AuthorEdit")); // вынесем $scope.currentItem з локальной области видимости в глобальную 

    $scope.editOrCreateBook = function(item, book){ // проверка книги на наличие
        if (item){
            delete item.books;
            item.books = book;
            $scope.currentItemBook = angular.copy(item);
            console.log($scope.currentItemBook);
            sessionStorage.setItem("BookEdit" , JSON.stringify($scope.currentItemBook));
            console.log($scope.currentItemBook);
            localStorage.setItem("Items",JSON.stringify( $scope.items)); 
        } else {
            editObjBook = [];
            sessionStorage.removeItem("BookEdit");
            $scope.currentItemBook = {};
        }
    };

    $scope.currentItemBook = JSON.parse(sessionStorage.getItem("BookEdit"));

    $scope.saveEdit = function(item){ // сохранение нового автора или сохранение изменений в существующего автора
        if (angular.isDefined(item.ID)){
            $scope.update(item);
        } else {
            $scope.create(item);
        }
    }

    $scope.saveEditBook = function(item){ // сохранение новой книги или сохранение изменений в книге которую редактировали
        if(angular.isDefined(item.books.bookID)){
            $scope.updateBook(item);
        } else {
            $scope.createBook(item);
        }
                $scope.booksAuthor = JSON.parse(sessionStorage.getItem("myKey"));
        console.log($scope.openAuthor($scope.booksAuthor));
    }

    $scope.ID = function(){ // функция генератора ID
        return Math.random().toString(36).substr(2, 10);
    };

    $scope.create = function(item){ // создание автора
        item.ID = $scope.ID();
        item.books = [];
        $scope.items.push(item);
        localStorage.setItem("Items",JSON.stringify( $scope.items)); 
    }

    $scope.createBook = function(item){ // создание книги
        item.books.bookID = $scope.ID();
        for (var i = 0; $scope.items.length > i; i++){
            if ($scope.items[i].ID == sessionStorage.getItem("author_ID")){
                $scope.items[i].books.push(item.books);
                break;
            }
        }
        $scope.booksAuthor = JSON.parse(sessionStorage.getItem("myKey"));
        console.log($scope.openAuthor($scope.booksAuthor));
        localStorage.setItem("Items",JSON.stringify( $scope.items)); 
    }


    $scope.update = function(item){ // обновление информации об авторе
        for(var i = 0; i < $scope.items.length; i++ ){
            if($scope.items[i].ID == item.ID){
                $scope.items[i] = item;
                break;
            }
        }
        localStorage.setItem("Items",JSON.stringify( $scope.items)); 
    }

    $scope.updateBook = function(item){ // обновление информации об книге
        for (var i = 0; $scope.items.length > i; i++){
            for (var j = 0; $scope.items[i].books.length > j; j++){
                if ($scope.items[i].books[j].bookID == item.books.bookID){
                    $scope.items[i].books[j].name = item.books.name;
                    $scope.items[i].books[j].jenre = item.books.jenre;
                    $scope.items[i].books[j].page = item.books.page;
                }
            }
        }
        $scope.booksAuthor = JSON.parse(sessionStorage.getItem("myKey"));
        localStorage.setItem("Items",JSON.stringify( $scope.items));
    }

    $scope.delete = function(item){ // удаление автора
        $scope.items.splice($scope.items.indexOf(item), 1);
        localStorage.setItem("Items",JSON.stringify( $scope.items)); 
    }

    $scope.deleteBook = function(item){ // удаление книги
        for(var i = 0; $scope.items.length > i; i++){
            for(var j = 0; $scope.items[i].books.length > j; j++){
                if($scope.items[i].books[j].bookID == item.bookID){
                    $scope.items[i].books.splice($scope.items[i]
                        .books.indexOf(item),1);
                }
            }
        }
        $scope.booksAuthor = JSON.parse(sessionStorage.getItem("myKey"));
        console.log($scope.openAuthor($scope.booksAuthor));
        localStorage.setItem("Items",JSON.stringify( $scope.items)); 
    }

    // функция фильтрации
    $scope.sortReverse = false; 
    $scope.orderByAuthors = function (x){
        $scope.myOrderByAuthor = x;
        $scope.sortReverse = !$scope.sortReverse;
    }
});
