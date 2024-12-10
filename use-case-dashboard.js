import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-font-navigation, Arial, sans-serif);
      background-color: var(--ddd-theme-default-background, #f9f9f9);
      color: var(--ddd-primary-6, #333);
      height: 100vh;
    }

    /* Simplified Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ccc;
      padding: 12px 20px;
    }

    .header .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header .logo img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .header .nav-links {
      display: flex;
      gap: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .header .nav-links a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .header .nav-links a:hover {
      text-decoration: underline;
    }

    .header .account {
      font-size: 16px;
      font-weight: bold;
    }

    /* Dashboard Layout */
    .dashboard {
      display: flex;
      padding: 16px;
      gap: 20px;
      height: calc(100vh - 60px); /* Full height minus header */
      overflow: auto;
    }

    .filters {
      flex: 1;
      background: var(--ddd-theme-default-white, #fff);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filters h2 {
      margin-top: 0;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 8px;
    }

    .filters label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      margin: 8px 0;
    }

    .filters input[type="checkbox"] {
      margin: 0;
    }

    .cards {
      flex: 3;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    use-case-card {
      background-color: var(--ddd-theme-default-white, #fff);
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    use-case-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  `;

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
      results: { type: Number },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.results = 0;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch("./lib/use-case-data.json");
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
        this.results = this.filteredUseCases.length;
      }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
      this.useCases = [];
      this.filteredUseCases = [];
    }
  }

  filterUseCases() {
    if (this.selectedFilters.length === 0) {
      this.filteredUseCases = [...this.useCases];
    } else {
      this.filteredUseCases = this.useCases.filter((useCase) =>
        this.selectedFilters.every((filter) => useCase.tags?.includes(filter))
      );
    }
    this.results = this.filteredUseCases.length;
  }

  handleFilterChange(event) {
    const filter = event.target.value;
    if (event.target.checked) {
      this.selectedFilters = [...this.selectedFilters, filter];
    } else {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    }
    this.filterUseCases();
  }

  render() {
    return html`
      <!-- Simplified Header -->
      <div class="header">
        <div class="logo">
          <img src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4" alt="HAX Logo" />
          <span>HAX LOGO</span>
        </div>

        <div class="nav-links">
          <a>Merlin</a>
          <a>Search Sites</a>
        </div>

        <div class="account">
          acct name
        </div>
      </div>

      <!-- Dashboard Section -->
      <div class="dashboard">
        <div class="filters">
          <h2>Template</h2>
          ${this.generateFilters()}
        </div>

        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) => html`
              <use-case-card
                title="${useCase.name}"
                description="${useCase.description}"
                demoLink="${useCase.demo_link}"
              ></use-case-card>
            `
          )}
        </div>
      </div>
    `;
  }

  generateFilters() {
    const uniqueTags = [
      ...new Set(this.useCases.flatMap((useCase) => useCase.tags || [])),
    ];
    return uniqueTags.map(
      (tag) => html`
        <label>
          <input
            type="checkbox"
            value="${tag}"
            @change="${this.handleFilterChange}"
          />
          ${tag}
        </label>
      `
    );
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);
