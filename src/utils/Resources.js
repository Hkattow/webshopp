
export const getUsers = () => {
    try {
        const users = [
            {id: "1", email: "johndow@gmail.com", pwd: "456456456"},
            {id: "2", email: "Kim@gmail.com", pwd: "123123123"},
            {id: "3", email: "Kim32@gmail.com", pwd: "45678"},
            {id: "4", email: "Zorro@gmail.com", pwd: "45678edt"}
        ];

        return users;
    } catch (error) {
        console.log('Error', error);
    }
};

export const validateUser = (email, password) => {
    let logged = getUsers().find(rad => rad.email === email);

    const validated = logged && logged.pwd == password;

    //console.log(validated);
    return validated;
};

export const getProducts = () => {
    try {
        const products = [
            {
                id: "1",
                name: "Skor",
                descr: "Fina Skor",
                stock: 100,
                price: 40,
                src: "https://musikverket.se/wp-content/uploads/2012/08/skor-arbyreed-flickr-cc-680.jpg"
            },
            {
                id: "2",
                name: "T-Shirt",
                descr: "T-shirt",
                stock: 1000,
                price: 140,
                src: "https://static.partyking.org/fit-in/1300x0/products/original/superman-dam-t-shirt-3.jpg"
            },
            {
                id: "3",
                name: "Telefon",
                descr: "8G-Phone",
                stock: 200,
                price: 2340,
                src: "https://cdn.w600.comps.canstockphoto.com/black-push-button-phone-on-a-white-vector-clipart_csp15273806.jpg"
            },
            {
                id: "4",
                name: "Lastbil",
                descr: "Scania Truck",
                stock: 10,
                price: 7989123,
                src: "https://www.scania.com/content/www/group/en/home/about-scania/scania-in-brief/partnerships/_jcr_content/image.img.90.992.jpeg/1587368537098.jpeg"
            },

        ];
        return products;
    } catch (error) {
        console.log('Error', error);
    }
};

