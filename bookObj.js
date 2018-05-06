var Items = [
    {   
        ID :"tc86lypzkt",
        birthday:"1814-04-08T21:00:00.000Z",
        books:[{name: "Кобзар", jenre: "Классическая литература", page: 450, bookID: "rx86t04c1f"}],
        name:"Тарас",
        patronymic: "Григорович",
        surname:"Шевченко"
    },
    {   
        ID:"ik0v27bzt4",
        birthday:"1930-04-18T21:00:00.000Z",
        books:[{name: "Записки українського самашедшого", jenre: "Наука", page: 345, bookID: "ydcbyd80qc"},{name: "Маруся Чурай", jenre: "Детектив", page: 347, bookID: "i6smed9tlr"}],
        name:"Ліна",
        patronymic:"Василівна",
        surname:"Костенко"
    }];

if (!localStorage.getItem("Items")){
    var Items_storage = JSON.stringify(Items);
    localStorage.setItem("Items", Items_storage);
}