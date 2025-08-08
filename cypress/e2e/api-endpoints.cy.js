describe('API Tests - Data Explorer Functionality', () => {
  const baseUrl = 'https://ckan.nationalgrid.staging.datopian.com/api/3/action'
  const resourceId = 'ae7edc38-e16b-4a19-96b6-e61110a3a9f6'

  describe('Filter Functionality', () => {
    it('should apply single filter via datastore_search', () => {
      const filters = JSON.stringify({ "Service ID": "PQR" })
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&filters=${encodeURIComponent(filters)}`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body).to.have.property('result')
          expect(response.body.result).to.have.property('records')
          
          response.body.result.records.forEach(record => {
            expect(record['Service ID']).to.equal('PQR')
          })
          
          expect(response.body.result.total).to.be.at.least(0)
        }
      })
    })

    it('should apply multiple filters via datastore_search', () => {
      const filters = JSON.stringify({ 
        "Service ID": "PQR", 
        "Instruction Status": "ACCEPTED" 
      })
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&filters=${encodeURIComponent(filters)}`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body).to.have.property('result')
          expect(response.body.result).to.have.property('records')
          
          response.body.result.records.forEach(record => {
            expect(record['Service ID']).to.equal('PQR')
            expect(record['Instruction Status']).to.equal('ACCEPTED')
          })
        }
      })
    })
  })

  describe('Pagination', () => {
    it('should handle limit parameter', () => {
      const limit = 10
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&limit=${limit}`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body.result.records).to.have.length.at.most(limit)
          expect(response.body.result.limit).to.equal(limit)
        }
      })
    })

    it('should handle offset parameter', () => {
      const limit = 5
      const offset = 10
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&limit=${limit}&offset=${offset}`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body.result.records).to.have.length.at.most(limit)
          expect(response.body.result.offset).to.equal(offset)
        }
      })
    })

    it('should maintain filters across pagination', () => {
      const filters = JSON.stringify({ "Service ID": "PQR" })
      const limit = 5
      const offset = 0
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&filters=${encodeURIComponent(filters)}&limit=${limit}&offset=${offset}`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body.result.records).to.have.length.at.most(limit)
          
          response.body.result.records.forEach(record => {
            expect(record['Service ID']).to.equal('PQR')
          })
        }
      })
    })
  })

  describe('Sorting', () => {
    it('should sort by Target MW in ascending order', () => {
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&sort=${encodeURIComponent('"Target MW" asc')}&limit=10`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body.result.records).to.have.length.at.most(10)
          
          const records = response.body.result.records
          for (let i = 1; i < records.length; i++) {
            expect(parseFloat(records[i]['Target MW'])).to.be.at.least(parseFloat(records[i-1]['Target MW']))
          }
        }
      })
    })

    it('should sort by Target MW in descending order', () => {
      const url = `${baseUrl}/datastore_search?resource_id=${resourceId}&sort=${encodeURIComponent('"Target MW" desc')}&limit=10`
      
      cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200])
        if (response.status === 200) {
          expect(response.body.result.records).to.have.length.at.most(10)
          
          const records = response.body.result.records
          for (let i = 1; i < records.length; i++) {
            expect(parseFloat(records[i]['Target MW'])).to.be.at.most(parseFloat(records[i-1]['Target MW']))
          }
        }
      })
    })

  })
}) 