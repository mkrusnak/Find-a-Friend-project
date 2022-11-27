router.get('/about', (req, res, next) => { 
    client.vehicle.search({
      make: "Ford",
      model: "Bronco",
      contact: {address: { state: "NJ"}},
      limit: 5
    })
    .then((response) => {
      res.send(response.data.vehicles)
      console.log(response.data.vehicles)
    })
        .catch((err) => {
           console.log(err)
        });
    })
    

    Thats how my data looks 

    [ 
        {
    make: "Ford",
    model: "Bronco",
    photos: [
        {
        photo1: "urlhere",
        photo2: "urlhere"
        }
    ],
    contact: {
        email: "at@gmail.com",
        phone: "123-456-78-90",
        address: {
            address1: "Universal Boulevard",
            city: "Orlando",
            state: "FL"
              }
          }
       },
      {
        make: "Mazda",
        model: "CX-5",
        photos: [...] ,
        contact: {
            email: "at223@gmail.com",
            phone: "153-566-78-90",
            address: {
                address1: "Universal Drive",
                city: "Livingston",
                state: "NJ"
                  }
              }
      }
     ]