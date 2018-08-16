# appstore-search

## Live instances

### Frontend

https://bcaudan-appstore-search.herokuapp.com/

### Backend

    POST https://bcaudan-appstore-search-api.herokuapp.com/api/1/apps {app}
    DELETE https://bcaudan-appstore-search-api.herokuapp.com/api/1/apps/app-id

## Local

### Frontend

    npm run frontend
    
available on http://localhost:5000    


### Backend

    ALGOLIA_ADMIN_KEY=xxx npm run backend
    
available on http://localhost:4000    

## Development

### Frontend

Launch server with automatic restart on changes:

    npm run dev:frontend

open browser on http://localhost:3000

### Backend

Launch server with automatic restart on changes:

    ALGOLIA_ADMIN_KEY=xxx npm run dev:backend

available on http://localhost:4000

## Tests

### Frontend

    npm run test:frontend

### Backend

    npm run test:backend

