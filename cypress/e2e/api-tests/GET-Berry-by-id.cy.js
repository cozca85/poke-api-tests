let validIdArray = Array.from({length: 64}, (v, k) => k+1); 

var InvalidIdArray = [-1,0,1.67868,65,688756785476856785n];

describe('Get berry with valid Id', () =>
{
    it('GET call - 200 status code - success', () =>{
        validIdArray.forEach((element) => 
        {   
            cy.request('GET','/berry/'+element)
            .then((response) =>
            {
                expect(response.status).to.equal(200)
                expect(response.body.id).to.equal(element)
            })
        });
    })
})

describe('Get berry with invalid Id', () => {
    it('GET call - Invalid code - failure', () =>{
        InvalidIdArray.forEach((element) => 
        {   
            cy.request({
                url: '/berry/'+element,
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