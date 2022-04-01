import { CONSTANTS } from '../../constants';

describe('Quote', () => {
  beforeEach(() => {
    cy.intercept('GET', 'quote?token=*', { fixture: 'quote.json' }).as('getQuote');
    cy.intercept('GET', 'company?token=*', { fixture: 'company.json' }).as('getCompany');

    cy.visit(CONSTANTS.URL)
  });

  it('should render initial layout', () => {
    cy.findByText('Stock tracking').should('be.visible');
    cy.findByPlaceholderText('ISIN').should('be.visible');
  });

  it('should show all the stock data for APPL', () => {
    cy.findByTestId('stockSearch').type('aapl');

    cy.wait('@getQuote');

    cy.findByText('Symbol').should('be.visible');
    cy.findByText('AAPL').should('be.visible');

    cy.findByText('Company name').should('be.visible');
    cy.findByText('Apple Inc').should('be.visible');

    cy.findByText('Current stock price').should('be.visible');
    cy.findByText('163.08').should('be.visible');

    cy.findByText('Today’s change').should('be.visible');
    cy.findByText('-0.00055').should('be.visible');
  });

  it('should show all the company description for APPL', () => {
    cy.findByTestId('stockSearch').type('aapl');

    cy.wait('@getQuote');

    cy.findByTestId('toggleRow').click();

    cy.wait('@getCompany');

    cy.findByText('Details').should('be.visible');

    cy.findByText('Apple Inc. is an American multinational technology company headquartered in Cupertino, California.').should('be.visible');
  });

  it('should show an error message if no stock is found', () => {
    cy.findByTestId('stockSearch').type('random');

    cy.intercept('GET', 'quote?token=*', {
      statusCode: 404,
      response: 'Unknown symbol'
    });

    cy.findByText('Stock not found').should('be.visible');
  });
})
