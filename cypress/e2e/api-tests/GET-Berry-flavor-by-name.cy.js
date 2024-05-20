import flavors from '../../fixtures/flavors.json'; 

describe('Get berry flavor with name', () => {
    it('GET call - Berry Flavor - success', () =>{
        const validFlavors = flavors.results;
        validFlavors.forEach((flavor) => 
        {   
            cy.request({
                url: '/berry-flavor/'+flavor.name,
            })
            .then((response) =>
            {
                expect(response.status).to.equal(200)
                expect(response.body.name).to.equal(flavor.name)
            })
        });
    })

    let spicyBerryNAMEwithmaxPotency = 0;
    let spicyBerryMaxPotency = 0;

    it('GET spicy ones AND call the one with more potency', () =>
    {
        cy.request({
            url: '/berry-flavor/spicy',
        })
        .then((response) =>
        {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal('spicy')
            const spicyBerries = response.body.berries
            spicyBerries.forEach((item) =>
            {
                if (item.potency > spicyBerryMaxPotency)
                    {
                        spicyBerryMaxPotency = item.potency
                        spicyBerryNAMEwithmaxPotency = item.berry.name
                    }
            })
            cy.log('Spicy berry current max potency is: '+spicyBerryMaxPotency)
            cy.log('Spicy berry name with max potency is : '+spicyBerryNAMEwithmaxPotency)
        })
    })

    it('find one among spicy ones with most potency', () =>
    {
        cy.log("The spicy one with most potent is: "+ spicyBerryNAMEwithmaxPotency)
            cy.request('GET','/berry/'+spicyBerryNAMEwithmaxPotency)
            .then((response) =>
                {
                    expect(response.status).to.equal(200)
                    expect(response.body.name).to.equal(spicyBerryNAMEwithmaxPotency)
                })
    })
})