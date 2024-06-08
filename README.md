## LIST OF HTTP REQUESTS TO TEST API SERVER:

Requests are made based on the *`sample merchant stores file`*. This file stores response from the production api endpoint, and mutates on changes in the merchant store data. The idea is that, unless a new request is made to the main server for a different company or category, this file will be used to give consistent responses to client, giving unique ID's to send to the client everytime the parameters change. However, if the company or category name change, a new request will be made to the production api endpoint to get data and repeat the process.

chekout the file to have an idea of how the responses look like, then proceed with testing the api locally, by running the ``server.js`` file and sending the following get requests using **Postman** or **Insomnia**;

1. Get Products - First Page, Sorted by Price (Ascending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=1&sort=price&order=asc

2. Get Products - Second Page, Sorted by Price (Ascending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=2&sort=price&order=asc

3. Get Products - First Page, Sorted by Rating (Descending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=1&sort=rating&order=desc

4. Get Products - Second Page, Sorted by Rating (Descending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=2&sort=rating&order=desc

5. Get Products - First Page, Sorted by Discount (Ascending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=1&sort=discount&order=asc

6. Get Products - Second Page, Sorted by Discount (Ascending)

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products?top=10&minPrice=1000&maxPrice=10000&page=2&sort=discount&order=asc

7. Get Product by ID

    - Method: GET
    - URL: http://localhost:3000/api/categories/laptop/products/Laptop%201-2236-4.7
