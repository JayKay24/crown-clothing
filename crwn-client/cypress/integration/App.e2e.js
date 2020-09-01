describe("App E2E", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("should display the navigation bar", () => {
    cy.visit("/");

    cy.get("nav").contains("SHOP");
  });
});
