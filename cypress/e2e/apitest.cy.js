const { expect } = require("chai")

describe('regres api test', () => {

  it('Get List User', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2'
    })
      .then((response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body.data[0]).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })
  })

  it('Get Single User', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2'
    })
      .then((response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body.data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })
  })

  it('User Not Found', () => {
    cy.request({
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  })

  it('List Resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown'
    })
      .then((response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body.data[0]).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value')
      })
  })

  it('Single Resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/2'
    })
      .then((response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body.data).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value')
      })
    })

    it('POST create', () => {
      const data = { "name": "morpheus", "job": "leader" }
      cy.request('POST', 'https://reqres.in/api/users', data)
        .its('body').should('include', { name: 'morpheus', job: 'leader' })
    })

    it('PUT', () => {
      const data = { "name": "morpheus", "job": "director" }
      cy.request('PUT', 'https://reqres.in/api/users/2', data)
        .its('body').should('include', { name: 'morpheus', job: 'director' })
    })

    it('PATCH', () => {
      const data = { "name": "morpheus", "job": "manager" }
      cy.request('PATCH', 'https://reqres.in/api/users/2', data)
        .its('body').should('include', { name: 'morpheus', job: 'manager' })
    })

    it('DELETE', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2')
        .its('status').should('equal', 204)
    })

    it('POST Register', () => {
      const data = { "email": "eve.holt@reqres.in", "password": "pistol" }
      cy.request('POST', 'https://reqres.in/api/register', data)
        .its('body').should('include', { id: 4, token: 'QpwL5tke4Pnpja7X4' })
    })

    it('Register Fail', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        failOnStatusCode: false,
        body: {
          "email": "sydney@fife"
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Login Success', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        body: {
          "email": "eve.holt@reqres.in",
          "password": "cityslicka"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4')
      })
    })

    it('Login Fail', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: {
          "email": "eve.holt@reqres.in",
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Missing password')
      })
    })

    it('DELAYED RESPONSE', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users?delay=3',
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0]).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })
    })
  })
