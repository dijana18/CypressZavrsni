/// <reference types="Cypress" />
import { newBoard } from '../page_objects/board'

describe('adding/deleting board', () => {

    let boardId = "";

    beforeEach('login', () => {
        cy.loginViaBackend()
        cy.visit('/');
    })

    it('validate New Board dialog', () => {
        cy.url().should('include', 'my-organizations')
        newBoard.addNewButton.click()
        newBoard.addNewBoard.click()
        newBoard.heading.should('contain', 'New Board')
        newBoard.organization.should('be.visible')
        newBoard.boardTitleInput.should('be.visible')
        newBoard.nextButton.should('be.disabled')
    })

    it('add new scrum board', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards'
        }).as('addScrumBoard');

        newBoard.addNewButton.click();
        newBoard.addNewBoard.click();
        newBoard.addNewScrumBoard("Scrum Board 1");
        cy.wait('@addScrumBoard').then(interception => {
            expect(interception.response.statusCode).eq(201);
        })
    })

    it('add new kanban board', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards'
        }).as('addKanbanBoard');

        newBoard.addNewButton.click();
        newBoard.addNewBoard.click();
        newBoard.addNewKanbanBoard("Kanban Board 1")
        cy.wait('@addKanbanBoard').then(interception => {
            boardId = interception.response.body.id
            expect(interception.response.statusCode).eq(201);
        })
    })

    it('delete new added kanban board', () => {
        cy.intercept({
            method: 'GET',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
        }).as('loadBoardForDeletion');

        cy.intercept({
            method: 'DELETE',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
        }).as('successfulDelete');

        cy.visit(`/boards/${boardId}`)
        cy.wait('@loadBoardForDeletion').then(interception => {
            expect(interception.response.statusCode).eq(200);
        })

        cy.get('.vs-l-project__menu').find('li').last().click()
        cy.get('.vs-c-btn--warning').scrollIntoView().click()
        cy.get('button[name="save-btn"]').click()
        cy.wait('@successfulDelete').then(interception => {
            expect(interception.response.statusCode).eq(200);
        })
    })

})