// page 1
> List of categories
>>(Get) http://localhost:11010/categories
> List of brands
>>(Get) http://localhost:11010/brands
> Brands on the basis of categories
>>(Get) http://localhost:11010/categories?catid=2
> List of cards
>>(Get) http://localhost:11010/cards

//Page2
> List of bands on basis of categories
>>(Get) http://localhost:11010/categories?brandid=2
> http://localhost:11010/categories?catid=1&brandid=2
> Filter on basis of brands
>>(Get) http://localhost:11010/filter/1
> Filter on basis of cost
>>(>(Get) http://localhost:11010/filter/3?lcost=100&hcost=700


//Page3
> Details of the Brands
>>(Get) http://localhost:11010/details/11
> items of the brands
>>(Get) http://localhost:11010/items/10

//page4
> Menu details (selected item)
>>(Post) localhost:11010/productsitem
    [1,2,3]
> Place order
>>(Post) http://localhost:11010/placeorder
(
    {
        "_id": "62fbd2be5aa7fff0168030f1",
        "name": "nihal",
        "email": "nihal@gmail.com",
        "address": "zz,new road bhusawal ",
        "phone": 1234567890,
        "cost": 900,
        "item": [
            8,
            9,
            5
        ]
    }
)

//page5
> List of order placed 
>>(Get) http://localhost:11010/orders
> List of order placed of particular user
>>(Get) http://localhost:11010/orders?email=mi@gmail.com
> Update order status
>>(Put) http://localhost:11010/updateorder/3
(
   {
        "status":"Pay_Failed",
        "bank_name":"HDFC",
        "date":"16-08-2022"
}
)



////////////////////////////////
> Delete orders
>>(Delete) http://localhost:11010/deleteorder/62fbd24c5aa7fff0168030f0