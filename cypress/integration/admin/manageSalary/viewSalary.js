import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test view salary page', () => {
  it('api will be fired and will list all employees salary', () => {
    signin(user.admin);
    cy.wait(4000);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_salary').should('be.visible');
    cy.get('.nav > #manage_salary').click();
    cy.get('.nav-sub #view_salary').should('be.visible');
    cy.get('.nav-sub #view_salary').click();
    urlVisited(urls.baseUrl + urls.viewSalary);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
  });
  xit('search text box will filter the listing', () => {
    signin(user.admin);
    cy.wait(4000);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_salary').should('be.visible');
    cy.get('.nav > #manage_salary').click();
    cy.get('.nav-sub #view_salary').should('be.visible');
    cy.get('.nav-sub #view_salary').click();
    urlVisited(urls.baseUrl + urls.viewSalary);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get('#search-form').should('be.visible');
    cy.get('#search-form').type('arun');
  });
});
