// Author: Syed Zaheer Hossain

// This file contains codes for running different function on MongoDB

// To show all existing databases
show dbs;

// CRUD operations of database
// C --> Create
// R --> Read
// U --> Update
// D --> Delete

// Insert Single data through mongo shell commands
db.collectionName.insertOne(
    {data}
    );

    eg:- db.inventory.insertOne(
        {  item: "laptops" , qty: 20 , model: "apple macbook air" , price: 150000  }
    )

// Insert Multiple datas through mongo shell commands
db.collectionName.insertOne(
    [{data1},
    {data2},
    {data3},
    {many_more_datas}]
    );

eg:-db.inventory.insertMany(
    [{  item: "laptop" , stocks: {ordered:10, unordered: 20} , model: "lenovo ideapad" , price: 40000  },
    {  item: "Monitor" , qty: 40 , model: "samsung led" , price: 30000  },
    {  item: "laptops" , qty: 30 , model: "hp welcome" , price: 50000, stocks :['ordered', 'restocking']  },
    {  item: "Keyboards" , stocks: {ordered: 80, unordered: 110} , model: "hp" , price: 2000  },
    {  item: "UPS" , stocks: 5 , model: "Frontech" , price: 1670  },
    {  item: "Router" , qty: 36 , model: "T-Link" , price: 3000  },
    {  item: "CPU" , qty: {state:"restocking",ordered: 17, unordered: 20} , model: "Dell" , price: 20000  },
    {  item: "Joystick" , qty: [{state:"restocking",ordered: 21, unordered: 46}] , model: "zebronics" , price: 5000  }]
);


// Read operations on MongoDB

// fetch/find from all documents from collection inventory

db.inventory.find()

// fetch/find from all documents from collection inventory with limit 3
db.inventory.find().limit(3)

// fetch all documents from collection inventory after skipping first 3 documents
db.inventory.find().skip(3)

// The operation fetches the data where item name is " Router "

eg:- db.inventory.find( {item: "Router"} );

// This operation returns only 1 document with field item as "Router"
db.inventory.findOne({ item: "Router" });

// The operation returns documents in the inventory collection where the array field stocks contains the element "ordered" or "remaining":

db.inventory.find( { stocks: { $in: [ "ordered", "remaining" ]} } )

// The operation use the $all query operator to return documents in the inventory collection where the array field stocks contains both the elements "ordered" and "remaining":

db.inventory.find( { stocks: { $all: [ "ordered", "remaining" ] } } );
db.inventory.find( { stocks: { $all: [ "ordered", "restocking" ] } } )

// The operation uses the $size operator to return documents in the inventory collection where the array size of stocks is exactly 2:

db.inventory.find( { stocks: { $size: 2 } } )

// The operation returns documents in the inventory collection where the stocks array contains an element with ordered field equals "80"

db.inventory.find(
    { "stocks.ordered": 80 }
 )

 // returns documents in the inventory collection where the qty array contains at least one element with both the state field equals "restocking" and the ordered field greater than 10:

 db.inventory.find(
    { qty: { $elemMatch: { state: "restocking", ordered: { $gt: 10 } } } }
 )

 // updates the fields choosen in a particular document

 db.inventory.updateOne(
    { item: "Router" },
    {
        $set: {qty:71,model:"TP-Link"}, 
        $currentDate: {lastModified:true}
    }
 )

 // updates all the documents choosen with particular field datas

 db.inventory.updateMany(
    { "qty": {$lt: 20} },
    {
        $set: {qty:71,model:"TP-Link"}, 
        $currentDate: {lastModified:true}
    }
 )

 // to delete all documents of collection inventory

 db.inventory.deleteMany({})

 // to delete the first document with the matching criteria

 db.inventory.deleteOne({item:"Joystick"})

 // sort and fetch all the documents on basis of field qty (1 represents ascending order)
 db.inventory.find().sort({qty: 1})

 // sort and fetch all the documents on basis of field qty (-1 represents decending order)
 db.inventory.find().sort({qty: -1})

 //to aggregate and group by 

 db.inventory.aggregate([
     {
        // filter inventory items to find out the one lesser than 38
        $match: { qty: {$lt:38} }
    },
    {
        // group by according to their item name and find total of qty
        $group: {_id: "$item", toqty:{ $sum: "$qty"}}
    }
 ])