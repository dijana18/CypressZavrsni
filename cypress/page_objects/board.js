class NewBoard {

    get addNewButton() {
        return cy.get('.vs-c-list-btn--new-workspace')
    }

    get addNewBoard() {
        return cy.get('span').contains('Add Board')
    }

    get heading() {
        return cy.get('.vs-c-modal__title')
    }

    get organization() {
        return cy.get('.el-input')
    }

    get dropDownList() {
        return cy.get('.el-scrollbar')
    }

    get boardTitleInput() {
        return cy.get('input[name="name"]')
    }

    get nextButton() {
        return cy.get('button[name="next_btn"]')
    }

    get kanbanBtn() {
        return cy.get('span[name="type_kanban"]')
    }

    get scrumBtn() {
        return cy.get('span[name="type_scrum"]')
    }

    addNewKanbanBoard(name) {
        this.organization.click()
        this.dropDownList.find('li').first().click();
        this.boardTitleInput.type(name)
        this.nextButton.click()
        this.kanbanBtn.click()
        this.nextButton.click()
        this.nextButton.click()
        this.nextButton.click()
        this.nextButton.click()

    }

    addNewScrumBoard(name) {
        this.organization.click()
        this.dropDownList.find('li').first().click();
        this.boardTitleInput.type(name)
        this.nextButton.click()
        this.scrumBtn.click()
        this.nextButton.click()
        this.nextButton.click()
        this.nextButton.click()
        this.nextButton.click()

    }






}

export const newBoard = new NewBoard()