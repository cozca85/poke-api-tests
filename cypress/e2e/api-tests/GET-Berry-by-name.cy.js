var InvalidNameArray = ['empty','17lvnzhs6xl6b9l6ea8332oeoiziuw0kuz3gblek','-213213213','nopokemon','!"#ö>'];

import berries from '../../fixtures/berries.json'; 

describe('Get berry with valid Name', () =>
    {
        beforeEach(() => {
        })

        it('GET call - Valid Name - success', () =>{
            const validNameArray = berries.results;
            validNameArray.forEach((item) => 
                {   
                    cy.request('GET','/berry/'+item.name)
                    .then((response) =>
                    {
                        expect(response.status).to.equal(200)
                        expect(response.body.name).to.equal(item.name)
                    })
                });
        })
      
    })
    
    describe('Get berry with invalid Name', () => {
        it('GET call - Invalid name - failure', () =>{
            InvalidNameArray.forEach((name) => 
                {   
                    cy.request({
                        url: '/berry/'+name,
                        failOnStatusCode: false
                    })
                    .then((response) =>
                    {
                        expect(response.status).to.equal(404)
                        expect(response.body).to.equal('Not Found')
                    })
                });
        })
    })